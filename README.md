# 🚀 Mon Projet Next.js & Prisma (SQLite)

Bienvenue dans ce projet full-stack utilisant **Next.js** pour le frontend et **Prisma** avec **SQLite** pour la gestion de la base de données. Ce guide vous explique comment installer et exécuter le projet étape par étape.

## 📂 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **[Node.js](https://nodejs.org/)** (v18+ recommandé)
- **[Yarn](https://yarnpkg.com/)** ou `npm` (au choix)

📌 **Pas besoin d'installer SQLite manuellement, Prisma s'en charge automatiquement !**

## ⚡ Installation du projet

### 1️⃣ Cloner le projet
```sh
git clone https://github.com/pinpin59/excuse_de_dev.git
cd excuse_de_dev
```

### 2️⃣ Installation des dépendances

Avec npm :
```sh
npm install
```

Si vous rencontrez des problèmes de dépendances, essayez avec l'option legacy peer dependencies :
```sh
npm install --legacy-peer-deps
```


## 🛠 Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

```env
# URL de connexion à la base SQLite
DATABASE_URL="file:./prisma/dev.db"

# URL de l'API backend
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 🗄 Mise en place de la base de données

### 3️⃣ Générer le schéma Prisma
```sh
npx prisma generate
```

### 4️⃣ Créer et migrer la base de données
```sh
npx prisma migrate dev --name init
```
## 🚀 Lancer le projet

### 5️⃣ Démarrer le projet
```sh
npm run dev
```

📌 Par défaut, l'API tourne sur http://localhost:3000.

## 🔧 Optionnel

### Démarrer Prisma Studio pour visualiser les données
```sh
npx prisma studio
```