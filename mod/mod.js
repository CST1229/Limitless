//General mod init

window.paintmod = {};

//Settings
window.paintmod.settings = {};
//Defaults for settings
window.paintmod.settings.defaults = {
	nocanvasbounds: true,
	fonts: true,
	defaultcolor: "#000000",
	nopasteoffset: true,
	zoomfactor: 1500,
	ctrlrotate: true,
	shiftpoints: true,
	swatches: true,
	darkmode: false,
	ctrlscale: true,
	fixserif: false,
	hexcolor: true,
	nomiter: false
}
//All settings
window.paintmod.settings.all = [
	"nocanvasbounds",
	"fonts",
	"defaultcolor",
	"nopasteoffset",
	"zoomfactor",
	"ctrlrotate",
	"shiftpoints",
	"swatches",
	"darkmode",
	"ctrlscale",
	"fixserif",
	"hexcolor",
	"nomiter"
]
//Set settings
try {
	//Get storage
	storage = window.localStorage;

	//Defaults
	let doDefault = function(name) {
		if (storage.getItem("paintmod-" + name)===null) {
			storage.setItem("paintmod-" + name, window.paintmod.settings.defaults[name]);
		}
	}
	window.paintmod.settings.all.forEach(
		(s) => doDefault(s)
	);
	
	//Set values of settings
	window.paintmod.settings.all.forEach(
		(s) => window.paintmod.settings[s] = storage.getItem("paintmod-" + s)
	);
} catch(error) {
	console.warn("Storage fail, error:", error)
	console.warn("Using default values")
	window.paintmod.settings.all.forEach(
		(s) => window.paintmod.settings[s] = window.paintmod.settings.defaults[s]
	);
}