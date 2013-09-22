

Cyber.Button = function(text) {
  var button = document.createElement('button');
  button.className = 'cyber-button';
  button.innerText = text;
};

Cyber.Button.prototype.render = function(element) {
  element.appendChild(this.button);
};

