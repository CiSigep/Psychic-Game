
// Variable declaration

// Game object, will contain the game logic
var game;

// Contains a bank of letters
var letterBank = {
    letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
               "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    
    // Retrieves a random letter from the bank
    random: function() {
        return this.letters[Math.floor(Math.random() * this.letters.length)];
    },

    // Checks if query is a letter
    checkIsLetter: function(query) {
        return this.letters.indexOf(query) !== -1;
    } 
}

window.onload = function () {
    game = {
        // Variables
        letter: letterBank.random(),
        wins: 0,
        losses: 0,
        remainingGuesses: 9,
        used: [],
        
        // Document elements we will be updating
        winsElement: document.querySelector("#wins"),
        lossesElement: document.querySelector("#losses"),
        remainingElement: document.querySelector("#remaining"),
        usedElement: document.querySelector("#used"),

        // Functions
        // Render game values to the screen
        render: function() {
            this.winsElement.textContent = this.wins;
            this.lossesElement.textContent = this.losses;
            this.remainingElement.textContent= this.remainingGuesses;
            
            this.usedElement.textContent = this.used.length === 0 ? "" : this.usedElement.textContent + this.used[this.used.length - 1] + " ";
        },

        // Takes input from keyboard
        takeInput: function(input){
            // Ignore non-letter input or already used input
            if(!letterBank.checkIsLetter(input) || this.checkWasUsed(input))
                return;

            this.remainingGuesses--;
            this.used.push(input);

            if(input === this.letter){
                this.wins++;
                this.reset();
            }
            else if(input !== this.letter && this.remainingGuesses === 0){
                this.losses++;
                this.reset();
            }

            this.render();
        },

        // Test if we already used the letter
        checkWasUsed: function(query) {
            return this.used.indexOf(query) !== -1;
        },

        // Resets the game
        reset: function () {
            this.letter = letterBank.random();
            this.remainingGuesses = 9;
            this.used = [];
        }

    }

    document.onkeyup = function(event) {
        game.takeInput(event.key.toLowerCase());
    };

    game.render();
};


