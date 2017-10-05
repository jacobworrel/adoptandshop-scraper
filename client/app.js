//create 'myApp' application module
//define dependent modules inside array
const app = angular
  .module('myApp', [
    'ngRoute',
    'AdoptandShop.HomeController',
  ]);


//configuration block that gets run during provider registration and configuration phase
app.config(configFunction);

//$routeProvider: component used for configuring routes
//$locationProvider: component used to configure how app deep linking paths are stored
function configFunction($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './home.html',
    controller: 'HomeController'
  });
}
