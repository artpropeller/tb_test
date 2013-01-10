// ����������� �����

$(document).ready(function(){
	// ������, ���������� ������
	var t;
	$(".middle-col").bind('mousemove',function(e){ 
		
		clearTimeout(t);
		$(".middle-col .jspVerticalBar").fadeIn(500);
		t=setTimeout(hideScroll,2000);
		
	});
	
	$(".middle-col .jspTrack").live("mouseover", function(){
		flag = true;
		clearTimeout(t);
	});
	$(".middle-col .jspTrack").live("mouseleave", function(){
		flag = false;
		clearTimeout(t);
	});

	
	$(".middle-col").mouseup(function(){
		flag = false;
		clearTimeout(t);
	});
	
	
	// ������� ������� �������
	startTime();
	
	var count_questions = $(".test-question").size();
	// QUESTION MAP
	
	// ������ ������
	var q_map_top = $(".question-map").height()/2;
	$(".question-map").css("margin-top", -q_map_top);
	
	$(".fill-bg, .question-map-close").click(function(){
		$(".fill-bg, .question-map").hide();
	});
	
	// �� ����� ���������� ����� ��������
	$(".question-counter-text a").click(function(){
		$(".fill-bg, .question-map").show();
	});
	
	$(".question-map li").click(function(){
		var index = $(this).index();
		$(".test-question.active").removeClass("active");
		$(".test-question").eq(index).addClass("active");
		
		$(".question-map-items li.active").removeClass("active");
		$(this).addClass("active");
		
		$(".question-counter-text a")
			.attr("title", "������ " + (index+1) + " �� " + count_questions)
			.find("span")
			.text(index+1);
			
		isSetTime($(".test-question").eq(index));
		loadQuestion();
		resizeContentContainerTest();
		api_middle_content.reinitialise();
		$(".fill-bg, .question-map").hide();
	});
	// --END-- QUESTION MAP
	
	// ������� ����� ��������� �����
	isSetTime($(".test-question.active"));
	
	// ������ ���������� ������
	$(".test-prev-btn").click(function(){
		var index = $(".test-question.active").index();
		
		if (index != 0)
		{
			$(".question-map-items li.active").removeClass("active");
			$(".question-map-items li").eq(index-1).addClass("active");
		
			$(".test-question.active").removeClass("active");
			$(".test-question").eq(index-1).addClass("active");
			
			$(".question-counter-text a")
				.attr("title", "������ " + (index) + " �� " + count_questions)
				.find("span")
				.text(index);
			
			isSetTime($(".test-question").eq(index-1));
			loadQuestion();
			resizeContentContainerTest();
			api_middle_content.reinitialise();
		}
	}).mousedown(function(){ return false; });
	
	// ������ ��������� ������
	$(".test-next-btn").click(function(){
		var index = $(".test-question.active").index() + 1;
		
		if (index != count_questions)
		{	
			$(".question-map-items li.active").removeClass("active");
			$(".question-map-items li").eq(index).addClass("active");
		
			$(".test-question.active").removeClass("active");
			$(".test-question").eq(index).addClass("active");
			
			$(".question-counter-text a")
				.attr("title", "������ " + (index+1) + " �� " + count_questions)
				.find("span")
				.text(index+1);
			
			isSetTime($(".test-question").eq(index));
			loadQuestion();
			resizeContentContainerTest();
			api_middle_content.reinitialise();
		}
	}).mousedown(function(){ return false; });
	
	
});

function loadQuestion()
{
	var height = $(".test-question.active .drag_elements").height();
	$(".test-question.active .drag_elements").height(height);
}

function hideScroll()
{
	if (!flag)
	{	
		$(".middle-col .jspVerticalBar").fadeOut(500);
	}
}
//change
function resizeContentContainerTest()
{
	var wh = $(window).height();
	var bh = $('body').height();
	var max_h = Math.max(wh, bh);
	var new_h = max_h - $('.head').height() - 4;
	
	var window_width = $(window).width();
	var width_arrows = ($(window).width() - 900)/2 - 10;
//	if (window_width < 1210)
//	{
//		$(".test-prev-btn").css("margin-left", 0);
//		$(".test-next-btn").css("margin-right", 0);
//	}
//	else
//	{
//		$(".test-prev-btn").css("margin-left", 26);
//		$(".test-next-btn").css("margin-right", 26);
//	}
	$(".test-prev-btn, .test-next-btn").width(width_arrows);
	
	$('.test-next-btn, .test-prev-btn').height(new_h-5);
	$('.content-container').height(new_h-5);
	$('.content-container .middle-col.taking-test').height(new_h-55);
    if ($('.content-container .middle-col.taking-test .main_cont').height() > $('.content-container .middle-col.taking-test').height()) {
        $('.test-next-btn').css('right','17px');
    }
    else {
        $('.test-next-btn').css('right','0');
    }
//	$('.content-container .middle-col.taking-test').css('height', (new_h-80) + 'px');
}

// ���� � �������� �������� ������� �����
function isSetTime(element)
{
	minutes = element.attr("data-minutes");
	seconds = element.attr("data-seconds");
	
	minutes = parseInt(minutes);
	seconds = parseInt(seconds);
	clearTimeout(t);
	only_general = false;
	
	
	if(isNaN(seconds) && isNaN(minutes))
	{
		minutes = 0;
		seconds = 0;
		
		$(".timer").hide();
		$(".middle-col .scroll-block").css("margin", "0 auto");
		$(".question-counter-text").css("padding-left", 91);
	}
	else
	{
		$(".timer").show();
		$(".middle-col .scroll-block").css("margin", "0");
		$(".question-counter-text").css("padding-left", 18);
	}
	startTime();
}

// ������� ������� �������
var minutes, seconds;
var general_minutes = 190;
var general_seconds = general_minutes * 60;
var only_general = false;
var t;

//change
function startTime() {
	if (!only_general)
	{
		//minutes = parseInt(minutes);
		//seconds = parseInt(seconds);
		if (isNaN(seconds)) seconds = 0;
		if (isNaN(minutes)) minutes = 0;
			
		if (minutes == 0 && seconds == 0)
		{
		}
		else
			seconds--;
		
		if (seconds < 0)
		{
			seconds = 59;
			minutes--;
		}
		var minuts_text = minutes;
		var second_text = seconds;
		if (minutes < 10) minuts_text = "0" + minutes;
		if (seconds < 10) second_text = "0" + seconds;
		$(".timer .time").text(minuts_text + ":" + second_text);
	}
	
	if (minutes == "00" && seconds == "00" && !only_general)
		only_general = true;
	
	// ����� �����

	
	general_minutes = parseInt(general_minutes);
	if (general_seconds == 60)
	{
		general_minutes++;
//		general_seconds = 0;
	}
	
	//if (general_minutes < 10) general_minutes = "0" + general_minutes;
    var h = general_seconds / 3600 | 0;
    var m = ((general_seconds - h * 3600) / 60) | 0;
    var s = general_seconds - h * 3600 - m * 60;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
	$(".timer .general-time span").text(h+':'+m+':'+s);
    general_seconds--;
	t = setTimeout(startTime, 1000);
}
