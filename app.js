"use strict";
// Variables for acquiring the name of the user
var userName;
var getUserName = "What is your name?";
var userAnswers = [];

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
for (var i = 0; i < questions.length; i++) {
  userAnswers.push(prompt(questions[i]));
  alert("You entered: " + userAnswers[i]);
}

// Console logs
