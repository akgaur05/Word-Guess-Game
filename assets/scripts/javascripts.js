//Using array

//declare and initialize array
var choices = [];
//to select id from first DIV and display choices according to DIV ID. 
var x = document.getElementsByTagName("DIV")[0];
console.log(x.id);
if (x.id === "languages") {
    choices = ['PYTHON', 'JAVASCRIPT', 'PERL', 'JAVA', 'ANGULARJS', 'PHP', 'BASIC', 'NODEJS', 'RUBY'];
} else if (x.id === "gameOfThrones") {
    choices = ['BOLTON', 'BARATHEON', 'GREYJOY', 'LANNISTER', 'MARTELL', 'STARK', 'TARGARYEN', 'TYRELL'];
} else if (x.id === "football") {
    choices = ["EVERTON", "LIVERPOOL", "SWANSEA", "CHELSEA", "HULL", "MANCHESTER", "NEWCASTLE"];
} else if (x.id === "cities") {
    choices = ['HOUSTON', 'AUSTIN', 'CHICAGO', 'DALLAS', 'MIAMI', 'ATLANTA', 'DENVER', 'SEATTLE'];
} else if (x.id === "animals") {
    choices = ['DOG', 'MONKEY', 'LION', 'RHINO', 'ZEBRA', 'TIGER', 'FOX', 'BEAR'];
} else {
    choices = ['PETS', 'TROY', 'SUPERMAN', 'ALIEN', 'JAWS', 'BOLT', 'SPIDERMAN', 'CONJURING'];
}

//setting rest of the variables based on array chosen
var computerChoice = 0;
var myLength = 0;
var win = 0;
var letters = [];
var attemptsLeft = 0;
var output = "";
var userLetter = "";
var display = [];
var guessedLetters = [];
var correctGuesses = [];
var check = 0;
var losses=0;
var wins=0;

//setup the variables
var setup = function () {
    computerChoice = choices[Math.floor(Math.random() * choices.length)];
    myLength = computerChoice.length;
    win = myLength;
    letters = computerChoice.split('');
    attemptsLeft = 10;
    output = "";
    userLetter = "";
    display = [myLength];
    guessedLetters = [];
    correctGuesses = [];
    check = 0;
    for (var i = 0; i < myLength; i++) {
        display[i] = "_ ";
        output = output + display[i];
    }
    document.getElementById("guessedLetters").innerHTML = "Guessed Letters:";
    document.getElementById("word").innerHTML = output;
    document.getElementById("alertMsg").innerHTML = "";
    document.getElementById("attempts").innerHTML = "You have 10 chances left."
    document.getElementById("wins").innerHTML ="Win: "+wins;
    document.getElementById("losses").innerHTML ="Losses: " +losses;
    output = "";
}

//when user presses the key
document.onkeyup = function (event) {
    var userText = event.key;
    output = "";
    var flag = 0;

    if (!(event.keyCode >= 65 && event.keyCode <= 90) && attemptsLeft > 0) {
        document.getElementById("alertMsg").innerHTML = "Aha! It's not an alphabet...Please try again!!";
    } else {
        if (attemptsLeft > 0 && win > 0) {
            document.getElementById("alertMsg").innerHTML = "";
            for (var i = 0; i < myLength; i++) {
                if (userText.toUpperCase() === letters[i]) {
                    display[i] = userText.toUpperCase();
                    flag = 1;
                    if (!(correctGuesses.includes(userText.toUpperCase()))) {
                        win--;
                    }
                }
                output = output + display[i] + " ";
            }
            //2 & 3 conditions in this will prevent to enter already right and wrong guesses
            if (flag === 0 && !(correctGuesses.includes(userText.toUpperCase())) && !(guessedLetters.includes(userText.toUpperCase()))) {
                guessedLetters.push(userText.toUpperCase());
                attemptsLeft--;
            } else {
                correctGuesses.push(userText.toUpperCase());
            }
            document.getElementById("word").innerHTML = output;
            document.getElementById("guessedLetters").innerHTML = "Guessed Letters:" + guessedLetters;
            output = "";
        } else {
            if (attemptsLeft < 1) {
                document.getElementById("alertMsg").innerHTML = "Can't enter more letters.";
            } else {
                document.getElementById("alertMsg").innerHTML = "You have won!!!Can't enter more letters.";
            }
        }
        if (win === 0) {
            wins++;
            document.getElementById("attempts").innerHTML = "You Win!!Guess Next..."
            document.getElementById("wins").innerHTML ="Win: " +wins;
            // 1 second timer before page setup is called
            setTimeout("setup();", 1000);
        }
        else if (attemptsLeft < 1 && win > 0) {
            losses++;
            document.getElementById("losses").innerHTML ="Losses: " +losses;
            document.getElementById("attempts").innerHTML = "You Lose!!" + " The correct answer is: " + computerChoice + ". Let's try again!!";
            // 1 second timer before page setup is called
            setTimeout("setup();", 1000);
        } else {
            document.getElementById("attempts").innerHTML = "You have " + attemptsLeft + " chances left."
        }
    }
}

window.onload = function () {
    setup();
}

