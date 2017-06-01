let swiper = function(containerEl) {
	var listeners = [],
		minSwipeLength = 72,
		fingerCount,
		startX,
		startY,
		curX,
		curY;


    function init() {
        touchCancel();

        containerEl.addEventListener('touchstart', onTouchStart );
        containerEl.addEventListener('touchend', onTouchEnd );
        containerEl.addEventListener('touchmove', onTouchMove );
    };

    function addListener(eventType, listener) {
        if (typeof listeners[eventType] == "undefined"){
            listeners[eventType] = [];
        }

        listeners[eventType].push(listener);
    }

    function dispatchEvent(eventType) {
        if (listeners[eventType] instanceof Array){
            var evenTypeListeners = listeners[eventType];
            for (var i=0, len=evenTypeListeners.length; i < len; i++){
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
        if ( fingerCount == 1 ) {
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
        if ( event.touches.length == 1 ) {
            curX = event.touches[0].pageX;
            curY = event.touches[0].pageY;
        } else {
            touchCancel(event);
        }
    }

    function onTouchEnd(event) {
        //event.preventDefault();
        // check to see if more than one finger was used and that there is an ending coordinate
        if ( fingerCount == 1 && curX != 0 ) {
            // use the Distance Formula to determine the length of the swipe
            var swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
            // if the user swiped more than the minimum length, perform the appropriate action
            if ( swipeLength >= minSwipeLength ) {
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
        var X = startX-curX;
        var Y = curY-startY;
        var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
        var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
        var swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
        if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
        return swipeAngle;
    }

    function determineSwipeDirection() {
        var swipeAngle = caluculateAngle();

        if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
            return 'left';
        } else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
            return 'left';
        } else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
            return 'right';
        } else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
            return 'down';
        } else {
            return 'up';
        }
    }

    function destroy() {
    	containerEl.removeEventListener('touchstart', onTouchStart );
        containerEl.removeEventListener('touchend', onTouchEnd );
        containerEl.removeEventListener('touchmove', onTouchMove );

        listeners = [];
    }

    init();

    return {
    	addListener: addListener,
    	destroy: destroy
    }
};

export default swiper;