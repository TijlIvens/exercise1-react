---
theme: seriph

background: https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2

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

# Dynamic webapps

## A guide to React

<p class="color-stone-400">Exercises</p>

---

# Exercise: Progrming languages overview

- Create a new react project:  
 `npx create-react-app programming-languages --template typescript`

- Install MUI: [Guide](https://mui.com/material-ui/getting-started/installation/)

- Cleanup the project so you have an empty App component to start in

---

# End result

![End result](/exercise1/screenshot.png)
---

# Add the mock data

- Add [this mock data](/exercise1/data.js) to your project in a data.ts file
- Assign it to the variable `PROGRAMMING_DATA` and export that variable
- Create a type for that variable that you also export

---


# Implement the components

- Create a Programms component that get items as a prop. This is a list of the type defined in the previous step
- Programms maps over the items and displays a ProgramItem component for each item
- The ProgramItem show a single item of data. Make sure it is styles as show in the picture
- The name should be in black if it is a programming language or in Red if it's not


---

# Result

- [Solution](/exercise1/solution.zip)

--- 

# Exercise: Store front

- Create a new react project:  
 `npx create-react-app shop_front_exercise --template typescript`

- Install MUI: [Guide](https://mui.com/material-ui/getting-started/installation/)

- Install react-router-dom

- Cleanup the project so you have an empty App component to start in

--- 

# Live demo

- You can view a live working demo [here](https://store-exercise-react.tijlivens.be/)

---

# Add mock data

- Create a file constants.ts that will contain all the mock data for this store
- [This is the given mock data](/exercise2/data.js)
- Make sure all data in here is typed

---

# Add router

- Add a router to the project with the following routes: 
  - ` ` : Home
  - `products` : Products
  - `inspiration` : Inspiration
  - `about` : About
  - `shopping-cart` : ShoppingCart
  - `product/:id` : Product

- Creat a component for every page
- The last page gets the id as part of the url, the :id is an indicator where the parameter is in the url
- With this hook you can get the variable in the component `const { id: productId } = useParams();`

--- 

# Add page wrapper

- Create a component that wraps around all the routes and adds a navigation banner to the top of the page
- The banner should have navigation buttons to the different pages in the store like in the example
- You can wrap the button with a link component to easily route without calling the navigate function: [docs](https://reactrouter.com/en/main/components/link)
- Also add a shopping Icon that navigates to the shopping basket.
- It shows the amount of unique products that are in the basket. (This only gets update when you refresh the page, feel free to explore providers for a solution that would update it life)


---

# Home page

- Implement the home page as in the example
- Use the mock data to show the pictures

---

# Producst page

- Show all the Products on a gird with a Card view
- The Details button will navigate the user to the product page of that specific product, using the productId
- Add a search input that will search the titles of the products. Make it not case sensitive
- Add a Category filter. Its a list of buttons from the mock data
- Clicking on a button will set that categry active. Clicking the active one again will show all products

---

# Product detail page

- Get the specific product id from the url using: `const { id: productId } = useParams();`
- Show the details of the product in a card
- The add to cart button will save the id of that product with an amount in localStorage. All the items in the cart are stored as a JSON string
- The button will show in a Badge the amount of that product in the basket
- Every time the button is pressed the amount is increased

---

# Cart page

- Show the details of all products that are in the cart
- Add - and + buttons to change the amount of each product in the cart

---

# Remaining pages

- The remaining pages are free to fill in as you like. You can create new mock data to show here

---

# Result

- [Solution](/exercise2/solution.zip)