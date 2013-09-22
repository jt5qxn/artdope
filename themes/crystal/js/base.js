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

