angular
  .module('AdoptandShop.HomeController', ['ngRoute'])
  .controller('HomeController', [
    '$scope',
    HomeController
  ]);


function HomeController($scope) {
  console.log('home controller works!');
}
