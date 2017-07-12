'use strict';

// Variables for acquiring the name of the user
var userName = '';
var getUserName = 'What is your name?';

// User Variables
var userAnswer;
var rightAnswerCount = 0;
var numberOfTries;

// Set this to update how many tries are given for the number guessing game
var numberTriesGranted = 4;
var livedTriesGranted = 6;

// Random number generated for number guessing question.
var min = Math.ceil(0);
var max = Math.floor(20);
var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

// Sets the state, used for determining whether playing number guessing or where I lived game.
var numberQuestion = false;
var livedQuestion = false;

// Yes or no questions for guessing game
var questionsAndAnswers = {
  'Is my favorite color blue?': {
    'answer': 'yes',
    'correctResponse': 'Blue is my favorite color!',
    'wrongResponse': 'Wrong! I love blue...'
  },
  'Do I like to play video games?': {
    'answer': 'yes',
    'correctResponse': 'Yep! Every video game there is!',
    'wrongResponse': 'Nope! Why would you think that?!'
  },
  'Do I have 2 dogs as pets?': {
    'answer': 'no',
    'correctResponse': 'Correct! I have three dogs.',
    'wrongResponse': 'Trick question! I have three dogs!'
  },
  'Do I have a cat as a pet?': {
    'answer': 'no',
    'correctResponse': 'Correct! Cat\'s are evil!',
    'wrongResponse': 'Wrong! Cat\'s are evil!'
  },
  'Is "Troy" the best movie out there?': {
    'answer': 'yes',
    'correctResponse': 'Of course it is.',
    'wrongResponse': 'Have you even seen it?!? I demand you watch it right now.'
  },
  'Pick a number between 0 and 20.': {
    'answer': randomNumber,
    'correctResponse': 'You got it right! ' + randomNumber + ' is the magic number.',
    'wrongResponse': 'Wrong!'
  },
  'Which states have I lived in besides Washington?': {
    'answer': ['arizona', 'california', 'pennsylvania', 'new jersey'],
    'correctResponse': 'You got it!',
    'wrongResponse': 'Nope, I have not lived there.'
  }
};

// Get user name, loop in case they just press enter.
while (userName === '') {
  userName = prompt(getUserName);
}
console.log('The user\'s name is ' + userName);
alert('Ok ' + userName + ', let\'s see if you can guess 5 things about me. Ready?');

// Cycle through questions and responses, get user answers
for (var key in questionsAndAnswers) {
  numberOfTries = 1;
  // Ask the question
  var currentQuestion = questionsAndAnswers[key];
  // Check if it's the number guessing question
  if (currentQuestion['answer'] === parseInt(currentQuestion['answer'], 10)) {
    userAnswer = parseInt(prompt(key + ' (' + numberTriesGranted + ' attempts remaining)'));
    numberQuestion = true; // set the state
  } else if (currentQuestion['answer'].constructor === Array) {   // Check if it's the 'where have i lived' question
    livedQuestion = true;
    userAnswer = prompt(key + ' (' + livedTriesGranted + ' attempts remaining)').toLowerCase();
  } else {
    userAnswer = prompt(key).toLowerCase();
  }

  // Validate numbered question
  if (numberQuestion) {
    while (isNaN(userAnswer) || userAnswer < 0 || userAnswer > 20) {
      alert('Answer must be a number between 1 and 20');
      userAnswer = parseInt(prompt(key + ' (' + numberTriesGranted + ' attempts remaining)'));
    }
  } else if (!livedQuestion){ // validate normal yes/no question
    while (!userAnswer.match(/^(yes|no|y|n)$/)) {
      alert('Must answer with either: yes, no, y, or n.');
      userAnswer = prompt(key).toLowerCase();
    }
  }
  // No validation for Where I Lived question


  // Convert y/n answers into yes/no
  if (userAnswer === 'y') {
    userAnswer = 'yes';
  }
  else if (userAnswer === 'n') {
    userAnswer = 'no';
  }

  console.log('User\'s answer = ' + userAnswer + ', Actual answer = ' + currentQuestion['answer']);

  // Set the number of attempts
  if (numberQuestion) {
    numberOfTries = numberTriesGranted;
  }
  if (livedQuestion) {
    numberOfTries = livedTriesGranted;
  }

  // Evaluate the response
  while (numberOfTries > 0) {
    if (!livedQuestion) {
      if (userAnswer === currentQuestion['answer']) { //correct answer
        alert(currentQuestion['correctResponse']);
        rightAnswerCount++;
        numberOfTries = 0;
        console.log('User has answered ' + rightAnswerCount + ' questions correctly.');
      } else { // wrong answer
        numberOfTries--;
        if (!numberQuestion) {
          alert(currentQuestion['wrongResponse']);
        } else {
          // Higher or Lower algorithm
          if (userAnswer < currentQuestion['answer']) {
            alert(currentQuestion['wrongResponse'] + ' (Higher!)');
          } else {
            alert(currentQuestion['wrongResponse'] + ' (Lower!)');
          }

          // If more attempts allowed, ask question again.
          if (numberOfTries !== 0) {
            userAnswer = parseInt(prompt(key + ' (' + numberOfTries + ' attempts remaining)'));

            console.log('User answer: ' + userAnswer);
            // Validate user input
            while (isNaN(userAnswer) || userAnswer < 0 || userAnswer > 20) {
              alert('Answer must be a number between 1 and 20');
              userAnswer = parseInt(prompt(key + ' (' + numberOfTries + ' attempts remaining)'));
            }
          } else {
            alert('Sorry, you are out of attempts. The number was ' + currentQuestion['answer']);
          }
        }
      }
    } else {  // For where i lived question
      if (currentQuestion['answer'].includes(userAnswer)) {
        alert(currentQuestion['correctResponse'] + ' The correct answers were: ' + currentQuestion['answer']);
        rightAnswerCount++;
        numberOfTries = 0;
        console.log('User has answered ' + rightAnswerCount + ' questions correctly.');
      } else {
        alert(currentQuestion['wrongResponse']);
        numberOfTries--;
        if (numberOfTries !== 0) {
          userAnswer = prompt(key + ' (' + numberOfTries + ' attempts remaining)').toLowerCase();

          console.log('User answer: ' + userAnswer);
          // No current validation, user can input whatever right now.
        } else {
          alert('Sorry, you are out of attempts. Here were the answers: ' + currentQuestion['answer'].toString());
        }
      }
    }
  }
  // Done with number guessing game
  if (numberQuestion) {
    numberQuestion = false;
  }

  if (livedQuestion) {
    livedQuestion = false;
  }
}

// In the future, add different alerts for different user right answers here!
alert('You finished the game ' + userName + '! You answered ' + rightAnswerCount + ' questions correctly');
