$(document).ready( function() {   

	/* Little script to mail the form by */

	$("#submit").click(function() {

		var name = $("#name").val();
		var org = $("#org").val();
		var email = $("#email").val();
		var web = $("#web").val();
		var text = $("#text").val();

		var data = 'name='+ name + '&org=' + org + '&email=' + email + '&web=' + web + '&text=' + text;

		$.get("mail.php", { name: name, org: org, email: email, web: web, text: text, browser: 'notie6' }, function(data) {
			$('#mail-error-content').html(data);
			$('#mail-error').fadeIn('fast')
			.bind("mouseenter",function() {
				$('#mail-error').bind("mouseleave", function() {
					$('#mail-error').fadeOut("fast");
				});
			});
		});
			
		return false;
	});
	


});