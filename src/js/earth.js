(function () {

	// Earth params
		var radius   = 0.5,
			segments = 32,
			rotation = 6;

		var width  = window.innerWidth,
				height = window.innerHeight;

		var scene,camera,renderer,light,sphere,clouds,stars,controls;

	init();
	render();

	function init() {
			var webglEl = document.getElementById('webgl');

			if (!Detector.webgl) {
				Detector.addGetWebGLMessage(webglEl);
				return;
			}

			THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
		    console.log( item, loaded, total );
		  };

			scene = new THREE.Scene();

			camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
			camera.position.z = 1.5;

			renderer = new THREE.WebGLRenderer();
			renderer.setSize(width, height);

			scene.add(new THREE.AmbientLight(0x333333));

			light = new THREE.DirectionalLight(0xffffff, 1);
			light.position.set(5,3,5);
			scene.add(light);

			sphere = createSphere(radius, segments);
			sphere.rotation.y = rotation;
			scene.add(sphere)

			clouds = createClouds(radius, segments);
			clouds.rotation.y = rotation;
			scene.add(clouds)

			stars = createStars(90, 64);
			scene.add(stars);

			controls = new THREE.TrackballControls(camera);

			webglEl.appendChild(renderer.domElement);
	}

	function render() {
		controls.update();
		sphere.rotation.y += 0.0005;
		clouds.rotation.y += 0.0005;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('src/img/2_no_clouds_4k.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('src/img/elev_bump_4k.jpg'),
				bumpScale:   0.005,
				specularMap: THREE.ImageUtils.loadTexture('src/img/water_4k.png'),
				specular:    new THREE.Color('grey')
			})
		);
	}

	function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('src/img/fair_clouds_4k.png'),
				transparent: true
			})
		);
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('src/img/galaxy_starfield.png'),
				side: THREE.BackSide
			})
		);
	}

}());