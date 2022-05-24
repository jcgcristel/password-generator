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

var pwdProperties = {
  length: 8, // 8 to 128 characters
  hasLowercases: true,
  hasUppercases: true,
  hasNumbers: true,
  hasSpecialChars: true,
  password: "",

  // functions
  setLength: function() {
    var length = window.prompt("How many characters do you want your password (8 to 128) to be?");
    
    if (length >= 8 && length <= 128){
      this.length = length;
    }
    else {
      window.alert("Invalid input. Please use a number between 8 and 128.");
      this.setLength();
    }
  },

  // determine characteristics of password
  setPwdCharactertistics: function() {
    // lowercases?
    pwdProperties.hasLowercases = window.confirm("Do you want your password to account for LOWERCASES?");

    // uppercases?
    pwdProperties.hasUppercases = window.confirm("Do you want your password to account for UPPERCASES?")

    // numbers?'
    pwdProperties.hasNumbers = window.confirm("Do you want your password to account for NUMBERS?");
    
    // special characters?
    pwdProperties.hasSpecialChars = window.confirm("Do you want your password to account for SPECIAL CHARACTERS?");
  },

  // check to ensure not all properties are false
  checkProperties: function() {
    console.log(this);

    if (
      this.hasLowercases == false &&
      this.hasUppercases == false &&
      this.hasNumbers == false &&
      this.hasSpecialChars == false) {
        window.alert("You must at least agree to have one property of having lowercases, uppercases, numbers, or special characters. Please try again.")
        this.setPwdCharactertistics();
      }
  }
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

// function to generate a character to specifications
var generateCharacter = function() {
  var type = rng(1, 4)

  switch (type){
    // lowercase
    case 1:
      // will rerun function if lowercases are not part of the criteria
      if (pwdProperties.hasLowercases == false) {
        generateCharacter();
        break;
      }
      pwdProperties.password += genLowercase();
      break;
      
    // uppercase
    case 2:
      // will rerun function if uppercases are not part of the criteria
      if (pwdProperties.hasUppercases == false) {
        generateCharacter();
        break;
      }
      pwdProperties.password += genUppercase();
      break;
      
    // number
    case 3:
      // will rerun function if numbers are not part of the criteria
      if (pwdProperties.hasNumbers == false) {
        generateCharacter();
        break;
      }

      pwdProperties.password += genNumber();
      break;
      
    // special character
    case 4:
      // will rerun function if special characters are not part of the criteria
      if (pwdProperties.hasSpecialChars == false) {
        generateCharacter();
        break;
      }

      pwdProperties.password += genSpecialChar();
      break;
  }
}


var generatePassword = function () {
  pwdProperties.password = ""; // reset password
  pwdProperties.setLength();
  pwdProperties.setPwdCharactertistics();
  pwdProperties.checkProperties();

  // determine how many times to repeat random function based on length selection
  for (i = 0; i < pwdProperties.length; i++) {
    generateCharacter();    
  }

      return pwdProperties.password;
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