# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Animations the Angular Way

<!--11:25 25 minutes -->

### Objectives
- **Dynamically apply** and remove css classes using `ng-class` (see Lesson 1)
- **Animate elements** with CSS transitions or keyframe animations (see Lesson 1)
- **Do animations** _the Angular way_


The following lesson was deconstructed and rebuilt in code from a nice online tutorial video.

#### Setup:
`bower init` (`enter` `enter` `enter`...)

Take a moment to look at your starter code `index.html`:

```html
    <!DOCTYPE html>
    <html>
    <head lang="en">
        <meta charset="UTF-8">
        <title>Angular Animations</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
    </head>
    <body ng-app="app" ng-controller="AppCtrl">
        <h2>Angular Animations</h2>
        <button id="myButton" class="btn-primary">Click to fade</button>

        <div id="myBadge" class="badge">Fade me</div>

        <script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
        <script type="text/javascript" src="bower_components/gsap/src/uncompressed/TweenMax.js"></script>
        <script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
        <script type="text/javascript" src="bower_components/angular-animate/angular-animate.min.js"></script>
        <script type="text/javascript" src="app.js"></script>
    </body>
    </html>

```

As you can see, we're using a CDN for Bootstrap CSS (serving the file locally caused problems), an animation library called TweenMax, Angular of course and Angular Animate.

Let's fetch the code before we begin.

- `bower install angular`
- `bower install bootstrap`
- `bower install gsap --save`  (TweenMax seems to have been renamed GreenSock)
- `bower install angular-animate`

Add the following to your empty `app.js` file as a sanity check:

```js
    var app = angular.module('app', ['ngAnimate']);

    app.controller('AppCtrl', function(){
        console.log('Angular is running');
    });
```

Now we can fire up the server and make sure things work.

`http-server`

We see the button and the badge. Let's wire up some animation.

### Step 1. jQuery Animation (not recommended)

We already know how to use jQuery animations. This will work with or without Angular.

```js
     $('#myButton').click(function (){
         TweenMax.to($('#myBadge'), 1, {opacity: 0});        
     });

```

Generally speaking, _using jQuery is not the Angular Way._


### Step 2. Let's remove jQuery 

The `.click` method can go. Let's add some Angular code to our controller, instead.

```js
    this.fadeIt = function(){
        TweenMax.to($('#myBadge'), 1, {opacity: 0});        
    }  

```

We need to call our new `fadeIt` function from the HTML. Where would you add this directive as an attribute?

```html
     ng-click="app.fadeIt()"
 ```

We also need to do something different with our `ng-controller` in order to call fadeIt on `app`:

```html 
     ng-controller="AppCtrl as app"
```

That should do the trick, but manipulating the DOM inside a controller is a bad idea for several reasons. The code is not reusable and it doesn't leverage the power of directives.


### Step 3. Let's leverage the power of directives!

The directive is to be called `hideMe`. (That's `hide-me` in the markup. Or `hide_me`. Or `hide:me`.)

```html
    hide-me="app.isHidden"
```

We'll also declare a variable `isHidden`, set it to `false` by default (thereby duck-typing it a Boolean) and we can toggle its value like so:

```js
    this.isHidden = false;

    this.fadeIt = function(){
        this.isHidden = !this.isHidden;
    };

```
The directive itself will look like this:

```js
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
```

You may use `scope` or `$scope`. At this level they are equivalent.

Angular's `$watch` service is like an event listener. By passing in `attrs` we can monitor any HTML attributes for changes in the current scope. When a change occurs, `$watch` recieves the new value and we can use that data to evoke changes in our app.

This handles one direction of the fade.  How would we handle the other side?  I.e. what if newVal is false, how do we fade back in?

Now we have our custom directive but we're still calling it on a specific element in the DOM.

### Step 4. It's All You.

Now you need to pass `$animate` into our directive function. 

Then, we can pass specific functionality to `$animate.addClass` and `.removeClass` using the `animation` service (think `app.animation(...)`).  

Check out the `$animate` documentation for the exact syntax of `addClass` and `removeClass` in your controller.  Check out the `ngAnimate` documentation for syntax of `app.animation(...)`. 

#### Here are some excellent links:

* [Animating the Angular Way -- Egghead.io *SOURCE OF THIS LESSON*](https://egghead.io/lessons/angularjs-animating-the-angular-way)
* [The `Applying Animations` step of the official Angular Tutorial](https://docs.angularjs.org/tutorial/step_12)
* [Angular Developer Guide / Animations](https://docs.angularjs.org/guide/animations)
* [Angular API Reference / ngAnimate](https://docs.angularjs.org/api/ngAnimate)
* [Angular API Reference / $animate](https://docs.angularjs.org/api/ng/service/$animate)
* [Angular ngClass Source Code](https://github.com/angular/angular.js/blob/master/src/ng/directive/ngClass.js)
* [Animations the Angular Way - CSS Tricks](https://css-tricks.com/animations-the-angular-way/)



## Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
