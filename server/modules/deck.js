class Deck {
    constructor() {
        this.cards = this.create();
        this.missingCards = [];
    }

    create() {
        const deck = [];
        const suites = ["Diamonds", "Hearts", "Spades", "Clubs"];
        for (let suite of suites) {
            for (let i = 2; i <= 14; i++) {
                deck.push(new Card(i, suite));
            }
        }
        return deck;
    }

    shuffle() {
        for (let i = this.cards.length; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * i);
            this.cards.push(this.cards.splice(randomIndex, 1)[0]);
        }
    }

    draw(amount) {
        const drawnCards = [];
        for (let i = 0; i < amount; i++) {
            drawnCards.push(this.cards.pop());
        }
        this.missingCards.push(...drawnCards);
        return drawnCards;
    }
}

class Card {
    constructor(number, suite) {
        this.number = number;
        this.suite = suite;
    }
}

exports.Card = Card;
exports.Deck = Deck;