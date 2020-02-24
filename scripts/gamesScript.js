$(document).ready(function(){
	$('.fade-effect').fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
	
	var showText = function (target, message, index, interval) {   
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}
 showText(".bird-quote", "Let's see what you can do, buddy!", 0, 100); 
});