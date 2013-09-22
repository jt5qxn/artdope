

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


