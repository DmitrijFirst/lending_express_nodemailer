(function ($) {
    function initData($el) {
        var _ARS_data = $el.data('_ARS_data');
        if (!_ARS_data) {
            _ARS_data = {
                rotateUnits: 'deg',
                scale: 1,
                rotate: 0
            };
            $el.data('_ARS_data', _ARS_data);
        }
        return _ARS_data;
    }

    function setTransform($el, data) {
        $el.css('transform', 'rotate(' + data.rotate + data.rotateUnits + ') scale(' + data.scale + ',' + data.scale + ')');
    }

    $.fn.rotate = function (val) {
        var $self = $(this), m, data = initData($self);
        if (typeof val == 'undefined') {
            return data.rotate + data.rotateUnits;
        }
        m = val.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);
        if (m) {
            if (m[3]) {
                data.rotateUnits = m[3];
            }
            data.rotate = m[1];
            setTransform($self, data);
        }
        return this;
    };

    // Note that scale is unitless.
    $.fn.scale = function (val) {
        var $self = $(this), data = initData($self);

        if (typeof val == 'undefined') {
            return data.scale;
        }

        data.scale = val;

        setTransform($self, data);

        return this;
    };

    var curProxied = $.fx.prototype.cur;
    $.fx.prototype.cur = function () {
        if (this.prop == 'rotate') {
            return parseFloat($(this.elem).rotate());

        } else if (this.prop == 'scale') {
            return parseFloat($(this.elem).scale());
        }

        return curProxied.apply(this, arguments);
    };

    $.fx.step.rotate = function (fx) {
        var data = initData($(fx.elem));
        $(fx.elem).rotate(fx.now + data.rotateUnits);
    };

    $.fx.step.scale = function (fx) {
        $(fx.elem).scale(fx.now);
    };

    var animateProxied = $.fn.animate;
    $.fn.animate = function (prop) {
        if (typeof prop['rotate'] != 'undefined') {
            var $self, data, m = prop['rotate'].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
            if (m && m[5]) {
                $self = $(this);
                data = initData($self);
                data.rotateUnits = m[5];
            }
            prop['rotate'] = m[1];
        }
        return animateProxied.apply(this, arguments);
    };
})(jQuery);

$(function () {
    $(window).on('load', function waves0() {
        var width = screen.width;
        var right = width / 2;
        if (width >= 320 && width <= 960) {
            $('#smc-circle').css({
                'right': '30px',
                'bottom': '30px',
                'height': '260px',
                'width': '260px',
                'opacity': '0.2'
            });
            $('#smc-circle').animate({
                    'right': '60px',
                    'bottom': '60px',
                    'height': '200px',
                    'width': '200px',
                    'opacity': '1'
                },
                {
                    complete: waves320,
                    duration: 800
                });
        } else {
            $('#smc-circle').css({
                'right': '100px',
                'bottom': '100px',
                'height': '75px',
                'width': '75px',
                'opacity': '0.2'
            });
            $('#smc-circle').animate({
                    'right': '82.5px',
                    'bottom': '82.5px',
                    'height': '110px',
                    'width': '110px',
                    'opacity': '1'
                },
                {
                    complete: waves960,
                    duration: 800
                });
        }
        function waves320() {
            $('#smc-waves').css({
                'right': '40px',
                'bottom': '40px',
                'height': '240px',
                'width': '240px',
                'opacity': '1'
            });
            $('#smc-circle').animate({
                    'right': '30px',
                    'bottom': '30px',
                    'height': '260px',
                    'width': '260px',
                    'opacity': '0.2'

                },
                {
                    duration: 1500
                });
            $('#smc-waves').animate({
                    'right': '30px',
                    'bottom': '30px',
                    'height': '260px',
                    'width': '260px',
                    'opacity': '0'
                },
                {
                    complete: waves0,
                    duration: 1500
                });
        }

        function waves960() {
            $('#smc-waves').css({
                'right': '80.5px',
                'bottom': '80.5px',
                'height': '110px',
                'width': '110px',
                'opacity': '1'
            });
            $('#smc-circle').animate({
                    'right': '100px',
                    'bottom': '100px',
                    'height': '75px',
                    'width': '75px',
                    'opacity': '0.2'
                },
                {
                    duration: 1500
                });
            $('#smc-waves').animate({
                    'right': '60.5px',
                    'bottom': '60.5px',
                    'height': '150px',
                    'width': '150px',
                    'opacity': '0'
                },
                {
                    complete: waves0,
                    duration: 1500
                });
        }
    });
//   Цвет/иконка при клике
    $('#smc-button-icon').on('mouseenter', function () {
        $('#smc-waves').css({'border-color': '#b2ebf2'});
        $('#smc-circle').css({'background-color': '#b2ebf2'});
        $(this).attr('src', 'http://tuladent.ru/assets/tpl/smc/button_clicked.png');
    });
    var rotation = function () {
        if (x > 0) {
            var rotate3 = function () {
                $('#smc-button-icon').animate({rotate: "0deg"},
                    {
                        complete: rotation,
                        duration: 50
                    });
            }
            var rotate2 = function () {
                $('#smc-button-icon').animate({rotate: "-5deg"},
                    {
                        complete: rotation,
                        duration: 100
                    });
            }
            var rotate1 = function () {
                $('#smc-button-icon').animate({rotate: "10deg"},
                    {
                        complete: rotate2,
                        duration: 200
                    });
            }
            $('#smc-button-icon').animate({rotate: "-20deg"},
                {
                    complete: rotate1,
                    duration: 300
                });

        } else {
            return 0;
        }
    }, x;
    x = 1;
    rotation();
    //$('#smc-button-icon').on('mouseenter', rotation);
    $('#smc-button-icon').on('mouseleave', function () {
        $('#waves').css({'border-color': '#44f59a'});
        $('#circle').css({'background-color': '#8dffc4'});
        $(this).attr('src', 'http://tuladent.ru/assets/tpl/smc/button.png');
    });
});
















/*
*/
