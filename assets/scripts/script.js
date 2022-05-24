// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters
// WHEN asked for character types to include in the password
// THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page

var passwordProperties = {
  length: 8, // 8 to 128 characters
  hasLowercase: false,
  hasUppercase: false,
  hasNumber: false,
  hasSpecialChars: false,
  pass: ""
}

var rng = function(min, max) {
  var value = Math.floor(Math.random() * max) + min;

  return value;
}

// function to generate lowercase
var genLowercase = function() {
  var letters = "abcdefghijklmnopqrstuvwxyz";

  return letters[rng(0, letters.length - 1)];
}

// function to generate uppercase
var genUppercase = function() {
  return genLowercase().toUpperCase();
}

// function to generate number
var genNumber = function() {
  return String(rng(0, 9));
}

// function to generate special character
var genSpecialChar = function() {
  var character = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"

  return character[rng(0, character.length - 1)];
}

// Assignment code here
var generatePassword = function () {  
  var length = 10;

  var password = "";
  // password criteria 8 - 128 characters
  // determine how many times to repeat random function based on length selection
  for (i = 0; i < length; i++) {
    // randomly determine what type to generate (lowercase/uppercase/number/specialChar)
    var type = rng(1, 4)

    switch (type){
      // lowercase
      case 1:
        password += genLowercase();
        break;
        
      // uppercase
      case 2:
        password += genUppercase();
        break;
        
      // number
      case 3:
        password += genNumber();
        break;
        
      // special character
      case 4:
        password += genSpecialChar();
        break;
        
      // for whatever reason the rng generates anything but a 1, 2, 3, 4
      default:
        password += genLowercase();
        break;
        
    }
  }
      return password;
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);