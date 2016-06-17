var numberFrom = 1;
var numberSend = 1;
var friendClick = false;
var test = "id";
var incomingID = "fromid";
var sendingID = "sendid";
var chatWithThis = "";
function deleteChats(){
	var testid ="";
	var a = $(".main-right-chatmessage");
	for(var i=1; i<numberFrom; i++){
		testid = "fromid"+i;
		var o = $("#"+testid);
		a.remove(o);
	}
	for(var i=1; i<numberSend; i++){
		testid = "sendid"+i;
		var o = $("#"+testid);
		a.remove(o);
	}

}
function chatwith(e){
	var name = $(e).children(".chatmessage-1").children(".chatmessage-1-info").children("h4").text();
	if(name!=chatWithThis)
		friendClick=true;
	chatWithThis = name;
	$(".main-right .main-right-nav h2").text(name);
}
function getfrom(content){
  var from_image = 'image/'+chatWithThis+'.jpg';
  console.log(from_image);
  var fromid = "fromid" + numberFrom; 
  var testid = "idget" + numberFrom ;
  var $html =$("<div class='content' id="+fromid+">"     
		+"<div class='chatmessage-1-image' >"
		+"<img src='"+from_image+"' width='40px' height='40px'/>"
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
  var img_src ="image/"+$(".my-name").text()+".jpg";
  console.log(img_src);
  var sendid = "sendid" + numberSend;
  var testid = "idsend" + numberSend ;
  var $html =$("<div class='content' id="+sendid+">"     
		+"<div class='chatmessage-1-image' style='float:right;'>"
		+"<img src='"+img_src+"' width='40px' height='40px'/>"
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