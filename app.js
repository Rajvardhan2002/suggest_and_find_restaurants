/**
 * Whenever we need to use absolute path we use path.join();
 * in case of relative path we use strings. //"/pathname"
358//serving HTML files

1.we have a fxn namely sendFile(filepath) that sends the file for us.
2.Plus we need to change the href in the anchor tags of our HTML files to so that we can handle them with node.  


359
//serving static files
1.We need to handle requests for each static files that's why we have a built in package by express that handles all of these else it would be 
cumbersome and annoying if we need to write code for each file.

2.we gonna look for each req by using app.use and then maybe use express.static fxn to handle them.

3.app.use(express.static{'public'}) . //Here we are telling express that if there's any incoming request for any satic files that can be found 
here in this public folder, then the request will be forwarded to other routes.

360
//handling and parsing form submissions
1.res.redirect("/url")
2.acton attribute in the form is used to define the path where the data will be submitted when the submit button is clicked.
Actually we have defined a relative post route for /recommended that's why when the submit button is clicked then the code gets executed 
and at last we are redirected to confirm page.
3./recommended doesn't mean recommended.html or recommended.ejs. It's just a route. It can be anything.



361
//using EJS to generate dynamic HTMl files.
1.We use engines to handle our dynamic HTML files.
2.To do so we need to app.set an engine. THis can be done by using set() fxn which expects two parameters = "view engine","external engine name".
3.Thus in our case parameters will be "view engine" , "ejs";
4.Before step 3 we need to set one more thing, which file express should look for and its absolute path.
5.Now, we need to change the HTML files into templates .THis can be done by changing the extension from HTML to ejs and then the calling routes.
6.EJS is nothing rather than simple HTML templates that parses code on server side and then send it to browser.
7.Now, we need to change the routes plus the sendFile fxn because the sendFile fxn cannot send template files. For that we have render fxn.



362
//Sending dynamic HTML 
1.We use ejs synatx to define variables that we will change later using JS objects.
<%= variableName %> //ejS way of defining variables.

363
//Outputting repeated contents with the help of EJS
1.We need to run loop. Now we can also write JS loops inside the EJS files and can have access to the properties using dot operators and the
keys from restaurants.json file.

364
//Outputting conditional contents dynamically


365
//Including partial content
1.We as a developer always use some amount of same content in every page and it will really become cumbersome and annoying if we need to change 
that content everywhere such as link.
2. We have <%- %> another ejs synatx that we use when we want to render some HTML file
3. = with ejs treats content as a raw text but -  escapes that criteria and it actually injects HTML files in the places whenever used.
4.We can also pass on objects like we did with fxns in app.js
5.e.g.= for(const restaurantxyz of restaurants)
{
  //in case we use splitted ejs files
  include('path', *************now we need to define the keyword that we use in our splitted ejs file . Let's say we use restaurantsabc.name 
  then our keyword will look something like restaurantabc = restaurantxyz**********)
}

 */

