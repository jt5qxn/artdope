/**
 * @author Ryo Kuroyanagi
 **/

/**
 * @constructor
 */
Cyber.Alert = function() {
  var frame = document.createElement('div');
  frame.className = 'cyber-alert';
  var container = document.createElement('div');
  container.className = 'cyber-aler-container';
  frame.appendChild(container);
  var message = document.createElement('span');
  message.className = 'cyber-aler-msg';
  container.appendChild(messageSpan);
  var self = this;
  var removeButton = document.createElement('span');
  removeButton.className = 'cyber-alert-removebutton';
  removeButton.innerText = 'x';
  removeButton.addEventListener('click', function() {
    self.removeAlert();
  }, false);
  container.appendChild(removeButton);
  
  this.frame = frame;
  this.message = message;
};


/**
 * Appends elements to document.body.
 */
Cyber.Alert.prototype.render = function() {
  if (document.readyState == 'complete') {
    document.body.appendChild(container);
  } else {
    window.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(container);
    });
  }
};


/**
 * Shows alert.
 * @param {string} message Message which is shown in alert.
 * @param {boolean} opt_disappearTime Interval to hide aler.
 */
Cyber.Alert.prototype.show = function(message, opt_disappearTime) {
  this.message.innerText = message || '';
  this.frame.classList.add('shown');
  if (disappearTime) {
    var self = this;
    setTimeout(function() { self.hide(); }, disappearTime);
  }
};


/**
 * Hides alert.
 */
Cyber.Alert.prototype.hide = function() {
  this.frame.classList.remove('shown');
  this.message.innerText = '';
};
 
