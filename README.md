# CS52 Workshops:  Alternative Frontend Frameworks

![](https://media.giphy.com/media/l3vQXZiBGhxBEALEk/giphy.gif)

Frontend Frameworks: A better way to develop applications for the web.

## Overview

In the first part of this workshop, we'll break down some basic concepts in Vue, a popular frontend framework alternative to React.JS. Next, we'll implement some of those concepts to create an interactive "search" bar.

## Setup

Create a new directory for this workshop
```bash
mkdir your-project-name
```
Enter the directory you just made and create these files
```bash
cd your-project-name
touch index.html style.css main.js
```

## Step by Step

Let's make our script. We'll call it `index.html`. Sounds familiar? Yeah, we are back to Lecture 1! Let's build out a easy html template:
```html
<html>
<head>
  <title>Vue API Movie Search</title>
</head>
<body>
 
</body>

</html>
```
It is best practice to download `Vue` through `npm`. However, since we promised to not give you extra headache for the setup, we will keep our promise. Here, copy the following script inside the `<body>` part. We'll also link in our external main.js file
```html
<script src="https://unpkg.com/vue"></script>
<script src="main.js"></script>

```
Congratulations! You now have `Vue` framework running in your code. Now, let's add a `Vue` object to our `main.js` file - this is where we'll be putting most of our `Vue` functionality and data:
```javascript
const demo = new Vue({
    el: '#main',
    data: {

    },
    computed: {
    }
});
```
What is going on here?
We created our new Vue instance, and pass it a configuration object. See the {} as a parameter?

1. `el`: Here we tell Vue where inside our HTML DOM we want our app to be displayed. In this case, the div with the `#main` id.
2. `data` property: Every Vue instance has a local storage, like a box of variables and properties that it will hold for us and that we can use when coding our app. Data holds a JavaScript object, so we assign it one with the { } syntax. Inside, we place a property.
3. `watch` property: Remember `Vue` is a reactive framework? This part holds all the logic we'll need for today's workshop. In this case, the `watch` property will call a function when an input changes.

Now, since we are making a searcher to search games, we will preload some game data into our `games` property inside the `data` obejct. Copy the following part into your code:
```javascript
        games: [
            { name: 'Super Mario 64', rating: 4, image:"https://images.all-free-download.com/images/wallpapers_large/super_mario_sunshine_3502.jpg", url:"https://mario.nintendo.com/"},
            { name: 'The Legend of Zelda Ocarina of Time', rating: 2,image:"https://images.all-free-download.com/images/wallpapers_large/the_legend_of_zelda_10008.jpg", url:"https://www.zelda.com/"},
            { name: 'Call of Duty', rating: 4,image:"https://images.all-free-download.com/images/wallpapers_large/call_of_duty_black_ops_8025.jpg", url:"https://www.callofduty.com/"},
            { name: 'Super Smash Bro', rating: 1, image:"https://images.all-free-download.com/images/wallpapers_large/super_smash_bros_wii_u_15483.jpg", url:"https://www.smashbros.com/en_US/"},
            { name: 'Starcraft', rating: 6,image:"https://images.all-free-download.com/images/wallpapers_large/blizzard_starcraft_2_wallpaper_starcraft_2_games_wallpaper_3133.jpg", url:"https://starcraft2.com/en-us/"},
            ]
```

This is the database we are searching from. Feel free to change any of the entry, as this little "database" is pretty self-explanatory. However, our team believe the ratings on the games are pretty fair.

But we need to search the games right? We need a search bar. Don't worry, we are not going to need a component. This is not REACT!!

Copy this part above into your code, above the `<script>` section:
```html
    <div class="bar">
        <input type="text" v-model="searchString" placeholder="Enter your search terms" />
    </div>
```
and also, create a `searchString` property inside the `data` property of your `Vue` instance.
<details>
 <summary>Your data property should look like this now!</summary>
 
 ```javascript
data: {
        searchString: "",
        games: [
            { name: 'Super Mario 64', rating: 4, image:"https://images.all-free-download.com/images/wallpapers_large/super_mario_sunshine_3502.jpg", url:"https://mario.nintendo.com/"},
            { name: 'The Legend of Zelda Ocarina of Time', rating: 2,image:"https://images.all-free-download.com/images/wallpapers_large/the_legend_of_zelda_10008.jpg", url:"https://www.zelda.com/"},
            { name: 'Call of Duty', rating: 4,image:"https://images.all-free-download.com/images/wallpapers_large/call_of_duty_black_ops_8025.jpg", url:"https://www.callofduty.com/"},
            { name: 'Super Smash Bro', rating: 1, image:"https://images.all-free-download.com/images/wallpapers_large/super_smash_bros_wii_u_15483.jpg", url:"https://www.smashbros.com/en_US/"},
            { name: 'Starcraft', rating: 6,image:"https://images.all-free-download.com/images/wallpapers_large/blizzard_starcraft_2_wallpaper_starcraft_2_games_wallpaper_3133.jpg", url:"https://starcraft2.com/en-us/"},
            ]


    },
 ```
</details>
We created a search bar. Here, the `v-model` property in our html is to bind the `searchString` in our `Vue` oject with the html display.

#### Next, we need some logic for searching. Where does it happen? If you guessed `computed` property, you are right!

We need to create a function to handle the search input. Let's call it `filterdGames`. Paste the following code into your `computed` property:

```javascript
filteredGames: function () {
            let games_array = this.games,
                searchString = this.searchString;

            if(!searchString){
                return games_array;
            }

            searchString = searchString.trim().toLowerCase();

            games_array = games_array.filter(function(item){
                if(item.name.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })

            // Return an array with the search result.
            return games_array;;
        }
```
This part is pretty self-explanatory. But there is a couple things to note: we can access the properties in `data` by simply calling `this.` in any part of the `Vue` object. Pretty amazing! Now, finally, we are trying to add the search result display into our html. We need to iterate the `filteredGames`, which is a list consists of all the search results, and display the content of it(i.e. images, url to the official website, etc). Since this is your first time hanging out with `Vue`, we will give the secret out.

```html
 <ul>
        <li v-for="game in filteredGames">
            <a v-bind:href="game.url"><img v-bind:src="game.image" /></a>
            <span>{{game.name}}</span>
            
            <span v-for="star in game.rating">❤️</span>
        
            <div v-if="game.rating > 5">Wow, this game must be <b>REALLY</b> good</div>
        </li>
    </ul>

```
A couple things need to understand. `v-for` is a for loop (for those of you who've taken CS 10, this is what we called for-each in Java). `v-bind` is simply a way to bind properties inside `Vue` object with the html display. `v-if` is the if statement for `Vue`. Now you learned the all the basic. But wait, it doesn't work yet. Remember we initally named the `Vue` object `#main` in `el`? We need to make a binding for that as well. So add these two lines and put your search bar and display components inside this `form`:
```html
<form id="main" v-cloak>
</form>

```
Now you are ready to go!:sunglasses: 

<details>
 <summary>If you need some CSS inspiration, here is ours. Definitely use your creativity to create yours.</summary>

```css

[v-cloak] {
  display: none;
}

*{
    margin:0;
    padding:0;
}

body{
    font:15px/1.3 'Open Sans', sans-serif;
    color: #5e5b64;
    text-align:center;
}

a, a:visited {
    outline:none;
    color:#389dc1;
}

a:hover{
    text-decoration:none;
}

section, footer, header, aside, nav{
    display: block;
}

/*-------------------------
    The search input
--------------------------*/

.bar{
    background-color:#5c9bb7;

    background-image:-webkit-linear-gradient(top, #5c9bb7, #5392ad);
    background-image:-moz-linear-gradient(top, #5c9bb7, #5392ad);
    background-image:linear-gradient(top, #5c9bb7, #5392ad);

    box-shadow: 0 1px 1px #ccc;
    border-radius: 2px;
    width: 400px;
    padding: 14px;
    margin: 45px auto 20px;
    position:relative;
}

.bar input{
    background:#fff no-repeat 13px 13px;
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU5NEY0RTlFMTA4NzExRTM5RTEzQkFBQzMyRjkyQzVBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU5NEY0RTlGMTA4NzExRTM5RTEzQkFBQzMyRjkyQzVBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTk0RjRFOUMxMDg3MTFFMzlFMTNCQUFDMzJGOTJDNUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTk0RjRFOUQxMDg3MTFFMzlFMTNCQUFDMzJGOTJDNUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4DjA/RAAABK0lEQVR42pTSQUdEURjG8dOY0TqmPkGmRcqYD9CmzZAWJRHVRIa0iFYtM6uofYaiEW2SRJtEi9YxIklp07ZkWswu0v/wnByve7vm5ee8M+85zz1jbt9Os+WiGkYdYxjCOx5wgFeXUHmtBSzpcCGa+5BJTCjEP+0nKWAT8xqe4ArPGEEVC1hHEbs2oBwdXkM7mj/JLZrad437sCGHOfUtcziutuYu2v8XUFF/4f6vMK/YgAH1HxkBYV60AR31gxkBYd6xAeF3VzMCwvzOBpypX8V4yuFRzX2d2gD/l5yjH4fYQEnzkj4fae5rJulF2sMXVrAsaTWttRFu4Osb+1jEDT71/ZveyhouTch2fINQL9hKefKjuYFfuznXWzXMTabyrvfyIV3M4vhXgAEAUMs7K0J9UJAAAAAASUVORK5CYII=);

    border: none;
    width: 100%;
    line-height: 19px;
    padding: 11px 0;

    border-radius: 2px;
    box-shadow: 0 2px 8px #c4c4c4 inset;
    text-align: left;
    font-size: 14px;
    font-family: inherit;
    color: #738289;
    font-weight: bold;
    outline: none;
    text-indent: 40px;
}

ul{
    list-style: none;
    width: 428px;
    margin: 0 auto;
    text-align: left;
}

ul li{
    border-bottom: 1px solid #ddd;
    padding: 10px;
    overflow: hidden;
}

ul li img{
    width:60px;
    height:60px;
    float:left;
    border:none;
}

ul li p{
    margin-left: 75px;
    font-weight: bold;
    padding-top: 12px;
    color:#6e7a7f;
}

```
</details>

Our final search bar looks like this!



## Summary / What you Learned

* Frontend Frameworks can be very usefull, but also are not mandatory. Choosing to use a Frontend framework and choosing which frontend framework to use are decisions that have to be made at the start of any project based on the requirments of said project.

## Reflection

* Would you use a Frontend Framework to make your own personal website? If yes, which one and why?
* Would you use a Frontend Framework to make a larger web application like your final project? If yes, which one and why?


## Resources

* https://tutorialzine.com/2016/03/5-practical-examples-for-learning-vue-js
* https://dev.to/marinamosti/hands-on-vuejs-for-beginners-part-5--1jbi
