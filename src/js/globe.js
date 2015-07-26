  var camera, scene, renderer, geometry, material, mesh,text3d,controls;

  var canvas = document.getElementById('canvas');

  var height = 600,
      width = 940;

  init();
  animate();

  function init() {
      // Step 1 : Add Scene
      scene = new THREE.Scene();

      // Step 2 : Add Camera
      camera = new THREE.PerspectiveCamera(25, width / height, 1, 10000);
      camera.position.z = 250;
      scene.add(camera);

      // Step 3 : Add Controlls
      controls = new THREE.TrackballControls( camera );
      controls.damping = 0.2;
      controls.addEventListener( 'change', render );

      // Step 4 : Add Object
      // Parameter 1 : radius
      // Parameter 2 : segmentsWidth
      // Parameter 3 : segmentsHeight
      geometry = new THREE.SphereGeometry(40, 60, 24);

      material = new THREE.MeshBasicMaterial({
          map: THREE.ImageUtils.loadTexture('src/img/earthTexture.jpg'),
          overdraw: true
      });

      mesh = new THREE.Mesh(geometry, material);

      scene.add(mesh);

      // Step 5 : Add Renderer
      //renderer = new THREE.CanvasRenderer();
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      canvas.appendChild(renderer.domElement);
  }

  function animate() {
      // note: three.js includes requestAnimationFrame shim
      requestAnimationFrame(animate);
      controls.update();
      render();
  }

  function render() {
      //mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.002;
      renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
  }

  $(document).on("click","a",function(){
    mesh.material.map = THREE.ImageUtils.loadTexture("src/img/"+$(this).attr("data-texture"));
    mesh.material.needsUpdate = true;
  });