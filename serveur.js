/*const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname));

const shelvesCount = 3;
const shelfSize = 8;

let joueurs = [];
let conveyor = [
  { id: 0, titre: "La vie devant soi", auteur: "Emile Ajar" },
  { id: 1, titre: "Antigone", auteur: "Jean Anouilh" },
  { id: 2, titre: "Fondation", auteur: "Isaac Asimov" },
  // ... ajouter plus de livres ici si besoin
];

// Les étagères, tableau 2D : shelves[shelfIndex][position] = livre ou null
let shelves = [];
for(let i=0; i<shelvesCount; i++){
  shelves[i] = new Array(shelfSize).fill(null);
}

io.on("connection", (socket) => {
  console.log("Client connecté:", socket.id);

  socket.on("entrerPartie", (nomJoueur) => {
    if(joueurs.length >= 6){
      socket.emit("refusEntree", "Partie pleine");
      return;
    }
    const numero = joueurs.length + 1;
    const joueur = { idSocket: socket.id, nom: nomJoueur, numero, score: 0 };
    joueurs.push(joueur);
    socket.emit("entreeOK", joueur);
    io.emit("maJoueurs", joueurs);
    // Envoyer l'état initial
    socket.emit("state", { joueurs, conveyor, shelves, currentTurn: 0, gameStarted: true });
 
    
   */

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
const path = require('path');

app.use(express.static(__dirname));

const shelvesCount = 3;
const shelfSize = 8;

let joueurs = [];
let conveyor = [];

const booksFilePath = path.join(__dirname, 'books.json');

try {
  const data = fs.readFileSync(booksFilePath, 'utf8');
  conveyor = JSON.parse(data);
  console.log("Livres chargés ", conveyor.length);
} catch (err) {
  console.error("Erreur ", err);
  conveyor = [];
}

let shelves = [];
for(let i=0; i<shelvesCount; i++){
  shelves[i] = new Array(shelfSize).fill(null);
}

io.on("connection", (socket) => {
  console.log("Client connecté:", socket.id);

  socket.on("entrerPartie", (nomJoueur) => {
    if(joueurs.length >= 6){
      socket.emit("refusEntree", "Partie pleine");
      return;
    }
    const numero = joueurs.length + 1;
    const joueur = { idSocket: socket.id, nom: nomJoueur, numero, score: 0 };
    joueurs.push(joueur);
    socket.emit("entreeOK", joueur);
    io.emit("maJoueurs", joueurs);
    // Envoyer l'état initial
    socket.emit("state", { joueurs, conveyor, shelves, currentTurn: 0, gameStarted: true });
  });

  socket.on("sortiePartie", () => {
    sortirJoueur(socket.id);
  });

  socket.on("disconnect", () => {
    sortirJoueur(socket.id);
  });

  socket.on("placerLivre", ({ shelfIdx, posIdx }) => {
    if(conveyor.length === 0){
      socket.emit("errorMsg", "Plus de livres sur le tapis");
      return;
    }
    if(shelves[shelfIdx][posIdx] !== null){
      socket.emit("errorMsg", "Place occupée");
      return;
    }
    const livre = conveyor.shift();
    shelves[shelfIdx][posIdx] = livre;

    const joueur = joueurs.find(j => j.idSocket === socket.id);
    if(joueur){
      joueur.score = (joueur.score || 0) + 1;
    }

    let currentTurn = joueurs.findIndex(j => j.idSocket === socket.id);
    currentTurn = (currentTurn + 1) % joueurs.length;

    io.emit("state", { joueurs, conveyor, shelves, currentTurn, gameStarted: true });
  });

  socket.on("message", (msg) => {
    const joueur = joueurs.find(j => j.idSocket === socket.id);
    if(joueur){
      io.emit("message", `${joueur.nom} : ${msg}`);
    }
  });
});

function sortirJoueur(idSocket){
  const index = joueurs.findIndex(j => j.idSocket === idSocket);
  if(index !== -1){
    joueurs.splice(index,1);
    joueurs = joueurs.map((j,i) => ({ ...j, numero: i+1 }));
    io.emit("maJoueurs", joueurs);
  }
}

server.listen(8889, () => {
  console.log("Serveur lancé sur http://localhost:8889");
});



