//Adds color swatches to the paint editor
//Code taken and modified from Customized (github.com/CodeGuy92/Customized)

if (window.paintmod.settings.swatches==="true") {
	
	//Function for dragging sliders
	let dragSlider = function(num) {
		//Slider
		let element = document.querySelectorAll('div[class*="slider_handle"]')[num];
		
		//For measurements
		const sliderLeft = element.style.left.substring(0, 2);
			
		//Mouse events
		const mouseDownEvent = new MouseEvent('mousedown', {
		  clientX: element.getBoundingClientRect().left,
		  clientY: element.getBoundingClientRect().top,
		  bubbles: true,
		  cancelable: true
		});
		const mouseMoveEvent = new MouseEvent('mousemove', {
		  clientX: element.getBoundingClientRect().left + sliderLeft>5 ? -1 : 1,
		  clientY: element.getBoundingClientRect().top,
		  bubbles: true,
		  cancelable: true
		});
		const mouseMove2Event = new MouseEvent('mousemove', {
		  clientX: element.getBoundingClientRect().left,
		  clientY: element.getBoundingClientRect().top,
		  bubbles: true,
		  cancelable: true
		});
		const mouseUpEvent = new MouseEvent('mouseup', {
		  bubbles: true,
		  cancelable: true
		});

		// Simulate the mouse moving
		element.dispatchEvent(mouseDownEvent);
		element.dispatchEvent(mouseMoveEvent);
		element.dispatchEvent(mouseMove2Event);
		element.dispatchEvent(mouseUpEvent);
	}

	//Function for applying color changes
	let applySliders = function() {
		dragSlider(0);
		dragSlider(1);
		dragSlider(2);
	}

	//Function for unselecting all swatches
	let unselect = function() {
		document.querySelectorAll('.color-swatch[class*="color-picker_active-swatch"]').forEach(element => element.classList.remove("color-picker_active-swatch_2U6UP"));
	}

	//Function for setting sliders to a color
	let setSliders = function(c,s,b, swatch) {
		document.querySelectorAll('div[class*="slider_handle"]')[0].style.left = c * 1.24 + "px";
		document.querySelectorAll('div[class*="slider_handle"]')[1].style.left = s * 1.24 + "px";
		document.querySelectorAll('div[class*="slider_handle"]')[2].style.left = b * 1.24 + "px";
		applySliders();
	}

	//Function for adding a swatch
	let addSwatch = function(color, saturation, brightness) {
		
		//The swatch element
		let swatch = document.createElement("span");
		
		//RGB colors for the swatch
		let colors = HSVtoRGB(color, saturation, brightness);
		
		swatch.classList.add("color-swatch");
		swatch.classList.add("color-picker_clickable_1qAhZ");
		swatch.dataset.color = color;
		swatch.dataset.saturation = saturation;
		swatch.dataset.brightness = brightness;
		swatch.dataset.bgcolor = "rgb("  + colors.r + ", " + colors.g + ", " + colors.b + ")"
		swatch.style["background-color"] = swatch.dataset.bgcolor;
		swatch.onclick = function() {
			setSliders(color, saturation, brightness, swatch);
			swatch.classList.add("color-picker_active-swatch_2U6UP");
		};
		
		swatchesContainer.appendChild(swatch);
	}
	//Function for adding a linebreak to the swatches
	let addBr = function() {swatchesContainer.appendChild(document.createElement("br"))}
	//Function for inserting a separator before somewhere
	let addSeparator = function(element) {
		var sep = document.createElement("div");
		sep.classList.add("color-picker_divider_3Hq7P");
		element.parentElement.insertBefore(sep, element);
	}
	
	//Prepare variables
	var swatchesContainer;

	//Prepare style
	let style = document.createElement("style");
	style.textContent =  '#color-swatches-container { margin: 10px -30px; display: block; line-height: 0px;} .color-swatch { width: 18px; height: 20px; border-radius: 4px; display: inline-block; margin: 2.5px; border: solid 1px rgba(0, 0, 0, 0.25); } .color-swatch[class*="color-picker_active-swatch"] { border: 1px solid #4C97FF !important; } .Popover-body { padding: 4px 10px; }';
	document.head.appendChild(style);
	
	//Function for moving the first separator in the gradient picker to before the swatches
	let moveSeparator = function(popoverbody) {
		if (popoverbody.querySelectorAll('div[class*="color-picker_gradient-picker-row"]').length < 2) return; //We don't need to do this if it isn't a gradient picker
		
		var firstSeparator = popoverbody.querySelectorAll('div[class*="color-picker_divider"]')[0];
		swatchesContainer.parentElement.insertBefore(firstSeparator, swatchesContainer);
	}
	//Function for adding the gradient button events to the color picker
	let addGradientPickerEvents = function(popoverbody) {
		if (popoverbody.querySelectorAll('div[class*="color-picker_gradient-picker-row"]').length < 2) return; //We don't need to do this if it isn't a gradient picker
		popoverbody.querySelectorAll('div[class*="color-picker_gradient-swatches-row"] > div, div[class*="color-picker_gradient-swatches-row"] > span').forEach(e => e.addEventListener("click", unselect));
		
		moveSeparator(popoverbody);
	}
	
	
	//Function for creating a set of swatches
	let createSwatches = function(popoverbody) {
		//No need to recreate it if it's already added
		if (popoverbody.querySelector("#color-swatches-container")) return;
		//Also this
		if (!popoverbody.querySelector('div[class*="color-picker_row-header"]')) return;
		
		//Swatch elements
		swatchesContainer = document.createElement("center");
		swatchesContainer.id = "color-swatches-container";
		
		//The actual swatches
		//Rainbow colors
		addSwatch(0, 100, 100);
		addSwatch(8, 81, 100);
		addSwatch(14, 88, 100);
		addSwatch(36, 67, 88);
		addSwatch(55, 50, 100);
		addSwatch(63, 80, 100);
		addSwatch(72, 60, 100);
		//Grays
		addBr();
		addSwatch(0, 0, 0);
		addSwatch(0, 0, 16);
		addSwatch(0, 0, 33);
		addSwatch(0, 0, 50);
		addSwatch(0, 0, 66);
		addSwatch(0, 0, 83);
		addSwatch(0, 0, 100);
		//Skin colors
		addBr();
		addSwatch(7, 69, 30);
		addSwatch(7, 64, 42);
		addSwatch(7, 62, 51);
		addSwatch(8, 54, 71);
		addSwatch(9, 43, 89);
		addSwatch(9, 36, 93);
		addSwatch(9, 29, 99);
		
		//Element to insert swatches before
		let swatchAfter = popoverbody.querySelector('div[class*="color-picker_row-header"]').parentElement;
		//Insert swatches
		swatchAfter.parentElement.insertBefore(swatchesContainer, swatchAfter);
		//Insert separator
		addSeparator(swatchAfter);
		
		//Unselect swatches when other ways to change color used
		popoverbody.querySelectorAll('div[class*="slider_handle"]').forEach(e => e.addEventListener("mousedown", unselect));
		popoverbody.querySelectorAll('*[class*="color-picker_clickable"]:not(.color-swatch), div[class*="slider_container"]').forEach(e => e.addEventListener("click", unselect));
		popoverbody.querySelectorAll('div[class*="color-picker_gradient-picker-row"] > img').forEach(
			e => e.addEventListener("click",
				() => setTimeout(
					() => addGradientPickerEvents(popoverbody), 10
				)
			)
		);
		
		//Move the separator if it's a gradient picker
		moveSeparator(popoverbody);
	};

	let createAllSwatches = function() {
		setTimeout(function() {
			document.querySelectorAll(".Popover-body").forEach(element => createSwatches(element));
		}, 10)
	};

	document.querySelectorAll('label[class*="label_input-group"] > div[class*="color-button_color-button"]')[0].addEventListener("click", createAllSwatches);
	document.querySelectorAll('label[class*="label_input-group"] > div[class*="color-button_color-button"]')[1].addEventListener("click", createAllSwatches);
}