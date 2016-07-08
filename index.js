var gamePrompt = require('game-prompt');
var colors = require('colors');

// Global variables
var playerName;
var vehicleName = "the great ship ";
var fuel = 1000;
var inventory = [];
var currentLocation = "e";
var planets = {
  e: {
    location: "Earth",
    fuelUsage: 10
  },
  m: {
    location: "Mesnides",
    fuelUsage: 20,
    haveArtifact: true,
    artifact: "Myoin Horn",
    artifactLine: "Here, take this Myoin Horn, an ancient Mesnidian instrument.",
    noArtifactLine: "Sorry, we already gave you the horn.",
    otherPlanetLine: "Well, Laplides suffered from atomic war and has been uninhabited for centuries. You would do well to avoid it on your journey."
  },
  l: {
    location: "Laplides",
    fuelUsage: 50
 },
  k: {
    location: "Kiyturn",
    fuelUsage: 120,
    haveArtifact: true,
    artifact: "Kiyturn Glass Bowl",
    artifactLine: "Here, take this Kiyturn Glass Bowl, a symbol of our civilization.",
    noArtifactLine: "Uh, we already gave you the bowl.",
    otherPlanetLine: "I'm sorry, but we do not leave our planet. The universe, to us, is a beautiful mystery."
  },
  a: {
    location: "Aenides",
    fuelUsage: 25
  },
  c: {
    location: "Cramuthea",
    fuelUsage: 200,
  },
  s: {
    location: "Smeon",
    fuelUsage: 400,
    haveArtifact: true,
    artifact: "dried Cramun Flower",
    artifactLine: "Here, take this dried Cramun Flower, a sweet reminder of our home planet.",
    noArtifactLine: "Sorry, only one flower per sentient being.",
    otherPlanetLine: "The foul people of Aenides once tried to take over our home planet by force!"
  },
  g: {
    location: "Gleshan",
    fuelUsage: 85,
    haveArtifact: false,
    noArtifactLine: "Sorry, but we are only poor Gleshians. We don't have anything to give you.",
    otherPlanetLine: "One time, the wealthy and glamorous Cramutheans came and visited us."
  }
}

function startGame() {
  gamePrompt('S.R.S.V. Press ENTER to start.'.red, intro);
}

function intro () {
  gamePrompt([
    "Ahoy, matey! You are the captain of a Solo Research Space Vehicle (S.R.S.V.) on an expedition to explore foreign planets. Your mission is to make contact with three alien life forms, acquire an artifact representative of their culture, and bring back your findings to Earth.",
    "Mission Brief: Travel to distant planets. Collect 3 alien artifacts. Return to Earth.".white
     ], collectInfo);
}

function collectInfo() {
  gamePrompt([
      'A voice comes on over the intercom.',
      'Please state your name for identity verification.',
    ], collectName);
}

function collectName (name) {
  if (name === "") {
    collectInfo()
  } else {
  playerName = name;
  gamePrompt([
      'Thank you, Captain ' + playerName + '.',
      'Please state your vehicle name for identity verification.'
    ], collectVehicleName);
}}

function collectVehicleName (vehicle) {
  vehicleName += vehicle;
  gamePrompt([
      'Wow, ' + vehicleName + '! Impressive.',
      'Your ship has 1000 gallons of fuel. 1 gallon = 1 light year (obvi). Try not to run out. NASA likes you, but you are no Matt Damon.'
    ], ready);
}

function ready() {
  gamePrompt('Are you ready to begin? Type BLAST OFF'.blue, blastOff);
}

function blastOff (yes) {
  if (yes.toUpperCase() !== "BLAST OFF") {
    ready();
  } else {
    gamePrompt ('And we are off!!!', next);
}}

function next() {
  gamePrompt ([
    "You have " + fuel + " gallons of fuel.",
    "Your current location is " + planets[currentLocation].location + ".",
    "Let's go exploring!",
    "Where to Captain " + playerName + "?",
    "(E)arth (10 lightyears)\n(M)esnides (20 lightyears)\n(L)aplides (50 lightyears)\n(K)iyturn (120 lightyears)\n(A)enides (25 lightyears)\n(C)ramuthea (200 lightyears)\n(S)meon T9Q (400 lightyears)\n(G)leshan 7Z9 (85 lightyears)"  
], whereTo);
}

