---
theme: seriph

background: https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2

class: "text-center"
highlighter: shiki
lineNumbers: false
info: |
  ## React course
  Starter course for React

  Exercises
drawings:
  persist: false
favicon: '/favicon.ico'
css: unocss
---

# Interactive webapps

## A guide to JavaScript

<p class="color-stone-400">Exercises</p>

---

# Exercise: Cinema

- Open the [start project](/cinema/SetupCinema.zip)
- Run `npm install` in the root of the project
- Run `npm run start` in the root of the project to spin up the server
- The html, css is already written for this project
- Complete the index.js and movie.js files to create a functioning app


---

# Overview of the app

- The app loads in all the movies from a remote server
- Displays the movies on the screen
- When clicked on a movie the details of that movie are show in a separate screen
- Th user can like a movie, the liked movies are stored in local storage

---

# Cinema: Part 1, Show the movies to the user

- Create a new function: `addMovieToDOM`, this function gets 1 movie object as argument
- The function will create all the elements that are required to display a movie
- Then it adds the data from the movie object in the corresponding elements
- It puts the elements together and finally shows in in the dom by adding it to the element with id: `list`
- The html of 1 movie should look like this:

```html
<a href="/movie?movieId=87849b25-febf-4086-9616-9a332c18afc8">
  <div class="movieBox">
    <img src="https://m.media-amazon.com/images/M/MV5BMjYzZTBhYjktZTRhOC00ZDBkLTg4Y2MtZmIwMGQwZTNiMmM1XkEyXkFqcGdeQXVyNjM0MTI4Mw@@._V1_FMjpg_UX1125_.jpg">
    <div>
      <p>Avatar</p>
    </div>
  </div>
</a>
```
--- 

# Cinema: Part 1.1, Show the movies to the user

- Make sure you create all 5 elements and append them in the right order
- Don't forget to add the right class name, link, movie title and image src  
- Call the `addMovieToDOM` function in the `onResponse` function for every movie in the list
- Save the response of the movies in a global variable 

[Solution - index.js](/cinema/part1.js)

---

# Cinema: Part 2, Get the movie in the detail page

- Get the movieId as a variable out of the search params of the link
- Have the object of the movie with that id as a variable in the `onResponse` function

[Solution - movie.js](/cinema/part2.js)

---

# Cinema: Part 3, Show the movie details

- Update the following elements with there corresponding content from the movie object:
  - image (poster)
  - movieTitle
  - movieRuntime
  - movieRoom (Make sure you add the text `Room: ` before the room number, do this in js)
  - moviePlot
  - movieWriter
  - movieDirector
  - movieActors (Make sure the the actors are separated by an `-`, Example: `Sam Worthington - Zoe Saldana - Sigourney Weaver - Stephen Lang`)

[Solution - movie.js](/cinema/part4.js)

---

# Cinema: Part 4, Show the genres and images of the movie

- Create for all the genres in the list a `p` element with the className: `movieGenreItem`
- Add all the elements to the `genreList` element
- Create a `src` element for all the images with the correct link
- Add the images to the `imagesList` element

[Solution - movie.js](/cinema/part4.js)

---


# Cinema: Part 5, Liking a movie

- Create a function: `setLikedIcon` this function gets the parameter `isLiked`
  - Based on this parameter the className of the `movieLikeIcon` will be updated
  - When `isLiked` is true the className should be `fa-solid fa-heart` else `fa-regular fa-heart`
- Create a function: `setIsMovieLikedForId` this function get the parameters `movieId` and `isLiked`
  - Save the liked state in localStorage by having a list of id's from the liked movies
  - This function should add or remove the `movieId` based on `isLiked`
- Create a function: `getMovieIsLikedForId` with parameter `movieId`
  - This functions returns a boolean based on if the `movieId` was in localStorage
- When the page loads in the correct functions should be called to show the icon in the correct state
- When the icon button is clicked the state should be updated using these functions

[Solution - movie.js](/cinema/part5.js)

---

# Cinema: Part 6, Add go back button

- When the back button is clicked, the browser should go to the previous page

[Solution - movie.js](/cinema/part6.js)

---

# Cinema: Part 7, Show liked icon in movie overview

- Copy the `getMovieIsLikedForId` from the `movie.js` to the `index.js` file
- Create a function: `getHeartIcon` with parameter movieId
- This function calls the `getMovieIsLikedForId` function to get the state
- It creates an `i` element with the className `fa-solid fa-heart` or `fa-regular fa-heart` based on the state from localStorage. Return this element form the function
- Call the `getHeartIcon` function in the `addMovieToDOM` function so the `i` element can be added to the DOM like this:
```html
<div class="movieBox">
  <img src="https://m.media-amazon.com/images/M/MV5BMjYzZTBhYjktZTRhOC00ZDBkLTg4Y2MtZmIwMGQwZTNiMmM1XkEyXkFqcGdeQXVyNjM0MTI4Mw@@._V1_FMjpg_UX1125_.jpg">
  <div>
    <p>Avatar</p>
    <i class="fa-regular fa-heart"></i>
  </div>
</div>
```

