import domUtils from "DEGJS/domUtils";
import indicators from "./indicators";
import swiper from "./swiper";
import { supportsCSSProp } from "./featureDetection";
import { debounce } from "./utils";

let slipnslide = function(element, options) {

	var containerEl,
		viewportEl,
		slideEls,
		indicatorsInst,
		currentSlideIndex = 0,
		maxSlideIndex = 0,
		visibleSlideCount,
		slideElWidth,
		useCSSTransforms,
		debouncedWindowResizeHandler,
		swiperInst = null,
		autoPlayIntervalId = null,
		autoPlayInited = false,
		settings,
		defaults = {
			autoPlay: true,
			autoPlaySpeed: 5000,
			pauseOnHover: true,
			infinite: true,
			containerCssClass: 'slipnslide',
			viewportCssClass: 'slipnslide__viewport',
			slidesContainerCssClass: 'slipnslide__slides',
			slideCssClass: 'slipnslide__slide',
			indicators: {
				enable: true,
				wrapperCssClass: 'slipnslide__indicators',
				indicatorCssClass: 'slipnslide__indicator',
				labelCssClass: 'is-vishidden',
				activeCssClass: 'slipnslide__indicator--active',
				indexAttribute: 'data-index'
			},
			slideSelector: 'div',
			slidesToShow: 1
		};

	function init() {
		settings = Object.assign({}, defaults, options);
		settings.indicators = Object.assign({}, defaults.indicators, options.indicators);

		useCSSTransforms = supportsCSSProp('transform');

		createContainerEl();
		createViewportEl();
		prepareSlides();
		createIndicators();
		enableSwiping();

		measure();

		debouncedWindowResizeHandler = debounce(onWindowResize, 50);
		window.addEventListener('resize', debouncedWindowResizeHandler);
		
		if(settings.autoPlay) {
			play();
		}
		
	}

	function configureAutoPlay() {
		if(autoPlayInited == false) {
			autoPlayInited = true;
			if(settings.pauseOnHover) {
				containerEl.addEventListener('mouseenter', pause);
				containerEl.addEventListener('mouseleave', play);
			}
		}
	}

	function play() {
		settings.autoPlay = true;
		configureAutoPlay();
		autoPlayIntervalId = setInterval(moveToNextSlide, settings.autoPlaySpeed);
	}

	function pause() {
		if(autoPlayIntervalId != null) {
			clearInterval(autoPlayIntervalId);
			autoPlayIntervalId = null;
		}
	}

	function onWindowResize() {
		measure();
	}

	function createContainerEl() {
		containerEl = document.createElement('div');
		domUtils.addCssClasses(containerEl, settings.containerCssClass);

		domUtils.wrapElements(element, containerEl);
	}

	function createViewportEl() {
		viewportEl = document.createElement('div');
		domUtils.addCssClasses(viewportEl, settings.viewportCssClass);

		domUtils.wrapElements(element, viewportEl);
	}

	function prepareSlides() {

		domUtils.addCssClasses(element, settings.slidesContainerCssClass);

		slideEls = Array.from(element.querySelectorAll(settings.slideSelector));

		slideEls.forEach(function(slideEl){
			domUtils.addCssClasses(slideEl, settings.slideCssClass);
		});
	}

	function createIndicators() {
		if(settings.indicators.enable) {
			settings.indicators.onIndicatorChange = onIndicatorChange;
			settings.indicators.activeIndicatorIndex = currentSlideIndex;
			settings.indicators.indicatorCount = slideEls.length;
			indicatorsInst = indicators(containerEl, settings.indicators);
		}
	}

	function onIndicatorChange(index) {
		pause();
		moveToSlide(index);
	}

	function enableSwiping() {

        swiperInst = swiper(element);
        swiperInst.addListener('swipeleft', onSwipeLeft);

        swiperInst.addListener('swiperight', onSwipeRight);
    }

    function onSwipeLeft() {
    	pause();
    	moveToNextSlide();
    }

    function onSwipeRight() {
    	pause();
    	moveToPreviousSlide();
    }

    function moveToPreviousSlide() {
		moveToSlide(currentSlideIndex - 1);
	}

	function moveToNextSlide() {
		moveToSlide(currentSlideIndex + 1);
	}


	function moveToSlide(slideIndex) {

		if(slideIndex < 0) {
			if(settings.infinite) {
				currentSlideIndex = maxSlideIndex;
			} else {
				currentSlideIndex = 0;
			}
		}
		else if(slideIndex > maxSlideIndex) {
			if(settings.infinite) {
				currentSlideIndex = 0;
			} else {
				currentSlideIndex = maxSlideIndex;
			}
		}
		else
			currentSlideIndex = slideIndex;

		positionSlides();

		if(indicatorsInst) {
			indicatorsInst.setActiveIndicator(currentSlideIndex);
		}
	}

	function measure() {
		if(slideEls.length > 0) {
			slideElWidth = viewportEl.clientWidth / settings.slidesToShow;
			setSlideWidths();
			setSlidesContainerWidth();
			
			setMaxSlideIndex();

			if(currentSlideIndex != 0) {
				positionSlides();
			}
		}
	}

	function setSlidesContainerWidth() {
		let slidesContainerElWidth = slideElWidth * slideEls.length;
		element.style.width = slidesContainerElWidth + "px";
	}

	function setSlideWidths() {
		slideEls.forEach(function(slideEl) {
			slideEl.style.width = slideElWidth.toString() + "px";
		});
	}

	function setMaxSlideIndex() {
		maxSlideIndex = slideEls.length - settings.slidesToShow;

		if(currentSlideIndex > maxSlideIndex)
			currentSlideIndex = maxSlideIndex;
	}

	function positionSlides() {
		let position = -1 * currentSlideIndex * slideElWidth;

		if(useCSSTransforms)
			element.style.transform = "translate3d(" + position + "px, 0px, 0px)";
		else
			element.style.marginLeft = position + "px";
	}

	function destroy() {
		window.removeEventListener('resize', debouncedWindowResizeHandler);
		
		if(settings.autoPlay) {
			pause();

			if(settings.pauseOnHover) {
				containerEl.removeEventListener('mouseenter', pause);
				containerEl.removeEventListener('mouseleave', play);
			}
		}

		if(swiperInst != null) {
			swiperInst.destroy();
		}

		domUtils.unwrapElements(containerEl);
		domUtils.unwrapElements(viewportEl);

		if (settings.indicators.enable) {
			indicatorsInst.destroy();
			indicatorsInst = null;
		}

		domUtils.removeCssClasses(element, settings.slidesContainerCssClass);
		element.style.width = '';

		slideEls.forEach(function(item) {
			domUtils.removeCssClasses(item, settings.slideCssClass);
			item.style.width = '';
		});
	}

	init();

	return {
		destroy: destroy
	};

}

export default slipnslide;