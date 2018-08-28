
//declare and initialize array
var animals = ['DOG','PANDA','ELEPHANT','RHINO','ZEBRA','GIRAFFE','DEER','BEAR'];
var computerChoice = animals[Math.floor(Math.random() * animals.length)];
var myLength = computerChoice.length;
var win = myLength;
var letters = computerChoice.split('');
var attemptsLeft = 10;
var output = "";
var userLetter = "";
var display = [myLength];
var guessedLetters = [];


var setup = function () {
    for (var i = 0; i < myLength; i++) {
        display[i] = "_ ";
        output = output + display[i];
    }
    document.getElementById("guessedLetters").innerHTML ="Guessed Letters:";
    document.getElementById("word").innerHTML = output;
    output = "";
}
document.onkeyup = function (event) {
    var userText = event.key;
    output = "";
    var flag = 0;
    if (!(event.keyCode >= 65 && event.keyCode <= 90) && attemptsLeft > 0) {
        document.getElementById("alertMsg").innerHTML = "Aha! It's not an alphabet...Please try again!!";
    } else {
        if(attemptsLeft > 0 && win > 0){
            document.getElementById("alertMsg").innerHTML = "";
            for (var i = 0; i < myLength; i++) {
                if (userText.toUpperCase() == letters[i]) {
                    display[i] = userText.toUpperCase();
                    win--;
                    flag = 1;
                }
                output = output + display[i] + " ";
            }
            if (flag === 0) {
                guessedLetters.push(userText.toUpperCase());
            }
            document.getElementById("word").innerHTML = output;
            document.getElementById("guessedLetters").innerHTML ="Guessed Letters:" +guessedLetters;
            output = "";
            attemptsLeft--;
        }else{
            if(attemptsLeft < 1){
                document.getElementById("alertMsg").innerHTML = "Can't enter more letters.";
            }else{
                document.getElementById("alertMsg").innerHTML = "You have won!!!Can't enter more letters.";
            }
        }

        if (win === 0) {
            console.log("in win:" +win);
            document.getElementById("attempts").innerHTML = "You Win!!!"
            location.reload();
        }
        else if (attemptsLeft < 1 && win > 0) {
            console.log("not in win:" +win);
            document.getElementById("attempts").innerHTML = "You Lose!!!" + " The correct answer is: "+ computerChoice ;
            location.reload();
        } else {
            document.getElementById("attempts").innerHTML = "You have " + attemptsLeft + " chances left."
        }
    }
}

window.onload = function () {
    setup();
}