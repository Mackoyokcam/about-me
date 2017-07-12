'use strict';

// Variables for acquiring the name of the user
var userName = '';
var getUserName = 'What is your name?';
var userAnswer;
var rightAnswerCount = 0;
var numberOfTries;

// Set this to update how many tries are given for the number guessing game
var triesGranted = 4;

// Random number generated for number guessing question.
var randomNumber = 15;

// Sets the state, used for determining whether prompting for string or int
var numberQuestion = false;

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
    'wrongResponse': 'Wrooooong!'
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
    userAnswer = parseInt(prompt(key + ' (' + triesGranted + ' attempts remaining)'));
    numberQuestion = true; // set the state
  } else {
    userAnswer = prompt(key).toLowerCase();
  }

  // Check if numbered question is being asked
  if (!numberQuestion) {
    // Check that user entered a valid response
    while (!userAnswer.match(/^(yes|no|y|n)$/)) {
      alert('Must answer with either: yes, no, y, or n.');
      userAnswer = prompt(key);
    }
  } else {
    while (typeof userAnswer !== 'number') {
      alert('Answer must be a number between 1 and 20');
    }
  }

  // Convert y/n answers into yes/no
  if (userAnswer === 'y') {
    userAnswer = 'yes';
  }
  else if (userAnswer === 'n') {
    userAnswer = 'no';
  }

  console.log('User\'s answer = ' + userAnswer + ', Actual answer = ' + currentQuestion['answer']);

  if (numberQuestion) {
    numberOfTries = triesGranted - 1;
  }

  // Evaluate the response
  while (numberOfTries > 0) {
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
          alert(currentQuestion['wrongReponse' + '(Higher!)']);
        } else {
          alert(currentQuestion['wrongResponse' + '(Lower!)']);
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
        }
      }
    }
  }
  // Done with number guessing game
  if (numberQuestion) {
    numberQuestion = false;
  }
}


alert('You finished the game ' + userName + '! You answered ' + rightAnswerCount + ' questions correctly');
