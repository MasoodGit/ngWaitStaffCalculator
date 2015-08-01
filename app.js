var waitStaffApp = angular.module("waitStaffApp",['ngMessages','ngRoute']);

waitStaffApp.run(function($rootScope,$location){
  $rootScope.$on('$routeChangeError', function(){
    $location.path('/error');
  });
});

waitStaffApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.tpl.html'
  })
  .when('/newMeal',{
    templateUrl: 'newMeal.tpl.html',
    controller: 'WaitStaffController as WaitStaff'
  })
  .when('/myEarnings',{
    templateUrl: 'myEarnings.tpl.html',
    controller: 'MyEarningsController as Earnings'
  })
  .when('/error',{
    template: '<p>Error - Missing this Page...</p>'
  })
  .otherwise('/error');
});


/*
 * WaitStaffController :
 */
waitStaffApp.controller("WaitStaffController",function($scope,myEarningsService) {
  var WaitStaffController = this;
  WaitStaffController.data = myEarningsService;
  myEarningsService.resetMealDetails();

  /*
   * calculates customercharges and waitstaff earnings
   * if the form is valid
   */
  $scope.mealDetailsFormSubmit = function() {
    if($scope.mealDetailsForm.$valid) {
      myEarningsService.updateCustomerCharges();
      myEarningsService.updateEarnings();
    }
  };

  /*
   * triggers field validation if form is
   * submitted or if the field is blur
   */
  WaitStaffController.interacted = function(field) {
    return $scope.mealDetailsForm.$submitted || field.$touched;
  };

  /*
   * called when user clicks cancel on
   * the MealDetailsForm
   */
  WaitStaffController.resetMealDetails = function() {
    myEarningsService.resetMealDetails();
  };

  /*
   * calculates the customer charges
   */
  updateCustomerCharges = function() {
    myEarningsService.updateCustomerCharges();
  };

  /*
   * calculates the earning for the waitstaff
   */
  updateEarnings = function() {
    myEarningsService.updateEarnings();
  };
});

/*
 * MyEarningsController :
 */
waitStaffApp.controller('MyEarningsController',function(myEarningsService) {
  var EarningsController = this;
  EarningsController.data = myEarningsService;
  /*
  * resets everything on the App
  */
  EarningsController.resetWaitStaffCalculator = function() {
    myEarningsService.resetWaitStaffCalculator();
  };

});