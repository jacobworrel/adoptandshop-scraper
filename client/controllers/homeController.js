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
      const el = document.getElementsByClassName('loading')[0];
      el.style.display = 'none';
    })
    .catch(err => console.log(err));
}
