$(window).load(function(){
	$(".zoomer-element:not(.noactive, .empty)").zoomer();
	$(".zoomer-element.noactive").click(function(){
		var clone = $(this).clone();
		$(this).before(clone);
		$(this).prev(".zoomer-element").removeClass("noactive").addClass("empty");
		$(this).prev(".zoomer-element").find(".zoomer-textarea-text").attr("contenteditable", "true");
		$(this).prev(".zoomer-element").find(".zoomer-textarea-text").text("");
		
		setFirstElement();
		api_middle.reinitialise();
	});
	
	$(".zoomer-element.empty .zoomer-picture").live("click", function(){
		$(this).parents(".zoomer-element").find(".zoomer-slider-handle").remove();
		$(this).html('<img src="img/pic_5.jpg" alt=""/>');
		$(this).parents(".zoomer-element").zoomer();
	});
	
	$(".zoomer-element.empty .zoomer-picture").live("mousedown", function(){
		return false;
	});
	
	$(".zoomer-element:not(.noactive) .zoomer-remove").live("click", function(){
		$(this).parents(".zoomer-element").remove();
		setFirstElement();
		api_middle.reinitialise();
	});
	
	$(".zoomer-element .zoomer-textarea-text").live("keyup", function(){
		var height = $(this).height();
		
		if (height > 20) $(this).parent(".zoomer-textarea").addClass("active");
		else $(this).parent(".zoomer-textarea").removeClass("active");
		
		var text = $.trim($(this).text());
		$(this).parent(".zoomer-textarea").find("textarea").text(text);
	});
	
	function setFirstElement()
	{
		$(".zoomer-element").each(function(index){
			if (index % 3 == 0)
				$(this).addClass("first");
			else
				$(this).removeClass("first");
		});
	}
});

