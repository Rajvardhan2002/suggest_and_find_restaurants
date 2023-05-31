const path = require('path');

const fs = require('fs');

const filePath = path.join(__dirname, '..', "data", "restaurants.json");

function getStoredRestaurants (){

const fileExistingData = fs.readFileSync(filePath);
const storedRestaurants = JSON.parse(fileExistingData);

  return storedRestaurants;
}

function writeFileData(restaurantsObject){
    fs.writeFileSync(filePath, JSON.stringify(restaurantsObject));
}

module.exports = {
    keytogetStoredRes  : getStoredRestaurants,
    keytoWriteData : writeFileData
};

///NOw these keynames acts as methods for the object that we have named while exporting our files.