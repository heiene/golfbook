/**
 * Created by oyvindheiene on 04/08/14.
 */
angular.module('SliderDirective', [])
    .directive('golfSlider', [function() {
        return {
            restrict: "E",
            scope: {
                slidermodel: "=",
                slidertype: "@"
            },
            templateUrl: "../../templates/scoreslider_vertical_temp.html",
            link: function(scope, elem, attrs) {
                var slida;
                var slidaInput;
                var rangeMin    = 0;
                var rangeMax    = 6;
                var start       = 0;


                /* -- Setter type på slider -- */
                if(attrs.slidertype === "stroke") {
                    rangeMin = 1;
                    rangeMax = ((scope.slidermodel*2)+1);
                    start = scope.slidermodel;
                } else if (attrs.slidertype === "put") {
                    start = 2;
                }

                /* -- Venter på binding skal bli ferdig stilt og ID er klar -- */
                attrs.$observe('id', function (newValue) {
                    slida       = $("#"+attrs.id+' .slida');
                    slidaInput  = $("#"+attrs.id+' .slida-input');
                    var testFunciton = function (value) {
                        console.log($(this))
                        $(this).value = value;
                    }

                    var options = {
                        start: [start],
                        range: {
                            'min': rangeMin,
                            'max': rangeMax
                        },
                        orientation: "vertical",
                        direction: "rtl",
                        step: 1,
                        connect: "lower",
                        behaviour: 'extend-tap',
                        serialization: {
                            lower: [
                                $.Link({
                                    target: slidaInput
                                })
                            ],
                            format: {
                                decimals: 0,
                                mark: ","
                            }
                        }
                    };

                    slida.noUiSlider(options);
                    slida.on({
                        set: function(n,a) {
                            scope.$apply(function () {
                                scope.slidermodel = slida.val();
                            })
                        },
                        slide: function() {
                            scope.$apply(function () {
                                scope.slidermodel = slida.val();
                            })
                        }
                    });

                });
            }
        }
    }]).directive('horizontalSlider', [function() {
        return {
            restrict: "E",
            scope: {
                slidermodel: "=",
                slidertype: "@",
                player: "@"
            },
            template:   '<div class="slider-heading-horizontal"><h4>{{slidertype}}: {{player}}</h4></div>  ' +
                        '<div class="slida-slide-horizontal-wrapper"><div class="slida-horizontal"></div></div>' +
                        '<div class="slida-input-horizontal-wrapper"><input type="text" class="input-sm slida-input-horizontal" ng-model="slidermodel" /></div>',
            link: function(scope, elem, attrs) {
                var slida;
                var slidaInput;
                var rangeMin    = 0;
                var rangeMax    = 6;
                var start       = 0;


                /* -- Setter type på slider -- */
                if(attrs.slidertype === "stroke") {
                    rangeMin = 1;
                    rangeMax = ((scope.slidermodel*2)+1);
                    start = scope.slidermodel;
                } else if (attrs.slidertype === "put") {
                    start = 2;
                }

                /* -- Venter på binding skal bli ferdig stilt og ID er klar -- */
                attrs.$observe('id', function (newValue) {
                    slida       = $("#"+attrs.id+' .slida-horizontal');
                    slidaInput  = $("#"+attrs.id+' .slida-horizontal-input');

                    var options = {
                        start: [start],
                        range: {
                            'min': rangeMin,
                            'max': rangeMax
                        },
                        orientation: "horizontal",
                        direction: "ltr",
                        step: 1,
                        connect: "lower",
                        behaviour: 'extend-tap',
                        serialization: {
                            lower: [
                                $.Link({
                                    target: slidaInput
                                })
                            ],
                            format: {
                                decimals: 0,
                                mark: ","
                            }
                        }
                    };

                    slida.noUiSlider(options);
                    slida.on({
                        set: function(n,a) {
                            scope.$apply(function () {
                                scope.slidermodel = slida.val();
                            })
                        },
                        slide: function() {
                            scope.$apply(function () {
                                scope.slidermodel = slida.val();
                            })
                        }
                    });

                });
            }
        }
    }]);