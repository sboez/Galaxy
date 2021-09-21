import Scene from './scripts/Scene';
import Gui from './scripts/Gui';

import * as THREE from 'three';

class App {
	constructor() {
		this.scene = null;
		this.gui = null;

		this.letsPlay();
	}

	async letsPlay() {
		this.scene = new Scene();
		this.gui = new Gui();

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

		const tick = () => {
			const elapsedTime = clock.getElapsedTime();

			this.scene.controls.update();
			this.scene.renderer.render(this.scene, this.scene.camera);
			window.requestAnimationFrame(tick);
		}

		tick();
	}
}

new App();