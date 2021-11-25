
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started=true;
    }
})

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");

    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);
//2. Call checkAnswer() after a user has clicked and chosen their answer,
// passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
    
});


function nextSequence(){
    userClickedPattern=[];
    level++;
    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);

    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);
    
}

function playSound(name){
   
            var audio=new Audio('sounds\\'+name +'.mp3');
            audio.play();
   
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour){
    //3. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
        
    else{
            console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);

            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }
   
}

function startOver(){
    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level=0;
    gamePattern=[];
    started=false;
}
