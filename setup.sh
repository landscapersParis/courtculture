#!/bin/bash

echo "🚀 Setup démarré pour CourtCulture"

# Backend install
echo "➡️ Installation des dépendances backend..."
cd backend || exit
npm install

echo "➡️ Configuration du fichier .env backend"
if [ ! -f .env ]; then
  cp .env.example .env
  echo "MONGO_URI=mongodb://localhost:27017/courtculture" >> .env
  echo "STRIPE_SECRET_KEY=sk_test_XXXX" >> .env
  echo "PRINTFUL_API_KEY=YOUR_PRINTFUL_API_KEY" >> .env
  echo ".env backend créé avec des placeholders"
else
  echo ".env backend existe déjà, pas modifié"
fi

cd ..

# Frontend install
echo "➡️ Installation des dépendances frontend..."
cd frontend || exit
npm install

echo "➡️ Création du fichier .env.local frontend"
if [ ! -f .env.local ]; then
  echo "NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_XXXX" > .env.local
  echo ".env.local frontend créé avec placeholder"
else
  echo ".env.local frontend existe déjà, pas modifié"
fi

cd ..

echo "✅ Installation terminée !"

echo "Prochaines étapes :"
echo "1. Remplis les clés API dans backend/.env et frontend/.env.local"
echo "2. Lancer le backend : cd backend && npm run start"
echo "3. Lancer le frontend : cd frontend && npm run dev"
echo "4. Ouvrir http://localhost:3000 dans ton navigateur"

echo "Bonne chance avec CourtCulture ! 🏀"
