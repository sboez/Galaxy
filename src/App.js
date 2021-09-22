import Scene from './scripts/Scene';
import Galaxy from './scripts/Galaxy';
import * as dat from 'dat.gui';
import Gui from './scripts/Gui';

import * as THREE from 'three';

class App {
	constructor() {
		this.scene = null;
		this.galaxy = null;
		this.gui = null;

		this.letsPlay();
	}

	async letsPlay() {
		this.scene = new Scene();
		this.galaxy = new Galaxy(this.scene);
		this.gui = new Gui(this.galaxy);

		this.init();
		this.animate();
	}

	init() {
		document.body.appendChild(this.scene.renderer.domElement);
		window.addEventListener('resize', this.onWindowResize.bind(this), false);
	}

	onWindowResize() {
		this.scene.camera.aspect = window.innerWidth / window.innerHeight;
		this.scene.camera.updateProjectionMatrix();
		this.scene.renderer.setSize(window.innerWidth, window.innerHeight);
		this.scene.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	}

	animate() {
		const clock = new THREE.Clock()

		const elapsedTime = clock.getElapsedTime();

		this.scene.controls.update();
		this.scene.renderer.render(this.scene, this.scene.camera);
		window.requestAnimationFrame(this.animate.bind(this));
	}
}

new App();