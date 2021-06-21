// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   //console.log(oldScrabbleScorer(word));
   return word;
};

function simpleScore (word) {
  let points = word.length;
  return points;
}

function vowelBonusScore (word) {
  let points = 0;
  word = word.toUpperCase();
  for (let i = 0; i < word.length; i++) {
    if (word[i] === 'A' || word[i] === 'E' || word[i] === 'I' || word[i] === 'O' || word[i] === 'U') {
      points += 3;
    }
    else {
      points += 1;
    }
  }
  return points;
}

function scrabbleScore (word) {
  let points = 0;
  word = word.toLowerCase();
  for (let i = 0; i < word.length; i++) {
    points += newPointStructure[word[i]];
  }
  return points;
}

let simple = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scorerFunction: simpleScore
}


let vowel = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scorerFunction: vowelBonusScore
}


let newOne = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scorerFunction: scrabbleScore
}

const scoringAlgorithms = [simple, vowel, newOne];

function scorerPrompt() {
  let choice = 5;
  while (choice !== 0 && choice !== 1 && choice !== 2) {
    choice = Number(input.question('Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: '));
  }  
  return scoringAlgorithms[choice];
}

function transform (obj) {
  let newObj = {};
  for (const i in obj) {
    let arr = obj[i];
    for (let j = 0; j < arr.length; j++) {
      
      newObj[arr[j].toLowerCase()] = Number(i);
    }
  }
  return newObj;
};

let newPointStructure = transform(oldPointStructure);


function runProgram() {
   let word = initialPrompt();
   let scorer = scorerPrompt();
   console.log(`Score for '${word}': ${scorer.scorerFunction(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

