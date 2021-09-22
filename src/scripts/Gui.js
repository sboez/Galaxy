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
	}
}
