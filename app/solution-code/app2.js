var app = angular.module('app', ['ngAnimate']);

app.controller('AppCtrl', function(){
    this.fadeIt = function(){

        // typically, manipulating the DOM or finding elements inside a controller is a bad idea
        // it's not reusable, for example, and doesn't leverage the power of directives

        TweenMax.to($('#myBadge'), 1, {opacity: 0});        
    }    
});
