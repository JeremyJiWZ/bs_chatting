var user_info = {};

angular.module('weChat',['ui.router'])
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('login', {
            url: "/login",
            templateUrl: 'login.html'
        })
        .state('main',{
            url:"/main",
            views: {
                '': {
                    templateUrl: 'tpls/main.html'
                },
                'leftview@main':{
                    templateUrl:'tpls/chatlist.html'
                },
                'rightview@main':{
                		templateUrl:'tpls/chatpage.html'
                }
            }
        })
        .state('main.friend',{
            url:"/friend",
            views: {
                'rightview@main': {
                    templateUrl: 'tpls/friend.html'
                }
            }
        })
        .state('main.addFriend',{
            url:"/addFriend",
            views: {
                'rightview@main': {
                    templateUrl: 'tpls/addFriend.html'
                }
            }
        })
        .state('main.setting',{
            url:"/setting",
            views: {
                'rightview@main': {
                    templateUrl: 'tpls/setting.html'
                }
            }
        })
        .state('main.settingChange',{
            url:"/settingChange",
            views: {
                'rightview@main': {
                    templateUrl: 'tpls/settingChange.html',
                }
            }
        })
        .state('main.friendSetting',{
            url:"/friendSetting",
            views: {
                'rightview@main': {
                    templateUrl: 'tpls/friendSetting.html'
                }
            }
        })
        .state('main.chatpage',{
            url:"/chatpage",
            views: {
                'rightview@main': {
                    templateUrl: 'tpls/chatpage.html',
                }
            }
        })
        .state('main.chatlist',{
            url:"/chatlist",
            views:{
                'leftview@main':{
                    templateUrl:'tpls/chatlist.html'
                }
            }
        })
        .state('main.friendlist',{
            url:"/friendlist",
            views:{
                'leftview@main':{
                    templateUrl:'tpls/friendlist.html'
                }
            }
        });
	$urlRouterProvider.otherwise('login');
})
.controller('loginCtrl',['$scope','$state','$http',function($scope,$state,$http){
	
	//login
	$scope.loginSub=function(){
		console.log($scope.loginMessage.message);
		$http({
			method:'post',
			url:'http://127.0.0.1:8080/authorization',
			headers: {'Content-Type': 'application/json'},
			data:$scope.loginMessage.message
		})
		.success(function(data){
				user_info=data;
//				console.log(data);
				$state.go('main',{},{reload:true});
			})
		.error(function(data){
			if(data=="invalid")
				alert('用户名或密码错误!');
			else
				alert('未知错误');
		}
		);
	}
	
	$scope.registerSub=function(){
		$http.post('http://127.0.0.1:8080/register',$scope.registerMessage.message)
	        .success(function(data) {
	            console.log(data);
//	            $scope.loginMessage.message.name=$scope.registerMessage.message.name;
//	            $scope.loginMessage.message.password=$scope.registerMessage.message.password;
//	            console.log($scope.loginMessage.message);
//	            $scope.loginSub();
				alert('注册成功！请登录');
				$state.go('login');
				})
	        .error(function(data){
	        		console.log(data);
	     		if(data=="info_duplicate")
	     			alert("用户名已存在！");
	     		else
	        		alert("未知错误!");
    });
	}
	
}])
.controller('mainCtrl1',function($scope,$state,$http){
	$scope.userMessage={
		"token" : '4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5',
		"user":{
			"id":"7f90f7ca-bb24-11e2-b2d0-6d8e359945e4",
			"name":"梓晨宝宝",
			"nick":"Vincent_Baby",  
			"sex":"男",
			"phone":"18812123456",
			"email":"15666@qq.com",
			"avatar":"image/figure.JPG",
			"sign_info":"咦~好恶心的" 
		    }
	};
	$scope.chatList={
		"friends":[]
	};

	var stompClient = null;
	
	//initial the user infomation
	(function(){
		console.log("the user: "+user_info['name']);
		$scope.userMessage['user']['name']=user_info['name'];
		console.log("the user2: "+$scope.userMessage['user']['name']);
	});
	$scope.userMessage['user']['name']=user_info['name'];
	$scope.userMessage['user']['avatar']='image/'+user_info['name']+'.jpg';
	
	
	
})
.controller('friendListCtrl',function($scope,$state,$http){
//	createlist();

	for (var i = 0; i<listarray.length;i++) {
        var list = $(
            "<div class='chatmessage' context-menu target='rightmenu'>"
            + "<a onclick='chatwith(this)' href='#/main/friendlist' >"
            + "<div class='chatmessage-1'>"
            + "<div class='chatmessage-1-image'>"
            + "<img src= '"+listarray[i].img_src+"' width='40px' height='40px'  />"
            + "</div>"
            + "<div class='chatmessage-1-info'>"
            + "<h4>" + listarray[i].name + "</h4>"
            + "</div>"
            + "</div>"
            + "</a>"
            + "</div>"
        );
        $(".myfriends").append(list);
    };
	
})
.controller('chatPageCtrl',function($scope,$state,$http){
	$scope.sendMessageSub=function(){
//		sendto();
		sendMessage();
	};
	
	$scope.chatPools=[
	];
	$scope.currentChat={
		'name':'',
		'message':[],
	};
	
	setInterval(function(){
		getMessage(user_info);
		console.log(friendClick);
		if(friendClick)
		{
			deleteChats();
			drawAllchats();
			friendClick = false;
		}
	},1000);
	
	//发送消息函数
	function sendMessage()
	{
    		if($(".main-right-writemessage").val()==""){
        		alert("内容不能为空！");
    		}
    		else if(chatWithThis=='')
    			alert("请选择一个联系人！");
    		else {
        		var msg = {
            		"fromUser": user_info['name'],
            		"content": $(".main-right-writemessage").val(),
            		"toUser": chatWithThis
        		};
        		console.log(msg);
        		addChatPools(msg.fromUser,false,msg.content);
        		var msg_str = JSON.stringify(msg);
        		postMessage(msg_str);
        		sendto(msg.content);
			$(".main-right-writemessage").val("");

       }
    }
    	function postMessage(msg_str){
    		$http.post('http://127.0.0.1:8080/chat',msg_str)
	        .success(function(data) {
	            console.log(data);
				})
	        .error(function(data){
	        		alert("连接断开！");
	        		$state.go('login');
	        });
    	}
    	
    	function getMessage(user_name){
//  		console.log(user_name);
    		$http.post('http://127.0.0.1:8080/messagelist',user_name)
	        .success(function(data) {
	        		var newMessage=false;
	            console.log(data);
	            if(data.length>0) newMessage=true;
	        		for(var i=0; i<data.length; i++){
	        			addChatPools(data[i].from_user,true,data[i].content)
	        		}
	        		if(newMessage){
	        			newMessage=false;
	        			for(i=0; i<data.length;i++) if(data[i].from_user==chatWithThis) getfrom(data[i].content);
	        		}
			})
	        .error(function(data){
//	        		alert("连接断开！");
//	        		$state.go('login');
	        });
    	}
    	
    	function addChatPools(friendName,from,content){
    		var i;
    		console.log($scope.chatPools);
    		for(i=0;i<$scope.chatPools.length&&$scope.chatPools[i]['name']!=friendName;i++);
    		if(!$scope.chatPools[i])	$scope.chatPools[i]={'name':friendName, 'message':[]};
		$scope.chatPools[i].message.push({
    			'from':from,
    			'content':content
    		});
    	}
    	function drawAllchats(){
    		var i;
    		for(i=0; i<$scope.chatPools.length && $scope.chatPools[i].name!=chatWithThis; i++);
    		console.log($scope.chatPools[i]);
    		if(!$scope.chatPools[i]) return;
    		var j;
    		for(j=0; j<$scope.chatPools[i].message.length; j++){
    			if($scope.chatPools[i].message[j].from){
    				getfrom($scope.chatPools[i].message[j].content);
    				console.log($scope.chatPools[i].message[j].content);	
    			}
    			else{
    				sendto($scope.chatPools[i].message[j].content);
    				console.log($scope.chatPools[i].message[j].content);	
    			}
    		}
    	}

})