/*************************************************************************************
 * ***********************************************************************************
 * ***********************************************************************************
 * **********************************************************************************
 * **********************************************************************************

// const express = require("express");

// const path = require("path");

// const fs = require("fs");

// const app = express();

// app.set("views", path.join(__dirname, "views")); //First parameter i.e. views is not the name of folder. IT is a keyword understood by express.
// app.set("view engine", "ejs"); //tells compiler which engine we are using to serve out dynamic HMTL files by using "view engine" keyword

// app.use(express.static("public")); //expects file name as a parameter that have all the static files

// app.use(express.urlencoded({ extended: false }));

// app.get("/restaurants", function (req, res) {
//   //Here we added another parameter as object to set variable that we defined with the help of ejs in lecture 362
//   const filePath = path.join(__dirname, "data", "restaurants.json");
//   const fileExistingData = fs.readFileSync(filePath);
//   const storedRestaurants = JSON.parse(fileExistingData);
//   res.render("restaurants", {
//     numberOfRestaurants: storedRestaurants.length,
//     storedrestaurants: storedRestaurants,
//   }); //without ejs as extension
//   //storedrestaurants: storedRestaurants => is the variable that stores our array which we created to store the details of our restaurant
//   //storedrestaurants is the name of the variable that we used inside our HTML file to create a loop and now to execute that loop we need to define that here.
// });

// app.get("/recommended", function (req, res) {
//   res.render("recommend");
// });

// app.post("/recommended", function (req, res) {
//   const restaurants = req.body;
//   const filePath = path.join(__dirname, "data", "restaurants.json");
//   const fileExistingData = fs.readFileSync(filePath);
//   const storedRestaurants = JSON.parse(fileExistingData);
//   storedRestaurants.push(restaurants);
//   fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
//  res.redirect("/confirm"); //we want to avoid that warning thing in the page that's why we redirecct them to another HTML file using redirect()
// });

// app.get("/", function (req, res) {
//   res.render("index");
// });

// app.get("/confirm", function (req, res) {
//   res.render("confirm");
// });

// app.get("/about", function (req, res) {
//   res.render("about");
// });

// app.listen(3000);

*************************************************************************************
 * ***********************************************************************************
 * ***********************************************************************************
 * **********************************************************************************
 * **********************************************************************************
 * /





/*
1.create basic express like deriving, convert to jsobject, listen to server.
set first get for "/".
Move all HTML files in views name folder.
set other get request for each HTMl files.
Each get request will send HTMl files with the help of sendFile fxn.
Change the anchor tags at all points in the HTMl file. E.G. restaurants.html changes to /restaurants.
NOw we want to serve out our CSS and JS files. To do so we will agin use app.use() and pass on express.static to handle all static files
express.static expects folder name that contains all the static files i.e. public folder in our case
app.use(express.static(public));

2.Now, we need to handle the form submmission.
Now we will define post requests for our /recommended and also app.use(express.urlencoded({extended:false})) to convert raw text to JS objects.
Next step will be to create a new folder namingly data where we will store our submitted data.
INside that we will have a restaurants.json file with [] as we did previously.
Now inside that post request we will have a js object let's say restaurants that will store all the properties entered by users.
const restaurants = req.body //it will give us all the properties at once that have a name associated with it in HTML file
Again Same path,readFileSync,parse,push,writeFileSync(path,JSON.stringify(fileData))
At last we will redirect to our users to avoid the warning thing by using res.redirect(/confirm) //bc we will direct users to confirm page.
and define action="htmlfilename for which post request was defined" and methid="POST" in the <form>.

***********************************
In a nutshell, we are actually needed to define a route to handle our form submission. In our case we have chosen something /recommenmded and 
thus we have defined a post request for the same and at last of the post request we have redirected our users to /confirm

***********************************
3.Now we need to set templating engine.
To do so, first we will set app.set('views',path.join()); and then app.set('view engine' 'ejs') after const app = express();
change file extensions to .ejs
Now, we have already set path and template engine. Thus, what we gonna do is erase path codes and res.sendFile() with res.render("index");only without using extensions

4.After setting templating engine we will generate dynamic content for /restaurants route
To do so, we set a variable of ejs format <%= varName %> in our HTML file and then pass of the value of this varName during handling our route.
{
    numberOfRestaurants: storedRestaurants.length,
}
After this we write a loop program in our HTML file to continuously send saved restaurants.
<% for(const dynamicrestaurants of restaurants){  %>
  replace name with dynamicrestaurants.name 
  and so on..........

<% } %>
Also we will pass it's value during handling the route.
restaurants : storedRestaurants

*/

//MODULE-20

