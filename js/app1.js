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
	//do anything
	$scope.loginSub=function(){
		console.log($scope.loginMessage.message);
		$http({
			method:'post',
			url:'http://127.0.0.1:8080/authorization',
			headers: {'Content-Type': 'application/json'},
			data:$scope.loginMessage.message
		})
		.success(function(data){
				
				$state.go('main',{},{reload:true});
			})
		.error(function(){
			
			alert('用户名或密码错误!');
		}
		);
		

//		$http.post('http://127.0.0.1:8080/authorization',$scope.loginMessage.message)
//	        .success(function(data, status, headers, config) {
//	            $scope.userMessage.token=headers('x-auth-token');
//	            $
//	            // console.log(headers('x-auth-token'));
//	            $scope.getUserMessage();
//	            // while($scope.chatList.friends==null);
//	            $state.go('main',{},{reload:true});
//				})
//	        .error(function(data, status, headers, config){
//	     		if(data.error=="invalid_grant")
//	     			alert("用户名或密码错误！");
//	     		else
//	        		alert("未知错误!");
	}
//	$state.go('main',{},{reload:true});
	
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
	$scope.chatPools=[{
			"name":"",
			"message":[
				{
					'from':true,
					'content':""
				}
			]
		}
	];
	$scope.currentChat={
		'name':'',
		'message':[],
	};
	var stompClient = null;
	
});
