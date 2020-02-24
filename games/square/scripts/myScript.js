
function generateRandom(limit) { // Generate random positions. If limit is smaller then obj is closer to the top left point [0;0]
	var num = Math.floor(Math.random() * limit);
	return num;
}

function moveCircle(seconds) {
	$(".circle").animate({
		marginTop: 500
	}, seconds);
	$(".circle").animate({
		marginTop: 0
	}, seconds);
}

function moveRandom(obj, limit) {
	var left = generateRandom(limit);
	var top = generateRandom(limit);
	return { "position": "relative", "float": "left", "top": top + "px", "left": left + "px" };
}

function loadImageX(path, width, height, target, howManyImgsToLoad, currentLevel) {
	var isClicked = true;
	for (var i = 0; i < howManyImgsToLoad; i++) // start for
	{
		$('<img src="' + path + '">').on('load', function () {
			$(this).width(width).height(height).appendTo(target);
			limit = 500;
			var left = generateRandom(limit); // generate random left 
			var top = generateRandom(limit); // generate random top
			$(this).addClass('errorClass');
			$(this).css({ "position": "absolute", "float": "left", "top": top + "px", "left": left + "px" }); // make it random appear
			$('.circle').click(function () {
				$('.errorClass').click(function () {
					$('.errorClass').remove();
					if (isClicked) {
						isClicked = false; // give it value false so we don't enter this statement again (otherwise we will reload the same level 2 times)
						level(currentLevel); //reload level => we failed
					}
				});
			}); // end circle click handler 
		}); // end onload event 
	} // end for
}

function gameOver() {
	alert('Bravo! You won!');
	$('.circleClass').hide();
	$('.circleClass').remove();
	$('img').remove();
	$('.circle').unbind('click');
	$('#info').text("You won!").css("font-size", "40px");
	$(setInterval(function () {
		$('#info').fadeOut(1000).fadeIn(1000);
	}, 1000));
}

function loadImage(path, width, height, target, howManyImgsToLoad, currentLevel) {
	var idCount = 0;
	var countClicked = 0;
	for (var i = 0; i < howManyImgsToLoad; i++) // start for
	{
		id = "id" + idCount++;
		$('<img src="' + path + '" id= ' + id + '"' + '>').on('load', function () {
			$(this).width(width).height(height).appendTo(target);
			limit = 500;
			var left = generateRandom(limit); // generate random left 
			var top = generateRandom(limit); // generate random top
			$(this).addClass('circleClass');
			$(this).css({ "position": "absolute", "float": "left", "top": top + "px", "left": left + "px" }); // make it random appear
			$(this).click(function () {		// make image fadeout when clicked
				// if circle is not at starting point fadeout the recrs
				var mTop = $('.circle').css('margin-top');
				if (mTop !== 0 + 'px') { // if mTOP begin
					$(this).fadeOut('4500');
					$(this).removeClass('circleClass');
					$(this).unbind('click'); // Don't allow double click on the same element . Otherwise we can't determine when the level is over.
					countClicked++;
					if (countClicked == howManyImgsToLoad) // check if circle is not at starting point and if all rects are collected
					{
						$('.errorClass').remove(); // clear the imgs with X 
						$('.circle').stop().css('margin-top', '0px');
						$('.circle').unbind('click');
						// Level is completed if we are here
						if (currentLevel + 1 == 11) gameOver(); // game over
						else
							level(currentLevel + 1, true);
					}
				} // end ifMtop !=0
				else $('#info').text("Click on the circle first").css("font-size", "30px").fadeOut(1000).fadeIn(1000);
			}); // end rect fadeout click 
			// end if circle is moved
		}); // end onLoad event on image
	} // end for
}

var mytimer;
function timeout(index) {
	mytimer = setTimeout(function ()
	{
		if ($('.circleClass')) {
			$('.errorClass').remove() // clear the X boxes 
			// if we are here then when the circle is back at the start point we did not collect all rects
			level(index);// repeat the current level
		}

	}, 3000);
}

function giveText(level) {
	switch (level) {
		case 2: return 'This was easy, wasnt it?'; break;
		case 3: return 'You do not know in what you got involved.'; break;
		case 5: return 'Lets see you now'; break;
		case 6: return 'Be careful with this one..'; break;
		case 10: return 'Last one , baby'; break;
	}
}

