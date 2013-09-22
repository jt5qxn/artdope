/**
 * basic_bars_main.js
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
    sw.appendTo($('#power')[0]);
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
          basicBars.start();
          sw.setValue(true, false);
        },
        function() {
          ca.alert('please, activate your mic on chrome://flags .');
        });
      } else {
        basicBars.start();
      }
    } else {
      if (isStarted) basicBars.stop();
    }
  };

  function handleAmplitude(value) {
    var v = value * 10 + 1;
    basicBars.setAmplitude(v);
  };

  window.addEventListener('DOMContentLoaded', function() {
    basicBars.init(aa);
    basicBars.setColor({r: .1, g:.1, b:.1}, {r:.8, g:.8, b:.8});
    basicBars.setContainer($('#container')[0]);
    createControlPanel();
  });

})();

