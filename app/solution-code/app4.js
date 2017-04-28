var app = angular.module('app', ['ngAnimate']);

app.controller('AppCtrl', function(){
    this.isHidden = false;
    this.fadeIt = function(){
        this.isHidden = !this.isHidden;
    };
});

app.directive('hideMe', function($animate){
    return function(scope, element, attrs){
        scope.$watch(attrs.hideMe, function(newVal){
            // console.log(newVal)
            if(newVal){
                $animate.addClass(element, "fade"); 
            } else {
                $animate.removeClass(element, "fade");
            }
            // console.log(element[0].classList);
        }); 
    };
});

app.animation(".fade", function (){
    // console.log('hello');
    return { 
        addClass: function(element, className){
             TweenMax.to(element, 1, {opacity: 0}); 
        },
        removeClass: function(element, className){
            TweenMax.to(element, 1, {opacity: 1});
        }
    };
});