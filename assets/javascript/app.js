
$(document).ready(function(){


	$("#id-start-button").click(function(){
	    //console.log();
		$('.div-q').text(gameObj.getQuestion());
		$('.div-choice').text(gameObj.getChoices());
		

		$('.div-a').hide();
		$('.div-a').text(gameObj.getAnswer());
	});


	// array of objects
	var gameObj = {

		currentQuestion: -1,

		questions: [
			{
				q:"What is 2 + 2", 
				choice:['6', '5', '4', '3'],
				a:2
			},
			{
				q:"What is 9 * 3", 
				choice:['24', '27', '30', '33'],
				a:1
			},
			{
				q:"What is 8 * 5", 
				choice:['35', '40', '45', '50'],
				a:1
			},
			{
				q:"What is 8 * 3", 
				choice:['18', '21', '24', '27'],
				a:2
			}
		],

		getQuestion: function() {
			this.currentQuestion = Math.floor((Math.random() * this.questions.length));
			console.log("getQuestion currentQuestion:"+ this.currentQuestion);
			return this.questions[this.currentQuestion].q;
		},
/*
		getChoices: function() {
			console.log("getChoices currentQuestion:"+ this.currentQuestion);
			return this.questions[this.currentQuestion].choice[0]+
			this.questions[this.currentQuestion].choice[1] +
			this.questions[this.currentQuestion].choice[2] +
			this.questions[this.currentQuestion].choice[3];
		},
*/
		getChoice: function(n) {
			console.log("getChoice currentQuestion:"+ this.currentQuestion);
			return this.questions[this.currentQuestion].choice[n];
		},

		getAnswer: function() {
			console.log("getAnswer currentQuestion:"+ this.currentQuestion);
			return this.questions[this.currentQuestion].choice[this.questions.a];
		}
	};

});