#!/usr/bin/env node

/**
 * Basic Node.js CLI calculator.
 *
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 */

function addition(leftOperand, rightOperand) {
  return leftOperand + rightOperand;
}

function subtraction(leftOperand, rightOperand) {
  return leftOperand - rightOperand;
}

function multiplication(leftOperand, rightOperand) {
  return leftOperand * rightOperand;
}

function division(leftOperand, rightOperand) {
  if (rightOperand === 0) {
    throw new RangeError('Division by zero is not allowed.');
  }

  return leftOperand / rightOperand;
}

const supportedOperations = {
  addition,
  add: addition,
  '+': addition,
  subtraction,
  subtract: subtraction,
  '-': subtraction,
  multiplication,
  multiply: multiplication,
  x: multiplication,
  '*': multiplication,
  division,
  divide: division,
  '/': division,
};

function calculate(operationName, leftOperand, rightOperand) {
  const operation = supportedOperations[operationName];

  if (!operation) {
    throw new TypeError(
      `Unsupported operation "${operationName}". Use addition, subtraction, multiplication, or division.`
    );
  }

  return operation(leftOperand, rightOperand);
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <leftOperand> <rightOperand>');
  console.log('Supported operations: addition, subtraction, multiplication, division');
  console.log('Aliases: add (+), subtract (-), multiply (x or *), divide (/)');
}

function runCalculatorCli(argv = process.argv.slice(2)) {
  if (argv.length !== 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [operationName, rawLeftOperand, rawRightOperand] = argv;
  const operation = supportedOperations[operationName];

  if (!operation) {
    console.error(
      `Unsupported operation "${operationName}". Use addition, subtraction, multiplication, or division.`
    );
    process.exitCode = 1;
    return;
  }

  const leftOperand = Number(rawLeftOperand);
  if (Number.isNaN(leftOperand)) {
    console.error(`Invalid left operand: "${rawLeftOperand}" is not a number.`);
    process.exitCode = 1;
    return;
  }

  const rightOperand = Number(rawRightOperand);
  if (Number.isNaN(rightOperand)) {
    console.error(`Invalid right operand: "${rawRightOperand}" is not a number.`);
    process.exitCode = 1;
    return;
  }

  if ((operationName === 'division' || operationName === 'divide' || operationName === '/') && rightOperand === 0) {
    console.error('Division by zero is not allowed.');
    process.exitCode = 1;
    return;
  }

  console.log(operation(leftOperand, rightOperand));
}

if (require.main === module) {
  runCalculatorCli();
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  printUsage,
  runCalculatorCli,
};
