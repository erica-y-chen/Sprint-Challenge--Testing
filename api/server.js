const express = require('express');

const games = require('../games/games.js');

const server = express();

server.use(express.json());


server.get('/', async(req, res) => {

    res.status(200).json({ message: 'recieved data' })
})

server.get('/', async (req, res) => {
    const allgames = await games;
  
    res.status(200).json(allgames);
  });

server.post('/games', async(req, res) => {
    const game = req.body;
        if(game.title && game.genre) {
            try {
                const newGame = await games.add(game);
                res.status(201).json(newGame);
            } catch (error) {
                res.status(500).json({message: 'error adding game'})
            }} else {
                res.status(422).json({message: 'incomplete information to fulfill request'})
        }
})

module.exports = server;
