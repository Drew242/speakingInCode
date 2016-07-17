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

// Team Factory

angular.module('speakCode')
  .factory('teamFactory', teamFactory)

function teamFactory() {

  var team1 = "";
  var team2 = "";

  function set(data) {
    if (!team1) {
      team1 = data;
    } else {
      team2 = data;
    }
  }

  function get() {
    return team1, team2;
  }

  return {
    set: set,
    get: get
  }

}

// About controller

angular.module('speakCode')
    .controller('aboutCtrl', aboutCtrl)

function aboutCtrl() {
  var about = this;

  about.text = 'Joe London is a Pirate';
}

// Code Controller

angular.module('speakCode')
  .controller('codeCtrl', codeCtrl);

function codeCtrl() {
  var code = this;

  code.banner = "Speaking in Code";
  code.button = 'Begin Game';
}

// Game Controller

angular.module('speakCode')
  .controller('gameCtrl', [
    'teamFactory',
    gameCtrl
  ]);

function gameCtrl(teamFactory) {
  var game = this;

  game.banner    = 'Welcome to the ThunderDome!!';
  game.grabTeams = teamFactory.get();

  game.pointPrompt = function(i) {
    console.log('points clicked');
    var points = prompt('How many points??');
    document.getElementById('score-' + i).innerHTML = points
  }
}

// Setup Controller

angular.module('speakCode')
  .controller('setupCtrl', [
    'teamFactory',
    setupCtrl
  ]);

function setupCtrl(teamFactory) {
  var setup = this;
  var teams = [];

  setup.team1 = '';
  setup.team2 = '';
  setup.text = "Moderator, please enter Teams";
  setup.ready = "READY!"

  setup.addTeam = function(team) {
    if (team) {
      teams.push(team);
      teamFactory.set(teams);
    }
    console.log(teams);
  }
}
