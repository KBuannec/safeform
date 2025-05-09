# 🛡️ SafeForm

**SafeForm** est un projet démonstratif d’un formulaire web sécurisé, avec une architecture front-end / back-end claire, des validations robustes, et des bonnes pratiques de sécurité applicative.

---

## 📁 Architecture

safeform/
├── safeform-client/ # Frontend React + TypeScript + Zod
└── safeform-server/ # Backend Express + TypeScript + Helmet + Zod


---

## 🔐 Objectifs du projet

- Créer une base de formulaire sécurisée et scalable
- Implémenter une validation côté front avec **Zod**
- Intégrer une protection côté serveur (XSS, validation stricte, headers sécurité)
- Préparer l’extension vers un projet DevSecOps (tests, CI, audit, etc.)

---

## ⚙️ Technologies utilisées

### Front-end (React) :
- React + TypeScript (via Vite)
- Architecture *feature folder*
- Formulaire validé par **Zod**
- Séparation **Composant / Hook / Container**

### Back-end (Node.js) :
- Express en TypeScript
- Middleware **Helmet** pour la sécurité
- Validation côté serveur (Zod à venir)
- Communication via **API REST**

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

### 📌 À venir :

- Validation Zod côté serveur

- Ajout de tests unitaires

- Intégration CI/CD + SonarQube

- Protection CSRF et journalisation


