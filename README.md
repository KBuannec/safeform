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
- Implémenter une validation côté front avec **Zod**
- Intégrer une sécurité complète côté serveur :
  - Protection contre le XSS
  - Protection CSRF
  - Headers sécurisés
  - Rate-limiting anti-spam
- Préparer l’extension vers un projet DevSecOps (tests, CI, audit, etc.)

---

## ⚙️ Technologies utilisées

### Front-end (React) :
- React + TypeScript (via Vite)
- Architecture *feature folder* (Composant / Hook / Container)
- Validation des champs avec **Zod**
- SCSS personnalisé
- Requêtes sécurisées avec `fetch` + header `X-XSRF-TOKEN`

### Back-end (Node.js) :
- Express en TypeScript
- Middleware **Helmet** (headers de sécurité)
- **Zod** pour valider les données entrantes
- **CORS** strict (avec `credentials: true`)
- **csurf** pour protection CSRF (cookie + token)
- **express-rate-limit** pour limiter les abus

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

- Authentification utilisateur avec base de données

- Ajout de tests unitaires

- Intégration CI/CD

- Audit de sécurité (ESLint + SonarQube)



