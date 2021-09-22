import * as THREE from 'three';
import galaxyVertexShader from '../shaders/vertex.glsl';
import galaxyFragmentShader from '../shaders/fragment.glsl';

export default class Galaxy {
    constructor(scene) {
        this.scene = scene;

        this.parameters = {
            count: 10000,
            size: 0.02,
            radius: 5,
            branches: 3,
            randomness: 0.2,
            randomnessPower: 3,
            insideColor: '#ff6030',
            outsideColor: '#1b3984'
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

        const positions = new Float32Array(this.parameters.count * 3);
        const colors = new Float32Array(this.parameters.count * 3);
        const scales = new Float32Array(this.parameters.count);

        const colorInside = new THREE.Color(this.parameters.insideColor);
        const colorOutside = new THREE.Color(this.parameters.outsideColor);

        for (let i = 0; i < this.parameters.count; ++i) {
            const i3 = i * 3;

            const radius = Math.random() * this.parameters.radius;
            const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2;

            const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius;

            positions[i3] = Math.cos(branchAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ;

            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / this.parameters.radius);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            scales[i] = Math.random();
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        this.geometry.setAttribute('sScale', new THREE.BufferAttribute(scales, 1));

        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: galaxyVertexShader,
            fragmentShader: galaxyFragmentShader,
            uniforms: {
                uSize: { value: 8 * this.scene.renderer.getPixelRatio() }
            }
        })

        this.points = new THREE.Points(this.geometry, this.material);

        this.scene.add(this.points);
    }
}