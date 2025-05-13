import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const router = Router();

const registerSchema = z.object({
    name: z.string().min(1, 'Nom requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Mot de passe trop court'),
});

router.post('/register', async (req, res) => {
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
});

export default router;