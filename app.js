"use strict";
// Variables for acquiring the name of the user
var userName;
var getUserName = "What is your name?";
var userAnswer;
var rightAnswerCount = 0;

// Yes or no questions for guessing game
var questions = [
  "Is my favorite color blue?",
  "Do I like to play video games?",
  "Do I have 2 dogs as pets?",
  "Do I have a cat as a pet?",
  "Is 'Troy' the best movie out there?"
];

// Answers to guessing game (Match indices with questions array!)
var answers = [
  "yes",
  "yes",
  "no",
  "no",
  "yes",
];

// Questions and Responses
userName = prompt(getUserName);
alert("Ok " +  userName + ", let's see if you can guess 5 things about me. Ready?");

for (var i = 0; i < questions.length; i++) {
  userAnswer = prompt(questions[i]);

  console.log("User's answer = " + userAnswer.toLowerCase() + ", Actual answer = " + answers[i]);

  if (userAnswer.toLowerCase() === answers[i]) {
    alert("You got it right!");
    rightAnswerCount++;
  } else {
    alert("You got it wrong :(");
  }
}

// Console logs
console.log("The user's name is " + userName);
console.log("The user answered " + rightAnswerCount + " questions correctly");
