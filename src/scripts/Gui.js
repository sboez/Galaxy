import * as dat from 'dat.gui';

const gui = new dat.GUI({ width: 400 });

export default class Gui {
	constructor(galaxy) {
		this.galaxy = galaxy;

		this.addGUI();
	}

	addGUI() {
		gui.add(this.galaxy.parameters, 'count').min(100).max(100000).step(10).onFinishChange(() => this.galaxy.setGalaxy());
		gui.add(this.galaxy.parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(() => this.galaxy.setGalaxy());
		gui.add(this.galaxy.parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(() => this.galaxy.setGalaxy());
		gui.add(this.galaxy.parameters, 'branches').min(2).max(20).step(1).onFinishChange(() => this.galaxy.setGalaxy());
		gui.add(this.galaxy.parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(() => this.galaxy.setGalaxy());
		gui.add(this.galaxy.parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(() => this.galaxy.setGalaxy());
	}
}
