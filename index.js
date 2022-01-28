#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import figlet from "figlet";

// console.log(chalk.bgRed('hi mom'));

let player;
//A helper function to show the animation using a timeout
//with a default of 4 seconds as JS does not allow a
//Promise-based timeout
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const title = chalkAnimation.neon(`
        Who wants to be a ReactJS Millionaire? \n
    `);
  await sleep();
  title.stop();

  console.log(`
                            ${chalk.blue("INSTRUCTIONS")}
        ==============================================================
        ${chalk.green(
          "You need to get all answers correct"
        )} to get to the final prize.
        ${chalk.red("If you get any question wrong")}, you lose...
    `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  player = answers.player_name;
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("And the answer is....");
  if (isCorrect) {
    spinner.success({ text: `That is CORRECT, ${player}!` });
  } else {
    spinner.error({ text: `💀💀 GAME OVER, ${player} 💀💀` });
    process.exit(1);
  }
  //0 == succes; 1==error
}

async function winningTitle() {
  console.clear();
  const msg = `Huzzah, ${player}. You have won on-screen !\n $ 1,000,000`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "What is ReactJS? \n",
    choices: [
      "A JavaScript Framework",
      "A JavaScript Library",
      "verb: act in response to something; respond in a particular way",
      "A Mark-up Language",
    ],
  });
  return handleAnswer(answers.question_1 == "A JavaScript Library");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "Who created React? \n",
    choices: ["Twitter", "Tesla", "Meta", "Thomas Edison"],
  });
  return handleAnswer(answers.question_2 == "Meta");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "What is React used for? \n",
    choices: [
      "Making a Sandwich",
      "Creating Back-end server",
      "Creating Front-end UI",
      "Creating image and video assets for the application",
    ],
  });
  return handleAnswer(answers.question_3 == "Creating Front-end UI");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message:
      "Which framework is used for creating React Mobile Applications? \n",
    choices: ["Swift", "React-Angular", "React-Native", "MobileJS"],
  });
  return handleAnswer(answers.question_4 == "React-Native");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "What is JSX? \n",
    choices: [
      "JavaScript XML: It allows us to directly write HTML in React (within JavaScript code)",
      "JavaScript Xtreme: It allows us to use Java language in Javascript",
      "There is no such thing. It's obviously made-up",
      "An extreme motorbiking event",
    ],
  });
  return handleAnswer(
    answers.question_5 ==
      "JavaScript XML: It allows us to directly write HTML in React (within JavaScript code)"
  );
}

async function question6() {
  const answers = await inquirer.prompt({
    name: "question_6",
    type: "list",
    message: "What does Babel do for ReactJS? \n",
    choices: [
      "Make my website go vroooooooooooom",
      "Again, no such thing. It is basically Hebrew for Babylon",
      "It converts JSX to HTML",
      "It converts JSX to vanilla JavaScript",
    ],
  });
  return handleAnswer(
    answers.question_6 == "It converts JSX to vanilla JavaScript"
  );
}

//This is okay since NodeJS 14+ supports top-level await
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await winningTitle();
