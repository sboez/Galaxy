import * as THREE from 'three';

export default class Galaxy {
    constructor(scene) {
        this.scene = scene;

        this.parameters = {
            count: 1000,
            size: 0.02
        }

        this.geometry = null;
        this.material = null;
        this.points = null;

        this.setGalaxy();
    }

    setGalaxy() {
        if (this.points !== null) {
            this.geometry.dispose();
            this.material.dispose();
            this.scene.remove(this.points);
        }

        this.geometry = new THREE.BufferGeometry();
        this.positions = new Float32Array(this.parameters.count * 3);

        for (let i = 0; i < this.parameters.count; ++i) {
            const i3 = i * 3;

            this.positions[i3] = (Math.random() - 0.5) * 3
            this.positions[i3 + 1] = (Math.random() - 0.5) * 3
            this.positions[i3 + 2] = (Math.random() - 0.5) * 3
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

        this.material = new THREE.PointsMaterial({
            size: this.parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })

        this.points = new THREE.Points(this.geometry, this.material);

        this.scene.add(this.points);
    }
}