function ageInDays(){
    var birthYear= prompt("What year you were born?");
    var days= (2019-birthYear)*365;
    var h1= document.createElement("h1");
    var textAnswer= document.createTextNode("you are"+ days + "days old");
    h1.setAttribute("id", "ageInDays");
    h1.appendChild(textAnswer);
    document.getElementById("howManyDays").appendChild(h1);
}

function reset(){
    document.getElementById("ageInDays").remove();
}

//Challenge 2 Cat Generator

function catGenerator(){
    var image= document.createElement("img");
    var div= document.getElementById("flex-cat-gen");
    image.src= "https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif" ;
    div.appendChild(image);
}

//Challenge 3 RPS Game :)

function rpsGame(yourChoice){
    
    var botChoice= selection(randNum());
    var humanChoice, botchoice, resultMessage;
    humanChoice=yourChoice.id;
    alert(botChoice);
    resultMessage = theWinner(humanChoice, botChoice);
    console.log(resultMessage);
    rpsFrontEnd(humanChoice, botChoice, resultMessage);
}

function randNum(){
    return Math.floor(Math.random()*3);
}
function selection(number){
    return ["rock","paper","scissors"][number];
}
function theWinner(humanChoice, botChoice){
    
    if(humanChoice=="rock"){
        if(botChoice=="rock"){ return "Drawn";}
            if(botChoice=="paper"){ return "Lost";}
            else {return "Won";}
        }
        else if(humanChoice=="paper"){
            if(botChoice=="rock") return "Won";
            if(botChoice=="paper") return "Drawn";
            else return "Lost";
        }

        else if(humanChoice=="scissors"){
            if(botChoice=="rock") return "Lost";
            if(botChoice=="paper") return "Won";
            else return "Drawn";
        }        
}

function rpsFrontEnd(humanImageChoice, botImageChoice, message){
    var imageDatabase={
        "rock": document.getElementById("rock").src,
        "paper": document.getElementById("paper").src,
        "scissors": document.getElementById("scissors").src
    }
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var hImage = document.createElement("div");
    var rMessage = document.createElement("div");
    var bImage = document.createElement("div");

    hImage.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "'height=150 width=150 style= 'box-shadow= 0px 10px 50px rgba(37, 50, 233, 1);''>"
    rMessage.innerHTML = "<h1 style= 'font-size: 20px ; padding: 30px;' '>" + message + "</h1>"
    bImage.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "'height=150 width=150 style= 'box-shadow= 0px 10px 50px rgba(243, 38, 24, 1);''>"

    document.getElementById("flex-box-container-3").appendChild(hImage);
    document.getElementById("flex-box-container-3").appendChild(rMessage);
    document.getElementById("flex-box-container-3").appendChild(bImage);
}

//Challenge 4: Colored Buttons

var allButtons= document.getElementsByTagName("button");

var copyAllButtons = [];

for(let i=0; i<allButtons.length; i++){
    copyAllButtons.push(allButtons[i].classList[1]);
}
//console.log(copyAllButtons);

function buttonColorChange(buttonThingy){
    if(buttonThingy.value==="random"){
        randomColors();
    }
    if(buttonThingy.value==="red"){
        buttonsRed();
    }
    if(buttonThingy.value==="green"){
        buttonsGreen();
    }
    if(buttonThingy.value==="reset"){
        resetButtons();
    }
}

function randomColors(){
    let choices=["btn-danger","btn-success","btn-primary","btn-warning"]
    for(let i=0; i<allButtons.length; i++){
        let randomNumber = Math.floor(Math.random()*4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumber]);
        /*switch(randomNumber){
            case 0:
                allButtons[i].classList.add("btn-danger");
                break;
            case 1:
                allButtons[i].classList.add("btn-success");
                break;
            case 2:
                allButtons[i].classList.add("btn-primary");
                break;
            case 3:
                allButtons[i].classList.add("btn-warning");
                break;
            default:
                break;
        }*/
    } 
}

function buttonsRed(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-danger");
    }
}

function buttonsGreen(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-success");
    }
}

function resetButtons(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}

//Challenge 5: BlackJack

