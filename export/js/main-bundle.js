System.register('github:DEGJS/slipnslide@1.2.3/slipnslide.js', [], function (_export) {
	/* */
	'use strict';

	var slipnslide, swiper, extend, createElement, wrapElement, unwrapElement, getElementOuterWidth, transformPropNames, testCSSTransformProp, testCSSProps, getSupportedPropertyName, setCSSTransform, debounce;
	return {
		setters: [],
		execute: function () {
			slipnslide = function slipnslide(element, options) {
				var settings,
				    containerEl,
				    viewportEl,
				    prevButtonEl,
				    nextButtonEl,
				    slideEls,
				    slideElWidth,
				    slideContainerElWidth,
				    indicatorWrapperEl,
				    indicatorItems,
				    currentIndex = 0,
				    visibleSlideCount = 0,
				    maxIndex = 0,
				    useCSSTransforms = true,
				    debouncedWindowResizeHandler,
				    swiperInst = null,
				    defaults = {
					itemSelector: 'li',
					containerClass: 'slipnslide',
					viewportClass: 'slipnslide__viewport',
					controlButtonClass: ['slipnslide__control-button'],
					prevButtonClass: ['slipnslide__prev-button'],
					nextButtonClass: ['slipnslide__next-button'],
					slidesClass: 'slipnslide__slides',
					slideClass: 'slipnslide__slide',
					showIndicators: true,
					photoIndicators: false,
					indicatorWrapperClass: 'slipnslide__indicator-wrapper',
					indicatorItemClass: 'slipnslide__indicator',
					indicatorActiveClass: 'is-active',
					currentIndex: 0
				};

				function init() {
					settings = extend(this, defaults, options);

					useCSSTransforms = testCSSTransformProp();

					createContainerEl();
					createViewportEl();
					createControls();
					prepareSlides();
					createIndicators();

					enableTouchEvents();

					updateControlButtons();

					debouncedWindowResizeHandler = debounce(onWindowResize, 100);
					window.addEventListener('resize', debouncedWindowResizeHandler);
					onWindowResize();
				}

				function createContainerEl() {
					containerEl = createElement('div', settings.containerClass);

					wrapElement(element, containerEl);
				}

				function createViewportEl() {
					viewportEl = createElement('div', settings.viewportClass);

					wrapElement(element, viewportEl);
				}

				function createControls() {

					prevButtonEl = createElement('button', settings.prevButtonClass.concat(settings.controlButtonClass));
					prevButtonEl.innerHTML = "Previous";
					containerEl.insertBefore(prevButtonEl, containerEl.firstChild);
					prevButtonEl.addEventListener('click', onPrevButtonElClick);

					nextButtonEl = createElement('button', settings.nextButtonClass.concat(settings.controlButtonClass));
					nextButtonEl.innerHTML = "Next";
					containerEl.appendChild(nextButtonEl);
					nextButtonEl.addEventListener('click', onNextButtonElClick);
				}

				function prepareSlides() {

					element.classList.add(settings.slidesClass);

					slideEls = Array.prototype.slice.call(element.querySelectorAll(settings.itemSelector), 0);

					slideEls.forEach(function (item) {
						item.classList.add(settings.slideClass);
					});
				}

				function createIndicators() {
					if (settings.showIndicators && slideEls.length > 1) {
						indicatorWrapperEl = createElement('ul', settings.indicatorWrapperClass);
						slideEls.forEach(function (slide, index) {
							var el = createElement('li', settings.indicatorItemClass);
							if (index === settings.currentIndex) {
								el.classList.add(settings.indicatorActiveClass);
							}
							if (settings.photoIndicators) {
								var photoIndicator = '<img src="' + slide.dataset.indicator + '">';
								el.innerHTML = photoIndicator;
							} else {
								el.innerHTML = index;
							}
							el.dataset.index = index;
							indicatorWrapperEl.appendChild(el);
						});

						containerEl.appendChild(indicatorWrapperEl);
						indicatorWrapperEl = containerEl.querySelector('.' + settings.indicatorWrapperClass);

						indicatorItems = Array.prototype.slice.call(document.querySelectorAll('.' + settings.indicatorItemClass));
						indicatorItems.forEach(function (el, i) {
							el.addEventListener('click', onIndicatorClick);
						});
					}
				}

				function onIndicatorClick(e) {
					var clickedIndex = parseInt(e.currentTarget.dataset.index);
					if (clickedIndex !== settings.currentIndex) {
						move(clickedIndex - settings.currentIndex);
					}
				}

				function enableTouchEvents() {

					swiperInst = swiper(element);
					swiperInst.addEventListener('swipeleft', moveToNextSlide);

					swiperInst.addEventListener('swiperight', moveToPreviousSlide);
				}

				function measure() {
					if (slideEls.length > 0) {
						slideElWidth = getElementOuterWidth(slideEls[0]);

						if (element.classList.contains(settings.slidesClass)) {
							slideContainerElWidth = slideElWidth * slideEls.length;
							element.style.width = slideContainerElWidth + "px";
						}

						visibleSlideCount = Math.floor(viewportEl.clientWidth / slideElWidth);
						maxIndex = slideEls.length - visibleSlideCount;

						repositionSlides();
					}
				}

				function moveToPreviousSlide() {
					move(-1);
				}

				function moveToNextSlide() {
					move(1);
				}

				function move(increment) {

					var destinationIndex = settings.currentIndex + increment;

					if (destinationIndex < 0) settings.currentIndex = 0;else if (destinationIndex >= maxIndex) settings.currentIndex = maxIndex;else settings.currentIndex += increment;

					var position = -1 * (settings.currentIndex * slideElWidth);

					positionSlides(position);

					updateControlButtons();
					updateIndicators();
				}

				function positionSlides(position) {
					if (useCSSTransforms) setCSSTransform(element, "translate3d(" + position + "px, 0px, 0px)");else element.style.marginLeft = position + "px";
				}

				function repositionSlides() {
					if (settings.currentIndex != 0) {

						if (settings.currentIndex > maxIndex) settings.currentIndex = maxIndex;

						var position = -1 * settings.currentIndex * slideElWidth;
						positionSlides(position);
					}
				}

				function updateControlButtons() {
					updateControlButton(prevButtonEl, isAtStartOfSlides());
					updateControlButton(nextButtonEl, isAtEndOfSlides());
				}

				function updateIndicators() {
					if (settings.showIndicators && slideEls.length > 1) {
						var _indicatorItems = Array.prototype.slice.call(indicatorWrapperEl.querySelectorAll('.' + settings.indicatorItemClass));
						_indicatorItems.forEach(function (el, index) {
							if (index === settings.currentIndex) {
								if (!el.classList.contains(settings.indicatorActiveClass)) {
									el.classList.add(settings.indicatorActiveClass);
								}
							} else {
								el.classList.remove(settings.indicatorActiveClass);
							}
						});
					}
				}

				function updateControlButton(button, disable) {
					if (disable) button.setAttribute('disabled', 'disabled');else button.removeAttribute('disabled');
				}

				function isAtStartOfSlides() {
					return settings.currentIndex == 0;
				}

				function isAtEndOfSlides() {
					return settings.currentIndex == maxIndex;
				}

				function onPrevButtonElClick(e) {
					e.preventDefault();

					move(-1);
				}

				function onNextButtonElClick(e) {
					e.preventDefault();

					move(1);
				}

				function onWindowResize() {
					measure();
					updateControlButtons();
				}

				function destroy() {
					window.removeEventListener('resize', debouncedWindowResizeHandler);
					prevButtonEl.removeEventListener('click', onPrevButtonElClick);
					nextButtonEl.removeEventListener('click', onNextButtonElClick);

					if (swiperInst != null) {
						swiperInst.destroy();
					}

					unwrapElement(containerEl);
					unwrapElement(viewportEl);

					prevButtonEl.parentNode.removeChild(prevButtonEl);
					nextButtonEl.parentNode.removeChild(nextButtonEl);

					if (settings.showIndicators) {
						indicatorWrapperEl.parentNode.removeChild(indicatorWrapperEl);
					}

					element.classList.remove(settings.slidesClass);
					element.style.width = '100%';

					slideEls.forEach(function (item) {
						item.classList.remove(settings.slideClass);
					});
				}

				init();

				return {
					destroy: destroy
				};
			};

			swiper = function swiper(containerEl) {
				var listeners = [],
				    minSwipeLength = 72,
				    fingerCount,
				    startX,
				    startY,
				    curX,
				    curY;

				function init() {
					touchCancel();

					containerEl.addEventListener('touchstart', onTouchStart);
					containerEl.addEventListener('touchend', onTouchEnd);
					containerEl.addEventListener('touchmove', onTouchMove);
				};

				function addEventListener(eventType, listener) {
					if (typeof listeners[eventType] == "undefined") {
						listeners[eventType] = [];
					}

					listeners[eventType].push(listener);
				}

				function dispatchEvent(eventType) {
					if (listeners[eventType] instanceof Array) {
						var evenTypeListeners = listeners[eventType];
						for (var i = 0, len = evenTypeListeners.length; i < len; i++) {
							evenTypeListeners[i].call(this);
						}
					}
				}

				function onTouchStart(event) {
					// disable the standard ability to select the touched object
					//event.preventDefault();
					// get the total number of fingers touching the screen
					fingerCount = event.touches.length;
					// since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
					// check that only one finger was used
					if (fingerCount == 1) {
						// get the coordinates of the touch
						startX = event.touches[0].pageX;
						startY = event.touches[0].pageY;
					} else {
						// more than one finger touched so cancel
						touchCancel(event);
					}
				}

				function onTouchMove(event) {
					//event.preventDefault();
					if (event.touches.length == 1) {
						curX = event.touches[0].pageX;
						curY = event.touches[0].pageY;
					} else {
						touchCancel(event);
					}
				}

				function onTouchEnd(event) {
					//event.preventDefault();
					// check to see if more than one finger was used and that there is an ending coordinate
					if (fingerCount == 1 && curX != 0) {
						// use the Distance Formula to determine the length of the swipe
						var swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX, 2) + Math.pow(curY - startY, 2)));
						// if the user swiped more than the minimum length, perform the appropriate action
						if (swipeLength >= minSwipeLength) {
							var swipeDirection = determineSwipeDirection();
							dispatchEvent('swipe' + swipeDirection);
							touchCancel(event); // reset the variables
						} else {
								touchCancel(event);
							}
					} else {
						touchCancel(event);
					}
				}

				function touchCancel() {
					// reset the variables back to default values
					fingerCount = 0;
					startX = 0;
					startY = 0;
					curX = 0;
					curY = 0;
				}

				function caluculateAngle() {
					var X = startX - curX;
					var Y = curY - startY;
					var Z = Math.round(Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2))); //the distance - rounded - in pixels
					var r = Math.atan2(Y, X); //angle in radians (Cartesian system)
					var swipeAngle = Math.round(r * 180 / Math.PI); //angle in degrees
					if (swipeAngle < 0) {
						swipeAngle = 360 - Math.abs(swipeAngle);
					}
					return swipeAngle;
				}

				function determineSwipeDirection() {
					var swipeAngle = caluculateAngle();

					if (swipeAngle <= 45 && swipeAngle >= 0) {
						return 'left';
					} else if (swipeAngle <= 360 && swipeAngle >= 315) {
						return 'left';
					} else if (swipeAngle >= 135 && swipeAngle <= 225) {
						return 'right';
					} else if (swipeAngle > 45 && swipeAngle < 135) {
						return 'down';
					} else {
						return 'up';
					}
				}

				function destroy() {
					containerEl.removeEventListener('touchstart', onTouchStart);
					containerEl.removeEventListener('touchend', onTouchEnd);
					containerEl.removeEventListener('touchmove', onTouchMove);

					listeners = [];
				}

				init();

				return {
					addEventListener: addEventListener,
					destroy: destroy
				};
			};

			extend = function extend(out) {
				out = out || {};
				for (var i = 1; i < arguments.length; i++) if (arguments[i]) for (var key in arguments[i]) arguments[i].hasOwnProperty(key) && (out[key] = arguments[i][key]);
				return out;
			};

			createElement = function createElement(tag, classNames) {
				var el = document.createElement(tag);

				if (Array.isArray(classNames) == false) classNames = [classNames];
				classNames.forEach(function (className) {
					el.classList.add(className);
				});

				return el;
			};

			wrapElement = function wrapElement(elToWrap, wrapperEl) {
				elToWrap.parentNode.insertBefore(wrapperEl, elToWrap);
				wrapperEl.appendChild(elToWrap);
			};

			unwrapElement = function unwrapElement(el) {
				var fragment = document.createDocumentFragment();
				while (el.firstChild) {
					fragment.appendChild(el.firstChild);
				}
				el.parentNode.replaceChild(fragment, el);
			};

			getElementOuterWidth = function getElementOuterWidth(el) {
				var elStyle = window.getComputedStyle(el);
				var elMargin = parseInt(elStyle.marginLeft) + parseInt(elStyle.marginRight);
				var elBorder = parseInt(elStyle.borderLeft) + parseInt(elStyle.borderRight);
				return el.clientWidth + (isNaN(elMargin) ? 0 : elMargin) + (isNaN(elBorder) ? 0 : elBorder);
			};

			transformPropNames = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];

			testCSSTransformProp = function testCSSTransformProp() {
				return !!testCSSProps(transformPropNames);
			};

			testCSSProps = function testCSSProps(props) {
				return getSupportedPropertyName(props) != null;
			};

			getSupportedPropertyName = function getSupportedPropertyName(properties) {
				for (var i = 0; i < properties.length; i++) {
					if (typeof document.body.style[properties[i]] != "undefined") {
						return properties[i];
					}
				}
				return null;
			};

			setCSSTransform = function setCSSTransform(el, value) {
				var transformProperty = getSupportedPropertyName(transformPropNames);
				if (transformProperty) el.style[transformProperty] = value;
			};

			debounce = function debounce(fn, delay) {
				var timer = null;
				return function () {
					var context = this,
					    args = arguments;
					clearTimeout(timer);
					timer = setTimeout(function () {
						fn.apply(context, args);
					}, delay);
				};
			};

			_export('default', slipnslide);
		}
	};
});