function level(index, prevLvlSucceed) {
	clearTimeout(mytimer);
	$('.circle').finish();
	var isLevelDone = false;
	var idCounter = 0;
	var imgsLoaded = 0;
	$('.circleClass').remove();
	switch (index) {
		case 1:
			{
				$('div#level').html('<h5>Level 1</h5>');
				id = "id";
				loadImage("imgs/rect.png", 100, 100, 'body', 1, 1);
				$('.circle').click(function () {
					$('#info').text(""); // clear the info div from text if it has any
					$('.circle').unbind('click');
					moveCircle(1500);
					timeout(index);
				}); // end circle click 
				idCounter++;
			}; break; 
		case 2:
			{
				$('div#level').html('<h5>Level 2</h5>');
				function case2() {
					loadImage("imgs/rect.png", 100, 100, 'body', 3, 2);// load image
					$('.circle').click(function () {
						$('#info').text(""); // clear the info div from text if it has any
						$('.circle').unbind('click');
						moveCircle(1500);
						timeout(index);
					}); // end circle click 
					// end circle click
					$('span').hide();
				};
				if (prevLvlSucceed) // if we passed the previous level successfully show msg
				{
					$('span').show().text(giveText(index)).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
					setTimeout(function () { case2() }, 3000); // if we passed the previous level delay current level by 3 secs
				}
				else case2(); // if we failed the current level show it again with no delays 
			}; break;
		case 3:
			{
				if (prevLvlSucceed) // if we passed the previous level successfully show msg
					$('span').show().text(giveText(index)).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
				function case3() {
					$('div#level').html('<h5>Level 3</h5>');
					loadImage("imgs/rect.png", 100, 100, 'body', 5, 3);// load image
					$('.circle').click(function () {
						$('#info').text(""); // clear the info div from text if it has any
						$('.circle').unbind('click');
						moveCircle(1500);
						timeout(index);
					}); // end circle click 
					$('span').hide();
				};
				if (prevLvlSucceed)
					setTimeout(function () { case3() }, 3000);
				else case3();
			}; break; // end case 
		case 4:
			{
				$('span').hide();
				$('div#level').html('<h5>Level 4</h5>');
				loadImage("imgs/rect.png", 100, 100, 'body', 5, 4);// load image
				$('.circle').click(function () {
					$('#info').text(""); // clear the info div from text if it has any
					$('.circle').unbind('click');
					moveCircle(1500);
					timeout(index);
				}); // end circle click 
			}; break;
		case 5:
			{
				if (prevLvlSucceed) // if we passed the previous level successfully show msg
					$('span').show().text(giveText(index)).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
				function case5() {
					$('div#level').html('<h5>Level 5</h5>');
					loadImage("imgs/rect.png", 100, 100, 'body', 7, 5);// load image
					$('.circle').click(function () {
						$('#info').text(""); // clear the info div from text if it has any
						$('.circle').unbind('click');
						moveCircle(1500);
						timeout(index);
					}); // end circle click 
					$('span').hide();
				};
				if (prevLvlSucceed) {
					setTimeout(function () {
						case5()
					}, 3000);
				}
				else case5();
			}; break;
		case 6:
			{
				if (prevLvlSucceed) // if we passed the previous level successfully show msg
					$('span').show().text(giveText(index)).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
				function case6() {
					$('div#level').html('<h5>Level 6</h5>');
					loadImageX("imgs/rectX.jpg", 100, 100, 'body', 1, 6); // load image with X on it (a.k.a. do not click image)
					loadImage("imgs/rect.png", 100, 100, 'body', 4, 6);// load image
					$('.circle').click(function () {
						$('#info').text(""); // clear the info div from text if it has any
						$('.circle').unbind('click');
						moveCircle(1500);
						timeout(index);
					}); // end circle click 
					$('span').hide();
				};
				if (prevLvlSucceed)
					setTimeout(function () {
						case6()
					}, 3000);
				else case6();
			}; break;
		case 7:
			{
				$('span').hide();
				$('div#level').html('<h5>Level 7</h5>');
				loadImageX("imgs/rectX.jpg", 100, 100, 'body', 6, 7); // load image with X on it (a.k.a. do not click image)
				loadImage("imgs/rect.png", 100, 100, 'body', 4, 7);// load image
				$('.circle').click(function () {
					$('#info').text(""); // clear the info div from text if it has any
					$('.circle').unbind('click');
					moveCircle(1500);
					timeout(index);
				}); // end circle click 
			}; break;
		case 8:
			{
				$('span').hide();
				$('div#level').html('<h5>Level 8</h5>');
				loadImageX("imgs/rectX.jpg", 100, 100, 'body', 5, 8); // load image with X on it (a.k.a. do not click image)
				loadImage("imgs/rect.png", 100, 100, 'body', 5, 8);// load image
				$('.circle').click(function () {
					$('#info').text(""); // clear the info div from text if it has any
					$('.circle').unbind('click');
					moveCircle(1500);
					timeout(index);
				}); // end circle click 
			}; break;
		case 9:
			{
				$('span').hide();
				$('div#level').html('<h5>Level 9</h5>');
				loadImageX("imgs/rectX.jpg", 100, 100, 'body', 2, 9); // load image with X on it (a.k.a. do not click image)
				loadImage("imgs/rect.png", 100, 100, 'body', 6, 9);// load image
				$('.circle').click(function () {
					$('#info').text(""); // clear the info div from text if it has any
					$('.circle').unbind('click');
					moveCircle(1500);
					timeout(index);
				}); // end circle click 
			}; break;
		case 10:
			{
				if (prevLvlSucceed) // if we passed the previous level successfully show msg
					$('span').show().text(giveText(index)).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
				function case10() {
					$('div#level').html('<h5>Level 10</h5>');
					loadImage("imgs/rect.png", 100, 100, 'body', 8, 10);// load image
					$('.circle').click(function () {
						$('#info').text(""); // clear the info div from text if it has any
						$('.circle').unbind('click');
						moveCircle(1500);
						timeout(index);
					}); // end circle click 
					$('span').hide();
				};
				if (prevLvlSucceed) {
					setTimeout(function () {
						case10();
					}, 3000);
				}
				else case10();
			}; break;
	} // end switch`
} // end level 
$(document).ready(
	function () {
		$('span').hide();
		level(1);
	});