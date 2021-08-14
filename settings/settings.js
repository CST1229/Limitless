function $(e) {return document.querySelector(e);}
function $$(e) {return document.querySelectorAll(e);}

var saveTimeout = setTimeout(function(){}, 0);

function save(nosaved) {
	if (!($("#zoomfactor").value > 99 && $("#zoomfactor").value < 10001)) {alert("Zoom factor must be a number between 100 and 10000"); return 0;}
	try {
		//Set values of settings
		$$("input").forEach(
			(s) => s.type==="checkbox" ? storage.setItem("paintmod-" + s.id, s.checked) : storage.setItem("paintmod-" + s.id, s.value)
		);
		//Done
		if (!nosaved) {
			clearTimeout(saveTimeout);
			$("#savebutton").textContent = "Saved!"
			saveTimeout = setTimeout(function(){$("#").textContent = "Save"}, 1000)
		}
	} catch(error) {
		alert("Couldn't save, see console for more info")
		console.error("Error saving:", error);
		return 0;
	}
	return true;
}

function exit() {
	window.location.replace('index.html');
}

//Set values for inputs
$$("input").forEach(
	(s) => s.type==="checkbox" ? s.checked=(window.paintmod.settings[s.id]==="true") : s.value=window.paintmod.settings[s.id]
);