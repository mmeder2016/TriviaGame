$(document).ready(function() {
    // 1.) GAME STATISTICS CLOSURE - Remove variables from the global 
    // namespace.
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

    // 2.) TIMER CODE CLOSURE - Remove variables from the global 
    // namespace.
    var gameTimer = (
        function() {
            // The time allowed in seconds to answer the question. This value is
            // designed to never change
            var allowedTime = 10;
            var delayBetweenGames = 3000;
            // temp variable to hold the decrementing count of seconds left to answer
            // the question
            var secondsRemaining = -1;
            // variable to hold the interval timer
            //   cleared in renderQuestionAndAnswers()
            //   cleared in renderGuessResult()
            var intervalAllowedTime;
            return {
                // startCountdown and countdownTimer manage the game functionality
                // of what to do if the time to answer the question runs out
                startCountdown() {
                    secondsRemaining = allowedTime;
                    intervalAllowedTime = setInterval(countdownTimer, 1000);
                },
                decrement() {
                    secondsRemaining--;
                },
                clear() {
                    clearInterval(intervalAllowedTime);
                },
                getSecondsRemaining() {
                    return secondsRemaining;
                },
                getDelayBetweenGames() {
                    return delayBetweenGames;
                }
            };
        }
    )();

    // 3.) TIMER CODE
    // When each question is either answered or times out, this function is
    // called to delay and then initiate the next question
    function delayBeforeNextQuestion() {
        // delay 3 seconds
        setTimeout(renderQuestionAndAnswers, gameTimer.getDelayBetweenGames());
        $('.game-status').text('Wins: ' + gameStats.getWins() + ' Losses: ' + gameStats.getLosses());
        // turn off click events to the answer choices. If you don't do this,
        // rapidly clicking on answers during this delay runs up the score 
        $('.game-choice').click(false);
    }

    function countdownTimer() {
        if (gameTimer.getSecondsRemaining() <= 0) {
            outOfTime();
        } else {
            $('.game-status').text(gameTimer.getSecondsRemaining().toString() + ' seconds left.');
        }
        gameTimer.decrement();
    }
    // After no attempt to answer question, we will display the result and 
    // wait a few seconds before displaying the next question
    //var intervalAfterTimeout; 
    function outOfTime() {
        gameTimer.clear();
        $('.div-a').html('<h2>Time ran out!</h2><h2>The correct answer was ' + gameObj.getAnswer() + '</h2>');
        gameStats.lose();
        // Wait 3 seconds to display next question
        delayBeforeNextQuestion();
    }

    // 4.) EVENT HANDLERS
    // Start the game
    $("#id-start-button").click(function() {
        renderQuestionAndAnswers();
    });
    // Handle clicking on one of the answer choices
    $(document).on('click', '.game-choice', renderGuessResult);

    // 5.) FUNCTIONS FOR EVENT HANDLERS
    function renderQuestionAndAnswers() {
        // clear the timer for allowed time
        gameTimer.clear();
        // Clear the Question and Answers area
        $('.div-choice').empty();
        // Render the Question
        $('.div-q').html('<h2>' + gameObj.setNewQuestion() + '</h2>');
        // Render the answers
        for (var i = 0; i < gameObj.getNumberOfChoices(); i++) {
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
            h.text(String.fromCharCode('a'.charCodeAt() + i) + '. ' + gameObj.getChoiceNumber(i));
            $('.div-choice').append(h);
        }
        // Render the state click button or answer question 
        $('.div-a').html('<h2>Click on the correct answer.</h2>');
        gameTimer.startCountdown();
    }

    function renderGuessResult() {
        // clear the timer for allowed time
        gameTimer.clear();
        var correctAnswer = gameObj.getAnswer();
        if ($(this).text().endsWith(correctAnswer)) {
            $('.div-a').html('<h2>CORRECT ANSWER: ' + correctAnswer + '</h2>');
            gameStats.win();
        } else {
            $('.div-a').html('<h2>WRONG, CORRECT ANSWER IS ' + correctAnswer + '</h2>');
            gameStats.lose();
        }
        delayBeforeNextQuestion();
    }

    // 6.) GAME OBJECT
    var gameObj = {
        // the index into the questions array
        currentQuestion: -1,
        // q - is the question
        // choices - array of possible answers
        // a is the index of the correct answer
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