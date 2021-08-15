//Adds a hexadecimal color input to the paint editor

if (window.paintmod.settings.hexcolor==="true") {
	//Function for applying changes to one slider's position
	let dragSlider = function(num, popover) {
		//Slider
		let element = popover.querySelectorAll(".slider_handle_2M_mA")[num];
		
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
	let applySliders = function(popover) {
		dragSlider(0, popover);
		dragSlider(1, popover);
		dragSlider(2, popover);
	}

	//Function for setting sliders to a color
	let setSliders = function(c,s,b, popover) {
		popover.querySelectorAll(".slider_handle_2M_mA")[0].style.left = c * 1.24 + "px";
		popover.querySelectorAll(".slider_handle_2M_mA")[1].style.left = s * 1.24 + "px";
		popover.querySelectorAll(".slider_handle_2M_mA")[2].style.left = b * 1.24 + "px";
		applySliders(popover);
	}
	
	//Function for adding the gradient button events to the color picker
	let addGradientPickerEvents = function(popover) {
		if (popover.querySelectorAll('div[class*="color-picker_gradient-picker-row"]').length < 2) return; //We don't need to do this if it isn't a gradient picker
		popover.querySelectorAll('div[class*="color-picker_gradient-swatches-row"] > div, div[class*="color-picker_gradient-swatches-row"] > span').forEach(e => e.addEventListener("click", function(){onSliderChange(popover)}));
	}

	//Function for converting slider positions to hex
	let convertSlidersToHex = function(slider1, slider2, slider3) {
		rgbSliders = HSVtoRGB(slider1,slider2,slider3);
		//Function for converting a number to a 2-digit hex value
		let toHex = function(num) {
			return (num<16?"0":"")+num.toString(16);
		}
		return "#" + toHex(rgbSliders.r) + toHex(rgbSliders.g) + toHex(rgbSliders.b);
	}

	//Function that should get called when sliders change (popover parameter is the color picker)
	let onSliderChange = function(popover) {
		popover.querySelector(".hex-color-picker").value = convertSlidersToHex(
			popover.querySelectorAll(".slider_handle_2M_mA")[0].style.left.replace("px","")/1.24,
			popover.querySelectorAll(".slider_handle_2M_mA")[1].style.left.replace("px","")/1.24,
			popover.querySelectorAll(".slider_handle_2M_mA")[2].style.left.replace("px","")/1.24
		)
	}
	
	//Function for converting hex to Scratch color values
	let convertHexToSliders = function(color) {
		return RGBtoHSV(parseInt(color.substring(1,3),16),parseInt(color.substring(3,5),16),parseInt(color.substring(5,7),16));
	}

	//Function for settings sliders to a hex value
	let setSlidersToHex = function(color, popover) {
		let hsvColor = convertHexToSliders(color);
		setSliders(hsvColor[0],hsvColor[1],hsvColor[2], popover);
	}

	//Function that should get called when the hex color picker changes (popover parameter is the color picker) 
	let onHexInputChange = function(popover) {
		let color = popover.querySelector(".hex-color-picker").value;
		if (!(/^#?[0-9a-fA-F]{6}$/.test(color) || /^#?[0-9a-fA-F]{3}$/.test(color))) 
		{onSliderChange(popover);return} //Not a hex value, do nothing
		if (!/^#/.test(color)) {color="#"+color;this.value=color;} //Hex value but without hash, add it to the start
		if (/^#?[0-9a-fA-F]{3}$/.test(color)) { 
			//Hex value but with 3 letters, duplicate each one
			color = "#" +
				color[1] + color[1] +
				color[2] + color[2] +
				color[3] + color[3];
		}
		setSlidersToHex(color, popover);
		onSliderChange(popover); //Just to be sure
	}
		
	//Prepare style
	let style = document.createElement("style");
	style.textContent =  '.hex-color-picker {margin: 5px -10px; width: 72%; padding: 0px 0 0.rem 0px 0 0.75rem; position: relative; left: 20px;}';
	document.head.appendChild(style);
	
	let createHexColor = function(popover) {
		//No need to recreate hex picker if it already exists
		if (popover.querySelector(".hex-color-picker")) return;
		//Create
		let hexColorInput = document.createElement("input");
		hexColorInput.type = "text";
		hexColorInput.classList.add("input_input-form_l9eYg");
		hexColorInput.classList.add("hex-color-picker");
		hexColorInput.onchange = function(){onHexInputChange(popover)};
		hexColorInput.setAttribute("maxlength", 7);
		
		//Insert
		let swatchRow = popover.querySelector(".color-picker_swatch-row_3ygSb");
		swatchRow.parentElement.insertBefore(hexColorInput, swatchRow);
		
		//Update hex picker when other ways to change color used
		popover.querySelectorAll('div[class*="slider_container"]').forEach(e => e.addEventListener("mouseup", function(){onSliderChange(popover)}));
		popover.querySelectorAll('*[class*="color-picker_clickable"], div[class*="slider_container"]').forEach(e => e.addEventListener("click", function(){onSliderChange(popover)}));
		onSliderChange(popover);
		
		//Gradient picker events
		popover.querySelectorAll('div[class*="color-picker_gradient-picker-row"] > img').forEach(
			e => e.addEventListener("click",
				() => setTimeout(
					function(){addGradientPickerEvents(popover)}, 10
				)
			)
		);
	}
	
	let createAllHexColors = function() {
		setTimeout( function() {
			document.querySelectorAll(".Popover-body").forEach((popover) => createHexColor(popover));
		}
		, 20);
	}
	
	document.querySelectorAll('label[class*="label_input-group"] > div[class*="color-button_color-button"]')[0].addEventListener("click", createAllHexColors);
	document.querySelectorAll('label[class*="label_input-group"] > div[class*="color-button_color-button"]')[1].addEventListener("click", createAllHexColors);
}