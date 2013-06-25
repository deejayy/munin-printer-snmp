function printerData() {
	this.deviceID = [1,3,6,1,2,1,25,3,2,1,3,1];

	this.consumableTypes = {
		base: [1,3,6,1,2,1,43,11,1,1],
		name: 6,
		full: 8,
		current: 9,
	};

	this.usageTypes = {
		base: [1,3,6,1,4,1,253,8,53,13,2,1],
		name: 8,
		counter: 6,
	};

	this.devices = {
		'Officejet Pro 8100 N811a': {
			consumableTypes: this.consumableTypes,
			consumables: {
				'INK Black'    : [0,1],
				'INK Yellow'   : [0,2],
				'INK Cyan'     : [0,3],
				'INK Magenta'  : [0,4],
			},
			usageTypes: {
				base: [1,3,6,1,2,1,43,10,2],
				counter: 1,
			},
			counters: {
				'MarkerLifeCount': [4,0,1],
				'MarkerPowerOnCount': [5,0,1],
			},
		},
		'Xerox WorkCentre 5655 v1 Multifunction System': {
			consumableTypes: this.consumableTypes,
			consumables: {
				'Toner'        : [1,1],
				'XeroGfx'      : [1,2],
				'Fuser'        : [1,3],
				'Waste'        : [1,4],
			},
			usageTypes: this.usageTypes,
			counters: {
				'Total Impressions': [1,20,1],
				'Power On Impressions': [1,20,2],
				'Black Printed Impressions': [1,20,7],
				'Black Printed Sheets': [1,20,8],
				'Black Printed 2 Sided Sheets': [1,20,9],
				'Black Printed Large Sheets': [1,20,10],
				'Black Large Impressions': [1,20,44],
				'Color Stored Image Printed Impressions': [1,20,72],
				'Black Stored Image Printed Impressions': [1,20,73],
				'Stored Image Printed Impressions': [1,20,74],
				'Server Fax Images Sent': [10,20,13],
				'Server Fax Impressions': [10,20,14],
				'Internet Fax Images Sent': [11,20,13],
				'Internet Fax Impressions': [11,20,14],
				'Embedded Fax Images Sent': [12,20,13],
				'Embedded Fax Impressions': [12,20,14],
				'Embedded Fax Sheets': [12,20,15],
				'Embedded Fax 2 Sided Sheets': [12,20,16],
				'Embedded Fax Large Sheets': [12,20,17],
				'Network Scanning Images Sent': [13,20,11],
				'E-mail Images Sent': [13,20,12],
				'Black Copied Impressions': [14,20,3],
				'Black Copied Sheets': [14,20,4],
				'Black Copied 2 Sided Sheets': [14,20,5],
				'Black Copied Large Sheets': [14,20,6],
			}
		},
		'Samsung CLP-310 Series': {
			consumableTypes: this.consumableTypes,
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
			},
			usageTypes: {
				base: [1,3,6,1,2,1,43,10,2],
				counter: 1,
			},
			counters: {
				'MarkerLifeCount': [4,1,1],
				'MarkerPowerOnCount': [5,1,1],
			},
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
