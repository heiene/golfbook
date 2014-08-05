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

                console.log(scope.sliderid, $('#'+scope.sliderid))
                scope.$apply();
                console.log(scope.sliderid, $('#'+scope.sliderid))

console.log(scope.par);

                var options = {
                    start: 3,
                    range: {
                        'min': 1,
                        'max': ((scope.par*2)+1)
                    },
                    orientation: "horizontal",
                    step: 1,
                    serialization: {
                    lower: [
                        $.Link({
                            target: $("#"+scope.sliderinputid),
                            format: {
                                decimals: 0
                            }
                        })
                    ]
                    }
                };

                $('#'+scope.sliderid).noUiSlider(options)

                $("#"+scope.sliderinputid).on({
                    set: function(n,a) {
                            console.log(n,a,'SET IS CALLED, value: ',  $("#"+scope.sliderinputid).val())
                        scope.$apply(function () {
                            scope.slidermodel = $("#"+scope.sliderinputid).val();
                        })
                    }
                    ,
                    slide: function() {
                        console.log('SLIDE IS CALLED, value: ',  $("#"+scope.sliderinputid).val())

                        scope.$apply(function () {
                            scope.slidermodel = $("#"+scope.sliderinputid).val();
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