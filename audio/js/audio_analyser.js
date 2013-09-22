/** Audio Analyser Library
 *  @author Ryo Kuroyanagi
 **/

var AudioAnalyser = function() {

  var audioContext = new webkitAudioContext();
  var analyser = audioContext.createAnalyser();

  function AudioAnalyser() {
    this.isPermitted = false;
  };

  AudioAnalyser.prototype.askUserPermission = function(onsuccess, onerror) {
    navigator.webkitGetUserMedia({audio: true}, callback);

    var self = this;
    function callback(stream) {
      var source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      var data = new Uint8Array(1024);
      setTimeout(function() {
        analyser.getByteFrequencyData(data);
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
          sum += data[i];
        }
        if (sum) {
          self.isPermitted = true;
          onsuccess();
        } else {
          onerror();
        }
      }, 300);
    };
  };

  AudioAnalyser.prototype.getSpectrum = function(num) {
    num = num || 256;
    var spectrum = new Uint8Array(num);
    analyser.getByteFrequencyData(spectrum);
    return spectrum;
  };

  AudioAnalyser.prototype.getVolume = function() {
    var spectrum = new Uint8Array(1024);
    analyser.getByteFrequencyData(spectrum);
    var volume = 0;
    for (var i = 0; i < spectrum.length; i++) {
      volume += spectrum[i] * spectrum[i];
    }
    return volume;
  }
  
  return new AudioAnalyser();

};
  


