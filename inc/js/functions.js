function showScreen() {
	if ($.browser.mozilla) {
		$("#screen-main").css({ height: "596px" });
		$("#screen").fadeIn("slow");
		scrollScreen('down');
	} else {
		$("#screen").fadeIn("slow");
		setTimeout("scrollScreen('down')",700);
	}
}

function closeScreen() {
	scrollScreen('up');
	setTimeout("$('#screen').fadeOut('slow');",600);
}

// scroll the screen down

function scrollScreen(dir) {

	if (dir == "up") {
		if (!$.browser.mozilla) {
			$("#screen-main").animate({ height: "25" }, 600, "swing" );
		}
		$('#screen-content').fadeOut('fast');
	} else {
		if (!$.browser.mozilla) {
			$("#screen-main").animate({ height: "596" }, 1100, "swing" );
		} else {
			$("#screen-main").css({ height: "596" });
		}
		setTimeout("$('#screen-content').fadeIn('slow');",1100);
	}
}

// show the pop up windows

function popUp(name) {
	if( $('#popup').length < 1 ) {
		$('#strapline').append('<div id="popup"></div>');
	}
		
	switch(name) {
		case "london":
			var margin = "-55px 0 0 20px";
			var content = '<p><img src="inc/images/uk.png" alt="London" /></p>';
		break;
		case "affordable":
			var margin = "10px 0 0 30px";
			var content = '<p>Forget inflated agency fees, we cater for any sized job with a solution for all budgets. <a href="#contact">Want to learn more?</a> <img src="inc/images/popup_link_arrow.gif" alt="arrow" /></p>';
		break;
	}
	$("#popup").css("margin",margin).html(content);
	
	$('#popup').localScroll({
		target:'html'
	});
	
	if ( $("#popup").css("display") == "none" ) {
		$("#popup").fadeIn("fast");
	}
	
	$('#popup').bind("mouseenter",function() {
		$('#popup').bind("mouseleave", function() {
			$('#popup').fadeOut("fast");
	  	});
	});
	
}

function remove(id) {
	$(id).remove();
}

function getClient(id) {
	$('#work-img-bg').fadeOut("fast");
	$('#work-desc').fadeOut("fast");
	setTimeout ( "changeClient('"+id+"')", 500 );
}

function changeClient(id) {
	var c_image = '/inc/images/work_img_'+id+'.jpg';
	file = '/inc/clients/'+id+'.php';
	$.get(file, function(data){
		var c_desc = data;
		$('#work-desc').html(c_desc);
		$('#loader').attr('src', c_image).load(function() {  
			$('#work-img-bg').css({"background":"transparent url("+c_image+") no-repeat 0 0"})
			$('#work-img-bg').fadeIn("fast");
			$('#work-desc').fadeIn("fast");
		});  
	});
}

function caseStudy(id) {
	$('#screen-gallery').css('display','none');
	file = '/inc/clients/'+id+'_case.php';
	$.get(file, function(data){
		$('#screen-content-inner').html(data);
		showScreen();
	});
}

$('#screen').click( function() {
	closeScreen();
});

function closeWindow(id) {
	$('#'+id).fadeOut('fast');
}

function showBio(person) {
	if ( person == 'tom' ) { 
		$('#dan .bio').fadeOut('fast');
	} else {
		$('#tom .bio').fadeOut('fast');
	}
	$('#' + person + ' .bio').fadeIn('fast');
	//setTimeout("$('#' + person + ' .bio-content').fadeIn('fast');",700);
}

function closeBio(person) {
	$('#' + person + ' .bio').fadeOut('fast');
}

function viewGallery(id) {
	file = '/inc/clients/'+id+'_gallery.php';
	$.get(file, function(data){
		var gallery = data.split(',');
		//alert(gallery.length);
		var gal_nav = '<ul>';
		var n = 1;
		for ( var i in gallery )
		{
			gal_nav += '<li><a href="javascript:galleryImage(\''+ gallery[i] +'\');">'+n+'</a></li>';
			n++;
		}
		gal_nav += '</ul>';
		$('#screen-gallery-nav').html(gal_nav);
		var gal_image = '/inc/images/'+gallery[0];
		$('#loader').attr('src', gal_image).load(function() {  
			$('#screen-gallery').css('background-image','url('+gal_image+')');
			$('#screen-gallery').fadeIn("fast");
		});  
		
	});
}

function galleryImage(id) {
	$('#screen-gallery-loader').fadeIn('fast');
	var gal_image = '/inc/images/'+id;
		$('#loader').attr('src', gal_image).load(function() {  
			$('#screen-gallery').css('background-image','url('+gal_image+')');
			$('#screen-gallery-loader').fadeOut('fast');
		});  
}