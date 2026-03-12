#!/usr/bin/env node

/**
 * Basic Node.js CLI calculator.
 *
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - power
 * - squareRoot
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

function modulo(leftOperand, rightOperand) {
  if (rightOperand === 0) {
    throw new RangeError('Modulo by zero is not allowed.');
  }

  return leftOperand % rightOperand;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(operand) {
  if (operand < 0) {
    throw new RangeError('Square root of a negative number is not allowed.');
  }

  return Math.sqrt(operand);
}

const supportedOperationNames = [
  'addition',
  'subtraction',
  'multiplication',
  'division',
  'modulo',
  'power',
  'squareRoot',
];

const unaryOperations = new Set(['squareRoot', 'sqrt']);
const zeroDivisorOperations = new Set(['division', 'divide', '/', 'modulo', 'mod', '%']);

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
  modulo,
  mod: modulo,
  '%': modulo,
  power,
  pow: power,
  '^': power,
  squareRoot,
  sqrt: squareRoot,
};

function calculate(operationName, leftOperand, rightOperand) {
  const operation = supportedOperations[operationName];

  if (!operation) {
    throw new TypeError(
      `Unsupported operation "${operationName}". Use ${supportedOperationNames.join(', ').replace(', squareRoot', ', or squareRoot')}.`
    );
  }

  if (unaryOperations.has(operationName)) {
    return operation(leftOperand);
  }

  return operation(leftOperand, rightOperand);
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <operand...>');
  console.log('Binary operations: addition, subtraction, multiplication, division, modulo, power');
  console.log('Unary operations: squareRoot');
  console.log(
    'Aliases: add (+), subtract (-), multiply (x or *), divide (/), modulo (mod or %), power (pow or ^), squareRoot (sqrt)'
  );
}

function runCalculatorCli(argv = process.argv.slice(2)) {
  if (argv.length < 2 || argv.length > 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [operationName, ...rawOperands] = argv;
  const operation = supportedOperations[operationName];

  if (!operation) {
    console.error(
      `Unsupported operation "${operationName}". Use ${supportedOperationNames.join(', ').replace(', squareRoot', ', or squareRoot')}.`
    );
    process.exitCode = 1;
    return;
  }

  const expectedOperandCount = unaryOperations.has(operationName) ? 1 : 2;
  if (rawOperands.length !== expectedOperandCount) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [rawLeftOperand, rawRightOperand] = rawOperands;
  const leftOperand = Number(rawLeftOperand);
  if (Number.isNaN(leftOperand)) {
    console.error(
      `Invalid ${expectedOperandCount === 1 ? 'operand' : 'left operand'}: "${rawLeftOperand}" is not a number.`
    );
    process.exitCode = 1;
    return;
  }

  if (unaryOperations.has(operationName)) {
    if (leftOperand < 0) {
      console.error('Square root of a negative number is not allowed.');
      process.exitCode = 1;
      return;
    }

    console.log(operation(leftOperand));
    return;
  }

  const rightOperand = Number(rawRightOperand);
  if (Number.isNaN(rightOperand)) {
    console.error(`Invalid right operand: "${rawRightOperand}" is not a number.`);
    process.exitCode = 1;
    return;
  }

  if (zeroDivisorOperations.has(operationName) && rightOperand === 0) {
    console.error(
      operationName === 'modulo' || operationName === 'mod' || operationName === '%'
        ? 'Modulo by zero is not allowed.'
        : 'Division by zero is not allowed.'
    );
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
  modulo,
  power,
  squareRoot,
  calculate,
  printUsage,
  runCalculatorCli,
};
