function printerData() {
	this.deviceID = [1,3,6,1,2,1,25,3,2,1,3,1];

	this.consumableTypes = {
		base: [1,3,6,1,2,1,43,11,1,1],
		name: 6,
		full: 8,
		current: 9,
	};

	this.devices = {
		'Officejet Pro 8100 N811a': {
			consumables: {
				'INK Black'    : [0,1],
				'INK Yellow'   : [0,2],
				'INK Cyan'     : [0,3],
				'INK Magenta'  : [0,4],
			}
		},
		'Xerox WorkCentre 5655 v1 Multifunction System': {
			consumables: {
				'Toner'        : [1,1],
				'XeroGfx'      : [1,2],
				'Fuser'        : [1,3],
				'Waste'        : [1,4],
			}
		},
		'Samsung CLP-310 Series': {
			consumables: {
				'TONER Cyan'   : [1,1],
				'TONER Magenta': [1,2],
				'TONER Yellow' : [1,3],
				'TONER Black'  : [1,4],
				'Fuser'        : [1,5],
				'Transfer'     : [1,6],
				'Pickup'       : [1,7],
				'Gfx'          : [1,8],
				'Belt'         : [1,9],
			}
		},
	};
}

printerData.prototype = {
	select: function(device) {
		this.device = device;
		return this.devices[device];
	},
};

module.exports = printerData;
