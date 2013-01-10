function setNum()
{
	var num = 1;
	$(".drag_drop table .num").each(function(){
		var size = $(this).parents("table").find(".num").size();
		$(this).text(num + ".");
		if (size == num)
			num = 0;
		num++;
		
	});
}


$(window).load(function(){
	$(".drag_drop .drag_cont, .drag_drop .pair_cont").each(function(){
		var text = $.trim($(this).text());
		
		var	cnt = 38;
		var img = false;
		if($(this).find(".img").is(".img"))
			img = true;

		if (text.length > cnt || img == true)
			$(this).addClass("mod_padding");
		else
			$(this).removeClass("mod_padding");
	});
});

$(document).ready(function(){
	setNum();
	//var offset_drag = $(".drag_drop table .get").position().top;
	
	
	var height = $(".drag_elements:visible").height();
	$(".drag_elements:visible").height(height);
	
	var drag_parent;
	$( ".drag" ).draggable({ 
		revert: "invalid",
		start: function(event, ui) {
			drag_parent = $(this).parent(".drag_elements");
			$(this).addClass("active");
			if (drag_parent.is(".drag_elements"))
			{
                //change
				var top = $(this).position().top + 4;
				var left = $(this).position().left+4;
				var height = $(this).height() - 8;


				drag_parent.find(".shadow").css({"top": top, "height": height, "left": left});
				drag_parent.find(".shadow .shadow_center").css({"height": height});
				drag_parent.find(".shadow").show();
			}
		},
		stop: function(event, ui) {
			$(this).removeClass("active");
			drag_parent.find(" .shadow").hide();
			//$(".drag_elements .shadow").hide();
		}
	});
	
	$( ".drag_drop table .get" ).droppable({
		over: function( event, ui ) {
			$(this).addClass("active");
		},
		out: function( event, ui ) {
			$(this).removeClass("active");
		},
		drop: function(event, ui) { 
			var parent = $(this).parents(".drag_drop");
			if($(this).is(".active"))
			{
				if($(this).find(".drag").is(".drag"))
				{	
					ui.draggable.css({"left": 0, "top": 0});
					return false;
				}
				
				var index = ui.draggable.attr("data-index");
				parent.find("table tr" ).eq(index).find(".get").removeClass("active").droppable({ disabled: false });
				
				var index_cont = $(this).parents("tr").index();
				ui.draggable.addClass("dropped").attr("data-index", index_cont);
				
				$(this).droppable({ disabled: true });
				
				var index = ui.draggable.attr("data-index");
				
				ui.draggable.css({"left": 0, "top": 0});
				ui.draggable.appendTo(parent.find("table tr" ).eq(index).find(".get"));
				$(this).attr("data-index", index);
				
				
			}
			else
			{
				ui.draggable.css({"left": 0, "top": 0}).removeClass("dropped");
			}
		}
	});
	

	$( ".drag_elements" ).droppable({
		over: function( event, ui ) {
			$(this).addClass("active");
		},
		out: function( event, ui ) {
			$(this).removeClass("active");
		},
		drop: function(event, ui) { 
			var index = ui.draggable.attr("data-index");
			
			$(this).parents(".drag_drop").find("table tr").eq(index).find(".get").removeClass("active").droppable({ disabled: false });
			$(this).find(".shadow").hide();
			
			if ($(this).parents(".drag_drop").is(".correct_pair"))
				ui.draggable.prependTo($(this));
			else
				ui.draggable.appendTo($(this));
				
			ui.draggable.css({"left": 0, "top": 0});
		}
	});
})