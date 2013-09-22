/**
 * basic_bars.js
 * @author Ryo Kuroyanagi
 **/

var basicBars = (function() {

  // create a WebGL renderer, camera
  // and a scene
  var WIDTH = 400, HEIGHT = 300;
  var renderer = new THREE.WebGLRenderer();
  //set some camera attributes
  var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;
  var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  var scene = new THREE.Scene();

  // time 
  var time = 0;
  var timeDeltaRendering = 20;
  var timeDeltaResponse = 20;
  var timeDecay = 500;
  var timeDecayBack = 1200;
  
  var intervalRendering = null;
  var intervalResponse = null;

  var division = 128;
  var volume = 0;
  var barShape = new THREE.Shape();
  barShape.moveTo(0, 0);
  barShape.lineTo(1, 0);
  barShape.lineTo(1, 1);
  barShape.lineTo(0, 1);
  barShape.lineTo(0, 0);

  var barGeometry = new THREE.ShapeGeometry(barShape);

  barList = [];

  var aa = null;
  var amplitude = 1;

  function init(audioAnalyser) {

    if (!audioAnalyser.constructor ||
        audioAnalyser.constructor.name != 'AudioAnalyser') {
      throw 'non-AudioAnalyser object was given.';
    } else {
      aa = audioAnalyser;
    }
 
    // the camera starts at 0,0,0 so pull it back
    camera.position.z = 300;
    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    spectrumMax = 1024; 
    division = 600;
    for (var i = 0; i < division; i++) {
      var material = new THREE.MeshBasicMaterial({
        color: 0x000000 + i,
        shading: THREE.FlatShading, 
        vertexColors: THREE.VertexColors });
      var bar = new THREE.Mesh(barGeometry, material);
      bar.position.x = - 150;
      bar.position.y = - HEIGHT/2 + i * 1;
      scene.add(bar);
      barList.push(bar);
    }
    renderer.render(scene, camera);

  };

  function setContainer(element) {
    element.appendChild(renderer.domElement);
  };

  function start() {

    intervalResponse = setInterval(function() {
      var spectrum = aa.getSpectrum(spectrumMax);
      for (var i = 0; i < division; i++) {
        var bar = barList[i];
        bar.scale.x = amplitude * spectrum[parseInt(i * spectrumMax / division)];
      } 
    }, timeDeltaResponse);

    intervalRendering = setInterval(function() {
      renderer.render(scene, camera);
    }, timeDeltaRendering);

  };
  
  function stop() {
    clearInterval(intervalRendering);
    clearInterval(intervalResponse);
  };

  function setResponsibility(dt) {
    if (dt < 10) {
      timeDeltaRendering = 10;
    } else if (dt > 200) {
      timeDeltaRendering = 200;
    } else {
      timeDeltaRendering = dt;
    }
  };

  function setColor(sColor, eColor) {
    for (var i = 0; i < division; i++) {
      var r = (eColor.r - sColor.r) / division * i + sColor.r;
      var g = (eColor.g - sColor.g) / division * i + sColor.g;
      var b = (eColor.b - sColor.b) / division * i + sColor.b;
      barList[i].material.color.setRGB(r, g, b);
    }
    renderer.render(scene, camera);
  };

  /**
   * @param {float} value
   **/
  function setAmplitude(value) {
    amplitude = value;
  };

  function setCenterFq(frequency) {
    var fq = frequency || 128;
    camera.position.y = frequency - HEIGHT / 2.0;
  }

  return {
    init: init,
    start: start,
    stop: stop,
    setContainer: setContainer,
    setColor: setColor,
    setAmplitude: setAmplitude,
    setCenrtFq: setCenterFq
  };

  function Bar() {
  };

})();

