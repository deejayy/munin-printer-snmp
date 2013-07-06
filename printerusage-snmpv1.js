#!/usr/bin/node

var snmp = require('net-snmp');

var printerData = require('./printers-config');
var pd = new printerData();

var host = process.argv[1].replace(/.*\/printerusage_/, "");

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
				session.subtree(pd.devices[device].usageTypes.base.join('.'), function (varbind) {
					for (var v in varbind) {
						oids[varbind[v].oid] = varbind[v].type == 4 ? varbind[v].value.toString('UTF-8') : varbind[v].value;
					}
				}, function done(result) {
					if (process.argv[2] && process.argv[2] == 'config') {
						console.log('graph_title ' + device + ' counters on ' + host + '\ngraph_args --units-exponent 0 --upper-limit 100 --lower-limit 0\ngraph_vlabel counter\ngraph_category printers');
						for (c in pd.devices[device].counters) {
							var unit = 'u' + pd.devices[device].counters[c].join('') + '.';
							console.log(unit + 'label ' + c);
							console.log(unit + 'type GAUGE');
						}
					} else {
						for (c in pd.devices[device].counters) {
							var oidCounter = pd.devices[device].usageTypes.base.join('.') + '.' + pd.devices[device].usageTypes.counter + '.' + pd.devices[device].counters[c].join('.');
							console.log('u' + pd.devices[device].counters[c].join('') + '.value ' + oids[oidCounter]);
						}
					}
				});
			}
		}
	});
} else {
	console.log('filename convention: printerusage_<hostname>');
}
