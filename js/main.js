var numberFrom = 1;
var numberSend = 1;
var test = "id";
var chatWithThis = "";
//function deleteChats(){
//	var a = document.getElementsByClassName("content");
//	$(.main-right-chatmessage).removeChild(a)
//}
function chatwith(e){
	var name = $(e).children(".chatmessage-1").children(".chatmessage-1-info").children("h4").text();
//	if(name!=chatWithThis)
//		deleteChats();
	chatWithThis = name;
	$(".main-right .main-right-nav h2").text(name);
}
function getfrom(content){
  var testid = test + numberFrom ;
  var $html =$("<div class='content'>"     
		+"<div class='chatmessage-1-image' >"
		+"<img src='image/cong.jpg' width='40px' height='40px'/>"
		+"</div>"
		+"<div class='bubble_1'>"
		+"<div class='bubble_cont'>"
		+"<div class='plain'>"
		+"<pre class='js_message_plain ng-binding' id=" + testid +"></pre>"
		+"</div>"
		+"</div>"
		+"</div>"
		+"</div>");
  $(".main-right-chatmessage").append($html);
  var idtest = "#" + testid ;
  $(idtest).text(content);
  numberFrom = numberFrom + 1;
}
function sendto(content){
  var testid = test + numberSend ;
  var $html =$("<div class='content'>"     
		+"<div class='chatmessage-1-image' style='float:right;'>"
		+"<img src='image/cong.jpg' width='40px' height='40px'/>"
		+"</div>"
		+"<div class='bubble'>"
		+"<div class='bubble_cont'>"
		+"<div class='plain'>"
		+"<pre class='js_message_plain ng-binding' id=" + testid +"></pre>"
		+"</div>"
		+"</div>"
		+"</div>"
		+"</div>");
  $(".main-right-chatmessage").append($html);
  var message = $(".main-right-writemessage").val();
  var idtest = "#" + testid ;
  $(idtest).text(content);
  numberSend = numberSend + 1;
}
function change_web_wechat_tab_chat(e){
	$(e).children("i").css("background","url(./image/sprite27fe59.png) 0 -2083px");
	$(".web_wechat_tab_friends").css("background","url(./image/sprite27fe59.png) 0 -2140px");

}
function change_web_wechat_tab_friends(e) {
	$(e).children("i").css("background", "url(./image/sprite27fe59.png) 0 -2175px");
	$(".web_wechat_tab_chat").css("background", "url(./image/sprite27fe59.png) 0 -2048px");
}
function dropdown(){
	$(".dropdown_memu").css("display","inline-block");
	event.stopPropagation();
}
function dropup(){
	$(".dropdown_memu").css("display","none");
}


function information(e){
	if($(e).text() == "修改个人设置"){
		$(e).text("保存个人设置");
		$('.main-right-change').find('li').each(function(){
			var $html=$("<input value='"+ $(this).find('span').text() + "'>");
			$(this).find('span').text("");
			$(this).find('span').append($html);
		});
	}
	else
	{
		$(e).text("修改个人设置");
		$('.main-right-change').find('li').each(function(){
			var $value = $(this).find('input').val();
			$(this).find('span').text($value);
		});
	}
}