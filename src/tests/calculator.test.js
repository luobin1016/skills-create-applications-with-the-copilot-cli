const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
  runCalculatorCli,
} = require('../calculator');

describe('calculator basic operations', () => {
  describe('addition', () => {
    test('adds two positive numbers from the example image', () => {
      expect(addition(2, 3)).toBe(5);
    });

    test('adds negative numbers correctly', () => {
      expect(addition(-4, -6)).toBe(-10);
    });

    test('adds decimal numbers correctly', () => {
      expect(addition(1.5, 2.25)).toBeCloseTo(3.75);
    });
  });

  describe('subtraction', () => {
    test('subtracts two numbers from the example image', () => {
      expect(subtraction(10, 4)).toBe(6);
    });

    test('returns a negative result when the second number is larger', () => {
      expect(subtraction(3, 8)).toBe(-5);
    });

    test('subtracts decimal numbers correctly', () => {
      expect(subtraction(10.5, 0.25)).toBeCloseTo(10.25);
    });
  });

  describe('multiplication', () => {
    test('multiplies two numbers from the example image', () => {
      expect(multiplication(45, 2)).toBe(90);
    });

    test('returns zero when multiplying by zero', () => {
      expect(multiplication(99, 0)).toBe(0);
    });

    test('multiplies negative and positive numbers correctly', () => {
      expect(multiplication(-7, 3)).toBe(-21);
    });
  });

  describe('division', () => {
    test('divides two numbers from the example image', () => {
      expect(division(20, 5)).toBe(4);
    });

    test('divides decimal numbers correctly', () => {
      expect(division(7.5, 2.5)).toBe(3);
    });

    test('throws a RangeError when dividing by zero', () => {
      expect(() => division(10, 0)).toThrow(RangeError);
      expect(() => division(10, 0)).toThrow('Division by zero is not allowed.');
    });
  });

  describe('modulo', () => {
    test('returns the remainder from the extended operations example image', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('returns the remainder of a division', () => {
      expect(modulo(10, 3)).toBe(1);
    });

    test('throws a RangeError when dividing by zero', () => {
      expect(() => modulo(10, 0)).toThrow(RangeError);
      expect(() => modulo(10, 0)).toThrow('Modulo by zero is not allowed.');
    });
  });

  describe('power', () => {
    test('raises the base to the exponent from the extended operations example image', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('raises the base to the exponent', () => {
      expect(power(2, 5)).toBe(32);
    });

    test('supports fractional exponents', () => {
      expect(power(9, 0.5)).toBeCloseTo(3);
    });
  });

  describe('squareRoot', () => {
    test('returns the square root from the extended operations example image', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('returns the square root of a positive number', () => {
      expect(squareRoot(81)).toBe(9);
    });

    test('throws a RangeError for negative numbers', () => {
      expect(() => squareRoot(-1)).toThrow(RangeError);
      expect(() => squareRoot(-1)).toThrow('Square root of a negative number is not allowed.');
    });
  });
});

describe('calculate', () => {
  test('dispatches each named operation correctly', () => {
    expect(calculate('addition', 2, 3)).toBe(5);
    expect(calculate('subtraction', 10, 4)).toBe(6);
    expect(calculate('multiplication', 45, 2)).toBe(90);
    expect(calculate('division', 20, 5)).toBe(4);
    expect(calculate('modulo', 10, 3)).toBe(1);
    expect(calculate('power', 2, 5)).toBe(32);
    expect(calculate('squareRoot', 81)).toBe(9);
  });

  test('supports symbol aliases for operations', () => {
    expect(calculate('+', 8, 2)).toBe(10);
    expect(calculate('-', 8, 2)).toBe(6);
    expect(calculate('*', 8, 2)).toBe(16);
    expect(calculate('/', 8, 2)).toBe(4);
    expect(calculate('%', 8, 3)).toBe(2);
    expect(calculate('^', 3, 2)).toBe(9);
  });

  test('throws an error for unsupported operations', () => {
    expect(() => calculate('unknown', 8, 2)).toThrow(TypeError);
    expect(() => calculate('unknown', 8, 2)).toThrow(
      'Unsupported operation "unknown". Use addition, subtraction, multiplication, division, modulo, power, or squareRoot.'
    );
  });
});

describe('runCalculatorCli', () => {
  let consoleLogSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    delete process.exitCode;
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    delete process.exitCode;
  });

  test('supports square root as a unary CLI operation', () => {
    runCalculatorCli(['sqrt', '81']);

    expect(consoleLogSpy).toHaveBeenCalledWith(9);
    expect(process.exitCode).toBeUndefined();
  });

  test('reports an error for negative square root input from the CLI', () => {
    runCalculatorCli(['squareRoot', '-1']);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Square root of a negative number is not allowed.');
    expect(process.exitCode).toBe(1);
  });

  test('reports an error for modulo by zero from the CLI', () => {
    runCalculatorCli(['%', '10', '0']);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Modulo by zero is not allowed.');
    expect(process.exitCode).toBe(1);
  });
});
