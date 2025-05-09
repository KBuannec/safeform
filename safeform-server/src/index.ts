import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { formSchema } from './form.schema';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.post('/submit', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
