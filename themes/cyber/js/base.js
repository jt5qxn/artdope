/**
 * @author ku6ryo@gmail.com (Ryo Kuroyanagi)
 */

var Cyber = function() {};

Cyber.Fonts = [
    audiowide: 'http://fonts.googleapis.com/css?family=Audiowide'
    orbitron: 'http://fonts.googleapis.com/css?family=Orbitron'];

Cyber.Base = function() {};

Cyber.Base.prototype.loadWebFonts = function() {
  var fonts = Cyber.Fonts;
  for (var name in fonts) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = fonts[name];
    document.body.appendChild(link);
  }
};



