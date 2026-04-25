const HEX_COLOR = /^#([0-9A-Fa-f]{3}){1,2}$/;

const NAMED_COLORS = [
  'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'black', 'white',
  'pink', 'cyan', 'magenta', 'brown', 'gray', 'grey', 'violet', 'indigo',
  'coral', 'crimson', 'teal', 'navy', 'olive', 'maroon', 'lime', 'aqua',
  'silver', 'gold', 'beige', 'lavender', 'turquoise', 'salmon'
];

function isValidColor(colorStr) {
  if (typeof colorStr !== 'string' || colorStr.trim() === '') return false;
  const lower = colorStr.trim().toLowerCase();
  return HEX_COLOR.test(lower) || NAMED_COLORS.includes(lower);
}

// Parses the cookie string format written by saveCookie() in code.js
// e.g. "firstName=John,lastName=Doe,userId=42;expires=..."
function parseCookieString(cookieStr) {
  const result = { firstName: '', lastName: '', userId: -1 };
  if (!cookieStr) return result;
  const splits = cookieStr.split(',');
  for (let i = 0; i < splits.length; i++) {
    const thisOne = splits[i].trim();
    const tokens = thisOne.split('=');
    if (tokens[0] === 'firstName') {
      result.firstName = tokens[1] || '';
    } else if (tokens[0] === 'lastName') {
      result.lastName = tokens[1] || '';
    } else if (tokens[0] === 'userId') {
      result.userId = parseInt(tokens[1], 10);
    }
  }
  return result;
}

function buildColorPayload(color, userId) {
  return JSON.stringify({ color: color, userId: userId });
}

function buildSearchPayload(search, userId) {
  return JSON.stringify({ search: search, userId: userId });
}

if (typeof module !== 'undefined') {
  module.exports = { isValidColor, parseCookieString, buildColorPayload, buildSearchPayload };
}
