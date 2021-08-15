//Color conversion functions

//Function for converting HSV to RGB, thanks stackoverflow (actually from gist.github.com/mjackson/5311256)
//Slightly minified
//Accepts HSV values from 0 to 100
//Returns decimal RGB values from 0 to 255
function HSVtoRGB(h, s, v) {var r, g, b, i, f, p, q, t;
	//Conversion
	let clamp = function(x,a,b) {return Math.max(a,Math.min(x, b))} //Function for clamping
	h = clamp(h,0,100) / 100;
	s = clamp(s,0,100) / 100;
	v = clamp(v,0,100) / 100;
	
	i = Math.floor(h * 6); f = h * 6 - i; p = v * (1 - s); q = v * (1 - f * s); t = v * (1 - (1 - f) * s);
	switch (i % 6) { case 0: r = v, g = t, b = p; break; case 1: r = q, g = v, b = p; break; case 2: r = p, g = v, b = t; break; case 3: r = p, g = q, b = v; break; case 4: r = t, g = p, b = v; break; case 5: r = v, g = p, b = q; break;}
	return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
}

//Function for converting RGB to HSV, thanks gist.github.com/mjackson/5311256
//Slightly minified
//Accepts RGB values from 0 to 255
//Returns decimal RGB values from 0 to 100
function RGBtoHSV(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b); var h, s, v = max; var d = max - min;
	s = max == 0 ? 0 : d / max;
	if (max == min) {
		 h = 0; // achromatic
	} else {
		switch (max) {
		case r: h = (g - b) / d + (g < b ? 6 : 0); break;
		case g: h = (b - r) / d + 2; break;
		case b: h = (r - g) / d + 4; break;
		}

		h /= 6;
	}
	return [ h*100, s*100, v*100 ];
}