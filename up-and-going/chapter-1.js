//Define constants
// Sales tax in Chicago is 9.25%
const SALES_TAX = .0925;
// Phones are $99.99
const PHONE_PRICE= 99.99;
// Accessories are $9.99
const ACCESSORY_PRICE = 9.99;

/**
 * Returns user input from the specified prompt.
 * Detects whether we are running in Node or in a browser.
 * If running in Node, use stdin/stdout.
 * If running in a browser, use `prompt()`.
 * 
 * @method promptUser
 * @param {String} promptText Prompt to show the user
 * @return {String} User input from stdin
**/
var promptUser = function PromptUser(promptText) {
  var input;
  var answer;
  // Detect if we are running in a browser.
  if (typeof(module) !== 'undefined' && module.exports) {
    // We are in Node.js
    // Import readline, create an interface for reading and writing
    var readline = require('readline');

    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.question(promptText, function(answer) {
      rl.close();
      return answer;
    });
  } else {
    // We are in a browser
    var input = prompt(promptText);
    return input;
  }
};

/**
 * Returns total after tax given the subtotal of the sale.
 * 
 * @method calculateTotal
 * @param {Number} subtotal Total sale amount without tax
 * @param {Number} salesTax Sales tax rate
 * @return {Number} Total sale amount including tax
*/
var calculateTotal = function CalculateTotal(subtotal, salesTax) {
  return subtotal * (1 + salesTax);
}

/**
 * Returns the the formatted amount for printing to the screen.
 * 
 * @method formatAmount
 * @param {Number} amount The amount to format
 * @return {String} Formatted total for printing
*/
var formatAmount = function FormatAmount(amount) {
  return "\$" + amount.toFixed(2);
}

/**
 * Calculates the number of phones you can buy.
 * 
 * @method buyPhones
 * @param {Number} bankBalance Amount of money in the bank
 * @param {Number} spendingThreshold Mental threshold of how much one can spend
 * @param {Number} phonePrice Price of phone
 * @param {Number} accessoryPrice Price of accessory
 * @return {Object} JSON representation of the amount spent, number of phones
 *     purchased, and number of accessories bought.
*/
var buyPhones =
    function BuyPhones(
        bankBalance, spendingThreshold, phonePrice, accessoryPrice, salesTax) {
  var amount = phonesPurchased = accessoriesPurchased = 0;
  while (amount + calculateTotal(phonePrice, salesTax) < bankBalance) {
    amount += calculateTotal(phonePrice, salesTax);
    phonesPurchased += 1;

    if (amount < spendingThreshold) {
      amount += calculateTotal(accessoryPrice, salesTax);
      accessoriesPurchased += 1;
    };
  }
  var purchase = {
	      "amount": amount,
	      "phones": phonesPurchased,
	      "accessories": accessoriesPurchased
  }
  return purchase;
};

const BANK_BALANCE = promptUser('How much money is in your bank account? ');
const SPENDING_THRESHOLD =
    promptUser('What is your mental spending threshold? ');

var shoppingSpree =
    buyPhones(BANK_BALANCE, SPENDING_THRESHOLD, PHONE_PRICE,
        ACCESSORY_PRICE, SALES_TAX);
console.log("You spent " + formatAmount(shoppingSpree.amount)
    + " and bought " + shoppingSpree.phones + " phones and "
    + shoppingSpree.accessories + " accessories.");