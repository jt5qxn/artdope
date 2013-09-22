/**
 * basic_circle_main.html
 * @author Ryo Kuroyanagi
 **/

(function() {

  var aa = new AudioAnalyser();
  var ca = CustomAlert();
  var sw = ControlSwitch();
  var slider0 = ControlSliderX();
  
  var isStarted = false;
  function createControlPanel() {
    sw.addCallback(handleSwitch);
    sw.appendTo($('#on-off')[0]);
    slider0.addCallback(handleAmplitude);
    slider0.appendTo($('#amplitude')[0]);
  };

  function handleSwitch(on) {
    if (on) {
      if (!isStarted) {
        sw.setValue(false, false);
        aa.askUserPermission(
          function() {
          isStarted = true;
          basicCircle.start();
          sw.setValue(true, false);
        },
        function() {
          ca.alert('please, activate your mic on chrome://flags .');
        });
      } else {
        basicCircle.start();
      }
    } else {
      if (isStarted) basicCircle.stop();
    }
  };

  function handleAmplitude(value) {
    var v = value * 10 + 1 || 5;
    basicCircle.setAmplitude(v);
  };

  window.addEventListener('DOMContentLoaded', function() {
    basicCircle.init(aa);
    basicCircle.setContainer($('#container')[0]);
    createControlPanel();
  });

})();

