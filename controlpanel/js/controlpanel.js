/**
 * controlpanel.js
 * @author Ryo Kuroyanagi 
 * This is a library for handling user input through GUIs.
 * Each control is sepalated into a class.
 * The basic structure of the classes is the same.
 */


/**
 * @namespace
 */
var Controlpanel = function() {};


/**
 * @constructor
 */
Controlpanel.Control.Base = function() {
  this.container = document.createElement('div');
  this.callbacks = [];
};


/**
 * @function render
 * This is a function to append a container togiven HTML DOM Element.
 * @param {Element} parentElement
 */
Controlpanel.Control.Base.prototype.render(parentElement) {
  parentElement.appendChild(this.contianer);
};


/**
 * @function getValue()
 * This is a function to get the current value set by user using the contorl.
 */
Controlpanel.Control.Base.prototype.getValue = function() {
  return this.value;
};


/**
 * @function setValue(value, isExecuted)
 * This is a function to set value by program. We can decide the callback
 * functions are executed after the value setting.
 * @param {Number} value
 */
Controlpanel.Control.Base.prototype.setValue = function(value) {
  if (this.evaluateValue(value)) {
    this.value = value;
  }
};


/**
 * @function evaluateValue
 * Should be overwritten.
 */
Controlpanel.Control.Base.prototype.evaluateValue = function(value) {
  return true;
};


/**
 * @function addCallback
 * This is a function to add a callback to be executed when the value of the
 * control is changed.
 */
Controlpanel.Control.Base.prototype.addCallback = function(callback) {
  this.callbacks.push(callbacks);
};


/**
 * @function removeCallback
 * This is a function to remove callback which set by addCallback().
 **/
Controlpanel.Control.Base.prototype.removeCallback = function(callback) {
};


/**
 * @function executeCallbacks
 */
Controlpanel.Control.Base.prototype.executeCallbacks = function() {
  var value = this.value;
  var callbacks = this.callbacks;
  for (var i = 0; i < callbacks.length; i++) {
    var callback = callbacks[i];
    callback(value);
  }
};


/**
 * @constructor
 */
Controlpanel.Control.Toggle = function() {
  Controlpanel.Control.Base.call(this, null);
  var container = this.container;
  container.className = 'switch';
  var button = document.createElement('button');
  container.appendChild(button);
  var self = this;
  button.addEventListener('click', function() {
    if (self.value) {
      self.setValue(false);
    } else {
      self.setValue(true);
    }
  }, false);
  this.button = button;
};
Controlpanel.Control.Toggle.prototype = Object.create(Controlpanel.Control.Base);
Controlpanel.Control.Toggle.prototype.constructor = Controlpanel.Control.Toggle;


/**
 * @return Boolean
 */
Controlpanel.Control.Toggle.prototype.evaluateValue = function(value) {
  var isValid = false;
  if (value.constructor == Boolean) {
    isValid = true;
  }
  return isValid;
};


/**
 * @function
 */
Controlpanel.Control.Toggle.prototype.setValue = function(value) {
  Controlpanel.Control.Base.prototype.setValue.call(this, vlaue);
  if (this.value) {
    this.button.classList.add('on');
  } else {
    this.button.classList.remove('on');
  }
};


/**
 * Radio
 * This is a constructor to handle an object of radio buttons.
 * @param {Number} numOfButtons
 * @constructor
 **/
Controlpanel.Control.Radio = function(numOfbuttons) {

  var num = numOfbuttons || 3;
  var container = this.container;
  container.className = 'radio';
  var buttons = [];
  var ul = document.createElement('ul');
  container.appendChild(ul);
  for (var i = 0; i < num; i++) {
    this.addButton();
  };
  this.buttons = buttons;
};   


Controlpanel.Control.Radio.prototype.addButton = function() {
  var buttons = this.buttons;
  var button = document.createElement('li');
  var num = buttons.length;
  var self = this;
  button.addEventListener('click', function() {
    self.setValue(num); 
  }, false);
  buttons.push(button);
};


Controlpanel.Control.Radio.prototype.setValue = function(value) {
  var buttons = this.buttons;
  if (value < buttons.length) {
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      button.classList.remove('selected');
    }
    buttons[value].classList.add('selected');
  }
};


Controlpanel.Control.Radio.prototype.evaluateValue = function(value) {
  var isValid = false;
  if (value.constructor == Number) {
    isValid = true;
  }
  return isValid;
};


/**
 * ControlSelector
 * This is a constructor to handle an object of radio buttons.
 * @param {String[]} options A list of options.
 * @constructor
 **/
