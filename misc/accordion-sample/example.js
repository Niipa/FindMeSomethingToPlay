angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('AccordionDemoCtrl', function ($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title:"1",
      data: "someData"
    },
    {
      title:"2",
      data: "someData2"
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    $scope.groups.push({title:"3", data: "klajsdf"});
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});
