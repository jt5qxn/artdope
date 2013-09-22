/**
 * spring_main.js
 * @author Ryo Kuroyanagi
 **/

(function() {

  var ca = CustomAlert();
  var sw = ControlSwitch();
  var slider0 = ControlSliderX();
  var slider1 = ControlSliderX();
  var panel = ControlXY();

  var isStarted = false;
  function createControlPanel() {
    sw.addCallback(handleSwitch);
    sw.appendTo($('#on-off')[0]);
    slider0.addCallback(handleMass);
    slider0.appendTo($('#mass')[0]);
    slider1.addCallback(handleFriction);
    slider1.appendTo($('#friction')[0]);
    panel.addCallback(handlePosition);
    panel.appendTo($('#position')[0]);
  };

  function handleSwitch(on) {
    if (on) {
      spring.start();
    } else {
      spring.stop();
    }
  };

  function handlePosition(x, y) {
    var x_ = (x - 0.5) * 200;
    var y_ = (y - 0.5) * 200;
    spring.setPosition(x_, y_);
  };

  function handleMass(value) {
    var v = 19 * value + 1;
    spring.setMass(v);
  };

  function handleFriction(value) {
    var v = Math.pow(10, value * 5 - 2.5);
    spring.setFriction(v);
  };

  window.addEventListener('DOMContentLoaded', function() {
    spring.init();
    spring.setContainer($('#container')[0]);
    createControlPanel();
  });

})(); 
