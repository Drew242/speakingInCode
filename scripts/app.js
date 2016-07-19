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

// Factories

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

angular.module('speakCode')
  .factory('easyProblems', easyProblems)

function easyProblems() {

  function rando(data) {
    return data[Math.floor(Math.random()*data.length)];
  };

  var problems = [{
    problem: 'var fruits = ["Banana", "Orange", "Apple", "Mango"];document.getElementById("demo").innerHTML = fruits;'
  }, {
    problem: 'function myFunction() {fruits.pop();document.getElementById("demo").innerHTML = fruits;}'
  }, {
    problem: 'function myFunction() {var text = "";var i;for (i = 0; i < 5; i++) {text += "The number is " + i + "<br>";}document.getElementById("demo").innerHTML = text;}'
  }];

  // rando(problems);

  return {
    problems: problems,
    rando: rando
  }
}

angular.module('speakCode')
  .factory('mediumProblems', mediumProblems)

function mediumProblems() {

  function rando(data) {
    return data[Math.floor(Math.random()*data.length)];
  };

  var problems = [{
    problem: 'module.service("userService", function(){this.users = ["John", "James", "Jake"];});'
  }, {
    problem: 'module.factory("userService", function(){var fac = {};fac.users = ["John", "James", "Jake"];return fac;});'
  }, {
    problem: 'app.controller("CalculatorController", function($scope, CalculatorService) {$scope.doSquare = function() {$scope.answer = CalculatorService.square($scope.number);}$scope.doCube = function() {$scope.answer = CalculatorService.cube($scope.number);}});'
  }]

  return {
    problems: problems,
    rando: rando
  }
}

angular.module('speakCode')
  .factory('hardProblems', hardProblems)

function hardProblems() {

  function rando(data) {
    return data[Math.floor(Math.random()*data.length)];
  };

  var problems = [{
    problem: '$scope.changeColor = function(person, bool) {if(bool === true) {$scope.personColour = {color: "#"+person.colour};} else if (bool === false) {$scope.personColour = {color: "white"}; //or, whatever the original color is}};'
  }, {
    problem: '<ul ng-repeat="bday in bdays"><li><span ng-hide="editing" ng-click="editing = true">{{bday.name}} | {{bday.date}}</span><form ng-show="editing" ng-submit="editing = false"><label>Name:</label><input type="text" ng-model="bday.name" placeholder="Name" ng-required/><label>Date:</label><input type="date" ng-model="bday.date" placeholder="Date" ng-required/><br/><button class="btn" type="submit">Save</button><a class="btn" ng-click="remove()">Delete</a></form></li></ul>'
  }, {
    problem: 'app.controller("MyCtrl", function($scope) {$scope.modalShown = false;$scope.toggleModal = function() {$scope.modalShown = !$scope.modalShown;};});'
  }]

  return {
    problems: problems,
    rando: rando
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
    'easyProblems',
    'mediumProblems',
    'hardProblems',
    gameCtrl
  ]);

function gameCtrl(teamFactory, easyProblems, mediumProblems, hardProblems) {
  var game = this;

  game.banner        = 'Welcome to the ThunderDome!!';
  game.grabTeams     = teamFactory.get();
  game.randomProblem = "This is where a code snippet will go";

  game.pointPrompt = function(i) {
    console.log('points clicked');
    var points = prompt('How many points??');
    document.getElementById('score-' + i).innerHTML = points
  }

  game.easy = function() {
    game.randomProblem = easyProblems.rando(easyProblems.problems);
  }

  game.medium = function() {
    game.randomProblem = mediumProblems.rando(mediumProblems.problems);
  }

  game.hard = function() {
    game.randomProblem = hardProblems.rando(hardProblems.problems);
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

  setup.teams = teams
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
