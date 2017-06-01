export function supportsCSSProp(propName) {
	return (typeof document.body.style[propName] !== 'undefined');
}