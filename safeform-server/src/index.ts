import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.post('/submit', (req, res) => {
  console.log('Formulaire reçu :', req.body);
  res.status(200).json({
    message: 'Reçu avec succès',
    data: req.body
  });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
