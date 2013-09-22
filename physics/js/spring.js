/**
 * @author Ryo Kuroyanagi
 **/

var spring = (function() {
  
  var WIDTH = 400, HEIGHT = 300;
  var renderer = new THREE.WebGLRenderer();
  var VIEW_ANGLE = 45;
  var ASPECT = WIDTH / HEIGHT; 
  var NEAR = 0.1;
  var FAR = 10000;
  var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  var scene = new THREE.Scene();

  var timeDeltaRendering = 20;
  var timeDeltaCalculation = 20;

  var m = 10;
  var kx = 10;
  var ky = 10;
  var f = 0.0;

  var x = 0.0;
  var vx = 0.0;
  var ax = 0.0;
  var y = 0.0;
  var vy = 0.0;
  var ay = 0.0;

  var circle = null;

  var radius = 15;
  var segments = 64;

  var areaWidth = 240;
  var areaHeight = 160;

  var intervalRendering = null;
  var intervalCalculation = null;

  function init() {
    camera.position.z = 300;
    renderer.setSize(WIDTH, HEIGHT);
    var material = new THREE.MeshBasicMaterial({
      color: 0x303030,
      shading: THREE.FlatShading,
      vertexColors: THREE.VertexColors });
    circle = new THREE.Mesh(
      new THREE.CircleGeometry(radius, segments),
      material);
    scene.add(circle);
    renderer.render(scene, camera);
  };

  function calculatePosition() {
    var dt = timeDeltaCalculation / 1000;
    var x0 = x - vx * dt;
    var x1 = x;
    ax = (- kx * x1 - f * vx) / m;
    var x2 = ax * dt * dt + 2 * x1 - x0;
    vx = (x2 - x1) / dt;
    x = x2;

    var y0 = y - vy * dt;
    var y1 = y;
    ay = (- ky * y1 - f * vy) / m;
    var y2 = ay * dt * dt + 2 * y1 - y0;
    vy = (y2 - y1) / dt;
    y = y2;
  };

  function start() {
    intervalRendering = setInterval(function() {
      circle.position.x = x;
      circle.position.y = y;
      renderer.render(scene, camera);
    }, timeDeltaRendering);

    intervalCalculation = setInterval(function() {
      calculatePosition();
    }, timeDeltaCalculation);

  };

  function stop() {
    clearInterval(intervalRendering);
    clearInterval(intervalCalculation);
  };

  function setContainer(element) {
    element.appendChild(renderer.domElement);
  };

  function getPosision() {
    return {x: x, y:y};
  };
  
  function setPosition(x_, y_) {
    x = x_;
    y = y_;
    vx = 0.0;
    vy = 0.0;
    ax = 0.0;
    ay = 0.0; 
  };

  function getMass() {
    return m;
  };
  
  function setMass(value) {
    m = value;
  };

  function getFriction() {
    return f;
  };

  function setFriction(value) {
    f = value;
  };

  return {
    init: init,
    getMass: getMass,
    setMass: setMass,
    getFriction: getFriction,
    setFriction: setFriction,
    getPosision: getPosision,
    setPosition: setPosition,
    setContainer: setContainer,
    start: start,
    stop: stop
  };

})();


