tests = `
var assert       = require('chai').assert,
    Sandbox      = require('javascript-sandbox'),
    Helper       = require('/courses/helper/index.js'),
    consoleInput = code,
    userName;

if(typeof(sandbox) == 'undefined') {
  var sandbox = new Sandbox();
}

describe('set_name', function() {

  details(function() {
    var message;
    try {
      message = sandbox.evaluate(consoleInput)
    } catch(e) {
      message = e.message
    }
    return {
      output: message,
      clientStore: {
        userName: userName
      }
    };
  });

  it('f_no_name', function() {
    var nameUsed;
    Helper.traverse(consoleInput, function(node) {
      if (node.type == "Program" && node.body[0].type == "ExpressionStatement") {
        nameUsed = typeof eval(node.body[0].expression.raw) == "string";
      }
    });
    if(nameUsed) {
      userName = sandbox.evaluate(consoleInput)
    }
    assert(nameUsed);
  });

  it('f_empty_string', function() {
    var isNotEmptyString;
    Helper.traverse(consoleInput, function(node) {
      if (node.type == "Program" && node.body[0].type == "ExpressionStatement") {
        isNotEmptyString = eval(node.body[0].expression.raw) != "";
      }
    });
    assert(isNotEmptyString);
  });
});
`

failures = {
  "f_no_name": {
    "message": "Uh oh, it looks like you didn\'t create a string with your first name!",
    "hint": "Here's an example that you can type in: `\"Gregg\";`"
  },
  "f_empty_string": {
    "message": "You have the quotes, but you need to put your name inside them.",
    "hint": "Here's an example that you can type in: `\"Gregg\";`"
  }
}

module.exports = {
  "title": "Strings",
  "instructions": `Start learning JavaScript with us by typing in your *first name* surrounded by
    quotation marks, and ending with a semicolon. For example, I would type my name like this:
    \`"Gregg";\``,
  "hints": [
    "Type in your first name surrounded by double quotes!"
  ],
  "tests": tests,
  "failures": failures,
  "answer": "\"Gregg\""
}