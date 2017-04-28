var app = angular.module('app', ['ngAnimate']);

app.controller('AppCtrl', function(){
    console.log('Angular is running');
});

// using jQuery is not the Angular way:

$('#myButton').click(function (){
    TweenMax.to($('#myBadge'), 1, {opacity: 0});        
});