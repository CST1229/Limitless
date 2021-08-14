if (window.paintmod.settings.darkmode==="true") {
	let darkmodelink = document.createElement("link");
	darkmodelink.rel = "stylesheet";
	darkmodelink.href = "addons/darkmode.css";
	document.head.appendChild(darkmodelink);
}