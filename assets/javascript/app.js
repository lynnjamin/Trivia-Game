//create variables for gloabl 
var time = 20;
var intervalId;
var clockRunning = false;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var userAnswer = [];
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

//display function to call on start function
var listQuestions = function () {
    for (var i = 0; i < questions.length; i++) {
        var num = i + 1;
        $("#choice" + num).empty();
    }
    for (var i = 0; i < questions.length; i++) {
        $("#question" + (i + 1)).html("<p>" + questions[i].q + "</p>");

        //dynamically added radio buttons with appropriate values
        $.each(questions[i].c, function (index, value) {
            var num = i + 1;
            $("#choice" + num).append("<input type='radio' name=" + i + " value=" + value + ">" + value);
        });
    }
}

$(document).ready(function () {
    
    function start() {
        //start timer
        if (!clockRunning) {
            intervalId = setInterval(decrement, 1000);
            clockRunning = true;
        }
        $("#startbutton").hide();
        $("form").show();
        listQuestions();
    }

    //this function is just for stopping the time
    function stop() {
        clearInterval(intervalId);
        clockRunning = false;
    }

    //function to start clock and runs the same as submit button to end and calculate score
    function decrement() {
        time--;
        $("#timeleft").text("Time left: " + time)
        if (time === 0) {
            stop();
            userAnswer = []; //create array to create conditions for correct choices
            for (var i = 0; i < questions.length; i++) {
                userAnswer.push($(":checked").eq(i).val());
                if ($(":checked").eq(i).val() == questions[i].a) {
                    correct++;
                } else if ($(":checked").eq(i).val() == undefined) {
                    unanswered++;
                } else {
                    incorrect++;
                }
            }
            $("#endresults").show();
            endGame();
        }
    }

    //result page shown with scores
    function endGame() {
        stop();
        $("form").hide();
        $("#endresults").show();
        $("#correct").text("Correct: " + correct);
        $("#incorrect").text("Incorrect: " + incorrect);
        $("#unanswered").text("Unanswered questions: " + unanswered);
        $("#results").text("Cool! Here is your final score!");
        $("#reset").show();
    }

    //submit button and count scores, same as function decrement
    $("#sub").on("click", function (event) {
        event.preventDefault();
        userAnswer = []; //create array to create conditions for correct choices
        for (var i = 0; i < questions.length; i++) {
            userAnswer.push($(":checked").eq(i).val());
            if ($(":checked").eq(i).val() == questions[i].a) {
                correct++;
            } else if ($(":checked").eq(i).val() == undefined) {
                unanswered++;
            } else {
                incorrect++;
            }
        }
        $("#endresults").show();
        endGame();
    });

    //reset function, reset all variables back to starting
    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#endresults").hide();
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        time = 20;
        start();
    });

    //event funtion to start game
    $("#startbutton").on("click", start);


});