let blackjackGame={
    "you": {"id": "#your-blackjack-result", "div": "#your-box" , "score":0},
    "dealer": {"id": "#dealers-blackjack-result", "div": "#dealers-box" , "score":0},
    "cards": ["2","3","4","5","6","7","8","9","10","J","Q","K","A"],
    "points": {"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"J":10,"Q":10,"K":10,"A":11}, 
    "wins":0,
    "losses":0,
    "draws":0,
    "isStand":false,
    "turnsOver":false,
}

const YOU = blackjackGame["you"]
const DEALER = blackjackGame["dealer"]
const CARDS = blackjackGame.cards

const hitSound= new Audio("sounds/fire_bow_sound-mike-koenig.mp3");
const winSound= new Audio("sounds/cheering.wav");
const loseSound= new Audio("sounds/laugh.wav");
const drawSound= new Audio("sounds/sigh.wav");
document.querySelector("#hit-button").addEventListener("click", hitButton);
document.querySelector("#stand-button").addEventListener("click", dealer);
document.querySelector("#deal-button").addEventListener("click", dealButton);


function hitButton(){
    if(blackjackGame["isStand"]===false){
        var whichCard= randomCardPick();
        showCard(YOU,whichCard);
        updateScore(YOU,whichCard);
        showScore(YOU);
    }
}

function randomCardPick(){
    let cardsIndex= Math.floor(Math.random()*13);
    return CARDS[cardsIndex];
}

function showCard(player,chosenCard){
    
    if(player["score"]<=21){
        var image=document.createElement("img");
        image.src=`cardsFolder/${chosenCard}.png`;
        document.querySelector(player["div"]).appendChild(image);
        hitSound.play();
    }
}

function updateScore(player, chosenCard){
    if(chosenCard==="A"){
        if((player["score"] +blackjackGame.points[chosenCard])<=21){
            player["score"]+=11;
        }else{
            player["score"]++;
        }
    }else{
        player["score"] += blackjackGame.points[chosenCard];
    }
}

function showScore(player){
    if(player["score"]<=21){
        document.querySelector(player["id"]).textContent = player["score"];
    }
    else{
        document.querySelector(player["id"]).textContent = "BUST!";
        document.querySelector(player["id"]).style.color = "red";
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

function dealButton(player){
    if(blackjackGame["turnsOver"]===true){
        let yourImages = document.querySelector("#your-box").querySelectorAll("img");
        let dealersImages = document.querySelector("#dealers-box").querySelectorAll("img");

        for(let i=0; i<yourImages.length; i++){
            yourImages[i].remove();
        }

        for(let i=0; i<dealersImages.length; i++){
            dealersImages[i].remove();
        }

        YOU["score"]=0;
        DEALER["score"]=0;

        document.querySelector("#your-blackjack-result").textContent="0";
        document.querySelector("#your-blackjack-result").style.color = "white";
        document.querySelector("#dealers-blackjack-result").textContent="0";
        document.querySelector("#dealers-blackjack-result").style.color = "white"; 
        document.querySelector("#blackjack-result").textContent="Let's play!";
        blackjackGame["isStand"]=false;  
        blackjackGame["turnsOver"]=false;  
    
    }blackjackGame["isStand"]=false;  
    blackjackGame["turnsOver"]=false; 
}

async function dealer(){
    if(blackjackGame["turnsOver"]===false && YOU["score"]>=2){
        blackjackGame["isStand"]=true;
            while(DEALER["score"]<=15){
                var dealersCard=randomCardPick();
                showCard(DEALER,dealersCard);
                updateScore(DEALER, dealersCard);
                showScore(DEALER);
                await sleep(1000);
            }blackjackGame["turnsOver"]=true;
            if(DEALER["score"]>15){
                let winning=computeWinner();
                showResult(winning);
                if(winning===YOU){
                    winSound.play();
                }else if(winning===DEALER) loseSound.play();
                else drawSound.play();
            }
    }
}

function computeWinner(){
    let winner;
    if(YOU["score"]<=21 && DEALER["score"]<=21){
        if(YOU["score"]==DEALER["score"]){
            blackjackGame["draws"]++;
        }else if(YOU["score"]>DEALER["score"]){
            blackjackGame["wins"]++;
            winner=YOU;
        }else{
            blackjackGame["losses"]++;
            winner=DEALER;
        }
    }else if(YOU["score"]<=21 && DEALER["score"]>21){
        blackjackGame["wins"]++;
        winner=YOU;
    }else if(YOU["score"]>21 && DEALER["score"]<=21){
        blackjackGame["losses"]++;
        winner=DEALER;
    }else if(YOU["score"]>21 && DEALER["score"]>21){
        blackjackGame["draws"]++;
    }
    return winner;
}

function showResult(winner){

    let message, color;

    if (winner===YOU){
        document.querySelector("#wins").textContent=blackjackGame["wins"];
        message="You Won!";
        color="green";
    }else if(winner===DEALER){
        document.querySelector("#losses").textContent=blackjackGame["losses"];
        message="You Lost!";
        color="red";
    }else{
        document.querySelector("#draws").textContent=blackjackGame["draws"];
        message="You Drew!";
        color="yellow";
    }
    document.querySelector("#blackjack-result").textContent=message;
    document.querySelector("#blackjack-result").style.color=color;
}

















