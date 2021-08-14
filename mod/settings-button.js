setTimeout( function() {
	//Settings button
	let settingsButton = document.createElement("button");
	settingsButton.classList.add("playground_playgroundButton_hZeTH");
	settingsButton.textContent = "Settings";
	settingsButton.onclick = function() {window.location.replace("settings.html");};
	
	//Playground wrapper, where the Save and Load buttons are
	let playground = document.querySelector('div[class*="playground_wrapper"]')
	
	//Append it
	playground.appendChild(document.createElement("br"));
	playground.appendChild(settingsButton);
}, 5);