System.register("github:DEGJS/slipnslide@1.2.3.js", ["github:DEGJS/slipnslide@1.2.3/slipnslide.js"], function (_export) {
  "use strict";

  return {
    setters: [function (_githubDEGJSSlipnslide123SlipnslideJs) {
      var _exportObj = {};

      for (var _key in _githubDEGJSSlipnslide123SlipnslideJs) {
        if (_key !== "default") _exportObj[_key] = _githubDEGJSSlipnslide123SlipnslideJs[_key];
      }

      _exportObj["default"] = _githubDEGJSSlipnslide123SlipnslideJs["default"];

      _export(_exportObj);
    }],
    execute: function () {}
  };
});

System.register("main.js", ["github:DEGJS/slipnslide@1.2.3.js"], function (_export) {
	'use strict';

	var slipnslide;
	return {
		setters: [function (_githubDEGJSSlipnslide123Js) {
			slipnslide = _githubDEGJSSlipnslide123Js["default"];
		}],
		execute: function () {

			(function () {

				var buttonLabels = ["page 1", "page 2", "page 3", "page 4", "page 5", "page 6", "page 7", "page 8", "page 9", "page 10"];

				var elLeftButton = undefined,
				    elRightButton = undefined,
				    elControlButtons = undefined,
				    currentSlide = 1;

				function getRandomInt(min, max) {
					min = Math.ceil(min);
					max = Math.floor(max);
					return Math.floor(Math.random() * (max - min)) + min;
				}

				function generateRandomScheme(targetElement) {
					var randomClassNumber = getRandomInt(1, 10);
					targetElement.classList.add('site-scheme-' + randomClassNumber);
				}

				function changeButtonLabels() {
					var buttonTextPrev = buttonLabels[currentSlide - 2],
					    buttonTextNext = buttonLabels[currentSlide];
					if (currentSlide - 2 < 0) {
						buttonTextPrev = buttonLabels[9];
					}
					if (currentSlide >= 10) {
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

				function initCarousel(targetElement) {
					var slipnslideOptions = {
						itemSelector: 'li',
						containerClass: 'slipnslide',
						viewportClass: 'slipnslide__viewport',
						controlButtonClass: ['slipnslide__control-button'],
						prevButtonClass: ['slipnslide__prev-button'],
						nextButtonClass: ['slipnslide__next-button'],
						slidesClass: 'slipnslide__slides',
						slideClass: 'slipnslide__slide',
						showIndicators: false,
						photoIndicators: false,
						indicatorWrapperClass: 'slipnslide__indicator-wrapper',
						indicatorInnerWrapperClass: 'slipnslide__indicator-inner-wrapper',
						indicatorItemClass: 'slipnslide__indicator',
						indicatorActiveClass: 'is-active',
						currentIndex: 0
					};
					var slipnslideInst = slipnslide(targetElement, slipnslideOptions);

					elLeftButton = document.querySelector('.' + slipnslideOptions.prevButtonClass);
					elRightButton = document.querySelector('.' + slipnslideOptions.nextButtonClass);
					elLeftButton.addEventListener('click', currentSlideCountDecrease);
					elRightButton.addEventListener('click', currentSlideCountIncrease);
					changeButtonLabels();
				}

				function init() {
					var elBody = document.body,
					    carouselList = document.querySelector('.js-carousel-list');
					generateRandomScheme(elBody);
					initCarousel(carouselList);
				}

				init();
			})();
		}
	};
});
