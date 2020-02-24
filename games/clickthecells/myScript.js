$(document).ready(
	function () {

		function animation(target, delay) {
			setTimeout(function () {
				$(target).addClass('table-warning');
			}, delay);
			setTimeout(function () {
				$(target).removeClass('table-warning');
			}, delay + 1000);
		}

		function gameFailed(level) {
			$('.btn-start').text("START");
			$('.table-table').hide();
			$('.table-game').append($('.alert-gameover').attr('hidden', false));
			$('.alert-gameover').addClass('onScreen');
			$('.level-alert').text(level);
			$('.level-label').wrap('<s></s>');
			$('.btn-start').attr('disabled', false); // enable the button so the user can start again
		}

		function randomTarget(count) { // return random order of cells to be clicked ( count tells how many cells )
			var index = 0;
			var result = [];
			var targets = {
				1: "td1",
				2: "td2",
				3: "td3",
				4: "td4",
				5: "td5",
				6: "td6",
				7: "td7",
				8: "td8",
				9: "td9"
			}
			while (index < count) {
				var number = Math.floor(Math.random() * 9);
				if (number === 0) number++; 					// number is [1-8]
				if (!result.includes(targets[number])) {
					index++; // The point is that one cell do not blink two times in a row ( to be harder )
					result.push(targets[number]);
				}
			}
			return result; // result.length will be equal to count	
		}

		function game(level) {
			var passed = false;
			switch (level) {
				case 1: play(1, ['td1', 'td5', 'td9'], passed); break;
				case 2: play(2, randomTarget(4), passed); break;
				case 3: play(3, randomTarget(4), passed); break;
				case 4: play(4, randomTarget(5), passed); break;
				case 5: play(5, randomTarget(5), passed); break;
				case 6: play(6, randomTarget(6), passed); break;
				case 7: play(7, randomTarget(6), passed); break;
				case 8: play(8, randomTarget(8), passed); break;
			}
		}

		function play(level, target, passed) {
			$('td').removeClass('table-warning');
			$('.level').text(level);
			$('.btn-start').attr('disabled', true); // disable the button so user don't start the game again
			var gameFailedBool = false; // check if the game ended
			var levelPassed = false;
			var animOver = false;
			var order = []; // the way cells must be clicked 
			var delay = 1000; // delay the blinking of the cell by 1s by default

			$(target).each(function (index, item) {
				setTimeout(function () {
					order.push(item);
					animation("." + item, delay);
					console.log('2');
					delay += 1000;
					$('.btn-start').text('WAIT...');
				}, 1000);
			});
			setTimeout(function () { // Do not allow early click !
				animOver = true;
				$('.btn-start').text('GO');
			}, delay * 2 + (target.length * 1000));
			var index = 0;
			$('td').click(function () {
				// we click some table cell . If that cell is in the order array as index 0 ( it means that it blinked first compared to the next one (index 1)) we got it right, so remove it from the array 
				//	and game continues . If the user clicks some other cell the game is over 
				if (animOver) { // if animation is over allow click
					if (!gameFailedBool) { // if we are still playing
						$(this).addClass('table-warning'); // make them yellow when clicked
						if ($(this).hasClass(order[index])) {
							// Right cell
							order.shift(); // remove the current cell from the order array ( so we must not click it again ). 
							if (order.length === 0) // level finished
							{
								$('td').unbind('click');
								if (level + 1 === 9) // game over , the user won
									gameWon();
								else
									game(level + 1); // give next level if we're done here
							}
						}
						else { // Wrong cell
							$('td').removeClass('table-warning'); // remove the yellow boxes that we clicked
							gameFailedBool = true;
							gameFailed(level);
						}
					} // end if(!gameFailedBool);
				} // end if(animover);
			}); // end td.click event
		}

		function gameWon() {
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

			$('.modal-gameend').modal('show');
			showText(".bird-quote", "Very well!I see you have good memory!", 0, 100);
			$('.btn-start').attr('disabled', false).text("START");
		}
		var target = ['td1', 'td5', 'td9'];
		$('.btn-start').click(function () {
			if ($('.alert-gameover').hasClass('onScreen')) {
				$('.alert-gameover').removeClass('onScreen')
				$('.alert-gameover').attr('hidden', true); // remove the alert if its there
				$('.table-table').show(); // show the table if its hidden 
				$('.level-label').unwrap();
				$('.level').text('');
			}
			else {
				play(1, target); //start the game
			}
		});
	});
