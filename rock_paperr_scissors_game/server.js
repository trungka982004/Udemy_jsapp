const express = require('express');
const http = require('http');
const webSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });

let players = [];

wss.on('connection', (ws) => {
    console.log('New player Connected');
    const playId = Date.now();
    players[playId] = { ws, choice: null };

    ws.send(JSON.stringify({ type: 'WAITING', message: 'Waiting for an opponent...' }));

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'CHOICE') {
            players[playId].choice = data.choice;
            checkGameResult();
        }
    });

    ws.on('close', () => {
        console.log('Player Disconnected');
        delete players[playId];
    });
});

function checkGameResult() {
    const playerId = Object.keys(players);
    if (playerId.length === 2) {
        const [p1, p2] = playerId;
        const choice1 = players[p1].choice;
        const choice2 = players[p2].choice;

        if(choice1 && choice2) {
            let result;
            if(choice1 === choice2) result = 'DRAW';
            else if((choice1 === 'rock' && choice2 === 'scissors') ||
                    (choice1 === 'scissors' && choice2 === 'paper') ||
                    (choice1 === 'paper' && choice2 === 'rock')) {
                result = 'PLAYER 1 WINS';
            } else {
                result = 'PLAYER 2 WINS';
            }

            players[p1].ws.send(JSON.stringify({ type: 'RESULT', result }));
            players[p2].ws.send(JSON.stringify({ type: 'RESULT', result }));

            players[p1].choice = null;
            players[p2].choice = null;
        }
    }
}

app.use(express.static('public'));
server.listen(3000, () => console.log('Server is listening on port http://localhost:3000'));