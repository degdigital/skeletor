import slipnslide from "plugins/slipslide/slipnslide";

let carousel = function() {

	const buttonLabels = ["page 1", "page 2", "page 3", "page 4", "page 5", "page 6", "page 7", "page 8", "page 9", "page 10"];

	let	elLeftButton,
		elRightButton,
		elControlButtons,
		currentSlide = 1;

	function initCarousel(targetElement) {
		elLeftButton = document.querySelector('.slipnslide__prev-button');
		elRightButton = document.querySelector('.slipnslide__next-button');
		elLeftButton.addEventListener('click', currentSlideCountDecrease);
		elRightButton.addEventListener('click', currentSlideCountIncrease);
		changeButtonLabels();
	}

	function changeButtonLabels() {
		let buttonTextPrev = buttonLabels[(currentSlide - 2)],
			buttonTextNext = buttonLabels[(currentSlide)];
		if ((currentSlide - 2) < 0) {
			buttonTextPrev = buttonLabels[9];
		}
		if ((currentSlide) >= 10) {
			buttonTextNext = buttonLabels[0];
		}
		elLeftButton.innerHTML = buttonTextPrev;
		elRightButton.innerHTML = buttonTextNext;
	}

	function currentSlideCountDecrease() {
		currentSlide--;
		changeButtonLabels();
	}

	function currentSlideCountIncrease() {
		currentSlide++;
		changeButtonLabels();
	}

	function init() {
		console.log('.');
		let elCarousel = document.querySelector('.js-carousel-list');

		if (elCarousel) {
			console.log('?');
			slipnslide(elCarousel, {
				autoPlay: false,
				pauseOnHover: true,
				infinite: true,
				containerCssClass: 'slipnslide',
				viewportCssClass: 'slipnslide__viewport',
				slidesContainerCssClass: 'slipnslide__slides',
				slideCssClass: 'slipnslide__slide',
				indicators: {
					enable: false
				},
				slideSelector: 'li',
				slidesToShow: 1
			});
			console.log('!');
		}
	}

	init();

	return {};

}

export default carousel;