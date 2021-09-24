import Scene from './scripts/Scene';
import Galaxy from './scripts/Galaxy';
import Gui from './scripts/Gui';
import * as THREE from 'three';

class App {
	constructor() {
		this.scene = null;
		this.galaxy = null;
		this.gui = null;

		this.clock = new THREE.Clock();

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
		const elapsedTime = this.clock.getElapsedTime();

		this.galaxy.material.uniforms.uTime.value = elapsedTime;

		this.scene.controls.update();
		this.scene.renderer.render(this.scene, this.scene.camera);
		window.requestAnimationFrame(this.animate.bind(this));
	}
}

new App();