
window.addEventListener('DOMContentLoaded', function() {
  spheres.init();
  spheres.setContainer($('#container')[0]);
  var sw = ControlSwitch();
  sw.appendTo($('#rotation')[0]);
  sw.addCallback(handleRotation);
  var radio = ControlRadio();
  radio.appendTo($('#move')[0]);
  radio.setValue(0, false);
  radio.addCallback(handleMove);
});

function handleRotation(on) {
  if (on) {
    spheres.startRotation();
  } else {
    spheres.stopRotation();
  }
};

function handleMove(num) {
  switch(num) {
    case 0:
      spheres.gather();
      break;
    case 1:
      spheres.makeCircle();
      break;
    case 2:
      spheres.makeLine();
      break;
    default:
      break;
  }
};
