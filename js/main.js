Math.integer = function(num) {
    if(num < 0) {
        return Math.ceil(num);
    } else {
        return Math.floor(num);
    }
};

(function() {
    setTimeout("scrollTo(0,1)", 100);

    document.addEventListener('DOMContentLoaded', function() {
        // 各エレメントをセット
        var wheel = document.getElementsByClassName('wheel')[0];
        var screen = document.getElementsByClassName('screen')[0];
        clickWheel.setElements(wheel, screen);
    });
})();