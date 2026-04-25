const { isValidColor, parseCookieString, buildColorPayload, buildSearchPayload } = require('../../src/colorUtils');

describe('isValidColor', () => {
  test('accepts a valid 6-digit hex color', () => {
    expect(isValidColor('#ff0000')).toBe(true);
  });

  test('accepts a valid 3-digit hex color', () => {
    expect(isValidColor('#f00')).toBe(true);
  });

  test('accepts uppercase hex color', () => {
    expect(isValidColor('#FF5733')).toBe(true);
  });

  test('rejects hex with wrong digit count', () => {
    expect(isValidColor('#1234567')).toBe(false);
  });

  test('rejects hex with invalid characters', () => {
    expect(isValidColor('#xyz')).toBe(false);
  });

  test('accepts a known named color', () => {
    expect(isValidColor('red')).toBe(true);
  });

  test('named color match is case-insensitive', () => {
    expect(isValidColor('RED')).toBe(true);
    expect(isValidColor('Blue')).toBe(true);
  });

  test('accepts named color with surrounding whitespace', () => {
    expect(isValidColor('  green  ')).toBe(true);
  });

  test('rejects an unrecognized color name', () => {
    expect(isValidColor('notacolor')).toBe(false);
  });

  test('rejects empty string', () => {
    expect(isValidColor('')).toBe(false);
  });

  test('rejects whitespace-only string', () => {
    expect(isValidColor('   ')).toBe(false);
  });

  test('rejects non-string input', () => {
    expect(isValidColor(null)).toBe(false);
    expect(isValidColor(undefined)).toBe(false);
    expect(isValidColor(123)).toBe(false);
  });
});

describe('parseCookieString', () => {
  test('parses a complete cookie string', () => {
    const result = parseCookieString('firstName=Sofia,lastName=Flores,userId=7');
    expect(result.firstName).toBe('Sofia');
    expect(result.lastName).toBe('Flores');
    expect(result.userId).toBe(7);
  });

  test('returns userId -1 for an empty cookie string', () => {
    const result = parseCookieString('');
    expect(result.userId).toBe(-1);
  });

  test('returns userId -1 for null input', () => {
    const result = parseCookieString(null);
    expect(result.userId).toBe(-1);
  });

  test('handles missing fields gracefully', () => {
    const result = parseCookieString('firstName=Ana');
    expect(result.firstName).toBe('Ana');
    expect(result.lastName).toBe('');
    expect(result.userId).toBe(-1);
  });

  test('parses userId as an integer', () => {
    const result = parseCookieString('firstName=J,lastName=D,userId=42');
    expect(typeof result.userId).toBe('number');
    expect(result.userId).toBe(42);
  });
});

describe('buildColorPayload', () => {
  test('produces valid JSON with color and userId', () => {
    const payload = buildColorPayload('crimson', 3);
    const parsed = JSON.parse(payload);
    expect(parsed.color).toBe('crimson');
    expect(parsed.userId).toBe(3);
  });

  test('serializes correctly for the API format', () => {
    const payload = buildColorPayload('#abc123', 1);
    expect(typeof payload).toBe('string');
    expect(() => JSON.parse(payload)).not.toThrow();
  });
});

describe('buildSearchPayload', () => {
  test('produces valid JSON with search term and userId', () => {
    const payload = buildSearchPayload('blue', 5);
    const parsed = JSON.parse(payload);
    expect(parsed.search).toBe('blue');
    expect(parsed.userId).toBe(5);
  });
});
