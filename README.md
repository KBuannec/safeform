# 🛡️ SafeForm

**SafeForm** est un projet démonstratif d’un formulaire web sécurisé, avec une architecture front-end / back-end claire, des validations robustes, et des bonnes pratiques de sécurité applicative.

---

## 📁 Architecture

safeform/
├── safeform-client/ # Frontend React + TypeScript + Zod + SCSS
└── safeform-server/ # Backend Express + TypeScript + Helmet + CSRF + Zod


---

## 🔐 Objectifs du projet

- Créer une base de formulaire sécurisée et scalable

- Implémenter une validation côté front avec Zod

- Intégrer une sécurité complète côté serveur :

- Protection XSS

- Protection CSRF (cookie + token)

- Sécurisation des headers HTTP avec Helmet

- Limitation des requêtes avec rate-limiting

- Implémenter un système d'inscription / connexion avec sessions

- Persister les utilisateurs en base PostgreSQL via Prisma ORM

- Couvrir les formulaires avec des tests unitaires (et snapshots)



---

## ⚙️ Technologies utilisées

### Front-end (React) :
- React + TypeScript (via Vite)
- Architecture *feature folder* (Composant / Hook / Container)
- Validation des champs avec **Zod**
- SCSS modulaire
- Requêtes sécurisées avec `fetch` + header `X-XSRF-TOKEN`
- Formulaire d’inscription avec validation live (Zod)
- Saisie sécurisée du mot de passe (type `password`)
- Gestion d'affichage des erreurs et succès
- Affichage/masquage du mot de passe

### Back-end (Node.js) :
- Express en TypeScript
- API REST avec validation Zod
- Sécurité HTTP avec **Helmet**
- Gestion des sessions avec **express-session**
- Hashage des mots de passe avec **bcrypt**
- Protection CSRF avec **csurf**
- Limitation anti-spam avec **express-rate-limit**
- CORS strict (avec `credentials: true`)
- Base de données PostgreSQL avec **Prisma ORM**

### Tests & Qualité :
- Vitest + Testing Library (rendu, interactions, snapshots)
- Coverage par formulaire
- ESLint strict + formatage
- Prévu : CI GitHub Actions

---

## 🚀 Lancer le projet

### 🖥️ Lancer le back-end :

```bash
cd safeform-server
npm install
npm run dev
```

Accessible sur : http://localhost:3000

### 🌐 Lancer le front-end :
```bash
cd safeform-client
npm install
npm run dev
```
---

### 📌 À venir :

- CI basique avec GitHub Actions



