/* Define Card object and deck of cards */
class Card {
    constructor(suit, value) {
      this.suit = suit;
      this.value = value;
    }
    
    toString() {
      const valueNames = {
        14: 'Ace',
        11: 'Jack',
        12: 'Queen',
        13: 'King'
      };
      
      const valueDisplay = valueNames[this.value] || this.value;
      return `${valueDisplay} of ${this.suit}`;
    }
    
    getHTML() {
      const suitSymbols = {
        'Hearts': '♥',
        'Diamonds': '♦',
        'Clubs': '♣',
        'Spades': '♠'
      };
      
      const valueNames = {
        14: 'A',
        11: 'J',
        12: 'Q',
        13: 'K'
      };
      
      const suitSymbol = suitSymbols[this.suit];
      const valueDisplay = valueNames[this.value] || this.value;
      const isRed = this.suit === 'Hearts' || this.suit === 'Diamonds';
      const colorClass = isRed ? 'red' : 'black';
      
      return `
        <div class="card ${colorClass}">
          <div class="card-corner top-left">
            <div class="card-rank">${valueDisplay}</div>
            <div class="card-suit">${suitSymbol}</div>
          </div>
          <div class="card-center">${suitSymbol}</div>
          <div class="card-corner bottom-right">
            <div class="card-rank">${valueDisplay}</div>
            <div class="card-suit">${suitSymbol}</div>
          </div>
        </div>
      `;
    }
  }
    
  class Deck {
    constructor() {
      this.cards = [];
      this.reset();
    }
    
    reset() {
      this.cards = [];
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      
      for (let suit of suits) {
        // Generate cards 2-10
        for (let value = 2; value <= 10; value++) {
          this.cards.push(new Card(suit, value));
        }
        
        // Add face cards and Ace
        this.cards.push(new Card(suit, 11)); // Jack
        this.cards.push(new Card(suit, 12)); // Queen
        this.cards.push(new Card(suit, 13)); // King
        this.cards.push(new Card(suit, 14)); // Ace
      }
    }
    
    shuffle() {
      // fisher-yates shuffle algorithm
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
      return this;
    }
    
    deal(numCards) {
      if (this.cards.length < numCards) {
        this.reset();
        this.shuffle();
      }
      return this.cards.splice(0, numCards);
    }
  }
  
  // Create a deck instance
  const deck = new Deck().shuffle();
  
  function dealHand() {
    // Get 5 random cards
    const hand = deck.deal(5);
    
    // Generate HTML for the cards
    let handHTML = '';
    hand.forEach(card => {
      handHTML += card.getHTML();
    });
    
    // Generate information about the cards
    let infoHTML = '<div class="card-info"><h2>Hand Information</h2><ul>';
    
    // Display each card's details
    hand.forEach(card => {
      infoHTML += `<li>${card.toString()}</li>`;
    });
    
    // Calculate and display additional statistics
    const totalValue = hand.reduce((sum, card) => sum + card.value, 0);
    const highCard = hand.reduce((highest, card) => card.value > highest.value ? card : highest, hand[0]);
    
    infoHTML += `</ul>
      <p><strong>Total Value:</strong> ${totalValue}</p>
      <p><strong>High Card:</strong> ${highCard.toString()}</p>
    </div>`;
    
    // Display the cards and information
    document.getElementById("card_hand").innerHTML = handHTML + infoHTML;
    
    return false; // prevent page reload
  }
  
  // Make dealHand available globally
  window.dealHand = dealHand;
  