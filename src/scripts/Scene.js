import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export default class Scene extends THREE.Scene {
	constructor() {
		super();

		this.canvas = document.querySelector('canvas.webgl');

		this.setScene();
	}

	setScene() {
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 100);
		this.camera.position.set(3, 3, 3);

		this.setLights();
		this.setRenderer();
		this.setControls();
	}

	setLights() {
		this.light = new THREE.HemisphereLight(0xffffff, 0x404040, 1);
		this.add(this.light);
	}

	setRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas: this.canvas
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	}

	setControls() {
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;
		this.controls.update();
	}
}
