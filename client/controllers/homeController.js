angular
  .module('AdoptandShop.HomeController', ['ngRoute'])
  .controller('HomeController', [
    '$scope',
    '$http',
    HomeController
  ]);


function HomeController($scope, $http) {
  $scope.animals;
  $scope.search;
  $scope.sortBy;
  $http.get('/culvercity')
    .then(res => $scope.animals = res.data)
    .catch(err => console.log(err));
}
