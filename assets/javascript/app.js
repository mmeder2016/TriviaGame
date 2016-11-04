$(document).ready(function() {

    // 0.) MY FIRST CLOSURE - An attempt to remove variables from the global 
    // namespace. Shamelessly cut, pasted, and modified from MDN.
    var gameStats = (
        function() {
            var wins = 0;
            var losses = 0;
            return {
                win: function() {
                    wins++;
                },
                getWins: function() {
                    return wins;
                },
                lose: function() {
                    losses++;
                },
                getLosses: function() {
                    return losses;
                }
            };   
        }
    )();

    // 1.) TIMER CODE 
    // The time allowed in seconds to answer the question. This value is
    // designed to never change
    var allowedTime = 10;
    // temp variable to hold the decrementing count of seconds left to answer
    // the question
    var secondsRemaining = allowedTime; 
    // variable to hold the interval timer
    //   cleared in renderQuestionAndAnswers()
    //   cleared in renderGuessResult()
    var intervalAllowedTime; 

    // When each question is either answered or times out, this function is
    // called to delay and then initiate the next question
    function delayBeforeNextQuestion()
    {
        setTimeout(renderQuestionAndAnswers, 3000);
        $('.game-status').text('Wins: ' + gameStats.getWins() + ' Losses: ' + gameStats.getLosses());
        // turn off click events to the answer choices. If you don't do this,
        // rapidly clicking on answers during this delay runs up the score 
        $('.game-choice').click(false);
    }
    // startCountdown and countdownTimer manage the game functionality
    // of what to do if the time to answer the question runs out 
    function startCountdown() {
        secondsRemaining = allowedTime;
        intervalAllowedTime = setInterval(countdownTimer, 1000);
    }
    function countdownTimer() {
        if(secondsRemaining <= 0) {
            outOfTime();
        } else {

            $('.game-status').text( secondsRemaining.toString() + ' seconds left.');
        }
        secondsRemaining--;      
    }
    // After no attempt to answer question, we will display the result and 
    // wait a few seconds before displaying the next question
    //var intervalAfterTimeout; 
    function outOfTime() {
        clearInterval(intervalAllowedTime);        
        $('.game-status').text('Time ran out!');
        // Wait 3 seconds to display next question
        delayBeforeNextQuestion();
        gameStats.lose();
    }

    // 2.) EVENT HANDLERS
    // Start the game
    $("#id-start-button").click(function() {
        renderQuestionAndAnswers();        
    });

    // Handle clicking on one of the answer choices
    $(document).on('click', '.game-choice', renderGuessResult);

    // 3.) FUNCTIONS FOR EVENT HANDLERS
    function renderQuestionAndAnswers() {
        // clear the timer for allowed time
        clearInterval(intervalAllowedTime);
        // Clear the Question and Answers area
        $('.div-choice').empty();
        // Render the Question
        $('.div-q').html('<h2>' + gameObj.setNewQuestion() + '</h2>');
        // Render the answers
        for(var i = 0; i < gameObj.getNumberOfChoices(); i++) {
            // JQuery <h2>
            var h = $('<h2>');
            h.addClass('game-choice');
            // we can get the index of the answer from the game object and it
            // should correspond to the choice-index of this elemnent.
            // Currently, it appears easier to compare the result of 
            // gameObj.getAnswer() to the text in the <h2> element we are
            // creating here
            h.attr('choice-index', i); // currently not needed
            // a. answer, b. answer etc.
            h.text(String.fromCharCode('a'.charCodeAt() + i) + '. '+ gameObj.getChoiceNumber(i));
            $('.div-choice').append(h);
        }
        // Render the state click button or answer question 
        $('.div-a').html('<h2>Click on the correct answer.</h2>');
        startCountdown();
    }

    function renderGuessResult() {
        // clear the timer for allowed time
        clearInterval(intervalAllowedTime);

        var correctAnswer = gameObj.getAnswer();
        if ($(this).text().endsWith(correctAnswer)) {
            $('.div-a').html('<h2>CORRECT: ' + correctAnswer + '</h2>');
            gameStats.win();
        }
        else {
            $('.div-a').html('<h2>WRONG CORRECT ANSWER IS ' + correctAnswer + '</h2>');
            gameStats.lose();
        }
        delayBeforeNextQuestion();
    }

    // 4.) GAME OBJECT
    var gameObj = {
        // the index into the questions array
        currentQuestion: -1,

        // q - is the question
        // choices - array of possible answers
        // 
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
        // returns the number of choices of answers to an individual question
        getNumberOfChoices() {
            return this.questions[this.currentQuestion].choice.length;
        },
        // generates a random index into the questions array and returns the
        // corresponding question
        setNewQuestion: function() {
            this.currentQuestion = Math.floor((Math.random() * this.questions.length));
            return this.questions[this.currentQuestion].q;
        },
        // for the current question, returns the choices at index n of the 
        // choices array
        getChoiceNumber: function(n) {
            //console.log("getChoiceNumber currentQuestion:" + this.currentQuestion);
            return this.questions[this.currentQuestion].choice[n];
        },
        // for the current question, returns the answer
        getAnswer: function() {
            //console.log("getAnswer currentQuestion:" + this.currentQuestion);
            var a = this.questions[this.currentQuestion].a;
            var cc = this.questions[this.currentQuestion].choice[a];
            return cc;
        }
    };
});