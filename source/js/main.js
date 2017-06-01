'use strict';

import carousel from "./plugins/components/carousel";

(function () {

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function generateRandomScheme(targetElement) {
		let randomClassNumber = getRandomInt(1, 10);
		targetElement.classList.add('site-scheme-' + randomClassNumber);
	}

	function init() {
		let elBody = document.body;
		generateRandomScheme(elBody);
		let instCarousel = carousel();
	}

	init();
})();