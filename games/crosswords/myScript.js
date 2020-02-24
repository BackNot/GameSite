$.fn.givevalue = function () {
	alert(this.html());
};
function answer(ans, quest, rightAnswer) {
	$(ans).mouseover(function () {
		$(ans).addClass('givebg');
	});

	$(ans).mouseleave(function () {
		$(ans).removeClass('givebg');
	});

	$(ans).dblclick(function () {
		$(ans).addClass('givebg');
		$(ans).addClass('selected');
		alert(quest);
	});

	$(ans).click(function () {
		if ($(ans).hasClass('selected')) {
			$(ans).removeClass('givebg');
		}
		else {
			$(ans).addClass('givebg');
		}
		if ($(ans).hasClass('selected')) {
			$(ans).removeClass('selected');
			$('input#txt').attr('disabled', 'true').val("answer here");
		}
		else {
			$(ans).addClass('selected');
		}

		// Check if user try to select 2 words at once
		var countSelectedTds = 0;
		var countThem = 0;
		$(ans).each(function () {
			countSelectedTds++;   // count current tds

		});

		$('td').each(function (index, element) {
			if ($(element).hasClass('selected')) {
				countThem++; // count all selected tds
			}

		});
		if (countThem > countSelectedTds) {
			alert("You can't select two words."); // one by one  
			$(ans).removeClass('selected');
		}
		else {
			if ($(ans).hasClass('selected'))
				alert(quest); // give him the question
		}

		$('input#btn').click(function () {
			if ($(ans).hasClass('selected')) {
				var userAnswer = prompt(quest + "\n" + "Please enter the answer:");
				if (userAnswer.toUpperCase() !== rightAnswer.toUpperCase()) {
					// wrong
					$(ans).removeClass('selected');
					$(ans).addClass('wrong');
					setTimeout(function () {
						$(ans).removeClass('wrong');
					}, 950);
				} else {
					// right
					$(ans).addClass('guessed');
					$(ans).removeClass('selected');
					$(ans).unbind('click');
					$(ans).unbind('mouseover');
					$(ans).unbind('dblclick');
					var i = 0;
					checkIfDone();
					$(ans).each(function () {
						$(this).text(rightAnswer.toUpperCase().charAt(i));
						i++;
					});
				} // end right else
			}
		});
	});
}

function checkIfDone() {
	var count = 1;
	var tds = $('table').children('tbody').children('tr').children('td').length;
	$('td').each(function () {
		if (($(this).hasClass('guessed')) || ($(this).hasClass('empty'))) {
			count++;
		}
	});
	if (count >= tds) {
		alert("Congratulations! You won !");
		setInterval(blink, 500);
	}
}

function blink() {
	$('td.empty').fadeOut(500);
	$('td.empty').fadeIn(500);
}

$(document).ready(
	function () {
		$('input#rules').click(function () {
			alert('You have to answer the questions.\nWhen you hover with the mouse you can see how long is the word you have chosen. \nWhen you choose a word click on it and it becomes orange. \nThen click the button and try to guess it. \nI have left you 2 letters to help you.\nThe game ends when all words are entered. ');
		});
		$('td.ans1').mouseover(answer('td.ans1', "Who is the current president of the USA (2018) ?", 'Trump'));
		$('td.ans2').mouseover(answer('td.ans2', "Group of people that are connected and live together", 'Family'));
		$('td.ans3').mouseover(answer('td.ans3', "What colour is a Himalayan poppy?", "Blue"));
		$('td.ans4').mouseover(answer('td.ans4', "What is the world's longest river?", "Amazon"));
		$('td.ans5').mouseover(answer('td.ans5', "Something that you do regularly in order to earn money", "Job"));
		$('td.ans6').mouseover(answer('td.ans6', "Name the world's biggest island", "Greenland"));
		$('td.ans7').mouseover(answer('td.ans7', "A place where you go to work out", "Gym"));
		$('td.ans8').mouseover(answer('td.ans8', "You need this to breath", "Air"));
		$('td.ans9').mouseover(answer('td.ans9', "Famous football club from England", "Liverpool"));
		$('td.ans10').mouseover(answer('td.ans10', "Famous music genre", "Jazz"));
		$('td.ans11').mouseover(answer('td.ans11', "Creator of Apple", "Jobs"));
	});

