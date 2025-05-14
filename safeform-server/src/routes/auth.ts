import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import bcrypt from 'bcrypt';
import csrf from "csurf";

const prisma = new PrismaClient();
const router = Router();
const csrfProtection = csrf({ cookie: true });

const registerSchema = z.object({
    name: z.string().min(1, 'Nom requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Mot de passe trop court'),
});

const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Mot de passe requis'),
});

router.post('/register', csrfProtection, async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);

    if(!parsed.success) {
        return res.status(400).json({ message: 'Validation échouée', errors: parsed.error.flatten().fieldErrors });
    }

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Utilisateur déjà inscrit' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    res.status(201).json({ message: 'Utilisateur créé', user: { id: user.id, email: user.email, name: user.name }});

    console.log('Nouvel utilisateur enregistré :', user);
});

router.post('/login', csrfProtection, async (req, res) => {
    const result = loginSchema.safeParse(req.body);

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return res.status(400).json({
            message: 'Erreur de validation',
            errors,
        });
    }

    const { email, password } = result.data;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur introuvable' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        req.session.userId = user.id;

        console.log('Connexion réussie pour :', user.email);

        res.status(200).json({
            message: 'Connexion réussie',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/me', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Non connecté' });
  }

  res.status(200).json({ message: 'Connecté', userId });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erreur de déconnexion :', err);
      return res.status(500).json({ message: 'Erreur serveur lors de la déconnexion' });
    }

    res.clearCookie('connect.sid');
    res.status(204).end();
  });
});



export default router;