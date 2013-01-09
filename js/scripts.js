$(window).load(function(){
	$(".answer-blocks-white .min_text").each(function(){
		var height_text = $(this).height();	
		var height_parant = $(this).parents("div.bg").height();
		var dif_height = height_parant - height_text;
		var margin = dif_height/2 + 3;
		
		$(this).css({"margin-top": margin});
	});
	
	// TEST COMPARISON
	$(".comparison-item").each(function(){
		compSetHeight($(this));
	});
	
	// удаление картинки
	$(".comparison-item .remove-img").live("click", function(){
		var item = $(this).parents(".comparison-item"),
			text = $(this).parents(".text"),
			parent = $(this).parents(".img"),
			add_img_html = "<div class='add-img'></div>";
			
		text.removeClass("with-img").after(add_img_html);
		parent.remove();
		compSetHeight(item);
		compSetPadding(text.find(".text-cont"));
		api_middle.reinitialise();
	});
	
	$(".comparison-item:not(.empty) .add-img").live("click", function(){
		alert("Add image");
	});
	
	// удаление строки
	$(".comparison-item:not(.empty) .remove").live("click", function(){
		var parent = $(this).parents(".comparison-item");
		parent.remove();
		api_middle.reinitialise();
	});
	
	// добавление новой строки
	$(".comparison-item.empty").click(function(){
		var clone = $(this).clone();
		$(this).before(clone);
		
		var new_item = $(this).prev();
		new_item.removeClass("empty");
		new_item.find(".text-cont").attr("contenteditable", "true").text("");
		api_middle.reinitialise();
	});
	
	// проверка на высоту текстового поля (для выставления отступов)
	$(".comparison-item .text-cont").live("keyup", function(){
		compSetPadding($(this));
		api_middle.reinitialise();
	});
	
	function compSetHeight(element)
	{
		var height_first = element.find(".text:first").height(),
			height_last = element.find(".text:last").height(),
			min_heihgt = Math.min(height_first, height_last);
		element.find(".line").height(min_heihgt);
		element.find(".remove").height(min_heihgt);
	}
	
	function compSetPadding(element)
	{
		var height = element.height(),
			parent = element.parents(".text");
			
		if (!parent.is(".with-img"))
		{
			if (height > 12)
				parent.addClass("multirow");
			else
				parent.removeClass("multirow");
		}
	}
	// --END-- TEST COMPARISON
});
var flag = false;
$(document).ready(function(){ 
	
	$('.answers-list .delete').live('click', function(){
		$(this).closest('li').remove();
		api_middle.reinitialise();
	});
	$('.answers-list .add-answer').live('click', function(){
		$(this).replaceWith('<li><input type="text" value="" /><a href="javascript:void(0);" class="delete"></a></li>');
		$('.answers-list ul').append('<li class="add-answer">Кликните, чтобы добавить текст</li>');
		api_middle.reinitialise();
	});
	
	
	$('.points-num .up').click(function(){
		var val = parseInt($('.points-num input').val());
		if (!val)
			val = 0;
		val++;
		$('.points-num input').val(val);
	});
	$('.points-num .down').click(function(){
		var val = parseInt($('.points-num input').val());
		if (!val)
			val = 0;
		val--;
		if (val < 1)
			val = 1;
		$('.points-num input').val(val);
	});
	$('.points-num input').blur(function(){
		var val = parseInt($('.points-num input').val());
		if (!val)
			val = 1;
		$('.points-num input').val(val);	
	});
	
	$('.time-handlers .up').click(function(){
		var val = parseInt($('.time-to-pass').val());
		if (!val)
			val = 0;
		val++;
		$('.time-to-pass').val(val);
	});
	$('.time-handlers .down').click(function(){
		var val = parseInt($('.time-to-pass').val());
		if (!val)
			val = 0;
		val--;
		if (val < 1)
			val = 1;
		$('.time-to-pass').val(val);
	});
	$('.time-to-pass').blur(function(){
		var val = parseInt($('.time-to-pass').val());
		if (!val)
			val = 1;
		$('.time-to-pass').val(val);	
	});
	
	$('.toggle-popup-settings').click(function(){
		if ($('.settings-popup-block').css('display') == 'none')
			$('.settings-popup-block').slideDown(200);
		else
			$('.settings-popup-block').slideUp(200);
		setTimeout(function(){
			api_middle.reinitialise();	
		}, 201);
	});
	
	$('.question-list li').click(function(){
		$('.question-list li').removeClass('active');
		$(this).addClass('active');
	});
	
	$('.type-selector li a').click(function(){
		$('.type-selector li a').removeClass('active');
		$(this).addClass('active');
	});
	
	$('.answer-list:not(.checkbox) li').live("click", function(){
		$('.answer-list li').removeClass('selected');
		$(this).addClass('selected');
	});
	
	$('.answer-list.checkbox li:not(.empty) .checkbox').live("click", function(){
		if ($(this).parents("li").is(".selected"))
			$(this).parents("li").removeClass("selected");
		else
			$(this).parents("li").addClass('selected');
	});
	
	$(".answer-blocks-white li:not(.empty)").click(function(){
		$(this).parents("ul").find(".radio").removeClass("selected");
		$(this).find(".radio").addClass("selected");
		
		if ($(this).find(".checkbox").is(".selected"))
			$(this).find(".checkbox").removeClass("selected");
		else
			$(this).find(".checkbox").addClass("selected");
	});
	
	$(".textarea .textarea_cont").keyup(function(){
		var text = $.trim($(this).text());
		$(this).parent(".textarea").find("textarea").text(text);
		
		var	cnt = 68;
		var img = false;
		if($(this).parent(".textarea").find(".img").is(".img"))
		{
			cnt = 56;
			img = true;
		}

		if (text.length > cnt || img == true)
			$(this).addClass("mod_padding");
		else
			$(this).removeClass("mod_padding");
			
		api_middle.reinitialise();
	});
	
	var clone;
	$(".answer-list.switch li .remove:not(.pic)").live("click", function(){
		clone = $(this).parents("li").clone();
		$(this).parents("li").remove();
		setOrderIndex();
		api_middle.reinitialise();
	});
	
	$(".answer-list.switch li .remove.pic").live("click", function(){
		$(this).parents("li").find(".pic_load").removeClass("noactive");
		$(this).parents(".img").remove();
		api_middle.reinitialise();
	});
	
	$(".answer-list.switch li:not(.empty) .pic_load").live("click", function(){
		alert("Загрузить фото");
	});
	
	$(".answer-list.switch li.add_row").click(function(){
		if (!clone)
			clone = $(this).prev("li").clone();
		$(this).before(clone);
		$(this).prev("li").find(".textarea_cont").text("");
		$(this).prev("li").find(".img").remove();
		clone = "";
		api_middle.reinitialise();
		setOrderIndex();
	});

	
	$('.type-selector li').mouseover(function(){
		$(this).find('.popup-type-selector').show();
	});

	$('.type-selector li').mouseleave(function(){
		$(this).find('.popup-type-selector').hide();
	});
	
	$('.left-col .buttons a').hover(function(){
		if ($(this).hasClass('selected'))
			return;
			
		$(this).addClass('hover');
	}, function(){
		$(this).removeClass('hover');
	});
	
	$('.left-col .buttons a').click(function(){
		if ($(this).hasClass('selected'))
			return;
			
		$('.left-col .buttons a').removeClass('selected');
		$(this).removeClass('hover').addClass('selected');
	});
	
	$('.left-col .more-buttons-container .buttons a').click(function(){
		var _this = $(this);
		var button_5 = $('.left-col .buttons.visible li:eq(4) a');
		var this_class = _this.attr('class');
		var button_5_class = button_5.attr('class');
		
		_this.attr({'class': button_5_class});
		button_5.attr({'class': this_class});
		
	});
	
	setOrderIndex();
	
	// PUL BTN
	$(".pul .edit").click(function(){
		var text = $(".pul .pul_text span").text();
		$(".pul .pul_text").hide();
		$(".pul .text_hidden").val(text).show();
		$(".pul .text_hidden").focus();
	});
	
	$(".pul .text_hidden").focusout(function(){
		var text = $(".pul .text_hidden").val();
		$(".pul .text_hidden").hide();
		$(".pul .pul_text span").text(text);
		$(".pul .pul_text").show();
	});
	
	$(".pul .text_hidden").keypress(function(e){
		if (e.which == 13)
		{
			var text = $(".pul .text_hidden").val();
			$(".pul .text_hidden").hide();
			$(".pul .pul_text span").text(text);
			$(".pul .pul_text").show();
		}
	});
	
	$(".pul .pul_btn a").click(function(){
		var left = $(".pul .pul_btn").offset().left - 360;
		var top = $(".pul .pul_btn").offset().top + 75;
		$(".pul .pul_btn").addClass("active");
		$(".pul_fill").show();
		$(".hint").css({"left": left, "top": top}).show();
	});
	
	$(".pul_fill").click(function(){
		$(".pul .pul_btn").removeClass("active");
		$(".pul_fill").hide();
		$(".hint").hide();
	});
	
	// HINT
	$(".hint .ht_close").click(function(){
		$(".pul .pul_btn").removeClass("active");
		$(".pul_fill").hide();
		$(".hint").hide();
	});
	
	
	$(".hint .btn_next").click(function(){
		var index = $(".hint_item.active").index(); 
		var size = $(".hint_item").size();
		if (index != (size-1))
		{
			$(".hint_item.active").removeClass("active").next(".hint_item").addClass("active");
			$(".nav_text span").text(index+2);
		}
	});
	
	$(".hint .btn_prev").click(function(){
		var index = $(".hint_item.active").index(); 
		var size = $(".hint_item").size();
		if (index != 0)
		{
			$(".hint_item.active").removeClass("active").prev(".hint_item").addClass("active");
			$(".nav_text span").text(index);
		}
	});
	
	$(".hint .btn_next, .hint .btn_prev").mousedown(function(){
		return false;
	});
	
	// SET POINT 
	$(".set-point-img").click(function(e){
		var img_left = $(this).offset().left;
		var img_top = $(this).offset().top;
		var left = e.pageX - img_left - 10;
		var top = e.pageY - img_top - 10;
		
		$(".set-point-marker").css({"left": left, "top": top}).show();
	});
	
	// SETTINGS POP UP SELECT
	$(".settings-popup-block .select .hidden_text .create").click(function(){
		var size = $(".settings-popup-block .select .ht_cont ul li").size();
		$(".settings-popup-block .select .ht_cont ul").append('<li><input type="checkbox" class="check" name="" value="" id="el_' + size + '" /> <input type="text" value="" name="" class="text" /></li>');
		api_settings.reinitialise();
		api_settings.scrollToPercentY("100");
		
		$(".settings-popup-block .select .ht_cont input.text").focus();
	});
	
	$(".settings-popup-block .select .ht_cont input.text").live("focusout", function(){
		var text = $.trim($(this).val());
		var size = $(".settings-popup-block .select .ht_cont ul li").size() - 1;
		if (!text)
			$(this).parent("li").remove();
		else
		{
			$(this).parent("li").append("<label for='el_" + size + "'>" + text + "</label>");
			$(this).remove();
		}
		api_settings.reinitialise();
	});
	
	$(".settings-popup-block .select .ht_cont input.text").live("keypress", function(e){
		if (e.which == 13)
		{
			var text = $.trim($(this).val());
			if (!text)
				$(this).parent("li").remove();
			else
			{
				$(this).parent("li").append(text);
				$(this).remove();
			}
			api_settings.reinitialise();
		}
	});
	
	$(".settings-popup-block .select .hidden_text .white_btn").click(function(){
		var size = $(".settings-popup-block .select .ht_cont ul input:checked").size();
		if(size == 1)
		{
			var text = $(".settings-popup-block .select .ht_cont ul input:checked").parent("li").text();
		}
		else if (size > 1)
		{
			var ending = "ах";
			if (size>20)
			{
				var length = size.toString();
				var last_num = length[length.length-1];
				if (last_num == 1)
				{
					ending = "е";
				}
			}
			var text = "Находится в " + size + " пул" + ending;
		}
		else
			var text = "Пул не выбран";
		$(".settings-popup-block .select .select_cont .text").text(text);
		$(".settings-popup-block .select .hidden_text").hide().removeClass("active");
	});
	
	$(".settings-popup-block .select .select_cont").click(function(){
		if (!$(".settings-popup-block .select .hidden_text").is(".active"))
		{
			$(".settings-popup-block .select .hidden_text").show().addClass("active");
			api_settings.reinitialise();
		}
		else
		{
			$(".settings-popup-block .select .hidden_text").hide().removeClass("active");
			api_settings.reinitialise();
		}
	});
	
	var active_hidden_text = false;
	$(".settings-popup-block .select").hover(function(){
		active_hidden_text = true;
	}, function(){
		active_hidden_text = false;
	});
	
	
	$("*").click(function(){
		if (!active_hidden_text)
			$(".settings-popup-block .select .hidden_text").hide().removeClass("active");
	});
	
	
	
	$(".type-selector .block").click(function(){
		$(".pul").show();
		resizeContentContainer();
	});
	
	$(".type-selector .list").click(function(){
		$(".pul").hide();
		resizeContentContainer();
	});
	
		
	
	// DINAMIC TABLE
	
	$(".add_row").click(function(){
		var parent = $(this).parent(".dinamic_table");
		addRow(parent.find("table"));
	});
	
	$(".add_col").click(function(){
		var parent = $(this).parent(".dinamic_table");
		parent.find("table tr").each(function(index){
			$(this).append("<td>" + index + "</td");
		});
	});
	
	setTdTrIndex($(".dinamic_table table"));
	
	var ctrl_down = false;
	var top_start;
	var left_start;
	var width_start;
	var height_start;
	$(".dinamic_table tbody td").live("click", function(){
		var parent = $(this).parents(".dinamic_table");
		
		if (!ctrl_down) // Если контрол не был зажат
		{
			top_start = $(this).position().top;
			left_start = $(this).position().left;
			width_start = $(this).width()+20;
			height_start = $(this).height()+20;
			
			parent.find(".select_td").css({
				"top": top_start,
				"left": left_start,
				"width": width_start,
				"height": height_start
			});
			
			$(this).addClass("start");
		}
		else
		{
			var top_end = $(this).position().top;
			var left_end = $(this).position().left;
			var width_end = $(this).width()+20;
			var height_end = $(this).height()+20;
			
			if (left_end > left_start && top_end >= top_start)
			{
				var new_height = top_end - top_start + height_end;
				var new_width = left_end - left_start + width_end;
				parent.find(".select_td").css({
					"width": new_width,
					"height": new_height
				});
			}
			$(this).addClass("end");
		}
	});
	
	$(".dinamic_table .merge").click(function(){
		var parent = $(this).parents(".dinamic_table");
		var start = parent.find("td.start").attr("data-index");
		var end = parent.find("td.end").attr("data-index");
		var start_tr = parent.find("td.start").parent("tr").attr("data-index");
		var end_tr = parent.find("td.end").parent("tr").attr("data-index");
		
		parent.find("td.start").nextAll().each(function(){
			var index = $(this).attr("data-index");
			$(this).remove();
			if (index == end)
				return false;
		});
		parent.find("td.start").attr("colspan", (end-start+1));
		
	});
	
	$(document).keydown(function(event) {
		if (event.which == 17) {
			if($(".dinamic_table tbody td.start").is(".start"))
			{
				ctrl_down = true;
			}
		}
	});

});


