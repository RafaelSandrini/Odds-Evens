/**
 * @author Rafael Sandrini Ferreira, 000870331
 * 
 * date: 2022/02/22
 * 
 * @description This file have the javascript code for the Odds and Evens Game.
 * This is part of the Assignment 4.
 */

/**
 * Here start the code.
 * 
 * This function will load all page before run the code
 * 
 */
window.addEventListener("load",function(){

    

    // ---------- START INTRODUCTION SCREEN
    let initialCount = 0;
    setTimeout (function(){
        let introCount = setInterval(function() {
        console.log("Screen loading count initialCount: "+ initialCount);
        initialCount+=1;
        if (initialCount == 5) {
            clearInterval(introCount);
            document.querySelector(".introduction").style.display="none";
            document.querySelector(".form").style.display="block";
        } else if (initialCount == 1) {
            document.querySelector(".loading10").style.display="none";
            document.querySelector(".loading40").style.display="block";
        } else if (initialCount == 2) {
            document.querySelector(".loading40").style.display="none";
            document.querySelector(".loading70").style.display="block";
        } else if (initialCount == 4) {
            document.querySelector(".loading70").style.display="none";
            document.querySelector(".loading100").style.display="block";
        }
    },1000);
    },1);
    // ----------- END INTRODUCTION SCREEN

    // ----------- START DECLARING SOME VARIABLES TO USE IN MULTIPLE LOCATIONS
    let showScore = document.querySelector(".showScore");
    let oddOrEven = document.querySelector(".oddOrEven");
    let resultCountScreen;
    // ----------- END DECLARING SOME VARIABLES

    // ----------- START FORM SUBMIT
    document.forms.userRegister.addEventListener("submit",function(event){
        event.preventDefault();
        
        let errorInput = false;
        console.log("--------------");

        // ---------- START SCREEN FORM AND VERIFICATION
        let playerInitial = document.forms.userRegister.Player.value;
        let player = firstLetter(playerInitial);
        console.log("Player Name: "+player);
        let specie = document.forms.userRegister.Specie.value;
        console.log("Specie: "+specie);             
        for (let i = 0; i < player.length ; i++) {
            if (player[i] == "" || !isNaN(player[i]) || player.length<4 || player.length>8 || player[i]>=player[i+1]) {
                document.querySelector(".warningMessageName").style.display="block";
                errorInput = true;
            } else {}
        }

        let clearNameMessage;
        clearNameMessage = document.querySelector(".nameField").addEventListener("click",function(){
            document.querySelector(".warningMessageName").style.display="none";
        });
        let clearSpecieMessage;
        clearSpecieMessage = document.querySelector(".specieField").addEventListener("click",function(){
            document.querySelector(".warningMessageSpecie").style.display="none";
        });
        
        
        if (errorInput == true || specie == "Choose") {            
            errorInput = false;
            if (specie == "Choose") {
                document.querySelector(".warningMessageSpecie").style.display="block";
            } else {}
        // ------------- END SCREEN FORM AND VERIFICATION

        // ------------- START SET INITIAL GAMESCREEN
        } else {
            document.querySelector(".form").style.display="none";
            document.querySelector(".info").style.display="block";
            document.querySelector(".gameScreen").style.display="block";
            document.querySelector(".fullScreen").style.display="block";
            document.querySelector(".button-help").style.display="block";
            document.querySelector(".endMessageLoser").style.display="none";
            document.querySelector(".endMessageWinner").style.display="none";
            document.querySelector(".restart").style.display="none";
            document.querySelector("footer").style.display="none";
        }

        let showName = document.querySelector(".showName");
        showName.innerHTML = player;
        let showClass = document.querySelector(".showClass");
        showClass.innerHTML = specie;
        Score();   

        if (specie=="Human") {
            document.querySelector(".button-alien").style.display="none";
            document.querySelector(".button-human").style.display="block";
            document.querySelector(".top-image").src="Images/human/h0r.png";
            document.querySelector(".bottom-image").src="Images/alien/a0.png";
            document.querySelector(".fullScreen").style.backgroundImage="url(Images/earth.png)";
        } else {
            document.querySelector(".button-human").style.display="none";
            document.querySelector(".button-alien").style.display="block";
            document.querySelector(".top-image").src="Images/alien/a0r.png";
            document.querySelector(".bottom-image").src="Images/human/h0.png";
            document.querySelector(".fullScreen").style.backgroundImage="url(Images/mars.png)";
        }
        // ----------- END SET INITIAL GAMESCREEN
    });

    // ------------ START USER CHOICES
    let userOddOrEvenChoice=" ";

    let choiceOdd = document.querySelector(".choiceOdd");
    choiceOdd.addEventListener("click",function(){
        userOddOrEvenChoice = "ODD";
        oddOrEven.innerHTML = userOddOrEvenChoice;
    });

    let choiceEven = document.querySelector(".choiceEven");
    choiceEven.addEventListener("click",function(){
        userOddOrEvenChoice = "EVEN";
        oddOrEven.innerHTML = userOddOrEvenChoice;
    });

    let userNumber = -1;
    let compNumber = -1;

    // DISPLAY HUMAN HAND
    let choice1 = document.querySelector(".Choice1");
    choice1.addEventListener("click",function(){userChoice(1);document.querySelector(".top-image").src="Images/human/h1r.png";});        
    let choice2 = document.querySelector(".Choice2");
    choice2.addEventListener("click",function(){userChoice(2);document.querySelector(".top-image").src="Images/human/h2r.png";});
    let choice3 = document.querySelector(".Choice3");
    choice3.addEventListener("click",function(){userChoice(3);document.querySelector(".top-image").src="Images/human/h3r.png";});        
    let choice4 = document.querySelector(".Choice4");
    choice4.addEventListener("click",function(){userChoice(4);document.querySelector(".top-image").src="Images/human/h4r.png";});
    let choice5 = document.querySelector(".Choice5");
    choice5.addEventListener("click",function(){userChoice(5);document.querySelector(".top-image").src="Images/human/h5r.png";});

    // DISPLAY ALIEN HAND
    let choice01 = document.querySelector(".Choice01");
    choice01.addEventListener("click",function(){userChoice(1);document.querySelector(".top-image").src="Images/alien/a1r.png";});
    let choice02 = document.querySelector(".Choice02");
    choice02.addEventListener("click",function(){userChoice(2);document.querySelector(".top-image").src="Images/alien/a2r.png";});
    let choice03 = document.querySelector(".Choice03");
    choice03.addEventListener("click",function(){userChoice(3);document.querySelector(".top-image").src="Images/alien/a3r.png";});
    

    function userChoice(userChoiceNumber) {
        userNumber=parseInt(userChoiceNumber);
    }

    // ------------- END USER CHOICES


    // ------------- PLAY BUTTON RUN STARTS HERE
    let playButton = document.querySelector(".button-play");
        
    playButton.addEventListener("click",function(){
        // START PLAY BUTTON  - CHECK IF ALL CHOICES ARE SELECTED 
        if (userNumber == -1 || userOddOrEvenChoice==" ") {
            let specie = document.forms.userRegister.Specie.value;
            oddOrEven.innerHTML = "Missing Choice!";
            if (specie=="Human") {
                userNumber = -1;
                userOddOrEvenChoice=" ";
                document.querySelector(".top-image").src="Images/human/h0r.png";
                document.querySelector(".bottom-image").src="Images/alien/a0.png";                    
            } else {
                userNumber = -1;
                userOddOrEvenChoice=" ";
                document.querySelector(".top-image").src="Images/alien/a0r.png";
                document.querySelector(".bottom-image").src="Images/human/h0.png";
            }
            // END PLAY BUTTON  - CHECK IF ALL CHOICES ARE SELECTED
        } else {

            // START COMP CHOICES AND CHECK RESULTS
            let checkResult = "Test";
            let result = 0;
            let specie = document.forms.userRegister.Specie.value;
            if (specie=="Human") {
                compNumber = Math.floor(Math.random()*3)+1;
                result = compNumber + userNumber;
            } else {
                compNumber = Math.floor(Math.random()*5)+1;
                result = compNumber + userNumber;
            }
            console.log("result: "+result);
            if (result % 2 == 0) {
                checkResult = "EVEN";
            } else {
                checkResult = "ODD";
            }
            // END COMP CHOICES AND CHECK RESULTS

            // START DISPLAY RESULTS FOR THE ROUND
                // EACH ROUND WILL RUN ONCE
            setTimeout (function(){
                resultCountScreen = setInterval(function(){toRun();},1000);
            },1);

            let resultCount=0;
            /**
             * @function toRun()
             * 
             * @description contain all elements will display on the screen on each round
             */
            function toRun(){        
                console.log("Screen loading count initialCount2: "+ resultCount);
                resultCount+=1;
                
                if (resultCount == 1) {
                    if (specie == "Human") {
                        let compNumberImage = document.querySelector(".bottom-image");
                        compNumberImage.src="Images/alien/a"+compNumber+".png";
                    } else {
                            let compNumberImage = document.querySelector(".bottom-image");
                            compNumberImage.src="Images/human/h"+compNumber+".png";
                    }
                } else if (resultCount == 2) {
                    oddOrEven.innerHTML = result+" is "+ checkResult;
                } else if (resultCount == 4) {
                    let restartButton;
                    if (checkResult==userOddOrEvenChoice) {                        
                        oddOrEven.innerHTML = "You won!";
                        topCounter += 1;
                        Score();
                        if (topCounter==3) {
                            endScreen();
                            document.querySelector(".endMessageWinner").style.display="block";                       
                            restartButton = document.querySelector(".button-restart").addEventListener("click",function(){
                                ResetGame();
                            });
                        } else {}
                    } else {
                        oddOrEven.innerHTML = "You lost!";
                        bottomCounter += 1;
                        Score();                        
                        if (bottomCounter==3) {
                            endScreen();
                            document.querySelector(".endMessageLoser").style.display="block";                                        
                            restartButton = document.querySelector(".button-restart").addEventListener("click",function(){
                                ResetGame();
                            });
                        } else {}
                    }
                } else if (resultCount == 5) {
                    if (specie=="Human") {
                        userNumber = -1;
                        userOddOrEvenChoice=" ";
                        document.querySelector(".bottom-image").src="Images/alien/a0.png";
                        document.querySelector(".top-image").src="Images/human/h0r.png";
                        clearInterval(resultCountScreen);
                    } else {
                        userNumber = -1;
                        userOddOrEvenChoice=" ";
                        document.querySelector(".top-image").src="Images/alien/a0r.png";
                        document.querySelector(".bottom-image").src="Images/human/h0.png";
                        clearInterval(resultCountScreen);
                    }
                    document.querySelector(".oddOrEven").innerHTML = " ";
                    clearInterval(resultCountScreen);                                             
                } else if (resultCount > 5) {
                    clearInterval(resultCountScreen);
                } else {}
            }
        }   
    });

    // XXXXXXXXXXXXXXXXXXXXXX PLAY BUTTON ENDS HERE

    let helpButton;
    let helpText;
    // XXXXXXXXXXXXXXXXXXXXX CREATING SOME FUNCTIONS HERE
    /**
     * @function helpButton
     * 
     * @description it shows the button for help during the game
     */    
    helpButton = document.querySelector(".button-help").addEventListener("click",function(){
        document.querySelector(".helpText").style.display="block";
        document.querySelector(".gameScreen").style.display="none";
        document.querySelector(".info").style.display="none";
    });

    /**
     * @function helpText
     * 
     * @description it shows the text for help and hide all other elements when help button is activated
     */

    helpText = document.querySelector(".button-close").addEventListener("click",function(){
        document.querySelector(".helpText").style.display="none";
        document.querySelector(".gameScreen").style.display="block";
        document.querySelector(".info").style.display="block";
    });


    /**
     * @function Score() 
     * 
     * @description it shows the current score and is updated each round
     */
    let topCounter = 0;
    let bottomCounter = 0;
    function Score() {
        if (document.forms.userRegister.Specie.value =="Human") {
            showScore.innerHTML = "H: "+topCounter+" A: "+bottomCounter;
        } else {
            showScore.innerHTML = "A: "+topCounter+" H: "+bottomCounter;
        }
    }

    /**
     * @function endScreen
     * 
     * @description it hides elements and shows the restart button at the end of the game
     */
    function endScreen() {
        topCounter = 0;
        bottomCounter = 0;
        document.querySelector(".gameScreen").style.display="none";                            
        document.querySelector(".info").style.display="none";
        document.querySelector(".button-help").style.display="none";
        document.querySelector(".restart").style.display="block";
    }

    /**
     * @function ResetGame()
     * 
     * @description it will clear all variable for default values and shows the form screen again
     */
    function ResetGame() {
        clearInterval(resultCountScreen);
        topCounter = 0;
        bottomCounter = 0;
        userNumber = -1;
        compNumber = -1;
        document.querySelector(".fullScreen").style.display="none";
        document.forms.userRegister.Specie.value ="Choose";
        document.forms.userRegister.Player.value = null;
        document.querySelector(".form").style.display="block";
        document.querySelector("footer").style.display="block";
        
    }
    
    /**
     * @function firstLetter()
     * 
     * @description it will change the first letter to upper case
     */
    
    function firstLetter(name){
        let first = name[0].toUpperCase();
        let rest = name.slice(1);
        return first+rest;            
    }
    
    // XXXXXXXXXXXXXXXXXXXXX END SOME FUNCTIONS
});
