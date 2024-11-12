import {commonPasswords} from "./commonPasswords.js";

console.log("app.js is loaded!");

let score = 0;

function validatePassword(password, username) {
  const lengthCheck = password.length >= 8 && password.length<=20;
  const numberCheck = /[0-9]/.test(password);
  const lowerCaseCheck = /[a-z]/.test(password);
  const upperCaseCheck = /[A-Z]/.test(password);

  const commonPassCheck = !commonPasswords.includes(password.toLowerCase());
  const usernameCheck = password.toLowerCase() !== username.toLowerCase();
  const isEmpty = password.trim() === "";

  updateValidationFeedback(lengthCheck, numberCheck, lowerCaseCheck, upperCaseCheck, commonPassCheck, usernameCheck, isEmpty);

  score = calculatePasswordScore(lengthCheck, numberCheck, lowerCaseCheck, upperCaseCheck);
  updateScore(score);
}

function updateValidationFeedback(lengthCheck, numberCheck, lowerCaseCheck, upperCaseCheck, commonPass, usernameCheck, isEmpty) {

  updateFeedback('lengthCheck', lengthCheck);

  updateFeedback('numberCheck', numberCheck);

  updateFeedback('lowerCaseCheck', lowerCaseCheck);

  updateFeedback('upperCaseCheck', upperCaseCheck);


  updateFeedback2('commonPasswordCheck',commonPass, 'Password is too common');

  updateFeedback2('usernameCheck',usernameCheck, 'Your password cannot be the same as your username');

  updateFeedback2('emptyCheck', !isEmpty, 'Password is required');


}

function calculatePasswordScore(lengthCheck, numberCheck, lowerCaseCheck, upperCaseCheck) {
  let point = 0;

  if (lengthCheck) point += 1;
  if (numberCheck) point += 1;
  if (lowerCaseCheck) point += 1;
  if (upperCaseCheck) point += 1;

  return point;
}

function updateScore(score) {
  const scoreElement = document.getElementById('passwordStrength');
  scoreElement.textContent = `Score: ${score}/4`;
  console.log(score);

  scoreElement.style.display = 'block';

  updateStrengthBar(score);
}

function updateStrengthBar(score) {
  const widthPower = ["1%", "25%", "50%", "75%", "100%"];
  const colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];
  const power = document.getElementById("power-point");

  power.style.width = widthPower[score];
  power.style.backgroundColor = colorPower[score];
}

function updateFeedback(id, isValid) {
  const element = document.getElementById(id);

  if (isValid) {
    element.classList.add('valid');

  } else {
    element.classList.remove('valid');
  }

}

function updateFeedback2(id, isValid, message) {
  const element = document.getElementById(id);
  element.textContent = message;
  if (isValid) {
    element.classList.remove('appear');
    element.style.display = 'none';
  } else {
    element.classList.add('appear');
    element.style.display = 'block';
  }
}

document.getElementById('password').addEventListener('input', function() {
  const password = this.value;
  const username = document.getElementById('username').value;
  validatePassword(password, username);
});
