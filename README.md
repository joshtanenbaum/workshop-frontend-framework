# CS52 Workshops:  Alternative Frontend Frameworks

![](https://media.giphy.com/media/l3vQXZiBGhxBEALEk/giphy.gif)

Frontend Frameworks: A better way to develop applications for the web.

## Overview

We'll break down some basic concepts in Vue and implement these concepts to create an interactive "search" bar that queries an API for a movie database.

## Setup
To begin this workshop, clone our repo
```bash
git clone https://github.com/dartmouth-cs52-20S/workshop-frontend-framework.git
```
You are welcome :)

## Step by Step

Let's make our script. We'll call it `index.html`. Sounds familiar? Yeah, we are back to Lecture 1! Let's build out a easy html template:
```html
<html>
  <head>
    <title>Search and Vue Movies</title>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  
  <body>
    <div id="main">
          
    </div>

  </body>

</html>
```
Notice our page title! At the end of this workshop, we'll be able to search and "vue" movies! Haha, get it? Since it's a pun on Vue? Funny, right??? Okay, nevermind.

It is generally best practice to download `Vue` through `npm`. However, since we're trying to avoid making the setup an extra headache for this workshop, we will simplify it a bit and include it as a `<script>` element instead. Here, copy the following script inside `<body>` after the `main` div. We'll also link in our external main.js file
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
  watch: {
  }
});
```
What is going on here?
We created our new Vue instance, and pass it a configuration object. See the {} as a parameter?

1. `el`: Here we tell Vue where inside our HTML DOM we want our app to be displayed. In this case, the div with the `#main` id.
2. `data` property: Every Vue instance has a local storage, like a box of variables and properties that it will hold for us and that we can use when coding our app. Data holds a JavaScript object, so we assign it one with the { } syntax. Inside, we place a property.
3. `watch` property: Remember `Vue` is a reactive framework? This part holds all the logic we'll need for today's workshop. In this case, the `watch` property will call a function when an input changes.

We'll be searching a movie database using Axios and pulling movie titles, rankings, and images.

But we need an element to actually search the database right? We need a search bar. Don't worry, we are not going to need a component. This is not REACT!!

Copy this searchbar into your `main` div:
```html
<div class="bar">
  <input type="text" v-model="searchString" placeholder="Search for a movie" />
</div>
```
and also, create a corresponding `searchString` property inside the `data` property of your `Vue` instance. Here, the `v-model` property in our html is to bind the `searchString` in our `Vue` object with the html display. While you're at it, throw in a `movies` property as an empty array. We'll use this to store the movies that we receive back from our API query.
<details>
 <summary>Your data property should look like this now!</summary>
 
 ```javascript
data: {
  searchString: "",
  movies: []
},
 ```
</details>

We created a search bar. 

#### Next, we need some logic for searching. More specifically, we want to `watch` the input bar for changes so that we know what to search for in the movie database! Where does it happen? If you guessed `watch` property, you are right!

We need to create a function to handle any changes in search input, kind of like event listeners in react. On each change to the input bar, we want to call this function, which will then pass the updated query to the movie database API and save the results to the `data` property of our `Vue` instance.

First, in your `watch` property create an empty function that is bound to the `searchString` value. This function, which we'll add to in a second, will be called with the `val` parameter anytime the `searchString` property changes (i.e., when our input value from the search bar changes). And the `val` parameter denotes the value of the `searchString` property.

```javascript
watch: {
  'searchString': function(val){
  }
}
```

Next, we'll call our movie API within this function, with the `val` query. We'll use Axios, a simple and widely-used promise-based HTTP client for API. 

Throw this line into your index.html BEFORE your other scripts! We'll avoid having to install axios using npm/yarn this way.

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

Now back to the function in our watch property. Basically, you'll want to call `axios.get()`, to which you pass the moviedb URL, updated with your query (https://api.themoviedb.org/3/search/movie?query=YOURVALUEHERE&api_key=dbc0a6d62448554c27b6167ef7dabb1b). Make sure to replace the value in the string before you pass it to `axios.get`. We suggest using template literals to make your life easier!

