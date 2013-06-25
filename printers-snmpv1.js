#!/usr/bin/node

var snmp = require('net-snmp');

var printerData = require('./printers-config');
var pd = new printerData();

var host = process.argv[1].replace(/.*\/printer_/, "");

if (!host.match(/\//)) {
	if (process.argv[2] && process.argv[2] == 'autoconf') {
		console.log('yes');
		process.exit();
	}
	var session = snmp.createSession(host, "public", {
		version: snmp.Version1
	});
	session.get([ pd.deviceID.join('.') ], function (error, varbind) {
		if (!error) {
			var device = varbind[0].value.toString('UTF-8');
			var oids = {};
			if (pd.select(device)) {
				session.subtree(pd.consumableTypes.base.join('.'), function (varbind) {
					for (var v in varbind) {
						oids[varbind[v].oid] = varbind[v].type == 4 ? varbind[v].value.toString('UTF-8') : varbind[v].value;
					}
				}, function done(result) {
					if (process.argv[2] && process.argv[2] == 'config') {
						console.log('graph_title ' + device + ' consumables on ' + host + '\ngraph_args --units-exponent 0 --upper-limit 100 --lower-limit 0\ngraph_vlabel percent\ngraph_category printers');
						for (c in pd.devices[device].consumables) {
							var unit = 'c' + pd.devices[device].consumables[c].join('') + '.';
							console.log(unit + 'label ' + c);
							console.log(unit + 'max 100');
							console.log(unit + 'min 1');
							console.log(unit + 'type GAUGE');
							console.log(unit + 'warning 10:100');
							console.log(unit + 'critical 5:100');
						}
					} else {
						for (c in pd.devices[device].consumables) {
							var oidCurrent = pd.consumableTypes.base.join('.') + '.' + pd.consumableTypes.current + '.' + pd.devices[device].consumables[c].join('.');
							var oidFull    = pd.consumableTypes.base.join('.') + '.' + pd.consumableTypes.full    + '.' + pd.devices[device].consumables[c].join('.');
							console.log('c' + pd.devices[device].consumables[c].join('') + '.value ' + Math.floor(oids[oidCurrent] / oids[oidFull] * 10000)/100);
						}
					}
				});
			}
		}
	});
} else {
	console.log('filename convention: printer_<hostname>');
}
