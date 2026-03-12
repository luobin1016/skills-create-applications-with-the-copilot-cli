const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
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
});

describe('calculate', () => {
  test('dispatches each named operation correctly', () => {
    expect(calculate('addition', 2, 3)).toBe(5);
    expect(calculate('subtraction', 10, 4)).toBe(6);
    expect(calculate('multiplication', 45, 2)).toBe(90);
    expect(calculate('division', 20, 5)).toBe(4);
  });

  test('supports symbol aliases for operations', () => {
    expect(calculate('+', 8, 2)).toBe(10);
    expect(calculate('-', 8, 2)).toBe(6);
    expect(calculate('*', 8, 2)).toBe(16);
    expect(calculate('/', 8, 2)).toBe(4);
  });

  test('throws an error for unsupported operations', () => {
    expect(() => calculate('modulo', 8, 2)).toThrow(TypeError);
    expect(() => calculate('modulo', 8, 2)).toThrow(
      'Unsupported operation "modulo". Use addition, subtraction, multiplication, or division.'
    );
  });
});
