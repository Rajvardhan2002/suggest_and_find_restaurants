const express = require("express");
const uuid = require("uuid");

const writeFileDataObject = require("../utility/restaurant-path"); // here writeFileDataObject is an object with two methods that we have made available.

const router = express.Router();

router.get("/restaurants", function (req, res) {

  //Here we added another parameter as object to set variable that we defined with the help of ejs in lecture 362
  let order  = req.query.order;
  let nextOrder = 'desc';

  if(order !=='asc' && order!=='desc')
  {
    order='asc';
  }
  if(order === 'desc')
  {
    nextOrder = 'asc';
  }

  const storedRestaurants = writeFileDataObject.keytogetStoredRes(); //object.keyname

  storedRestaurants.sort(function (resA, resB) {
    if( (order==='asc' && resA.name > resB.name) || (order === 'desc' && resB.name>resA.name)){
      return 1;
    }

    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    storedrestaurants: storedRestaurants,
    nextOrder : nextOrder
  }); //without ejs as extension
  //storedrestaurants: storedRestaurants => is the variable that stores our array which we created to store the details of our restaurant
  //storedrestaurants is the name of the variable that we used inside our HTML file to create a loop and now to execute that loop we need to define that here.
});
//defining dyamic routes.
router.get("/restaurants/:letSayId", function (req, res) {
  const restaurantId = req.params.letSayId; //extracting id from entered url
  const storedRestaurants = writeFileDataObject.keytogetStoredRes();
  for (const restaurantWeNeedToFind of storedRestaurants) {
    if (restaurantWeNeedToFind.id === restaurantId) {
      return res.render("restaurant-detail", {
        restaurantInRes_DetailPage: restaurantWeNeedToFind,
      });
    }
  }
  res.render("404");
});

router.get("/recommended", function (req, res) {
  res.render("recommend");
});

router.post("/recommended", function (req, res) {
  const restaurants = req.body;
  restaurants.id = uuid.v4();
  const storedRestaurants = writeFileDataObject.keytogetStoredRes();
  storedRestaurants.push(restaurants);
  writeFileDataObject.keytoWriteData(storedRestaurants);
  res.redirect("/confirm"); //we want to avoid that warning thing in the page that's why we redirecct them to another HTML file using redirect()
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
