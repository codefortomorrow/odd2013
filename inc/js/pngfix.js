var fix = {
		filter	:	function (src) {return "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src='"+src+"')";},
		position:	function (p){return (p != 'relative' && p != 'absolute')?'relative':p;}
	}
function fixpng(p){
		if(p.length){
			var image = p.css('backgroundImage');
			if (image.match(/^url\(["']?(.*\.png([?].*)?)["']?\)$/i)) {
				image = RegExp.$1;
				p.css({background	: 	'none', 
						filter		:	fix.filter(image),
						position	:	fix.position(p.css('position'))
				});
			}
		}
	}	
	
		//browser == ie 6
$(function(){ 

	var ie6 = $.browser.msie && $.browser.version < 7;
	
	if(ie6){
		var elements = ['#menu','#work','#team-sub','#cms'];
		$(elements).each(function(i){
 		    $(elements[i]).css({
				background:"#231f15"
			});
		});
		$("#logo a").css({
			cursor:"pointer"
		});
		$('img[src$=.png]').each(function(){
			var t = $(this);
			t.css({filter	:	fix.filter(t.attr('src')),
					width	: 	t.width(),
					height	: 	t.height(),
					position:	fix.position(t.css('position'))
					})
			.attr({src:'inc/images/pixel.gif'});
		});
		var array = ['#logo a', '#footer-left', '#footer-right', '#home-sidebar'];
		$(array).each(function(i){
			fixpng($(array[i]));
		});
		
	}
});