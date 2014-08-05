/**
 * Created by oyvindheiene on 04/08/14.
 */
angular.module('SliderDirective', [])
    .directive('golfSlider', [function() {
        return {
            restrict: "E",
            scope: {
                slidermodel: "=",
                sliderid: "@",
                sliderinputid: "@",
                slidertype: "@",
                par: "@"
            },
            templateUrl: "../../templates/scoreslider_vertical_temp.html",
//            template: 'Sliderinput: <input class="test2" ng-model="slidermodel"/>' +'{{sliderid}}<div id="{{sliderid}}"></div>', //må bare få denne til å oppdater slider så er det i boks...
            link: function(scope, elem, attrs) {
                var slida = $("#"+elem.attr("id")+' .slida');
                var slidaInput = $("#"+elem.attr("id")+' .slida-input');

                console.log("elem.id",elem.attr("id"));

                console.log("div div div", $("#"+elem.attr("id")+' .slida'));

//                console.log(scope.sliderid, $('#'+scope.sliderid))
////                scope.$apply();
//                console.log(scope.sliderid, $('#'+scope.sliderid))

//console.log(scope.par);

                var options = {
                    start: [scope.par],
                    range: {
                        'min': 1,
                        'max': ((scope.par*2)+1)
                    },
                    orientation: "horizontal",
                    step: 1,
                    connect: "lower",
                    serialization: {
                    lower: [
                        $.Link({
                            target: slidaInput,
                            format: {
                                decimals: 0
                            }
                        })
                    ]
                    }
                };

//                elem.noUiSlider(options);
//                elem.on('set', function(){
//                    scope.$apply(function() {
//                        scope.slidermodel = elem.val();
//                    })
//                });



                slida.noUiSlider(options)

                slida.on({
                    set: function(n,a) {
                            console.log(n,a,'SET IS CALLED, value: ',  slida.val())
                        scope.$apply(function () {
                            scope.slidermodel = slida.val();
                        })
                    }
                    ,
                    slide: function() {
                        console.log('SLIDE IS CALLED, value: ',  slida.val())

                        scope.$apply(function () {
                            scope.slidermodel = slida.val();
                        })
                    }
                });


//                elem.noUiSlider(scope.options);
//                elem.on('set', function(){
//                    scope.$apply(function() {
//                        scope.slidermodel = elem.val();
//                    })
//                });
            }
        }
    }]);