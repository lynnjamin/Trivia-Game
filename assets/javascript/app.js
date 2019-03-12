//create variables var time = 15;
var intervalId;
var correct = 0;
var incorrect = 0;
var questions = [
    {
        q: "What superhero team did Deadpool create in Deadpool 2?",
        c: ["X-Team2", "X-Guys", "X-Force", "X-Factor"],
        a: 3
    },
    {
        q: "Who directed Inception?",
        c: ["Steven Spielberg", "Quentin Tarantino", "Martin Scorsese", "Christopher Nolan"],
        a: 4
    },
    {
        q: "What subject did Professor Snape teach?",
        c: ["Defense Against the Dark Arts", "Charms", "Potions", "History of Magic"],
        a: 1
    },
    {
        q: "Who was the main villain in Avengers: Infinity War?",
        c: ["Nebula", "Thanos", "Ronan", "Malekith"],
        a: 2
    },
    {
        q: "Bilbo Baggins makes it to Mordor with the One Ring.",
        c: ["True", "False"],
        a: 2
    },
    {
        q: 'Which movie quoted “You can’t handle the truth!”',
        c: ["Terms of Endearment", "Taxi Driver", "Gangs of New York", "A Few Good Men"],
        a: 4
    },
];

//function to reveal questions and store in variable
    var listQuestions = function () {
    for (var i = 0; i < questions.length; i++) {
        $("#question" + (i + 1)).html("<h3>" + questions[i].q + "</h3>");

        $.each(questions[i].c, function (index, value) {
            console.log(value)
            console.log(i)
            var num = i + 1
            console.log("#choice" + num)
            $("#choice" + num).append("<input type='radio' name=" + value + i + " value=" + value + ">" + value); //dynamically add radio buttons 

        });
    }
}


$(document).ready(function () {

//timer function//
    function start() {
        $("#startbutton").remove();
        $("form").show();
        listQuestions()

        intervalId = setInterval(decrement, 1000);
    }

    function stop() {
        clearInterval(intervalId);
    }

    function decrement() {
        time--;
        $("#timeleft").text("Time left: " + time)
        if (time === 0) {
            stop();
        }
    }

    //EVENT FUNCTION//
    $("#startbutton").on("click", start);

});