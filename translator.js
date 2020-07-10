/*
 * @name: Live Swedish translator (web, javascript)
 * @description: translate Swedish chars to normal english form
 * @instructions:
	Ä = EA
	Ö = EO
	Å = OO
	ä = ea
	å = oo
	ö = eo
 * @company: Lin24.se
 * @author: Max Base (github.com/basemax)
 * @website: maxbase.org
 * @date: 2020-07-10
*/
(function(window, document) {
	"use strict";
	const rules={
		"Ä":"EA",
		"Ö":"EO",
		"Å":"OO",
		/////////
		"ä":"ea",
		"ö":"eo",
		"å":"oo",
	};
	const replace = function(element, from, to) {
		if(element.childNodes.length) {
			element.childNodes.forEach(child =>
				replace(child, from, to)
			);
		}
		else {
			const cont = element.textContent;
			if(cont) {
				element.textContent = cont.replace(from, to);
			}
		}
	}
	const replaceAll = function(element, from) {
		if(element.childNodes.length) {
			element.childNodes.forEach(child =>
				replaceAll(child, from)
			);
		}
		else {
			const cont = element.textContent;
			if(cont) {
				element.textContent = cont.replace(from, function(match,tag,char) {
					// The arguments are:
					// 1: The whole match (string)
					// 2..n+1: The captures (string or undefined)
					// n+2: Starting position of match (0 = start)
					// n+3: The subject string.
					// (n = number of capture groups)
					// if (tag !== undefined) {
					// 	// We matched a tag. Replace with an empty string
					// 	return "";
					// }
					// Otherwise we matched a char. Replace with corresponding tag.
					// console.log(match);
					Object.keys(rules).forEach(key => {
						// console.log(key, rules[key]);
						// console.log("search "+match+"," + key);
						if(match == key) {
							console.log("find "+match+","+key+" is " + rules[key]);
							return rules[key];
						}
					});
					// switch (char) {
					// 	// Ä:EA
					// 	// Ö:EO
					// 	// Å:OO
					// 	// ä:ea
					// 	// ö:eo
					// 	// å:oo
					// 	case 'Ä': return "EA";
					// 	case 'Ö': return "EO";
					// 	case 'Å': return "OO";
					// 	case 'ä': return "ea";
					// 	case 'ö': return "eo";
					// 	case 'å': return "oo";
					// }
				});
			}
		}
	}
	const rtrim  = function (string, c) {
		if(c == undefined)
			c = '\\s';
		return string.replace(new RegExp("[" + c + "]*$"), '');
	};
	// String.prototype.ltrim = function (s) {
	// 	if(s == undefined)
	// 		s = '\\s';
	// 	return this.replace(new RegExp("^[" + s + "]*"), '');
	// };
	// load event is not same to DOMContentLoaded
	// they are diffrent, if we want to apply some code after compltely load, in this case `load` is good option.
	// but in our needed `load` is not good and we will use `DOMContentLoaded`
	window.addEventListener(
		// "load",
		"DOMContentLoaded",
		function() {
			// Ä:EA
			// Ö:EO
			// Å:OO
			// ä:ea
			// ö:eo
			// å:oo
			var regex="(";
			Object.keys(rules).forEach(key => {
				// console.log(key, rules[key]);
				// regex+=key+"|";
				replace(document.body, new RegExp(key, "g"), rules[key]);
			});
			// regex=rtrim(regex, "|");
			// regex+=")";
			// console.log("regex is "+regex);
			// var re = new RegExp(regex, "g");
			// replaceAll(document.body, re);

			// replace(document.body, new RegExp("Ä", "g"), "EA");
			// replace(document.body, new RegExp("Ö", "g"), "EO");
			// replace(document.body, new RegExp("Å", "g"), "OO");
			// replace(document.body, new RegExp("ä", "g"), "ea");
			// replace(document.body, new RegExp("ö", "g"), "eo");
			// replace(document.body, new RegExp("å", "g"), "oo");
		},
		false
	);
})(window, document);
