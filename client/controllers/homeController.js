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
  const promises = urls.map(url => $http.get(url).catch(() => console.log(err)));
  Promise.all(promises)
    .then(res => {
      $scope.animals = res.reduce((a, c) => [...a, ...c.data], []);
      $scope.$apply();
      const el = document.getElementsByTagName('html')[0];
      el.className = el.className.replace(/loading/, ' ');
    })
    .catch(err => console.log(err));
}
