// Code goes here
'use strict';

/*
 *  * angular-socialshare v0.0.1
 *   * ♡ CopyHeart 2014 by Dayanand Prabhu http://djds4rce.github.io
 *    * Copying is an act of love. Please copy.
 *     */

angular.module('djds4rce.angular-socialshare', [])
.factory('$FB',['$window',function($window){
  return {
    init: function(fbId){
      if(fbId){
        this.fbId = fbId;
        $window.fbAsyncInit = function() {
          FB.init({ 
            appId: fbId, 
            channelUrl: 'app/channel.html', 
            status: true, 
            xfbml: true 
          });
        };
        (function(d){
          var js,           
          id = 'facebook-jssdk', 
          ref = d.getElementsByTagName('script')[0];
          if (d.getElementById(id)) {
            return;
          }

          js = d.createElement('script'); 
          js.id = id; 
          js.async = true;
          js.src = "//connect.facebook.net/en_US/all.js";

          ref.parentNode.insertBefore(js, ref);

        }(document));
      }
      else{
        throw("FB App Id Cannot be blank");
      }
    }
  };

}]).directive('facebook', ['$timeout','$http', function($timeout,$http) {
  return {
    scope: {
      shares: '=' 
    }, 
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function(scope, element, attr) {
      if(attr.shares){
        $http.get('https://api.facebook.com/method/links.getStats?urls='+attr.url+'&format=json').success(function(res){
          scope.shares = res[0].share_count;
        }).error(function(){
          scope.shares = 0;
        });
      }
      $timeout(function(){
        element.bind('click',function(){
          FB.ui(
            {method: 'feed',
              name: attr.name,
              link: attr.url,
              picture: attr.pictureUrl,
              caption: attr.caption
          });
        });
      });
    }
  };
}]).directive('twitter',['$timeout',function($timeout) {
  return {
    link: function(scope, element, attr) {
      $timeout(function() {
        twttr.widgets.createShareButton(
          attr.url,
          element[0],
          function() {}, {
            count: attr.count,
            text: attr.text,
            via: attr.via,
            size: attr.size
          }
        );
      });
    }
  };
}]).directive('linkdin', ['$timeout','$http', '$window',function($timeout,$http,$window) {
  return {
    scope: {
      shares: '=' 
    }, 
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function(scope, element, attr) {
      if(attr.shares){
        $http.jsonp('http://www.linkedin.com/countserv/count/share?url='+attr.link+'&callback=JSON_CALLBACK&format=jsonp').success(function(res){
          scope.shares = res.count;
        }).error(function(){
          scope.shares = 0;
        });
      }
      $timeout(function(){
        element.bind('click',function(){
          $window.open("//www.linkedin.com/shareArticle?mini=true&url="+attr.url+"&title="+attr.title+"&summary="+attr.summary);
        });
      });
    }
  };
}]).directive('gplus',[function(){
  return {
    link: function(scope,element,attr){
      if(typeof gapi == "undefined"){
        (function() {
          var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
          po.src = 'https://apis.google.com/js/plusone.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
        })();
      }
    }
  };
}]);
