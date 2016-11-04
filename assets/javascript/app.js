$(document).ready(function() {

    // Start the game
    $("#id-start-button").click(function() {
        renderQuestionAndAnswers();        
    });

    // Handle clicking on one of the answer choices
    $(document).on('click', '.game-choice', renderResult);

    function renderQuestionAndAnswers() {
        $('.div-choice').empty();
        // Render the Question
        $('.div-q').html('<h2>' + gameObj.getQuestion() + '</h2>');
        // Render the answers
        for(var i = 0; i < gameObj.getChoiceLength(); i++) {
            // JQuery <h2>
            var h = $('<h2>');
            h.addClass('game-choice');
            h.attr('choice-index', i); // currently not needed
            // a. answer, b. answer etc.
            h.text(String.fromCharCode('a'.charCodeAt() + i) + '. '+ gameObj.getChoice(i));
            $('.div-choice').append(h);
        }
        // Render the state click button or answer question 
        $('.div-a').html('<h2>Click on the correct answer.</h2>');
    }

    function renderResult() {
        var el = $(this).attr('choice-index');
        console.log(el);

        var correctAnswer = gameObj.getAnswer();
        if ($(this).text().endsWith(correctAnswer))
            $('.div-a').html('<h2>CORRECT: ' + correctAnswer + '</h2>');
        else
            $('.div-a').html('<h2>WRONG CORRECT ANSWER IS ' + correctAnswer + '</h2>');
    }

    // array of objects
    var gameObj = {

        currentQuestion: -1,

        questions: [{
            q: "What is 2 + 2",
            choice: ['6', '5', '4', '3'],
            a: 2
        }, {
            q: "What is 9 * 3",
            choice: ['24', '27', '30', '33'],
            a: 1
        }, {
            q: "What is 8 * 5",
            choice: ['35', '40', '45', '50'],
            a: 1
        }, {
            q: "What is 8 * 3",
            choice: ['18', '21', '24', '27'],
            a: 2
        }],
        getChoiceLength() {
            return this.questions[this.currentQuestion].choice.length;
        },
        getQuestion: function() {
            this.currentQuestion = Math.floor((Math.random() * this.questions.length));
            console.log("getQuestion currentQuestion:" + this.currentQuestion);
            return this.questions[this.currentQuestion].q;
        },
        getChoice: function(n) {
            console.log("getChoice currentQuestion:" + this.currentQuestion);
            return this.questions[this.currentQuestion].choice[n];
        },
        getAnswer: function() {
            console.log("getAnswer currentQuestion:" + this.currentQuestion);
            var a = this.questions[this.currentQuestion].a;
            var cc = this.questions[this.currentQuestion].choice[a];
            return cc;
        }
    };
});