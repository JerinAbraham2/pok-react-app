const Deck = require("./deck.js");

class GameManager {
    constructor(players) {
        this.players = players;
    }

    startGame() {
        // hand each player a card
        const newDeck = new Deck.Deck();
        console.log(newDeck);
    }
}

exports.GameManager = GameManager;