import domUtils from "DEGJS/domUtils";

let indicators = function(containerEl, settings){

	let wrapperEl,
		indicatorEls = [],
		activeIndicatorIndex = settings.activeIndicatorIndex;

	function init() {
		if (settings.indicatorCount > 1) {

			wrapperEl = document.createElement('div');
			domUtils.addCssClasses(wrapperEl, settings.wrapperCssClass);

			for(var i = 0; i < settings.indicatorCount; i++) {
				createIndicator(i);
			}

			containerEl.appendChild(wrapperEl);

			wrapperEl.addEventListener('click', onClick);
		}
	}

	function createIndicator(index) {
		let indicatorEl = document.createElement('button');
		indicatorEl.setAttribute(settings.indexAttribute, index);
		domUtils.addCssClasses(indicatorEl, settings.indicatorCssClass);

		if (index === activeIndicatorIndex) {
			domUtils.addCssClasses(indicatorEl, settings.activeCssClass);
		}

		let labelEl = document.createElement('span');
		domUtils.addCssClasses(labelEl, settings.labelCssClass);
		labelEl.innerHTML = (index+1).toString();
		indicatorEl.appendChild(labelEl);

		indicatorEls.push(indicatorEl);
		wrapperEl.appendChild(indicatorEl);
	}

	function onClick(e) {
		if(e.target.hasAttribute(settings.indexAttribute)) {
			let indicatorIndex =  parseInt(e.target.getAttribute(settings.indexAttribute));

			if (indicatorIndex !== activeIndicatorIndex) {
				settings.onIndicatorChange(indicatorIndex);
			}
		}
	}

	function setActiveIndicator(index) {
		domUtils.removeCssClasses(indicatorEls[activeIndicatorIndex], settings.activeCssClass);
		domUtils.addCssClasses(indicatorEls[index], settings.activeCssClass);

		activeIndicatorIndex = index;
	}

	function destroy() {
		wrapperEl.removeEventListener('click', onClick);
		domUtils.removeElements(wrapperEl);
	}

	init();


	return {
		setActiveIndicator: setActiveIndicator,
		destroy: destroy
	}
}

export default indicators;