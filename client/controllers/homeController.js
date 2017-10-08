angular
  .module('AdoptandShop.HomeController', ['ngRoute'])
  .controller('HomeController', [
    '$scope',
    '$http',
    HomeController
  ]);


function HomeController($scope, $http, $apply) {
  const urls = ['/culvercity', '/lakewood'];
  $scope.animals = [];
  $scope.search;
  $scope.sortBy;
  const promises = urls.map(url => $http.get(url));
  Promise.all(promises)
    .then(res => {
      $scope.animals = res.reduce((a, c) => [...a, ...c.data], []);
      //need to look up what this does
      $scope.$apply();
    })
    .catch(err => console.log(err));
}
