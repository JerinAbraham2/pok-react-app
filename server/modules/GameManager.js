const Deck = require("./deck.js");

class GameManager {
    constructor(players) {
        this.players = players;
        this.deck = new Deck.Deck();
    }

    giveStartingCards() {
        for (let player of this.players) {
            player.hand = this.deck.draw(2);
        }
    }



    startGame() {}
}

exports.GameManager = GameManager;
