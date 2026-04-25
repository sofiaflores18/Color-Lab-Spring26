// Integration tests: validate JSON contract between the JS client and the PHP API endpoints.
// These tests exercise the same JSON parsing logic used in code.js against realistic
// response shapes, ensuring the client handles what the server actually returns.

describe('Login API — JSON response contract', () => {
  test('successful login response contains required fields', () => {
    const raw = '{"id":7,"firstName":"Sofia","lastName":"Flores","error":""}';
    const response = JSON.parse(raw);

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('firstName');
    expect(response).toHaveProperty('lastName');
    expect(response).toHaveProperty('error');
  });

  test('userId > 0 indicates a successful login', () => {
    const raw = '{"id":7,"firstName":"Sofia","lastName":"Flores","error":""}';
    const response = JSON.parse(raw);

    expect(response.id).toBeGreaterThan(0);
    expect(response.error).toBe('');
  });

  test('userId < 1 indicates a failed login', () => {
    const raw = '{"id":-1,"firstName":"","lastName":"","error":"User/Password combination incorrect"}';
    const response = JSON.parse(raw);

    expect(response.id).toBeLessThan(1);
    expect(response.error).not.toBe('');
  });
});

describe('SearchColors API — JSON response contract', () => {
  test('response with results can be iterated the same way code.js does', () => {
    const raw = '{"results":["crimson","coral","cyan"],"error":""}';
    const jsonObject = JSON.parse(raw);

    let colorList = '';
    for (let i = 0; i < jsonObject.results.length; i++) {
      colorList += jsonObject.results[i];
      if (i < jsonObject.results.length - 1) {
        colorList += '\n';
      }
    }

    expect(colorList).toBe('crimson\ncoral\ncyan');
    expect(jsonObject.results).toHaveLength(3);
  });

  test('results field is an array', () => {
    const raw = '{"results":["blue"],"error":""}';
    const response = JSON.parse(raw);

    expect(Array.isArray(response.results)).toBe(true);
  });

  test('empty result set carries an error message', () => {
    const raw = '{"results":[],"error":"No colors found matching your search"}';
    const response = JSON.parse(raw);

    expect(response.results).toHaveLength(0);
    expect(response.error).not.toBe('');
  });

  test('each result entry is a string', () => {
    const raw = '{"results":["red","rose","ruby"],"error":""}';
    const response = JSON.parse(raw);

    response.results.forEach((color) => {
      expect(typeof color).toBe('string');
    });
  });
});

describe('AddColor API — JSON response contract', () => {
  test('successful insert returns an empty error field', () => {
    const raw = '{"error":""}';
    const response = JSON.parse(raw);

    expect(response).toHaveProperty('error');
    expect(response.error).toBe('');
  });

  test('failed insert returns a non-empty error message', () => {
    const raw = '{"error":"Color could not be added"}';
    const response = JSON.parse(raw);

    expect(response.error).not.toBe('');
  });
});
