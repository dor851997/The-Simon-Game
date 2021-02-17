
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function arraysMatch(arr1, arr2) {

	if (arr1.length !== arr2.length) return false;
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;

};

$(document).keypress(function(event) {
    if (!started) {
        setTimeout(() => { nextSequence(); }, 100);
        started = true;
        $("#level-title").text("Level " + level);
        console.log("keyprees");
    }
    
});

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // check answer
    if(userClickedPattern.length == level){
        console.log("start check");
        checkAnswer(userClickedPattern); 
        console.log("end check");        
    }
    if(userClickedPattern.length > gamePattern.length){
        userClickedPattern = [];
    }
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4); //random numer 0-3
    var randomChosenColour = buttonColours[randomNumber];//new random color from buttonColours array
    gamePattern.push(randomChosenColour);//add gamePattern new color

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

    level++;
    $("#level-title").text("Level " + level);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(userChosenColour){
    $( "#" + userChosenColour ).addClass( "pressed" );
    setTimeout(() => { $( "#" + userChosenColour ).removeClass( "pressed" ); }, 100);
}

function checkAnswer(userPattern){
    console.log(userPattern);
    console.log(gamePattern);

    
    if (arraysMatch(userPattern,gamePattern)) {
        console.log("success");
        setTimeout(() => { nextSequence();}, 1000);
        
        
    } else {
        console.log("wrong");
        playSound("wrong");
        $( "body" ).addClass( "game-over" );
        setTimeout(() => { $( "body" ).removeClass( "game-over" ); }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }

    userClickedPattern = [];
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}