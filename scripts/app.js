angular.module('speakCode', ['ngRoute']);

// Routes

angular.module('speakCode').config(function ($routeProvider) {
    $routeProvider.when( '/', {
        templateUrl: '/views/main.html'
    });
    $routeProvider.when( '/setup', {
        templateUrl: '/views/setup.html'
    });
    $routeProvider.when( '/about', {
        templateUrl: '/views/about.html',
        controller : 'aboutCtrl'
    });
    $routeProvider.when( '/game', {
        templateUrl: '/views/game.html',
        controller : 'gameCtrl'
    });

    // the default route
    $routeProvider
      .otherwise({
        redirectTo: '/main'
      });
});

// Navigation Controller

angular.module('speakCode')
  .controller('NavCtrl', ['$scope', '$location', navCtrl])

function navCtrl( $scope, $location ) {
    var nc = this;

    $scope.$on('$routeChangeSuccess', function() {
        nc.locationPath = $location.path();
        console.log('locationPath: ' + nc.locationPath );
    });

}

// About controller

angular.module('speakCode')
    .controller('aboutCtrl', aboutCtrl)

function aboutCtrl() {
  var about = this;

  about.text = 'Joe London is a Pirate';
}

// code Controller

angular.module('speakCode')
  .controller('codeCtrl', codeCtrl);

function codeCtrl() {
  var code = this;

  code.banner = "Speaking in Code";
  code.button = 'Begin Game';
}

// Game Controller

angular.module('speakCode')
  .controller('gameCtrl', gameCtrl);

function gameCtrl() {
  var game = this;

  game.banner = 'Welcome to the ThunderDome!!';
}

// Setup Controller

angular.module('speakCode')
  .controller('setupCtrl', setupCtrl);

function setupCtrl() {
  var setup = this;

  setup.text = "Moderator, please enter team names"; 
}