var ControlSelector = function(options) {

  var optionList = options;
  var container = document.createElement('div');
  container.className = 'controlpanel cp-selector';

  var isShown = false;
  var selectionUl = document.createElement('ul');
  selectionUl.classList.add('selection');
  container.appendChild(selectionUl);  
  var selectionLi = document.createElement('li');
  selectionLi.className = 'selection';
  var selection = document.createElement('div');
  selection.innerText = '--';
  selectionLi.addEventListener('click', function() {
    if (isShown) {
      hideOptions();
    } else {
      showOptions();
    }
  });
  selectionLi.appendChild(selection);
  selectionUl.appendChild(selectionLi);

  var optionUl = document.createElement('ul');
  optionUl.classList.add('option');
  optionUl.classList.add('hidden');
  container.appendChild(optionUl);
 
  var value = 0;

  var callbackList = [];

  for (var i = 0; i < optionList.length; i++) {
    addOption(optionList[i]);
  }

  function addOption(v) {
    var li = document.createElement('li');
    li.classList.add('option');
    li.addEventListener('click', function() {
      select(v);
      hideOptions();
    });
    var inFrame = document.createElement('div');
    inFrame.innerText = v;
    li.appendChild(inFrame);
    optionUl.appendChild(li);
  };

  function showOptions() {
    optionUl.classList.remove('hidden');
    isShown = true;
  };

  function hideOptions() {
    optionUl.classList.add('hidden');
    isShown = false;
  };

  function select(v) {
    for (var i = 0; i < optionList.length; i++) {
      var opt = optionList[i];
      if (opt == v) {
        selection.innerText = v;
        executeCallbacks();
        return true;
      }
    }
  };
  
  function appendTo(element) {
    element.appendChild(container);
  };
 
  function getValue() {
    return value;
  };

  function setValue(v, isExecuted) {
    if (v.constructor != Number) {
      throw 'non-Number was given.';
    } else {
      value = parseInt(v);
      select(value);
    }
    if (isExecuted == undefined || isExecuted) {
      executeCallbacks(value);
    }
  };

  function addCallback(callback) {
    callbackList.push(callback);
  };

  function removeCallback(callback) {
    for (var i = 0; i < callbackList.length; i++) {
      if (callback == callbackList[i]) {
        callbackList.splice(i, 1);
      }
    }
  };

  function executeCallbacks() {
    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i](value);
    }
  };
 
  return {
    appendTo: appendTo,
    setValue: setValue,
    getValue: getValue,
    addCallback: addCallback,
    removeCallback: removeCallback};

};


/**
 * ControlSliderX
 * This is a constructor to handle an object of horizontal slider control.
 * @constructor
 **/
var ControlSliderX = function() {

  var ns = 'http://www.w3.org/2000/svg';
  var container = document.createElement('div');
  container.className = 'controlpanel cp-slider x';

  var value = 0;

  var callbackList = [];
  
  var svg = document.createElementNS(ns, 'svg:svg');
  var frame = document.createElementNS(ns, 'svg:rect');
  frame.setAttribute('width', '100%');
  frame.setAttribute('height', '100%');
  var line = document.createElementNS(ns, 'svg:line');
  line.setAttribute('x1', '50%');
  line.setAttribute('y1', '0%');
  line.setAttribute('x2', '50%');
  line.setAttribute('y2', '100%');
  svg.appendChild(frame);
  svg.appendChild(line);
  container.appendChild(svg);
  frame.addEventListener('mousedown', function(e) {
    setValue(calcValue(e), true);
    e.stopPropagation();
  });
  frame.addEventListener('mouseup', function(e) {
    setValue(calcValue(e), true);
    e.stopPropagation();
  });

  function calcValue(e) {
    return e.offsetX / svg.offsetWidth;
  };

  function appendTo(element) {
    element.appendChild(container);
  };
 
  function setLine(x) {
    line.setAttribute('x1', x * 100 + '%');     
    line.setAttribute('x2', x * 100 + '%');     
  };

  function getValue() {
    return value;
  };
  
  function setValue(v, isExecuted) {
    if (v.constructor != Number) {
      throw 'non-Number is given';
    } else if (v < 0) {
      value = 0;
    } else if (v > 1) {
      value = 1;
    } else {
      value = v;
    }
    setLine(value);

    if (isExecuted == undefined || isExecuted) {
      executeCallbacks(value);
    }
  };

  function addCallback(callback) {
    callbackList.push(callback);
  };

  function removeCallback(callback) {
    for (var i = 0; i < callbackList.length; i++) {
      if (callback == callbackList[i]) {
        callbackList.splice(i, 1);
      }
    }
  };

  function executeCallbacks(x) {
    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i](x);
    }
  };

  return {
    appendTo: appendTo,
    getValue: getValue,
    setValue: setValue,
    addCallback: addCallback,
    removeCallback: removeCallback};

};

/**
 * ControlSliderY
 * This is a constructor to handle an object of vertical slider control.
 * @constructor
 **/
