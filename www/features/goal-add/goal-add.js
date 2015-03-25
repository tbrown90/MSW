MSW.Controllers.controller('goalAddCtrl', ['$scope', function($scope) {
    $scope.addGoal = function addGoal(goal) {
        console.log('Add Goal: ', goal);   
    }
}]);