// jshint esversion: 6

const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port =3000
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/calculator", function (req, res) {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body["num2"]);
  let operator = "";
  switch (req.body.operator) {
    case "+":
      operator = add;
      break;
    case "x":
      operator = multiply;
      break;
    case "-":
      operator = subtract;
      break;
    case "/":
      operator = divide;
      break;
  }
  console.log(calculator(num1, num2, operator));
  res.send(`<h2> the result is : ${calculator(num1, num2, operator)}</h2>` );
});


function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  return num1 / num2;
}
function calculator(num1, num2, operator) {
  return operator(num1, num2);
}

app.listen(port, () => console.log(`calculator listening on port {port}!`))

module.exports = app