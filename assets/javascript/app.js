//create variables 
var time = 10;
var intervalId;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var userAnswer=[];
var questions = [
    {
        q: "1. What superhero team did Deadpool create in Deadpool 2?",
        c: ["X-Team2", "X-Guys", "X-Force", "X-Factor"],
        a: "X-Force"
    },
    {
        q: "2. Who directed Inception?",
        c: ["Steven Spielberg", "Quentin Tarantino", "Martin Scorsese", "Christopher Nolan"],
        a: "Christopher"
    },
    {
        q: "3. What subject did Professor Snape teach?",
        c: ["Defense Against the Dark Arts", "Charms", "Potions", "History of Magic"],
        a: "Defense"
    },
    {
        q: "4. Who was the main villain in Avengers: Infinity War?",
        c: ["Nebula", "Thanos", "Ronan", "Malekith"],
        a: "Thanos"
    },
    {
        q: "5. Bilbo Baggins makes it to Mordor with the One Ring.",
        c: ["True", "False"],
        a: "False"
    },
    {
        q: '6. Which movie quoted “You can’t handle the truth!”',
        c: ["Terms of Endearment", "Taxi Driver", "Gangs of New York", "A Few Good Men"],
        a: "A"
    },
];

    //function to reveal questions and store in variable
    var listQuestions = function () {
        for (var i = 0; i < questions.length; i++) {
        $("#question" + (i + 1)).html("<p>" + questions[i].q + "</p>");

        //dynamically added radio buttons with appropriate values
            $.each(questions[i].c, function (index, value) {
            var num = i + 1
            $("#choice" + num).append("<input type='radio' name=" + i + " value=" + value + ">" + value);
            });
        }   
    }

$(document).ready(function () {
    //reveal questions and choices and hides start button//
    function start() {
        //start timer
        intervalId = setInterval(decrement, 1000);
        $("#startbutton").remove();
        $("form").show();
        listQuestions();
    }

    //stop function
    function stop() {
        clearInterval(intervalId);
    }
    
    //function to start clock   
    function decrement() {
        time--;
        $("#timeleft").text("Time left: " + time)
        if (time === 0) {
            stop();
            endGame();
        }
    }

    function endGame() {
        $("#timeleft").remove();
        $("form").remove();
        $("#sub").remove();
        $("#correct").text("Correct: " + correct);
        $("#incorrect").text("Incorrect: " + incorrect);
        $("#results").text("Cool! Here is your final score!");
        $("#reset").show();
    }
    //submit button and count scores
    $("#sub").on("click", function(event) {
        event.preventDefault();
        userAnswer=[]; //create array to create conditions for correct choices
        for(var i = 0; i < 6; i++) {
        userAnswer.push($(":checked").eq(i).val());
            if($(":checked").eq(i).val()== questions[i].a) {
                correct++;
            } else if ($(":checked").eq(i).val()!== questions[i].a) {
                incorrect++;
        }
        
 endGame();
    });

    //event function keys//
    $("#startbutton").on("click", start);
    $("#reset").on("click", reset);

});