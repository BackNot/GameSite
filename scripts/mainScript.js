$(document).ready(function(){
	
		// Make each letter appear and then show the button
	var showText = function (target, message, index, interval) {   
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
	if(index===message.length-1) {
		 setTimeout(function(){
	 $('.bird-quote-answer').attr('hidden',false);
 },2500);
	}
  }
}; // end showText
	// If this is 1st visit show doors and button.
	if (sessionStorage.getItem('wasVisit')) {
		showText(".bird-quote", "Greetings, stranger! How do you do?", 0, 100);  // Make the bird speak after doors are open
				$('#leftDiv').addClass("hidden");
				$('#rightDiv').addClass("hidden");	
	 			$('#centerDiv').addClass("hidden");
	 	$('body').css({ 'overflow' : 'visible'});
		}
		else {
    		$('body').css({ 'overflow' : 'hidden'});
			$('#centerDiv').removeClass("hidden");
			$('#leftDiv').removeClass("hidden");
			$('#rightDiv').removeClass("hidden");
		};
// Answer the bird
 $('.bird-quote-answer').click(function(){
	 $(this).hide();
	 $('.bird-quote').text('');
	 showText(".bird-quote", "Perfect! I'm happy if you are!", 0, 100); 
 });
 // Click the red circle. Remove doors. 
 $('#centerDiv').click(function(){ 
	$('body').css({ 'overflow' : 'visible'});
      sessionStorage.setItem('wasVisit', 1); 
	 $('#leftDiv').animate({
    left: "-=50%",
  }, 1000, function() {
	 showText(".bird-quote", "Greetings, stranger! How do you do?", 0, 100);  // Make the bird speak after doors are open
	 $('#leftDiv').hide();
	 $('#rightDiv').hide();
  });
   $('#rightDiv').animate({
    right: "-=50%",
  }, 1000, function() {
  });
  $(this).hide();
 });
});