'use strict';
// Variables for acquiring the name of the user
var userName = '';
var getUserName = 'What is your name?';
var userAnswer;
var rightAnswerCount = 0;

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

  // Ask the question
  var currentQuestion = questionsAndAnswers[key];
  userAnswer = prompt(key);

  // Check that user entered a valid response
  while (!userAnswer.toLowerCase().match(/^(yes|no|y|n)$/)) {
    alert('Must answer with either: yes, no, y, or n.');
    userAnswer = prompt(key);
  }

  // Convert y/n answers into yes/no
  if (userAnswer.toLowerCase() === 'y') {
    userAnswer = 'yes';
  }
  else if (userAnswer.toLowerCase() === 'n') {
    userAnswer = 'no';
  }

  console.log('User\'s answer = ' + userAnswer.toLowerCase() + ', Actual answer = ' + currentQuestion['answer']);

  // Evaluate the response
  if (userAnswer.toLowerCase() === currentQuestion['answer']) { //correct answer
    alert(currentQuestion['correctResponse']);
    rightAnswerCount++;
    console.log('User has answered ' + rightAnswerCount + ' questions correctly.');
  } else { // wrong answer
    alert(currentQuestion['wrongResponse']);
  }
}
