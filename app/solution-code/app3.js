var app = angular.module('app', ['ngAnimate']);

app.controller('AppCtrl', function(){
    this.isHidden = false; // Boolean
    this.fadeIt = function(){
        this.isHidden = !this.isHidden;
    };
});

// almost the Angular way. Here is our custom directive but we're still calling it on a specific
// element in the DOM

app.directive("hideMe", function(){
    return function(scope, element, attrs){
        scope.$watch(attrs.hideMe, function(newVal){
            console.log(newVal);
            if(newVal){
                TweenMax.to($('#myBadge'), 1, {opacity: 0}); 
            }
        }); 
    };
});