Since Axios is promise based, you'll also want to take the response from the API and then reassign the movies array to those results using the line below:

```javascript
this.movies = response.data.results;
```

<details>
 <summary>If you got lost at some point within the `watch` property, take a look here. Your property should look like this now!</summary>
  
```javascript
watch: {
  'searchString': function(val){
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`).then(response => {
      this.movies = response.data.results
    });
  }
}
```
</details>

This part is pretty self-explanatory. Note that we can access the properties in `data` by simply calling `this.` in any part of the `Vue` object. 

Finally, just so we have some results loaded when the page initially loaded, we can add a `mounted()` property that is run when the page initially loads. We'll add a `defaultSearchTerm` variable at the top of the JS file, above the `new Vue` line.

```javascript
const defaultSearchTerm = 'a';
```

Next, inside the `Vue` instance, add a mounted property between the `data` and `watch` properties.

```javascript
mounted() {
  axios.get(`https://api.themoviedb.org/3/search/movie?query=${defaultSearchTerm}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`).then(response => {
    this.movies = response.data.results
  })
},
```

#### Now, we need to actually render all this good movie data we pulled from the database!

Pretty amazing! Now, finally, we are trying to add the search result display into our html. We need to iterate the `movies` property, which is a list consisting of all the search results, and display the content of it(i.e. title, images, rating, etc). Since this is your first time hanging out with `Vue`, we'll give the secret out.

```html
<ul>
  <!-- Render a li element for every entry in the computed array. -->
  <li v-for="movie in movies">
    <div class="moviecard">
      <img :src="'https://image.tmdb.org/t/p/w500'+movie.poster_path">
      <div class="moviedesc">
        <h1>{{ movie.title }} - <small>{{ movie.original_language }}</small></h1>
        <p>{{ movie.vote_average }} &#9734;</p>
      </div>
    </div>
  </li>
</ul>

```
A couple things you might need to understand. `v-for` is a for loop (for those of you who've taken CS 10, this is what we called for-each in Java). The `:src` is a shorthand for `v-bind:src`, which associates the `movie.poster_path` value of the src with each given movie.

But wait, it doesn't work yet. Remember we initally named the `Vue` object `#main` in `el`? We need to make a binding for that as well. So change your main `<div>` to a `form` tag and add the attribute `v-cloak`. Like this:
```html
<form id="main" v-cloak>
</form>

```

The `v-cloak` syntax just hides the form while it is being mounted - a nice little bonus functionality to Vue.

Now you are ready to go!:sunglasses: 


Your final search bar (with CSS) should look something like this!

![](/finalproduct.png)


## What you should have at this point
- [ ] A working search bar linked to themoviedb api
- [ ] A Vue instance with data, mounted, and watch properties
- [ ] A v-for loop to display movies
- [ ] An example of how easy it is to set up a Vue project!

## Summary / What you Learned

- [ ] How to create a Vue instance
- [ ] A few Vue directives
- [ ] How to watch an input element and run a callback function, similar to triggering a function onChange in React.
- [ ] How to run something on mounted similar to the componentDidMount React lifecycle method

Frontend frameworks facilitate the creation of complex web applications. Frontend frameworks can differ in their structure, learning curves, how they manage state, data binding, DOM, and more. Choosing which frontend framework to use are decisions that have to be made at the start of any project based on the features of said project.

## Reflection

* How do React and Vue differ in how (and where) they handle most of their logic?
* The React analog for the Vue "v-on:click" directive is "onClick" attribute, but what are the React analogs for the Vue directives "v-for",  "v-if", and "v-show"?

## Resources

* https://tutorialzine.com/2016/03/5-practical-examples-for-learning-vue-js
* https://dev.to/marinamosti/hands-on-vuejs-for-beginners-part-5--1jbi
* https://alligator.io/react/live-search-with-axios/
