/**
 * @author Ryo Kuroyanagi
 **/

var spheres = (function() {

  // create a WebGL renderer, camera
  // and a scene
  var WIDTH = 600, HEIGHT = 400;
  var renderer = new THREE.WebGLRenderer();
  //set some camera attributes
  var VIEW_ANGLE = 45;
  var ASPECT = WIDTH / HEIGHT;
  var NEAR = 0.1;
  var FAR = 10000;
  var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  var scene = new THREE.Scene();

  var time = 0;
  var timeDeltaRendering = 20;
  var timeDeltaResponse = 20;

  var intervalRendering = null;

  var rotationRadius = 200;
  var sphereRadius = 50, segments = 64, rings = 16;

  var sphereList = [];
  var linePosList = [];
  var circPosList = [];

  var num = 9;

  var masterGroup = new THREE.Object3D();

  function init() {
    
    var cameraRotationRadius = 400;
    // the camera starts at 0,0,0 so pull it back
    camera.position.x = cameraRotationRadius;
    camera.position.y = 0;
    camera.position.z = 300;
    camera.lookAt({x: 0, y: 0, z: 0});
    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColorHex(0x000000, 1.0);

   var material = new THREE.MeshPhongMaterial({
      color: 0xFF6600,
      ambient: 0xFF0000,
      specular: 0xFFFFFF,
      shininess: 150,
      refractionRatio: 1.5,
      reflectivity: 50,
      transparent: true,
      opacity: 0.8,
    });

    calcCircPositions();
    calcLinePositions();

    scene.add(masterGroup);

    for (var i = 0; i < num; i++) {
      var group = new THREE.Object3D();
      var sphere= new THREE.Mesh(
        new THREE.SphereGeometry(sphereRadius, segments, rings),
        material);
      group.add(sphere);
      sphereList.push(group);
      masterGroup.add(group);
    }

    var pointLight = new THREE.PointLight( 0xFFFFFF );
    pointLight.position.x = 0;
    pointLight.position.y = 0;
    pointLight.position.z = 200;
    scene.add(pointLight);
  
    var ambientLight = new THREE.AmbientLight(0x707070);
    scene.add(ambientLight);

    renderer.render(scene, camera);
    start(); 
  };

  function setContainer(element) {
    element.appendChild(renderer.domElement);
  };

  function start() {
    intervalRendering = setInterval(function() {
      renderer.render(scene, camera);
    }, timeDeltaRendering);
  };
  
  function stop() {
    clearInterval(intervalRendering);
  };

  var intervalRotation = null;
  function startRotation() {
    var time = 0;
    var rotationTime = 3000;
    var deltaTheta = 2 * Math.PI / (rotationTime / timeDeltaRendering); 
    intervalRotation =  setInterval(function() {
      masterGroup.rotation.z += deltaTheta;
      time++;
    }, timeDeltaRendering);
  };
  
  function stopRotation() {
    clearInterval(intervalRotation);
  };

  function calcLinePositions() {
    linePosList = [];
    var distance = 100;
    for (var i = 1; i < num + 1; i++) {
      var position = {};
      position.x = (i - i % 2) / 2 * Math.pow(-1, i) * 100;
      position.y = 0;
      position.z = 0;
      linePosList.push(position);
    }
  };

  function calcCircPositions() {
    circPosList = [];
    for (var i = 0; i < num; i++) {
      var position = {};
      position.x = rotationRadius * Math.cos(2 * Math.PI / num * i);
      position.y = rotationRadius * Math.sin(2 * Math.PI / num * i);
      position.z = 0;
      circPosList.push(position);
    }
  };

  var intervalMoving = null;
  function moveSpheres(posList) {
    clearInterval(intervalMoving);
    var nowPosList = [];
    for (var i = 0; i < num; i++) {
      var s = sphereList[i];
      var position = {};
      position.x = s.position.x;
      position.y = s.position.y;
      position.z = s.position.z;
      nowPosList.push(position);
    }
    var duration = 1000;
    var time = 0;
    var isExceeded = false;
    intervalMoving = setInterval(function() {
      time += timeDeltaRendering;
      if (time > duration) {
        if (isExceeded) {
          clearInterval(intervalMoving);
        } else {
          isExceeded = true;
          time = duration;
          move();
        }
      } else if (time == duration) {
        isExceeded = true;
        move();
      } else {
        move();
      }
    }, timeDeltaRendering);
    function move() {
      for (var i = 0; i < num; i++) {
        var s = sphereList[i];
        var sp = nowPosList[i];
        var ep = posList[i];
        s.position.x = (ep.x - sp.x) * time / duration + sp.x;
        s.position.y = (ep.y - sp.y) * time / duration + sp.y;
        s.position.z = (ep.z - sp.z) * time / duration + sp.z;
      }
    };
  };

  function gather() {
    var posList = [];
    for (var i = 0; i < num; i++) {
      posList.push({x: 0, y: 0, z: 0});
    }
    moveSpheres(posList);
  };

  function makeCircle() {
    moveSpheres(circPosList);
  };

  function makeLine() {
    moveSpheres(linePosList);
  };

  return {
    init: init,
    setContainer: setContainer,
    start: start,
    stop: stop,
    startRotation: startRotation,
    stopRotation: stopRotation,
    gather: gather,
    makeCircle: makeCircle,
    makeLine: makeLine,
  };
 
})();

