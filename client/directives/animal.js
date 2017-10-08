angular
  .module('AdoptandShop.Animal', [])
  .directive('animal', [animal]);

// use ng-repeat to loop through messages array and duplicate html for every msg object
// use orderBy filter to sort messages
// use filter filter to search messages

function animal() {
  return {
    restrict: 'E',
    template: `
      <div class="animal" ng-repeat="animal in animals | orderBy: sortBy | filter: search">
        <div class="info-container">
          <a href="{{animal.profileLink}}"><img class="pic" src="{{animal.pic}}" /></a>
          <div class="info">
            <h2 class="name">{{animal.name}}</h2>
            <span class="breed">{{animal.breed}} | </span>
            <span class="sex">{{animal.sex}} | </span>
            <span class="age">{{animal.age}}</span>
            <p class="description">{{animal.description}}</p>
            <p class="location">Location: {{animal.location}}</p>
          </div>
        </div>
        </div>
        `
  };
}