function whereTo(answer) {
  if (answer.toLowerCase() === currentLocation) {
    gamePrompt("You're already there. Try again.", next);
  } else if (answer.toUpperCase() === "E" || answer.toUpperCase() === "EARTH") {
      console.log("Next stop, Earth!");
      calculateFuel("e", earth);
  } else if (answer.toUpperCase() === "M" || answer.toUpperCase() === "MESNIDES") {
      console.log("Next stop, Mesnides!");
      calculateFuel("m", mes);
  } else if (answer.toUpperCase() === "L" || answer.toUpperCase() === "LAPLIDES") {
      console.log("Next stop, Laplides!");
      calculateFuel("l", lap);
  } else if (answer.toUpperCase() === "K" || answer.toUpperCase() === "KIYTURN") {
      console.log("Next stop, Kiyturn!");
      calculateFuel("k", kiy);
  } else if (answer.toUpperCase() === "A" || answer.toUpperCase() === "AENIDES") {
      console.log("Next stop, Aenides!");
      calculateFuel("a", aen);
  } else if (answer.toUpperCase() === "C" || answer.toUpperCase() === "CRAMUTHEA") {
      console.log("Next stop, Cramuthea!");
      calculateFuel("c", cram);
  } else if (answer.toUpperCase() === "S" || answer.toUpperCase() === "SMEON T9Q") {
      console.log("Next stop, Smeon T9Q!");
      calculateFuel("s", sme);
  } else if (answer.toUpperCase() === "G" || answer.toUpperCase() === "GLESHAN 7Z9") {
      console.log("Next stop, Gleshan 7Z9!");
      calculateFuel("g", gle);
  } else {
      next();
    }
}

function calculateFuel(place, func) {
    currentLocation = place;
    fuel -= planets[currentLocation].fuelUsage;
  if (fuel <= 0) {
    console.log("You're out of fuel! You lose! Womp womp.".red);
  } else if (fuel <= 100) {
    gamePrompt("Watch out, you only have ".red + fuel + " gallons of fuel left.".red, func);
  } else {
    gamePrompt("You have " + fuel + " gallons of fuel left.", func);
}}

function mes() {
  gamePrompt([
    "You've arrived at Mesnides. As you land, a representative of the Mesnidian people is there to greet you.",
      "Welcome, traveler, to Mesnides."
    ], assist);
  }

function lap() {
  gamePrompt("You enter orbit around Laplides. Looking down at the planet, you see signs of atomic war and realize there is no option but to turn around.", next);
}

function kiy() {
  gamePrompt([
    "You've arrived at Kiyturn. As you land, a representative of the Kiyturn people is there to greet you.",
    "Hello, what brings you to Kiyturn? You're not here to cause trouble are you?"
  ], assist);  
}

function aen() {
  gamePrompt([
    "Pew, Pew".red,
    "You discover upon arrival to Aenides that they are a hostile people. You attempt to land, but they begin to fire upon your S.R.S.V. and you are forced to retreat."], next);
}

function cram() {
  fuel += 500;
  gamePrompt("Cramuthea has been abandoned due to global environmental disaster, but there are remnants of the people that left. You are able to refuel your ship (+500 gallons) and read a beacon signal that tells you the Cramuthean people have migrated to Smeon T9Q.", next);
}

function sme() {
  fuel += 100;
  gamePrompt(["You've landed on Smeon T9Q, and the Cramutheans living on the planet are friendly and give you some fuel (+100 gallons)",
    "Greetings, sentient being."
    ], assist);
}

function gle() {
  gamePrompt(["You've arrived on Gleshan 7Z9.",
    "Some Gleshian farmers approach.",
    ], assist);
}

function earth() {
  fuel += 10;
  var a = inventory.join(", ");
  gamePrompt(["You're back, Captain " + playerName + "!",
    "Here's (+10 gallons) of fuel for " + vehicleName + ".",
    "Let's see if you completed your very important mission of collecting the three alien artifacts.",
    "Your collected artifacts are:\n" + a], inventoryCheck);
}

function assist() {
  gamePrompt([
    "How can we assist you?",
    "Ask about (A)rtifact\nAsk about other (P)lanets\n(L)eave"
  ], answer);  
}

