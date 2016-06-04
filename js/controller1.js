//angular.module('weChat').controller('loginCtrl',['$scope','$state',
//	function($scope,$state){
//		alert('hello');
//	}
//]);


////注册控制模块
//var registerCtrls=angular.module('registerCtrls', []);
//registerCtrls.controller('registerCtrl1',function($scope,$http,$state,$rootScope){
//	//登陆提交处理
//	$scope.loginSub=function(){
//		 $http.post('http://127.0.0.1:8080/authorization',$scope.loginMessage.message)
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
//	        	//console.log(data);
//  });
//	};
//	//注册提交处理
//	$scope.registerSub=function(){
//		 $http.post('http://119.29.26.47:8080/user/register',$scope.registerMessage.message)
//	        .success(function(data) {
//	            // console.log(data);
//	            // $state.go('main',{},{reload:true});
//	            $scope.loginMessage.message=data;
//	            $scope.loginSub();
//				})
//	        .error(function(data){
//	     		if(data.error=="duplicate_unique_property_exists")
//	     			alert("用户名以存在！");
//	     		else
//	        		alert("未知错误!");
//	        	//console.log(data);
//  });
//	};
//});