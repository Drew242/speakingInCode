angular.module('speakCode', [ngRoute]);

angular.module('speakCode').config(function ($routeProvider) {
    $routeProvider.when( '/', {
        templateUrl: '/views/main.html'
    });
    $routeProvider.when( '/setup', {
        templateUrl: '/views/setup.html'
    });
    $routeProvider.when( '/about', {
        templateUrl: '/views/about.html',
        controller : 'aboutCtrl',
    });

    // the default route
    $routeProvider
      .otherwise({
        redirectTo: '/about'
      });
  })
;