[Solution - index.js](/cinema/part7.js)

---

# Cinema: Part 8, Search for movies

- Save the search in put in a global variable
- When a user clicks on the search button:
  - The movies should be filtered based on if the title contains the search input
  - The search should not be case sensitive
  - The search input should be cleared
  - Only the filtered movies should be shown to the user

[Solution - index.js](/cinema/part8.js)

---

# Cinema: Part 9, Show today movies

- When a user clicks on the movies today button:
- Only the movies with the property `PlaysToday` true should be shown to the user

[Solution - index.js](/cinema/part9.js)

---

# Cinema: Part 10, Sort alphabetically

- When a user clicks on the sort alphabetically button:
- All the movies should be shown in alphabetic order based on there title

[Solution - index.js](/cinema/part10.js)

---

# Cinema: Part 11, Click like in overview

- Expand the `getHeartIcon` function
- The `i` element should be wrapped in a `button element`
- Add an event listener to the button
- When the button is clicked the className should change
- Update the state in localStorage with the `setIsMovieLikedForId` copied from `movie.js`


[Solution - index.js](/cinema/part11.js)

Tip - Use preventDefault to make sure the browser doesn't navigate to the detail page when you click the like icon

---

# Exercise: Dices

- Open the [start project](/dices/SetupDices.zip)
- Run `npm install` in the root of the project
- Run `npm run start` in the root of the project to spin up the server
- The html, css is already written for this project
- Complete the index.js file to make it a functioning app

---

# Overview of the app

- User can click a button to roll the dices and get a random number
- The history of all the rolls is saved and shown
- Users can be added to the game
- Every time someone rolls, the next player will be set as active player

---

# Dices: Part 1, Show random dices

- Create a function: `getRandomRoll`, that return a random number from 1 to 6
- Create a function: `rollDice`
- This function gets a random number for the 2 dices and calculates the total
- It shows these values on the screen in the corresponding boxes
- Call `rollDice` when the roll button is pressed

[Solution](/dices/part1.js)

---

# Dices: Part 2, History of the rolls

- Create a function: `addResult` with result as an input
- This function creates a `p` element with the result in it and adds it to the results list element
- Create a function: `saveResult` with result as an input
- This saves the result in localStorage
- All results in localStorage are divided by a comma. Make sure this also works when localStorage is empty
- Call these function after the `rollDice` function and pass the result along
- Create a function `loadSavedResults` that is called when the page is loaded
- This functions gets the array of results from localStorage and uses `addResult` to show them to the user

[Solution](/dices/part2.js)

---

# Dices: Part3, Add names

- Create a function: `getStoredNames`
- This function gets all the names from localStorage divided by a comma and returns it as an array
- When localStorage is empty it should return an empty array
- Create a function: `onAddName` that is called when the add button is clicked
- It reads the name from the input and clears the input
- Get the other names with the `getStoredNames` function
- Add the new name to the list and save it in localStorage
- Show the names of the players in the playersText element add `Players: ` before the names and show them separated with a comma
- Create a function `loadSavedNames` that is called when the page is loaded
- This function gets the names from localStorage and displays them to the user like described above
- When there are no names the text `Add players` should be shown instead

[Solution](/dices/part3.js)

---

# Dices: Part4, Show current player

- Create a function: `showNextPlayer`
- Get the index of the current player from local storage, when there is non use 0
- Increase the index, make sure it goes back to 0 at the end
- Save this new index in localStorage
- Show the name of the player corresponding to the index
- This function should be called when the roll button is pressed
- Expand the `loadSavedNames` function to set the current player as well

[Solution](/dices/part4.js)

---

# Dices: Part5, Reset 

- Create a function: `onReset` that is called when the reset button is clicked
- This function clears all text
- Clears localStorage
- Show the text `Add players`

[Solution](/dices/part5.js)

---

# Dices: Part6, Animate rolling 

- This is a difficult question, makes use of promises
- Create a function: `showRollingDice` that is called first when the roll button is clicked
  - This calls 50 times `rollDice` to create a rolling effect
  - Between every call the function has to wait 
  - The function wait the amount of ms that corresponds with how many times the function has been called
  - The first time it waits 1 ms, the last time 50 ms

---

- Tips:
  - Add `async` to the function to tell js it is an async function (do this for this function and the one that implements it)
  - Don't use `.then` you will find it when searching online for promises, but believe me don't use it here or you will hate your life
  - Put `await` before you call the function
  - use `setTimeout` to wait between the calls, combine this with a promise constructor to create a delay function

[Solution](/dices/part6.js)

