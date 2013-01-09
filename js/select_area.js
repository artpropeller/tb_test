$(window).load(function(){
	$(".load-picture").click(function(){
		$(this).remove();
		$(".zoomer-element").show();
	});
	
	$(".zoomer-element").zoomer();
	$(".select-area-item").draggable({containment: "parent"});
	

	$(".load-area-btn").click(function(){
		var parent = $(this).parents(".question-block");
		var size = parent.find(".select-area-item").size();
		
		parent.find(".select-area-item.active").removeClass("active");
		
		var isPointArea = false;
		if (parent.find(".set-point-area").is(".set-point-area"))
		{
			isPointArea = true;
			parent.find(".zoomer-picture").prepend('<div class="select-area-item"><div class="num"></div><div class="check"></div><div class="remove"></div></div>');
		}
		else
			parent.find(".zoomer-picture").prepend('<div class="select-area-item"><div class="num"></div></div>');
		parent.find(".select-area-item:first .num").text(size+1);
		parent.find(".select-area-item:first")
			.draggable({
				containment: "parent",
				start: function(event, ui) {
					var size = parent.find(".select-area-item").size();
					if (size > 1 && !isPointArea)
					{
						$(".select-area-item.active").removeClass("active");
						$(this).addClass("active");
						var index = $(this).attr("data-area");
						$(".select-area-list-item.active").removeClass("active");
						$(".select-area-list-item[data-text=" + index + "]").addClass("active");
					}
				}
			})
			.resizable({
				containment: ".zoomer-picture",
				handles: "n, e, s, w, se, ne, nw, sw",
				minWidth: 50,
				minHeight: 50
			})
			.attr("data-area", (size+1));
			
		
		
		parent.find(".select-area-list-item.active").removeClass("active");
		parent.find(".select-area-list-cont").append(
			'<div class="select-area-list-item" data-text="' + (size+1) + '">'+
				'<div class="num">' + (size+1) + '.</div>'+
				'<div class="text">'+
					'<div class="zoomer-textarea">'+
						'<div class="zoomer-textarea-text" contenteditable="true"></div>'+
						'<textarea name="" cols="" rows=""></textarea>'+
						'<div class="border"></div>'+
						'<div class="remove"></div>'+
					'</div>'+
				'</div>'+
				'<div class="clear"></div>'+
			'</div>'
		);
		
		if (size > 0 && !isPointArea)
		{
			parent.find(".select-area-item:first").addClass("active");
			parent.find(".select-area-list-item:last").addClass("active");
		}
		if (!isPointArea)
		{
			resizeContentContainer();
			api_middle.reinitialise();
		}
	});
	
	$(".zoomer-textarea-text").live("focusin", function(){
		var size = $(".question-block .select-area-item").size();
		if (size > 1)
		{	
			var parents = $(this).parents(".select-area-list-item");
			var index = $.trim(parents.attr("data-text"));
			
			$(".select-area-list-item.active").removeClass("active");
			parents.addClass("active");
			
			$(".select-area-item.active").removeClass("active");
			$(".select-area-item[data-area=" + index + "]").addClass("active");
		}
	});
	
	$(".select-area-list-item .zoomer-textarea-text").live("keyup", function(){
		var height = $(this).height();
		if (height>20)
			$(this).parents(".zoomer-textarea").addClass("mod_padding");
		else
			$(this).parents(".zoomer-textarea").removeClass("mod_padding");
	});
	
	$(".select-area-list-item .zoomer-textarea .remove").live("click", function(){
		var parent = $(this).parents(".select-area-list-item");
		var index = parent.attr("data-text");
		$(".zoomer-picture .select-area-item[data-area=" + index + "]").remove();
		parent.remove();
		sortSelectArea();
		
		var size = $(".question-block .select-area-item").size();
		if (size == 1)
		{	
			$(".select-area-item.active").removeClass("active");
			$(".select-area-list-item.active").removeClass("active");
		}
		
		resizeContentContainer();
		api_middle.reinitialise();
	});
	
	
	// SET POINT AREA 
	$(".set-point-area .check").live("click", function(){	
		var parent = $(this).parents(".select-area-item");
		if (parent.is(".active-point"))
			parent.removeClass("active-point");
		else
			parent.addClass("active-point");
	});
	
	$(".set-point-area .remove").live("click", function(){
		var parent = $(this).parents(".select-area-item");
		parent.remove();
		sortSelectArea("check");
	});
	
	// DRAG TO AREA
	$(".drag-area").each(function(){
		var width = $(this).width()+1;
		var text = $.trim($(this).text());
		$(this).attr({"data-width": width, "data-text": text}).width(width);
	});
	
	var drag_el_height = $(".drag-area-elements").height();
	 $(".drag-area-elements").height(drag_el_height);
	

	$(".drag-area").draggable({ 
		drag: function(event, ui) {
			var width = $(this).attr("data-width");
			var text = $.trim($(this).attr("data-text"));
			
			$(this).find(".drag-area-cont").text(text);
			$(this).width(width).removeClass("dropped");
			
			
			$(".text-help").hide();
			$(".test").text(0);
			
			var parent = $(this).parent(".drop-area");
			$(this).css("z-index", 300);
			if (parent.is(".drop-area"))
			{
				parent.css("z-index", 300);
			}
		},
		stop: function(event, ui) {
			var parent = $(this).parent(".drop-area");
			$(this).css("z-index", 100);
			$(".drop-area").css("z-index", 10);
			if (parent.is(".drop-area"))
			{
				var width = parent.width();
				var height = parent.height() - 2;
				
				if ($.browser.msie && $.browser.version == 8)
					height = height;
				
				$(this).width(width).addClass("dropped");
				
				var element_height = $(this).height();
				
				var top = height - element_height;
				$(".test").text(element_height);
				$(this).css({"top": top, "left": 0});
				
				var text = $.trim($(this).text());
				var width = parent.width()-36;
				var countSymb = Math.round(width/7);
				var newtext = "";
				
				if (countSymb < text.length)
				{
					for (var i = 0; i < countSymb; i++)
						newtext += text.charAt(i);

					newtext += "...";
				}
				else newtext = text;
					
				$(this).find(".drag-area-cont").text(newtext);
			}
			else
			{
				$(this).css({"top": 0, "left": 0});
			}
		}
	});
	
	$(".drop-area").droppable({
		drop: function(event, ui){
			var draggable = ui.draggable;
			$(this).removeClass("active");
			if (!$(this).find(".drag-area").is(".drag-area"))
			{
				draggable.appendTo($(this));
				draggable.addClass("dropped");
			}
		},
		over: function(event, ui){
			if (!$(this).find(".drag-area").is(".drag-area"))
				$(this).addClass("active");
		},
		out: function(event, ui){
			$(this).removeClass("active");
		}
	});
	
	$(".drag-area-elements").droppable({
		drop: function(event, ui){
			var draggable = ui.draggable;
			draggable.appendTo($(this));
		}
	});
	
	$(".drop-area").live("mouseover", function(){
		var text = "";
		text = $(this).find(".drag-area").attr("data-text");
		if (text)
		{
			var left = $(this).position().left;
			var top = $(this).position().top;
			
			$(".text-help-cont").text(text);
			
			var width = $(".text-help").width();
			var width_element = $(this).width();
			var height_element = $(this).height();
			
			top = top + height_element + 12;
			left = left - width/2 + width_element/2 + 3;
			$(".text-help").css({"left": left, "top": top}).show();
		}
	});
	
	$(".drop-area").live("mouseleave", function(){
		$(".text-help").hide();
	});
});

function sortSelectArea(typeCheck)
{
	if (typeCheck == "check")
	{
		var size = $(".select-area-item").size();
		for (var i = (size-1), count = 1; i >= 0; i--, count++)
			$(".select-area-item").eq(i).attr("data-area", count).find(".num").text(count);
	}
	else
	{
		
		$(".select-area-list-item").each(function(index){
			var index_old = $(this).attr("data-text");
			var index_new = index+1;
			
			$(this).attr("data-text", index_new);
			$(this).find(".num").text(index_new + ".");
			$(".zoomer-picture .select-area-item[data-area=" + index_old + "]").attr("data-area", index_new).find(".num").text(index_new);
		});
	}
}