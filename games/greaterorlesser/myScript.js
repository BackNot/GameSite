$(document).ready(
	function () {
		// FUNCTIONS
		function imageMatrix() {
			$('.random').html('<img src="./imgs/matrix.gif" height="150px" width="150px"></img>'); // this is the image that is in the cell
		}

		function rand() {
			return Math.floor(Math.random() * 30) + 1; // [1-30]
		}

		function hitMe(currentNum, numbers) {
			if (currentNum === 0) // its begining of the game
			{
				var num = rand();
				$('.num' + num).addClass("text-danger");
				$('.num' + num).wrap("<s></s>");
				$('.num' + num).addClass('removed');
				$('.num' + num).removeClass('num' + num);
				$('.random').html('<span class="display-4">' + num + '</span>');
				numbers.push(num); // add the number in an array
			}
			else // its not beginning 
			{
				var num = rand();
				if ($('.num' + num).hasClass('num' + num)) {
					currentNum = num;
					if ($('.text-greater').attr('hidden') == 'hidden') // Greater
					{
						if (currentNum < numbers[numbers.length - 1]) // succeed. If the current number is greater than the last ( which we pushed in an array )
						{
							countTds++;
							if (countTds >= 10) gamewon();
							// game continues
							$('.td' + countTds).text(num).addClass('td-guessed');
							$('.num' + num).addClass("text-danger");
							$('.num' + num).wrap("<s></s>");
							$('.num' + num).addClass('removed');
							$('.num' + num).removeClass('num' + num);
							$('.random').html('<span class="display-4">' + num + '</span>');
							numbers.push(num); // add the number in an array
						}
						else // wrong answer
							gameOver(num);
					}
					else if ($('.text-lesser').attr('hidden') == 'hidden')// Lesser
					{
						if (currentNum > numbers[numbers.length - 1]) // succeed If the current number is lesser than the last ( which we pushed in an array )
						{
							countTds++;
							if (countTds >= 10) gamewon();
							// game continues
							$('.td' + countTds).text(num).addClass('td-guessed');
							$('.num' + num).addClass("text-danger");
							$('.num' + num).wrap("<s></s>");
							$('.num' + num).addClass('removed');
							$('.num' + num).removeClass('num' + num);
							$('.random').html('<span class="display-4">' + num + '</span>');
							numbers.push(num); // add the number in an array
						}
						else // wrong answer
							gameOver(num);
					}
				}
				else 
					hitMe(currentNum, numbers);
				$('.text-greater').attr('hidden', true);
				$('.text-lesser').attr('hidden', true);
			} 
		}

		function gamewon() // GAME WON so show the modal 
		{
			$('.btn-success').click(function () { // Show modal dialog and when we click OK button we close it
				$('.modal-gamewon').modal('toggle');
			});
			$('.modal-gamewon').modal('show');
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
			showText(".bird-quote", "Good game! You are better than I thought!", 0, 100);  // make the bird talk
			setTimeout(function () {
				$('.btn-greater').attr('hidden', true).text('GAME');
				$('.btn-lesser').attr('hidden', true).text('OVER');
				$('.btn-hitme').attr('hidden', true);
				$('.btn-startagain').attr('hidden', false);
				$('.text-greater').attr('hidden', true);
				$('.text-lesser').attr('hidden', true);
			}, 500);
		}
		function gameOver(num) // GAME IS LOST
		{
			$('.btn-danger').click(function () { // Show modal dialog and when we click OK button we close it
				$('.modal-gamelost').modal('toggle');
			});
			$('.modal-gamelost').modal('show');
			countTds++;
			$('.td' + countTds).text(num).addClass('td-wrong');
			$('.num' + num).addClass("text-danger");
			$('.num' + num).wrap("<s></s>");
			$('.num' + num).removeClass('num' + num);
			$('.random').html('<span class="display-4">' + num + '</span>');
			numbers.push(num); // add the number in an array
			setTimeout(function () {
				$('.btn-greater').attr('hidden', true).text('GAME');
				$('.btn-lesser').attr('hidden', true).text('OVER');
				$('.btn-hitme').attr('hidden', true);
				$('.btn-startagain').attr('hidden', false);
				$('.text-greater').attr('hidden', true);
				$('.text-lesser').attr('hidden', true);
			}, 500);
		}

		function makeChoice() {
			$('.btn-hitme').text('HIT ME').attr('disabled', false);
			$('.btn-greater').attr('disabled', true).text('>>>>>');
			$('.btn-lesser').attr('disabled', true).text('<<<<<');
			$('.random').html('<img src="./imgs/matrix.gif" height="150px" width="150px"></img>');
		}
		// END FUNCTIONS
		
		var numbers = []; // numbers that are chosen 
		imageMatrix(); // matrix img
		var countTds = 0; // count how many tds
		var isFirstHit = true; // if this first hit? if it is then do not place the number in the table below

		$('.btn-greater').attr('disabled', true).text('>>>>>');
		$('.btn-lesser').attr('disabled', true).text('<<<<<');
		$('.btn-hitme').click(function () {
			if (isFirstHit) { // if this first hit? if it is then do not place the number in the table below
				$('.btn-startagain').attr('hidden', true);
				isFirstHit = false;
				hitMe(0, numbers);
				$('.btn-greater').attr('disabled', false).text('Greater');
				$('.btn-lesser').attr('disabled', false).text('Lesser');
				$('.btn-hitme').text('OR').attr('disabled', true);
			}
			else { // it is not a first hit
				hitMe(numbers[numbers.length - 1], numbers);
				$('.btn-greater').attr('disabled', false).text('Greater');
				$('.btn-lesser').attr('disabled', false).text('Lesser');
				$('.btn-hitme').text('OR').attr('disabled', true);
			}

		});

		$('.btn-greater').click(function () { // GREATER is selected
			$('.text-lesser').attr('hidden', true);
			$('.chosen').text(' ');
			$('.text-greater').attr('hidden', false);
			makeChoice(); // choice is made
		});

		$('.btn-lesser').click(function () { // LESSER is selected
			$('.text-greater').attr('hidden', true);
			$('.chosen').text(' ');
			$('.text-lesser').attr('hidden', false);
			makeChoice(); // choice is made
		});

		$('.btn-startagain').click(function () { // refresh the page ( so everything is back to default automatically , and I don't have to re-write it. :) ).
			location.reload();
			$(this).attr('hidden', true);
		});
	});