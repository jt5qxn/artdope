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

  




