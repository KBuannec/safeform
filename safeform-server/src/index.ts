import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import authRoutes from './routes/auth';
import { formSchema } from './form.schema';
import session from 'express-session';


const app = express();
const PORT = 3000;

app.use(helmet());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: 'safeform_super_secret_dev_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 2
  }
}));

app.use(authRoutes);


const csrfProtection = csrf({ cookie: true });

app.get('/csrf-token', csrfProtection, (req, res) => {
  const token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token);
  res.status(200).json({ csrfToken: token });
});

app.post('/submit', csrfProtection, (req, res) => {
  const result = formSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return res.status(400).json({
      message: 'Erreur de validation',
      errors,
    });
  }

  const validatedData = result.data;
  console.log('✅ Données valides reçues :', validatedData);

  res.status(200).json({
    message: 'Reçu avec succès',
    data: validatedData,
  });
});

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
