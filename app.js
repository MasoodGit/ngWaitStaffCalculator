angular.module("waitStaffApp",['ngMessages'])
.controller("waitStaffController",function($scope) {

$scope.mealDetails = {
  basePrice:"",
  taxRate:"",
  tipPercentage:""
}

$scope.customerCharges = {
  subtotal:0.0,
  tipAmount:0.0
}

$scope.earnings = {
  tipTotal:0.0,
  mealCount:0.0
}

/* 
 * sets the object properties to zero.
 */
function clear (obj) {
  for(var prop in obj) {
    obj[prop] = 0.0;
  };
}

/* 
 * sets the object properties to empty string.
 * makes the form clean ( reset )
 */
function clearMealDetails(mealDetails) {
  $scope.mealDetailsForm.$setUntouched();
  mealDetails.basePrice = "";
  mealDetails.taxRate = "";
  mealDetails.tipPercentage = "";
  $scope.mealDetailsForm.$setPristine();
}

/* 
 * calculates the customer charges
 */
updateCustomerCharges = function() {
  var basePrice = $scope.mealDetails.basePrice;
  var taxRate = $scope.mealDetails.taxRate;
  var tipPercentage = $scope.mealDetails.tipPercentage;

  $scope.customerCharges.subtotal = basePrice + (basePrice * (taxRate/100 ));
  $scope.customerCharges.tipAmount = basePrice * (tipPercentage/100);
}

/* 
 * calculates the earning for the waitstaff
 */
updateEarnings = function(){
  $scope.earnings.tipTotal = $scope.earnings.tipTotal +
                             $scope.customerCharges.tipAmount;
  $scope.earnings.mealCount++;
}

/* 
 * calculates customercharges and waitstaff earnings
 * if the form is valid
 */
$scope.mealDetailsFormSubmit = function() {
  if($scope.mealDetailsForm.$valid) {
    updateCustomerCharges();
    updateEarnings();
  }
};

/* 
 * triggers field validation if form is 
 * submitted or if the field is blur 
 */
$scope.interacted = function(field) {
  return $scope.mealDetailsForm.$submitted || field.$touched;
};

/* 
 * called when user clicks cancel on 
 * the MealDetailsForm
 */
$scope.resetMealDetails = function() {
  clearMealDetails($scope.mealDetails);
}

/* 
 * resets everything on the App
 */
$scope.resetWaitStaffCalculator = function() {
  clearMealDetails($scope.mealDetails);
  clear($scope.customerCharges);
  clear($scope.earnings);
}

});
