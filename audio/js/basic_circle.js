/**
 * @author Ryo Kuroyanagi
 **/

var basicCircle = (function() {

  // create a WebGL renderer, camera
  // and a scene
  var WIDTH = 400, HEIGHT = 300;
  var renderer = new THREE.WebGLRenderer();
  //set some camera attributes
  var VIEW_ANGLE = 45;
  var ASPECT = WIDTH / HEIGHT;
  var NEAR = 0.1;
  var FAR = 10000;
  var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  var scene = new THREE.Scene();

  // time 
  var time = 0;
  var timeDeltaRendering = 20;
  var timeDeltaResponse = 20;
  var timeDecay = 500;
  var timeDecayBack = 1200;

  var defaultRadius = 20;
  var amplitude = 5; 

  var circle = null;
  var circleBack = null;

  var intervalRendering = null;
  var intervalResponse = null;

  var volume = 0;

  var aa = null;

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

    var radius = defaultRadius, segments = 128;
    var material = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      shading: THREE.FlatShading, 
      vertexColors: THREE.VertexColors });
    circle = new THREE.Mesh(
      new THREE.CircleGeometry(radius, segments),
      material);
    circle.material.color.setRGB(0.1, 0.1, 0.1);
    circle.position.z = 1;

    var materialBack = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        shading: THREE.FlatShading, 
        vertexColors: THREE.VertexColors }); 
    circleBack = new THREE.Mesh(
      new THREE.CircleGeometry(radius, segments),
      materialBack);
    circleBack.material.color.setRGB(0.5, 1.0, 0.5);
    circleBack.position.z = 0;
    scene.add(circleBack);
    scene.add(circle);
    renderer.render(scene, camera);
  };

  function setContainer(element) {
    element.appendChild(renderer.domElement);
  };

  function start() {
    var maxVolume = - Infinity;
    var minVolume = + Infinity;
    var decay = 1;
    var decayBack = 1;

    var scale = 1;
    var scaleHist = [1, 1, 1];

    intervalResponse = setInterval(function() {
      var volume = aa.getVolume();
      if (volume > maxVolume) {
        maxVolume = volume;
      } else if (volume < minVolume) {
        minVolume = volume;
      }
      maxVolume = maxVolume * 0.999 + volume * 0.001;
      minVolume = minVolume * 0.999 + volume * 0.001;
      scaleHist.splice(0, 1);
      var scale_ = ((volume - minVolume) / (maxVolume - minVolume)
        * (amplitude - 1) + 1) || 1;
      scaleHist.push(scale_);
      for (var i = 0, sum = 0; i < scaleHist.length; i++) {
        sum += scaleHist[i];
      };
      scale = sum / scaleHist.length;

    }, timeDeltaResponse);

    intervalRendering = setInterval(function() {
      if (circle.scale.x < scale) {
        circle.scale.x = scale;
        circle.scale.y = scale;
        decay =  Math.pow(
          1 / circle.scale.x,
          timeDeltaRendering / timeDecay); 
      } else {
        circle.scale.x *= decay;
        circle.scale.y *= decay;
      }

      if (circleBack.scale.x < scale) {
        circleBack.scale.x = scale + 0.1;
        circleBack.scale.y = scale + 0.1;
        decayBack =  Math.pow(
          1 / circleBack.scale.x,
          timeDeltaRendering / timeDecayBack); 
      } else {
        circleBack.scale.x *= decayBack;
        circleBack.scale.y *= decayBack;
      } 

      renderer.render(scene, camera);
      /*   
           var composer = new THREE.EffectComposer(renderer);
           composer.addPass(new THREE.RenderPass(scene, camera));
           composer.addPass(new THREE.BloomPass(4.0, 25, 2.0, 512));
           var toScreen = new THREE.ShaderPass(THREE.CopyShader);
           toScreen.renderToScreen = true;
           composer.addPass(toScreen);
           composer.render();
           */    }, timeDeltaRendering);

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

  function setAmplitude(value) {
    amplitude = value;
  };

  return {
    init: init,
    setContainer: setContainer,
    setAmplitude: setAmplitude,
    start: start,
    stop: stop
  };
 
})();



