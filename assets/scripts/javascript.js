//Using objects
var wordGuess = {
    choice: [],
    computerChoice: 0,
    myLength: 0,
    win: 0,
    letters: [],
    attemptsLeft: 0,
    output: "",
    userLetter: "",
    display: [],
    guessedLetters: [],
    correctGuesses: [],
    check: 0,
    losses: 0,
    wins: 0,
    docDiv: "",
    //functions
    makeChoice: function () {
        this.docDiv = document.getElementsByTagName("DIV")[0];
        switch (this.docDiv.id) {
            case "languages":
                this.choices = ['PYTHON', 'JAVASCRIPT', 'PERL', 'JAVA', 'ANGULARJS', 'PHP', 'BASIC', 'NODEJS', 'RUBY'];
                break;
            case "gameOfThrones":
                this.choices = ['BOLTON', 'BARATHEON', 'GREYJOY', 'LANNISTER', 'MARTELL', 'STARK', 'TARGARYEN', 'TYRELL'];
                break;
            case "football":
                this.choices = ["EVERTON", "LIVERPOOL", "SWANSEA", "CHELSEA", "HULL", "MANCHESTER", "NEWCASTLE"];
                break;
            case "cities":
                this.choices = ['HOUSTON', 'AUSTIN', 'CHICAGO', 'DALLAS', 'MIAMI', 'ATLANTA', 'DENVER', 'SEATTLE'];
                break;
            case "animals":
                this.choices = ['DOG', 'MONKEY', 'LION', 'RHINO', 'ZEBRA', 'TIGER', 'FOX', 'BEAR'];
                break;
            default:
                this.choices = ['PETS', 'TROY', 'SUPERMAN', 'ALIEN', 'JAWS', 'BOLT', 'SPIDERMAN', 'CONJURING'];
        }
    },

    setup: function () {
        wordGuess.makeChoice();
        this.computerChoice = this.choices[Math.floor(Math.random() * this.choices.length)];
        this.myLength = this.computerChoice.length;
        this.win = this.myLength;
        this.letters = this.computerChoice.split('');
        this.attemptsLeft = 10;
        this.output = "";
        this.userLetter = "";
        this.display = [this.myLength];
        this.guessedLetters = [];
        this.correctGuesses = [];
        this.check = 0;
        for (var i = 0; i < this.myLength; i++) {
            this.display[i] = "_ ";
            this.output = this.output + this.display[i];
        }
        document.getElementById("guessedLetters").innerHTML = "Guessed Letters:";
        document.getElementById("word").innerHTML = this.output;
        document.getElementById("alertMsg").innerHTML = "";
        document.getElementById("attempts").innerHTML = "You have 10 chances left."
        document.getElementById("wins").innerHTML = "Win: " + this.wins;
        document.getElementById("losses").innerHTML = "Losses: " + this.losses;
        this.output = "";
    }

};

//setup my page
function setupPage() {
    wordGuess.setup();
}
//when user presses the key
document.onkeyup = function (event) {
    var userText = event.key;
    wordGuess.output = "";
    var flag = 0;

    if (!(event.keyCode >= 65 && event.keyCode <= 90) && wordGuess.attemptsLeft > 0) {
        document.getElementById("alertMsg").innerHTML = "Aha! It's not an alphabet...Please try again!!";
    } else {
        if (wordGuess.attemptsLeft > 0 && wordGuess.win > 0) {
            document.getElementById("alertMsg").innerHTML = "";
            for (var i = 0; i < wordGuess.myLength; i++) {
                if (userText.toUpperCase() === wordGuess.letters[i]) {
                    wordGuess.display[i] = userText.toUpperCase();
                    flag = 1;
                    if (!(wordGuess.correctGuesses.includes(userText.toUpperCase()))) {
                        wordGuess.win--;
                    }
                }
                wordGuess.output = wordGuess.output + wordGuess.display[i] + " ";
            }
            //2 & 3 conditions in this will prevent to enter already right and wrong guesses
            if (flag === 0 && !(wordGuess.correctGuesses.includes(userText.toUpperCase())) && !(wordGuess.guessedLetters.includes(userText.toUpperCase()))) {
                wordGuess.guessedLetters.push(userText.toUpperCase());
                wordGuess.attemptsLeft--;
            } else {
                wordGuess.correctGuesses.push(userText.toUpperCase());
            }
            document.getElementById("word").innerHTML = wordGuess.output;
            document.getElementById("guessedLetters").innerHTML = "Guessed Letters:" + wordGuess.guessedLetters;
            wordGuess.output = "";
        } else {
            if (wordGuess.attemptsLeft < 1) {
                document.getElementById("alertMsg").innerHTML = "Can't enter more letters.";
            } else {
                document.getElementById("alertMsg").innerHTML = "You have won!!!Can't enter more letters.";
            }
        }
        if (wordGuess.win === 0) {
            wordGuess.wins++;
            document.getElementById("attempts").innerHTML = "You Win!!Guess Next..."
            document.getElementById("wins").innerHTML = "Win: " + wordGuess.wins;
            //takes less than 0.5 second timer before page setup is called
            setTimeout("wordGuess.setup();", 200);
        }
        else if (wordGuess.attemptsLeft < 1 && wordGuess.win > 0) {
            wordGuess.losses++;
            document.getElementById("losses").innerHTML = "Losses: " + wordGuess.losses;
            document.getElementById("attempts").innerHTML = "You Lose!!" + " The correct answer is: " + wordGuess.computerChoice + ". Let's try again!!";
            //takes less than 0.5 second timer before page setup is called.Increased time so that user could see correct answer
            setTimeout("wordGuess.setup();", 300);
        } else {
            document.getElementById("attempts").innerHTML = "You have " + wordGuess.attemptsLeft + " chances left."
        }
    }
}

window.onload = function () {
    setupPage();
}