var ControlSliderY = function() {

  var ns = 'http://www.w3.org/2000/svg';
  var container = document.createElement('div');
  container.className = 'controlpanel cp-slider y';

  var value = 0;
  var callbackList = [];
  
  var svg = document.createElementNS(ns, 'svg:svg');
  var frame = document.createElementNS(ns, 'svg:rect');
  frame.setAttribute('width', '100%');
  frame.setAttribute('height', '100%');
  var line = document.createElementNS(ns, 'svg:line');
  line.setAttribute('x1', '0%');
  line.setAttribute('y1', '50%');
  line.setAttribute('x2', '100%');
  line.setAttribute('y2', '50%');
  svg.appendChild(frame);
  svg.appendChild(line);
  container.appendChild(svg);
  frame.addEventListener('mousedown', function(e) {
    setValue(calcValue(e), true);
    e.stopPropagation();
  });
  frame.addEventListener('mouseup', function(e) {
    setValue(calcValue(e), true);
    e.stopPropagation();
  });

  function calcValue(e) {
    return 1 - e.offsetY / svg.offsetHeight;
  };

  function appendTo(element) {
    element.appendChild(container);
  };
 
  function setLine(y) {
    line.setAttribute('y1', (1 - y) * 100 + '%');     
    line.setAttribute('y2', (1 - y) * 100 + '%');     
  };

  function getValue() {
    return value;
  };
  
  function setValue(v, isExecuted) {
    if (v.constructor != Number) {
      throw 'non-Number is given';
    } else if (v < 0) {
      value = 0;
    } else if (v > 1) {
      value = 1;
    } else {
      value = v;
    }
    setLine(value);

    if (isExecuted == undefined || isExecuted) {
      executeCallbacks(value);
    }
  };

  function addCallback(callback) {
    callbackList.push(callback);
  };

  function removeCallback(callback) {
    for (var i = 0; i < callbackList.length; i++) {
      if (callback == callbackList[i]) {
        callbackList.splice(i, 1);
      }
    }
  };

  function executeCallbacks(y) {
    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i](y);
    }
  };

  return {
    appendTo: appendTo,
    getValue: getValue,
    setValue: setValue,
    addCallback: addCallback,
    removeCallback: removeCallback};

};

/**
 * ControlXY
 * This is a constructor to handle an object of 2D slider panel.
 * @constructor
 **/
var ControlXY = function() {

  var ns = 'http://www.w3.org/2000/svg';
  var container = document.createElement('div');
  container.className = 'controlpanel cp-slider xy';

  var value = {};
  value.x = .5;
  value.y = .5; 

  var callbackList = [];
  
  var svg = document.createElementNS(ns, 'svg:svg');
  var xyFrame = document.createElementNS(ns, 'svg:rect');
  xyFrame.setAttribute('width', '100%');
  xyFrame.setAttribute('height', '100%');
  xyFrame.className = 'xyFrame';
  var vLine = document.createElementNS(ns, 'svg:line');
  vLine.setAttribute('x1', '50%');
  vLine.setAttribute('y1', '0%');
  vLine.setAttribute('x2', '50%');
  vLine.setAttribute('y2', '100%');
  var hLine = document.createElementNS(ns, 'svg:line');
  hLine.setAttribute('x1', '0%');
  hLine.setAttribute('y1', '50%');
  hLine.setAttribute('x2', '100%');
  hLine.setAttribute('y2', '50%');
  svg.appendChild(xyFrame);
  svg.appendChild(vLine);
  svg.appendChild(hLine);
  container.appendChild(svg);
  xyFrame.addEventListener('mousedown', function(e) {
    var value = calcValue(e);
    setValue(value.x, value.y, true);
    e.stopPropagation();
  });
  xyFrame.addEventListener('mouseup', function(e) {
    var value = calcValue(e);
    setValue(value.x, value.y, true);
    e.stopPropagation();
  });
    
  function calcValue(e) {
    var x = e.offsetX / svg.offsetWidth;
    var y = 1 - e.offsetY / svg.offsetHeight; 
    var value = {};
    value.x = x;
    value.y = y;
    return value;
  }; 

  function appendTo(element) {
    element.appendChild(container);
  };
 
  function setLines(x, y) {
    vLine.setAttribute('x1', x * 100 + '%');     
    vLine.setAttribute('x2', x * 100 + '%');     
    hLine.setAttribute('y1', (1 - y) * 100 + '%');     
    hLine.setAttribute('y2', (1 - y) * 100 + '%'); 
  };
 
  function setValue(x, y, isExecuted) {
    value.x = x;
    value.y = y;
    setLines(value.x, value.y);
    if (isExecuted == undefined || isExecuted) {
      executeCallbacks(value.x, value.y);
    }
  };

  function getValue() {
    return value;
  };
 
  function addCallback(callback) {
    callbackList.push(callback);
  };

  function removeCallback(callback) {
    for (var i = 0; i < callbackList.length; i++) {
      if (callback == callbackList[i]) {
        callbackList.splice(i, 1);
      }
    }
  };

  function executeCallbacks(x, y) {
    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i](x, y);
    }
  };
 
  return {
    appendTo: appendTo,
    getValue: getValue,
    setValue: setValue,
    addCallback: addCallback,
    removeCallback: removeCallback};

};

