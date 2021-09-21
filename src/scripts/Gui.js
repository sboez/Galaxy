import * as dat from 'dat.gui';

const gui = new dat.GUI();

export default class Gui {
	constructor() {
		this.addGUI();
	}

	addGUI() {
		const params = {
			posX: 0,
			posY: 0,
			posZ: 0,
			scaleX: 0,
			scaleY: 0,
			scaleZ: 0,
			rotY: 0,
			rotX: 0,
		}
		this.setGUI(params);
	}

	setGUI(params) {
		this.setPosition(params);
		this.setScale(params);
		this.setRotation(params);
	}

	setPosition(params) {
		const folderPos = gui.addFolder('Position');
	}

	setScale(params) {
		const folderScale = gui.addFolder('Scale');
	}

	setRotation(params) {
		const folderRot = gui.addFolder('Rotation');
	}
}
