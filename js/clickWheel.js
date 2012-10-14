var clickWheel = {};
(function() {
    // private variables
    var lastX,
        lastY,
        screenElem,
        offsetTop,
        offsetLeft,
        selectedIndex = 0,
    // private variables(fixed)
        WHEEL_BODY_RADIUS = 105,
        LINE_HEIGHT = 26,
        DISP_LINES = 5;

    var getXY = function(event) {
        var currentX,
            currentY,

        // get current coordinates
        currentX = event.touches[0].pageX - offsetLeft;
        currentY = event.touches[0].pageY - offsetTop;

        // if last coordinates is undefined, quit function.
        if(!lastX) {
            lastX = currentX;
            lastY = currentY;
            return;
        }

        // calculate list index
        setListIndex(currentX, currentY, lastX, lastY);

        event.preventDefault();
    };

    var setListIndex = function(curX, curY, lX, lY) {
        var effectLevel = 0, // effect level for list index
            diffX,
            diffY,
            multiX,
            multiY;

        // get diff
        diffX = curX - lX;
        diffY = curY - lY;

        // play of finger move is 10px
        if(Math.abs(diffX) + Math.abs(diffY) < 10) { return; }

        if(curY < WHEEL_BODY_RADIUS) {
            multiX = 1;
        } else {
            multiX = -1;
        }
        if(curX < WHEEL_BODY_RADIUS) {
            multiY = -1;
        } else {
            multiY = 1;
        }
        effectLevel += (multiX * Math.integer(diffX / 5));
        effectLevel += (multiY * Math.integer(diffY / 5));
        effectLevel = effectLevel > 0 ? 1 : -1;

1        // set list index
        addListIndex(effectLevel);

        // save coordinates
        lastX = curX;
        lastY = curY;
    };

    var addListIndex = function(effectLevel) {
        // private variables
        var container,
            lists,
            currentIndex = 0,
            i,
            scrollYPos;

        // clear list selecting status
        container = screenElem.querySelector('ul');
        lists = screenElem.querySelectorAll('li');
        for(i = lists.length - 1; i >= 0; i--) {
            lists[i].className = ''; // clear class name
        }

        // set index with effect level
        selectedIndex = selectedIndex + effectLevel;
        if(selectedIndex < 0) {
            selectedIndex = 0;
        } else if(selectedIndex >= lists.length) {
            selectedIndex = lists.length - 1;
        }
        lists[selectedIndex].className = 'selected';

        // scroll to selected item
        scrollYPos = selectedIndex * LINE_HEIGHT;
        if(scrollYPos < container.scrollTop) {
            container.scrollTop = scrollYPos;
        } else if (container.scrollTop + (LINE_HEIGHT * (DISP_LINES - 1)) < scrollYPos) {
            container.scrollTop = scrollYPos -  (LINE_HEIGHT * (DISP_LINES - 1));
        }
    };

    var clearXY = function(event) {
        lastX = undefined;
        lastY = undefined;
    };

    var cancel = function(event) {
        event.preventDefault();
    };

    var setElements = function(wheelElem, screenElem) {
        setWheel(wheelElem);
        setScreen(screenElem);
    };

    var setWheel = function(element) {
        var wheelBodyElem = element.querySelector('.wheel-body'),
            okButtonElem = element.querySelector('.wheel-ok');

        // set wheel's offsets for calculate coordinates
        offsetTop = element.offsetTop + wheelBodyElem.offsetTop;
        offsetLeft = element.offsetLeft + wheelBodyElem.offsetLeft;

        // event handler attach to wheel
        wheelBodyElem.addEventListener('touchstart', getXY, false);
        wheelBodyElem.addEventListener('touchmove', getXY, false);
        wheelBodyElem.addEventListener('touchend', clearXY, false);

        // event will be canceled when pushing OK button
        okButtonElem.addEventListener('touchstart', cancel, false);
        okButtonElem.addEventListener('touchmove', cancel, false);
    };

    var setScreen = function(element) {
        screenElem = element;
    };

    // set public members to global object
    clickWheel.setElements = setElements;

    return clickWheel;
})();