const Deck = require("./deck.js");

class GameManager {
    constructor(players) {
        this.players = players;
        const deck = new Deck.Deck();
        deck.shuffle();
        this.deck = deck;
    }

    giveStartingCards() {
        for (let player of this.players) {
            player.hand = this.deck.draw(2);
        }
    }

    startGame() {
        console.log(this.deck)
    }
}

exports.GameManager = GameManager;
