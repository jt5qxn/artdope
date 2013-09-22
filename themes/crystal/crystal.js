/**
 * @fileoverview
 * @author Ryo Kuroyanagi
 */


var Crystal = function() {};

Crystal.SideMenu = function() {
  var container = document.createElement('div');
  container.className = 'crystal-sidemenu';
  var list = document.createElement('ul');
  container.appendChild(list);
  this.container = container;
  this.list = list;
};

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
/**
 * @fileoverview 
 * @author Ryo Kuroyanagi
 */

Crystal.SideMenu.prototype.addItem = function(label, href) {
  var item = document.createElement('li');
  var anchor = document.createElement('a');
  anchor.href = href;
  anchor.innerText = label;
  item.appendChild(anchor);
  this.list.appendChild(item);
};

Crystal.SideMenu.prototype.appendTo = function(element) {
  element.appendChild(this.container);
};

  






Crystal.Tooltip = function(message) {
  var container = document.createElement('div');
  container.className = 'crystal-tooltip';
  var arrow = document.createElement('div');
  arrow.className = 'tooltip-arrow';
  var inner = document.createElement('div');
  inner.className = 'tooltip-inner';
  inner.innerText = message;
  container.appendChild(arrow);
  container.appendChild(inner);
  this.container = container;
  this.inner = inner;
};

Crystal.Tooltip.prototype.render = function(element) {
  element.appendChild(this.container);
};

Crystal.Tooltip.prototype.setMessage = function(message) {
  this.inner.innerText = message;
};

Crystal.Tooltip.prototype.setDirection = function(direction) {
  if (direction == 'top') {
    this.container.classList.remove('bottom');
    this.container.classList.add('top');
  } else if (direction == 'bottom') {
    this.container.classList.remove('top');
    this.container.classList.add('bottom');
  }
};

Crystal.Tooltip.prototype.show = function() {
  this.container.classList.add('shown');
}

Crystal.Tooltip.prototype.hide = function() {
  this.container.classList.remove('shown');
}


