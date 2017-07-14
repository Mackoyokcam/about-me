'use strict';

window.onload = function() {
  // Variables for acquiring the name of the user
  var userName = '';
  var getUserName = 'What is your name?';

  // User Variables
  var userAnswer;
  var rightAnswerCount = 0;
  var numberOfTries;
  var validAnswer;

  // Set this to update how many tries are given for the number guessing game
  var numberTriesGranted = 10;
  var livedTriesGranted = 6;

  // Set this to update the start and end numbers for number guessing game
  var startNum = 0;
  var endNum = 100;
  var numberGameKey = 'Pick a number between ' + startNum + ' and ' + endNum + '.';
  console.log(numberGameKey);

  // Random number generated for number guessing question.
  var min = Math.ceil(startNum);
  var max = Math.floor(endNum);
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
    numberGameKey: {
      'answer': randomNumber,
      'correctResponse': 'You got it right! ' + randomNumber + ' is the magic number.',
      'wrongResponse': 'Wrong!'
    },
    'Which states have I lived in besides Washington?': {
      'answer': ['arizona', 'california', 'pennsylvania', 'new jersey'],
      'correctResponse': 'You got it!',
      'wrongResponse': 'Nope, I have not lived there.'
    },
  };

  // Check if the user entered nothing
  function valBlankEntries() {
    if (userAnswer === '') {
      return false;
    } else {
      return true;
    }
  }

  // Check if user entered valid number
  function valNumber() {
    if (isNaN(userAnswer) || userAnswer < startNum || userAnswer > endNum) {
      alert('Answer must be a number between ' + startNum + ' and ' + endNum + '.');
      return false;
    } else {
      return true;
    }
  }

  // Check if user entered yes/no/y/n
  function valYesNo() {
    if (!userAnswer.match(/^(yes|no|y|n)$/)) {
      alert('Must answer with either: yes, no, y, or n.');
      return false;
    } else {
      return true;
    }
  }

  // Ask number guessing question
  function askNum() {
    while (!validAnswer) {
      userAnswer = parseInt(prompt(numberGameKey + ' (' + numberOfTries + ' attempts remaining)'));
      validAnswer = valBlankEntries();
      validAnswer = valNumber();
    }
  }

  // Ask where i lived question
  function askLived(key) {
    while (!validAnswer) {
      userAnswer = prompt(key + ' (' + numberOfTries + ' attempts remaining)').toLowerCase();
      validAnswer = valBlankEntries();
    }
  }

  // User answered correctly
  function correctAnswer(currentQuestion) {
    alert(currentQuestion['correctResponse']);
    rightAnswerCount++;
    numberOfTries = 0;
    console.log('User has answered ' + rightAnswerCount + ' questions correctly.');
  }

  // Get user name, loop in case they just press enter.
  function askUserName() {
    while (userName === '') {
      userName = prompt(getUserName);
    }
    console.log('The user\'s name is ' + userName);
    alert('Ok ' + userName + ', let\'s see if you can guess 5 things about me. Ready?');
  }

  /*
    Main:
      1. Gets user name and uses it to personalize alerts.
      2. Determines if question being asked is yes/no, number, or where i lived question.
      3. Validates user input.
      4. Evaluates user response.
  */
  function main() {

    askUserName();

    // Cycle through questions and responses, get valid user answers
    for (var key in questionsAndAnswers) {
      numberOfTries = 1;
      validAnswer = false;
      // Ask the question
      var currentQuestion = questionsAndAnswers[key];
      // Check if it's the number guessing question
      if (currentQuestion['answer'] === parseInt(currentQuestion['answer'], 10)) {
        numberOfTries = numberTriesGranted;
        askNum();
        numberQuestion = true; // set the state
      } else if (currentQuestion['answer'].constructor === Array) {   // Check if it's the 'where have i lived' question
        numberOfTries = livedTriesGranted;
        askLived(key);
        livedQuestion = true; // set the state
      } else { // Yes or No question
        while (!validAnswer) {
          userAnswer = prompt(key).toLowerCase();
          validAnswer = valBlankEntries();
          validAnswer = valYesNo();
          if (validAnswer) {
            // Convert y/n answers into yes/no
            if (userAnswer === 'y') {
              userAnswer = 'yes';
            }
            else if (userAnswer === 'n') {
              userAnswer = 'no';
            }
          }
        }
      }

      console.log('User\'s answer = ' + userAnswer + ', Actual answer = ' + currentQuestion['answer']);

      // Evaluate the response
      while (numberOfTries > 0) {
        validAnswer = false;
        if (!livedQuestion) { // for yes/no and numbered question only.
          if (userAnswer === currentQuestion['answer']) { //correct answer
            correctAnswer(currentQuestion);
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
                askNum();
                console.log('User answer: ' + userAnswer);
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
              askLived(key);
              console.log('User answer: ' + userAnswer);
            } else {
              alert('Sorry, you are out of attempts. Here were the answers: ' + currentQuestion['answer'].toString());
            }
          }
        }
      }
      numberQuestion = false;
      livedQuestion = false;

    }
    // In the future, add different alerts for different user right answers here!
    alert('You finished the game ' + userName + '! You answered ' + rightAnswerCount + ' questions correctly');
  }

  main();
};
