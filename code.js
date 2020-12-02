$(document).ready(function () {
    $("#begin").click(enterWord);
    $("#enter").click(determineGuess);

    //Prevent premature guessing
    $(".GuessWord").hide();
    //declaration of variables
    var words = ["becoming", "canvas", "total", "register", "keyboard", "coffee", "Chocolate", "pencil", "computer",
        "bowl", "wilderness", "cowboy"];
    var losecount = 0;
    var rndNum = Math.floor(Math.random() * 12 + 1)-1;
    var word = words[rndNum];
    var wordContainer = [];
    var progressContainer = [];
    var lettersGuessed = [];
    var letterString = "";
    var guessString = "";
    //function adds the word that has been entered for guessing
    function enterWord(){
        $("#begin").hide();
        $(".GuessWord").show();
        event.preventDefault();
        // 2 arrays are made with the same length, one filled with the characters of the word and 1 with the
        //same number of characters but "_" is placed for each character instead so that they can
        //be replaced and compared.  It is also used to show the user the progress of their guessing
        for(var x = 0; x < word.length; x++){
            wordContainer.push(word.slice(x, x+1));
            progressContainer.push("_");
        }

        for(var x = 0; x < progressContainer.length; x++){
            guessString = guessString + " " + progressContainer[x];
        }
        $("#hangman").text(guessString);
        //hides first set of inputs to prevent entering 2 separate inputs

    }

    //function runs logic for the game
    function determineGuess(){
        event.preventDefault();
        var guess = $("#guess").val().toLowerCase();
        var count = 0;
        /* test3 checks to see if guess is in the wordContainer(the word that is being guessed) array */
        var test3 = false;
        for(var x = 0; x < word.length; x++){
            if(guess === wordContainer[x]){
                progressContainer[x] = guess;
                count++;
                test3 = true;

            }
        }
        //resetting values
        guessString = "";
        letterString = "";
        var strikes = "";
        var test = false;

        //checking to see if guess has already been guessed
        for(var x = 0; x < lettersGuessed.length; x++){
            if(guess == lettersGuessed[x]){
                test = true;
            }


        }
        // making sure that if a guess is not part of the word then a strike is added-
        //but the player will not be penalized for guessing the same letters more than once or-
        //for guessing something that is more than 1 character in length
        if(test == false && test3 == false && guess.length < 2 && word != guess){
            losecount++;
            for(var y = 0; y < losecount; y++){
                strikes = strikes + "X ";
            }
            $("#strikes").text(strikes);
        }
        //checking where if guess is more than 1 character or has been guessed more than once, then it is invalid
        if((test == false && guess.length < 2) || word == guess){
            lettersGuessed.push(guess);
            $("#error").text("");
        }
        else{
            $("#error").text("Invalid Guess!");
        }


        //stores and outputs the letters that have been guessed
            for(var x = 0; x < lettersGuessed.length; x++){
                letterString = letterString + " " + lettersGuessed[x];
            }
            $("#guessedLetters").text(letterString);

        //adds the values of the array to a string that will be outputed to show the
        //user what their progress is on guessing the word
        for(var x = 0; x < progressContainer.length; x++){
            guessString = guessString + " " + progressContainer[x];
        }
        //Test 2 is used to determine if any values are different between the 2 arrays
        var test2= true;
        $("#hangman").text(guessString);
        for (x = 0; x < progressContainer.length; x++){
            if(wordContainer[x] != progressContainer[x]){
                test2 = false;
            }
        }

        //testing to see if the game has reached an outcome
        //6  because the hangman body has 1 head, 1 torso, 2 arms and 2 legs

        //Also hides guessing inputs to prevent false progression
        if (losecount == 6){
            $("#result").text("You Lose!");
            $(".GuessWord").hide();
        }
        else if(test2 == true || word == guess){
            $("#result").text("You Win!");
            $(".GuessWord").hide();
        }



    }
})