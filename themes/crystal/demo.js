/**
 * @fileoverview
 * @author ku6ryo@gmail.com (Ryo Kuroyanagi)
 */


function createSideMenu() {
  var sidemenu = new Crystal.SideMenu();
  sidemenu.addItem('HOME', '#');
  sidemenu.addItem('DIST 0', '#0');
  sidemenu.addItem('DIST 1', '#1');
  sidemenu.addItem('DIST 2', '#2');
  sidemenu.appendTo(document.body);
};

function createButtons() {
  var container = document.getElementById('button-container');
  var red = Crystal.Button.createRedButton('RED');
  red.render(container);
  var black = Crystal.Button.createBlackButton('BLACK');
  black.render(container);
};

function createTooltip() {
  var tooltipBottom = new Crystal.Tooltip('This is a tooltip of Crystal.');
  tooltipBottom.setDirection('bottom');
  tooltipBottom.render(document.body);
  tooltipBottom.show();
}

function main() {
  createButtons();
  createSideMenu();
  createTooltip();
};


window.addEventListener('DOMContentLoaded', function() {
  main();
}, false);

