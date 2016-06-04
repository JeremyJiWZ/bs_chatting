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
		$http.post('http:127.0.0.1:8080/authorization',$scope.loginMessage.message)
			.success(function(){
				
				$state.go('main',{},{reload:true});
			})
			.error(function(){
				
				
				alert('用户名或密码错误');
			});
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
	
}]);