function answer(question) {
  if (question.toUpperCase() === "A" || question.toUpperCase() === "ARTIFACT"){
    if (planets[currentLocation].haveArtifact === true) {
      inventory.push(planets[currentLocation].artifact);
//      inventory.indexOf(planets.m.artifact) >= 0
      planets[currentLocation].haveArtifact = false;
      if (currentLocation === "m") {
        gamePrompt([
          "Oooh, well, I have an awesome artifact for you, but you'll have to battle for it . . . ROCK, PAPER, SCISSORS STYLE!",
          "Meet your cunning opponent, The Mighty Krang!",
          "Are you ready to begin? [Y]es or [N]o"
          ], game);
      } else {
          gamePrompt(planets[currentLocation].artifactLine, assist);
        }
    } else {
        gamePrompt(planets[currentLocation].noArtifactLine, assist);
    }
  } else if (question.toUpperCase() === "P" || question.toUpperCase() === "PLANETS"){
      gamePrompt(planets[currentLocation].otherPlanetLine, assist);
  } else if (question.toUpperCase() === "L" || question.toUpperCase() === "LEAVE") {
    next();
  } else {
    assist();
  }
}

// Rock, Paper, Scissors!

var mesArray = ['rock', 'paper', 'scissors'];
var mesChoice;
var myChoice;
var whoWins = {
  draw: function() {
    gamePrompt("It's a tie! Not good enough. Try again.", rps);
  },
  lose: function() {
    gamePrompt("Bwahaha! The Mighty Krang wins. Try again, if you dare.", rps);
  },
  win: function() {
    gamePrompt([
      "You have defeated The Mighty Krang!",
      "Well done, noble warrior.",
      "Take this ancient Mesnidian instrument, the Myoin Horn."      
     ], assist);
  }
}

function game(ready) {
  if (ready.toUpperCase() === "Y" || ready.toUpperCase() === "YES") {
    rps();
  } else {
    gamePrompt("It doesn't matter if you're ready or not. It is on!", rps);
  }
}

function rps() {
  gamePrompt("What will it be?\n[R]ock\n\[P]aper\n[S]cissors", decide);
}

function decide(choice) {
  if (choice.toLowerCase() === 'r' || choice.toLowerCase() === 'rock') {
    myChoice = mesArray[0];
    gamePrompt("1, 2, 3, GO!", reveal);
  } else if (choice.toLowerCase() === 'p' || choice.toLowerCase() === 'paper') {
    myChoice = mesArray[1];
    gamePrompt("1, 2, 3, GO!", reveal);
  } else if (choice.toLowerCase() === 's' || choice.toLowerCase() === 'scissors') {
    myChoice = mesArray[2];
    gamePrompt("1, 2, 3, GO!", reveal);
  } else {
    gamePrompt("Hey, that's not a choice! Try again. No cheating this time.", rps);
  }  
}

function reveal() {
  mesChoice = mesArray[Math.floor(Math.random() * 3)];
  gamePrompt([
    "You play " + myChoice + ".",
    "Your opponent plays . . . " + mesChoice + "."
    ], verdict)
}

function verdict () {
  if (myChoice === 'rock') {
    if (mesChoice === 'paper') {
      whoWins.lose();
    } else if (mesChoice === 'scissors') {
      whoWins.win();
    } else {
      whoWins.draw();
    }
  } else if (myChoice === 'paper') {
    if (mesChoice === 'scissors') {
      whoWins.lose();
    } else if (mesChoice === 'rock') {
      whoWins.win();
    } else {
      whoWins.draw();
    }
  } else {
    if (mesChoice === 'rock') {
      whoWins.lose();
    } else if (mesChoice === 'paper') {
      whoWins.win();
    } else {
      whoWins.draw();
    }
  } 
}

function inventoryCheck() {
  if (inventory.length !== 3) {
    var a;
    if (inventory.length === 2) {
      a = "artifact";
    } else {
      a = "artifacts";
    }
    gamePrompt([
      "Well, it's nice to see you, Captain " + playerName + ", but you haven't completed your very important mission yet.",
      "You still need to collect " + (3 - inventory.length) + " more alien " + a + ".",
      "Get back out there!"
      ], next);
  } else {
    gamePrompt([
      "Captain " + playerName + ", you did it!",
      "You collected the three alien artifacts!",
      "YOU WIN! PARTY PARTY PARTY!!!".blue
      ])
  }
}

startGame();