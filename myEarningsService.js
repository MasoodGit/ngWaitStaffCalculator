waitStaffApp
.service('myEarningsService', function() {
  var mealDetails = {
    basePrice:"",
    taxRate:"",
    tipPercentage:""
  };

  var customerCharges = {
    subtotal:0.0,
    tipAmount:0.0
  };

  var earnings = {
    tipTotal:0.0,
    mealCount:0.0
  };

  /*
   * sets the object properties to zero.
   */
  function clear (obj) {
    for(var prop in obj) {
      obj[prop] = 0.0;
    }
  }

  function clearMealDetails() {
    mealDetails.basePrice = "";
    mealDetails.taxRate = "";
    mealDetails.tipPercentage = "";
  }

  this.resetEarnings  = function() {
    earnings.tipTotal = 0.0;
    earnings.mealCount = 0.0;
  };

  this.resetMealDetails = function() {
    clearMealDetails();
  };

  /*
   * calculates the earning for the waitstaff
   */
  this.updateEarnings = function(tipAmount) {
    earnings.tipTotal += tipAmount;
    earnings.mealCount++;
  };

  /*
   * calculates the customer charges
   */
  this.updateCustomerCharges = function() {
    var basePrice = mealDetails.basePrice;
    var taxRate = mealDetails.taxRate;
    var tipPercentage = mealDetails.tipPercentage;

    customerCharges.subtotal = basePrice + (basePrice * (taxRate/100 ));
    customerCharges.tipAmount = basePrice * (tipPercentage/100);
  };


  this.mealDetails = function() {
    return mealDetails;
  };

  this.myEarnings = function () {
    return earnings;
  };

  this.customerCharges = function() {
    return customerCharges;
  };

  this.resetWaitStaffCalculator = function() {
    clear(customerCharges);
    clear(earnings);
    clearMealDetails(mealDetails);
  };
});