/*
369
//DYNAMIC ROUTES
1.We need to define dyanmic routes for handling dynamic data. E.g. every shoping item on amazon loads to a different web page depending upon 
the product id of the item. That localhost:3000/restaurants/something is called as dynamic route.
2.We have a method in node to handle such dynamic routes. /restuarants/:anyname. This is the route for used to define dynamic route after /restaurants.
3.req.params.placeholderNameThatWeUsedDuringDefiningRoute is used to extract that placeholder.
4.Then we have added placeholder to show method is correct. Hence we need to pass the value of placeholder during route handling.
5.And we need to change the path in our recommended page such that it leads to that dynamic route '/restaurants/r1'.//here we have hardcoded r1 bcz 
currently we don't have any id in our json file.
6.styles page wasn't loaded bcz we had defined relative paths there. we need to convert it to absolute path.



app.get("/restaurants/:letSayId",function(req,res){
  const restaurantId = req.params.letSayId;
  res.render("restaurant-detail",{ placeholder : restaurantId});
}) 


370
//MANAGING DATA WITH UNIQUE ID
1.To generate unique id we have a third party package called as uuid that generates unique id for us.
2.Now during our post req handling we will now externally inject ids. //restaurants.id = uuid.v4();
3.Now, we will remove our hardcoded placeholder from restaurant-item.ejs and use ejs to inject ids.

371
//Loading and displaying detail-data
1.WE just need a resturant object to send detail to our restaurant-detail page.
2.To do so, we defined the path to our restaurant.json file and then we ran a loop and defined the if conditions and then return res.render and the
neccessary placeholder using ejs.

 const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileExistingData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileExistingData);
  for(const restaurantWeNeedToFind of storedRestaurants)
  {
    if(restaurantWeNeedToFind.id===restaurantId)
    {
      return res.render("restaurant-detail",{ restaurantInRes_DetailPage : restaurantWeNeedToFind});
    }
  }

372
//SEnding a dedicated 404 file for users end error
1. Create a 404.ejs page.
2.res.render that.

373
//Sending 404 error page for typo errors
1.We define this at the bottom of the page so that if ain't of file is send, 404 page will be sent and also we use app.use to handle all incoming
requests because we can't handle all of the typos and thus we need to look for all the incoming requesta.

app.use(function(req,res){
  res.render('404');
});


374
//SEnding a dedicated 500 file for server end error
1. Create a 500.ejs page.
2.res.render that but there is a catch.
3.***************Now we need to send four parameters to our handler function******************

app.use(function(error,req,res,next){
  res.render('500');
});

375 + 376
//Refracting codes into different js files
1. To make code more easier to handle, it is advisable to break codes into smaller sections.
2. Then, we also need to import external packages that we are using in that file.
3. At last we need to tell our file which functions we have made available to other files.
4. To do so, we have module.exports{
  keyname : pointer to the funnctions we wanna expose.
  key01 : fxn01,
  key02:fxn02
}  in that same file.
6. Also, __dirname corresponds to same folder in which the file is present. Therefore, if we need to go one level up, we use '..' aftere __dirname.
7.At last we will import our files in the app.js. To define relative path we have to do it by starting with '.'//(./folder/folder..................)


377
//Refracting routes
1. WE can't covert express more than once. So we will only do so in the app.js file not in our routes file.
2. We have routes object offered by object that has almost same fxn but have internally different in-built. 
3.We define app.use("/",defaultRoutes) on the top because whenever any request is incoming it will be handled by these use case and will be send
back to default.js for filtering. If we don't find any case to handle that we will check in app.js.


379
//QUERY PARAMETERS
1. TO sort out in JS we have a sort method that sorts depending on whether 1 or -1 is returned.
2.It asks for two values as parameter and then compares and then sort them.
2. We can access query values by using req.query.nameofproperty and then store it.

 */

const express = require("express");
const path = require("path");

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");
const app = express();

app.set("views", path.join(__dirname, "views")); //First parameter i.e. views is not the name of folder. IT is a keyword understood by express.
app.set("view engine", "ejs"); //tells compiler wh  ich engine we are using to serve out dynamic HMTL files by using "view engine" keyword

app.use(express.static("public")); //expects file name as a parameter that have all the static files

app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
