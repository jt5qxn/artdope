/**
 * @author Ryo Kuroyanagi
 */

Crystal.Button = function(label) {
  var button = document.createElement('button');
  button.className = 'crystal-button';
  button.innerText = label;
  this.element = button;
};

Crystal.Button.prototype.render = function(element) {
  element.appendChild(this.element);
};

Crystal.Button.createRedButton = function(label) {
  var button = new Crystal.Button(label);
  button.element.classList.add('red');
  return button;
};

Crystal.Button.createBlackButton = function(label) {
  var button = new Crystal.Button(label);
  button.element.classList.add('black');
  return button;
};
