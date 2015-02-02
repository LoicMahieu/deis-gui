angular.module('home')
.controller('LoginController', function($scope, $q, $location, LoginService){

  'use strict';

  $scope.submited = false;

  $scope.alerts = [];

  $scope.login = function() {
    var deferred = $q.defer();
    $scope.alerts = [];
    LoginService.login($scope.user.controller, $scope.user.name, $scope.user.password)
      .then(
        function() {
          deferred.resolve();
          $location.path('/home');
        },
        function(data) {
          deferred.reject();
          $scope.alerts.push({'type':'danger', 'msg':data});
        }
      );

      return deferred.promise;
  };
})
.directive('shakeForm', ['$animate', function($animate) {

  'use strict';

  return {
    require: '^form',
    scope: {
      submit: '&',
      submitted: '='
    },
    link: function (scope, elements, attrs, form) {
      element.on('submit', function() {
        scope.$apply(function() {
          scope.$parent.loginForm.submitted = true;
          if(form.$valid) {
            scope.$parent.login().then(
              function() {
                return;
              },
              function() {

              }
            );
          }

          $animate.addClass(element, 'shake', function() {
            $animate.removeClass(element, 'shake');
          });

        });
      });
    }
  };
}]);