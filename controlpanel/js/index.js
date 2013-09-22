
(function() {

  window.addEventListener('DOMContentLoaded', function() {
    var sw = ControlSwitch();
    sw.appendTo($('#switch-container')[0]);
    var radio = ControlRadio();
    radio.appendTo($('#radio-container')[0]);
    var optionList = ['option0', 'option1', 'option2'];
    var selector = ControlSelector(optionList);
    selector.appendTo($('#selector-container')[0]);
    var sliderx = ControlSliderX();
    sliderx.appendTo($('#sliderx-container')[0]);
    var slidery = ControlSliderY();
    slidery.appendTo($('#slidery-container')[0]);
    var sliderxy = ControlXY();
    sliderxy.appendTo($('#sliderxy-container')[0]); 
  });
})();
