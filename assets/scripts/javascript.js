
//declare and initialize array
var choices =[]; 
//to select id from first DIV and display choices according to DIV ID. 
var x= document.getElementsByTagName("DIV")[0];
console.log(x.id);
if(x.id === "languages"){
    choices=['PYTHON', 'JAVASCRIPT', 'PERL', 'JAVA', 'ANGULARJS', 'PHP', 'BASIC', 'NODEJS', 'RUBY'];
}else if(x.id === "gameOfThrones"){
    choices= ['BOLTON','BARATHEON','GREYJOY','LANNISTER','MARTELL','STARK','TARGARYEN','TYRELL'];
}else if(x.id === "football"){
    choices= ["EVERTON", "LIVERPOOL", "SWANSEA", "CHELSEA", "HULL", "MANCHESTER", "NEWCASTLE"];
}else if(x.id === "cities"){
    choices=['HOUSTON','AUSTIN','CHICAGO','DALLAS','MIAMI','ATLANTA','DENVER','SEATTLE'];
}else if(x.id === "animals"){
    choices=['DOG','PANDA','ELEPHANT','RHINO','ZEBRA','GIRAFFE','DEER','BEAR'];
}else{
    choices=['AVATAR','TITANIC','SUPERMAN','ALIEN','JAWS','JUMANJI','SPIDERMAN','CONJURING'];
}

//setting rest of the variables based on array chosen
var computerChoice = choices[Math.floor(Math.random() * choices.length)];
var myLength = computerChoice.length;
var win = myLength;
var letters = computerChoice.split('');
var attemptsLeft = 10;
var output = "";
var userLetter = "";
var display = [myLength];
var guessedLetters = [];


//setup the variables
var setup = function () {
    for (var i = 0; i < myLength; i++) {
        display[i] = "_ ";
        output = output + display[i];
    }
    document.getElementById("guessedLetters").innerHTML ="Guessed Letters:";
    document.getElementById("word").innerHTML = output;
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
            if(attemptsLeft < 1 ){
                document.getElementById("alertMsg").innerHTML = "Can't enter more letters.";
            }else{
                document.getElementById("alertMsg").innerHTML = "You have won!!!Can't enter more letters.";
            }
        }
        if (win === 0) {
            document.getElementById("attempts").innerHTML = "You Win!!Guess Next..."
             // 3 seconds timer before page refreshes
            setTimeout("location.reload(true);", 2000);
            // location.reload();
        } 
        else if (attemptsLeft < 1 && win > 0) {
            console.log("not in win:" +win);
            document.getElementById("attempts").innerHTML = "You Lose!!" + " The correct answer is: "+ computerChoice + ". Let's try again!!" ;   
            // 3 seconds timer before page refreshes
            setTimeout("location.reload(true);", 2000);
            // location.reload();
        } else {
            document.getElementById("attempts").innerHTML = "You have " + attemptsLeft + " chances left."
        }
    }
}

window.onload = function () {
    setup();
}