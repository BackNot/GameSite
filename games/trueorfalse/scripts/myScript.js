$(document).ready(function () {
	var index = 0;
	var exclude = [];
	var answerCount = 0;
	var gameFailed = false; // determine when game is lost by the user
	$('.question').hide();
	$('#firstInfo').modal('show'); // show the first modal
	$('.btn-start').click(function () { 	// Begin button click
		if (gameFailed) {
			// game is over so everything is set back to default values
			$('.answers-count').text(answerCount);
			answerCount = 0;
			$('.progress-bar').stop();
			exclude.length = 0;
			gameFailed = false;
		}
		index = randomQuestion(exclude);
		$('.btn-start').attr('disabled', true);  // make button disabled to avoid double click
		$('.failed-time').attr('hidden', true);
		$('.success-right').attr('hidden', true);
		$(".question").show();
		$('.answers-count').text(answerCount);
		$('.question-image').attr('hidden', false);
		$(".question-placeholder").addClass('h2 mt-2 text-secondary').text(questions[index]).show();
		$(".progress-bar").width('100%');
		$(".progress-bar").animate({
			width: "0%"
		}, {
			duration: 10000,
			complete: function () {
				gameFailed = true;
				$('.question').hide();
				$('.question-image').attr('hidden', true);
				$('.question-placeholder').removeClass('h2 mt-2 text-secondary').text(' ').show().append($('.failed-time').clone().attr('hidden', false));
				$('.btn-start').attr('disabled', false); // Re-enable button
			}
		}); // END PROGRESS BAR ANIMATION
		//	} // END game continues 
	}); // END button START CLICK

	$('.btn-true').click(function () {
		if (answerCount === 10) answerCount = 0;
		if (checkAnswer(index)) { // RIGHT ANSWER 
			answerCount++; // one more answered question
			if (!gameOver(answerCount)) // check if game is over
			{ // if game is not over continue playing
				$('.answers-count').text(answerCount);
				console.log('right answer');
				$('.question').hide();
				$('.question-image').attr('hidden', true);
				$('.question-placeholder').removeClass('h2 mt-2 text-secondary').text(' ').show().append($('.success-right').clone().attr('hidden', false));
				$('.progress-bar').stop(); //stop anim
				$('.btn-start').attr('disabled', false); // Re-enable button
			}
		}
		else { // WRONG ANSWER
			$('.progress-bar').stop();
			gameFailed = true;
			$('.question').hide();
			$('.question-image').attr('hidden', true);
			$('.question-placeholder').removeClass('h2 mt-2 text-secondary').text(' ').show().append($('.failed-wrong').clone().attr('hidden', false));
			$('.answers-count').text(answerCount);
			$('.btn-start').attr('disabled', false); // Re-enable button
		}
	}); // End button TRUE click

	$('.btn-false').click(function () {
		if (answerCount === 10) answerCount = 0;
		if (!checkAnswer(index)) {  // RIGHT ANSWER
			answerCount++; // one more answered question
			if (!gameOver(answerCount)) // check if game is over
			{ // if game is not over continue playing
				$('.answers-count').text(answerCount);
				$('.question').hide();
				$('.question-image').attr('hidden', true);
				$('.question-placeholder').removeClass('h2 mt-2 text-secondary').text(' ').show().append($('.success-right').clone().attr('hidden', false));
				$('.progress-bar').stop(); //stop anim
				$('.btn-start').attr('disabled', false); // Re-enable button
			}
		}
		else { // WRONG ANSWER
			$('.progress-bar').stop();
			gameFailed = true;
			$('.question').hide();
			$('.question-image').attr('hidden', true);
			$('.question-placeholder').removeClass('h2 mt-2 text-secondary').text(' ').show().append($('.failed-wrong').clone().attr('hidden', false));
			$('.answers-count').text(answerCount);
			$('.btn-start').attr('disabled', false); // Re-enable button
		}
	}); // End button FALSE click
	function checkAnswer(questionIndex) {
		if ((questionIndex >= 1) && (questionIndex <= 21)) 
			return true;
		else 
			return false;
	};

	// Questions
	var questions = {
		1: "The U.S. dropped an atomic bomb on Hiroshima on August 6, 1945.",
		2: "On February 11, 1990, Nelson Mandela was released after 27 years in prison.",
		3: "On April 12, 1961, Russian cosmonaut Yuri Gagarin became the first human in space.",
		4: "It took five nominations before Leonardo DiCaprio won an Oscar.",
		5: "Prometheus stole fire from Zeus and gave it to humankind.",
		6: "Thunderstorms have particular sound frequencies that can hurt dogs’ ears.",
		7: "Dinosaurs ruled the Earth for about 165 million years.",
		8: "The painting Salvator Mundi, by Leonardo da Vinci, sold for 450.3 million US dollars.",
		9: "Unfortunately, the champion Usain Bolt was unable to finish the last race of his career.",
		10: "The movie Titanic yielded in the greatest earnings of the 1990s.",
		11: "The name “Google” originates from the word “googol” which designates the number 10 to the power of 100.",
		12: "Germany has participated in more World Cup finals than any other country.",
		13: "Pele is the only football (soccer) player who has been world champion three times.",
		14: "The original name for Pac-Man was Puckman.",
		15: "A heart beats approximately 3 billion times in an average lifespan.",
		16: "The brain consumes 20% of the calories consumed by the body.",
		17: "Saturn has more than 50 moons.",
		18: "Among the 8 planets of our solar system, 4 are rocky, and 4 are gaseous.",
		19: "Climate change threatens the Republic of Maldives.",
		20: "There are more than 25,000 islands in the Pacific Ocean",
		21: "Four drivers lost their lives during the F1 1958 season", // End true statements [1-21]
		22: "Charlie Chaplin is the man who won the most Oscars for best actor",
		23: "The 13 stripes on the American flag represent the 13 founding people of the United States.",
		24: "Michelangelo completed Vitruvian Man to perfect his knowledge of human anatomy before painting the Sistine Chapel.",
		25: "Although he was one of the most important composers of the Baroque period, Vivaldi did not play any musical instrument.",
		26: "Dogs wag their tails to the left when they’re happy.",
		27: "The Chernobyl nuclear disaster took place in a desert region of Australia.",
		28: "The Vietnam War lasted almost 7 years.",
		29: "The fall of the Berlin Wall took place in December 1991.",
		30: "No country has won two consecutive World Cups.",
		31: "Steve Jobs named this computer after his cat.",
		32: "Stonehenge is located in Scotland, 56 mi. (90 km) from Glasgow.",
		33: "The Great Blue Hole is located in the Mediterranean.",
		34: "Lewis Hamilton was the youngest F1 World Champion." // End false statements [22-34]
	};

	function randomQuestion(exclude) {
		if (exclude.length === 10) return "Game over";
		console.log("Generated : " + index);
		while (true) {
			var index = Math.floor((Math.random() * 34) + 1);
			if (exclude.includes(index)) continue;
			exclude.push(index);
			console.log("Success:" + index);
			console.log("elements:" + exclude);
			return index;
		}
	}

	function gameOver(answerCount) {
		if (answerCount === 10) { // You won the game
			$('.answers-count').text(answerCount);
			$('.progress-bar').stop();
			$('.question').hide();
			$('.question-image').attr('hidden', true);
			$('.question-placeholder').removeClass('h2 mt-2 text-secondary').text(' ').show().append($('.success-gameover').clone().attr('hidden', false));
			$('#gameOver').modal('show');
			$('.bird-quote').text(' '); // clear it 
			showText(".bird-quote", "Well played, my friend!", 0, 100);
			exclude.length = 0;
			$('.btn-start').attr('disabled', false);
			return true;
		}
		else 
			return false;
	}

	var showText = function (target, message, index, interval) {   // Make the bird talk
		if (index < message.length) {
			$(target).append(message[index++]);
			setTimeout(function () { showText(target, message, index, interval); }, interval);
			if (index === message.length - 1) {
				setTimeout(function () {
					$('.bird-quote-answer').attr('hidden', false);
				}, 2500)
			}
		}
	};
}); // End document ready