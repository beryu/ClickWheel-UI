(function() {
    setTimeout("scrollTo(0,1)", 100);

    document.addEventListener('DOMContentLoaded', function() {
        // select and set elements
        var wheel = document.getElementsByClassName('wheel')[0];
        var screen = document.getElementsByClassName('screen')[0];
        clickWheel.setElements(wheel, screen);
    });
})();