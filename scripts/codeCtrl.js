angular.module('speakCode')
  .controller('codeCtrl', codeCtrl);

function codeCtrl() {
  var code = this;

  code.banner = "Speaking in Code";
  code.button = 'Begin Game';
}