function resizeContentContainer()
{
	//alert(123);
	var diff;
	if ($(".type-selector .block").is(".active"))
	{
		diff = 60;
	}
	
	var wh = $(window).height();
	var bh = $('body').height();
	var max_h = Math.max(wh, bh);
	var new_h = max_h - $('.head').height() - 4;
	var width = $(".content-container .middle-col").width();
	var max_w = "100%";
	$('.content-container, .content-container .left-col .scroll-block, .content-container .middle-col .scroll-block, .content-container .right-col').height(new_h);	
	$('.content-container .right-col .scroll-block').height(new_h - 170);
	
	$(".content-container .middle-col .scroll-block.main-scroll").width(max_w).height(new_h - diff);
	$(".content-container .middle-col .scroll-block.main-scroll .jspContainer:first").width(max_w).height(new_h - diff);
	$(".content-container .middle-col .scroll-block.main-scroll .jspContainer:first .jspPane:first").width(max_w).height(new_h - diff);
}

function setOrderIndex()
{
	$(".answer-list.order li").each(function(index){
		var count = index + 1 + ".";
		$(this).find(".num").text(count);
	});
}

// Добавление строки в таблицу
function addRow(parent)
{
	var count_td = 0; // количество добавляемых столбцов
	
	// Проверка на colspan
	parent.find("tr:first td").each(function(){
		var colspan = parseInt($(this).attr("colspan"));
		if (colspan) count_td += colspan;
		else count_td++;
	});
	
	// Формирование строки
	var html = "<tr>";
	for (var i = 0; i < count_td; i++)
	{
		html += "<td></td>";
	}
	html += "</tr>";
	
	// Добавляем строку в таблицу
	parent.find("tbody").append(html);
}

function setTdTrIndex(parent)
{
	parent.find("tbody tr").each(function(index){
		var tr_index = index;
		$(this).attr("data-index", tr_index);
		$(this).find("td").each(function(index){
			$(this).attr("data-index", (index));
		});
	});
}


