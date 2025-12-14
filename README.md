Jeu - Rayonnage

.Participants :
Abdulrahman AKLOFI

1.Description

Ce projet est une **application web multijoueur** développée avec Node.js, Express, Socket.io et D3.js.  
Il s'agit d'un jeu collaboratif où les joueurs doivent ranger des livres sur des rayonnages à partir d'un tapis roulant.  

Le jeu permet à plusieurs joueurs (jusqu'à 6) de se connecter, discuter via un chat, et placer à tour de rôle des livres sur des étagères virtuelles.

## Fonctionnalités

- Connexion de joueurs avec un pseudo
- Affichage de la liste des joueurs avec leur score
- Chat en temps réel entre les joueurs
- Plateau de jeu graphique utilisant D3.js montrant les rayons et les livres
- Tapis roulant affichant les livres disponibles à placer
- Tour par tour pour placer un livre dans un emplacement libre sur les rayonnages
- Gestion des scores basée sur le nombre de livres placés

## Structure du projet

- `server.js` : serveur Node.js avec Express et Socket.io qui gère la logique du jeu et la communication en temps réel
- `client.html` : interface utilisateur côté navigateur utilisant D3.js pour afficher le jeu et Socket.io pour la communication
- `books.json` : fichier JSON contenant la liste des livres disponibles dans le jeu
- `README.md` : ce fichier d'explication

## Installation et lancement

1. Cloner ou télécharger le projet
2. Installer les dépendances (si besoin)  
   ```bash
   npm install express socket.io
Lancer le serveur

bash
Copier le code
node server.js
Ouvrir un navigateur et aller à l'adresse

arduino
Copier le code
http://localhost:8889
Entrer un nom pour rejoindre la partie et commencer à jouer

