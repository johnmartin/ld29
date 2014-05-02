function createMap(){
  console.log("creating map");

  var cavernWidth = 50;
  var cavernHeight = 50;


  createCavernSkeleton
  createRawCavernNess


  // create the 'no obstacle' route. This is, hypothetically, where our hero will travel
  var forbiddenSpaces = createForbiddenSpaces(cavernWidth, cavernHeight)
  // create the skeleton - spaces where blocks are forbidden or mandatory
  var cavernSkeleton = createCavernSkeleton(cavernWidth, cavernHeight, forbiddenSpaces);
  // create a random cavern shape obeying the skeleton's requirements
  var rawCavernNess = createRawCavernNess(cavernWidth, cavernHeight, cavernSkeleton);

  // 4-entry (?) array given x and y co-ordinates of starting position and ending position
  var terminalPoints = createTerminalPoints(cavernWidth, cavernHeight, cavernSkeleton, forbiddenSpaces);
  forbiddenSpaces = updateForbiddenWithTerminals(cavernWidth, cavernHeight, forbiddenSpaces, terminalPoints);

  // distribute some batteries through the level
  var batteryLocations = createBatteryLocations(cavernWidth, cavernHeight, rawCavernNess);
  forbiddenSpaces = addForbiddenSpaces(cavernWidth, cavernHeight, forbiddenSpaces, batteryLocations);


  // distribute spikes randomly through the level
  var spikeLocations = createSpikeLocations(cavernWidth, cavernHeight, rawCavernNess, forbiddenSpaces);
  forbiddenSpaces = addForbiddenSpaces(cavernWidth, cavernHeight, forbiddenSpaces, spikeLocations);

  // console.log(spikeLocations);

  // distribute slime enemies randomly through the level
  var slimeLocations = createSlimeLocations(cavernWidth, cavernHeight, rawCavernNess, forbiddenSpaces);
  // create background wall spaces
  var backgroundArray = createBackgroundArray(cavernWidth, cavernHeight, rawCavernNess);
  // create an array of background tiles and solid blocks, with randomised textures
  var detailedCavernArray = createDetailedCavernArray(cavernWidth, cavernHeight, rawCavernNess, backgroundArray);
  // create an array of places for flowers etc.
  var decorationArray = createDecorationArray(cavernWidth, cavernHeight, detailedCavernArray);


  // Now turn all this array data into JSON data....
  var linearCavernData = lineariseArray(detailedCavernArray);
  var enemiesLayer = createEnemiesLayer(cavernWidth, cavernHeight,slimeLocations);
  var entitiesLayer = createEntitiesLayer(cavernWidth, cavernHeight, batteryLocations, spikeLocations);

  // // populate the cavern with entites and enemies 
  // var entitiesLayer = createEntitiesLayer(cavernWidth, cavernHeight, rawCavernNess);
  // var enemiesLayer = createEnemiesLayer(cavernWidth, cavernHeight, rawCavernNess);
  // // Turn those boring uniform blocks into varied blocks with grass on top
  // var detailedCavern = createDetailedCavern(cavernWidth, cavernHeight, rawCavernNess);
  // // add other bits of decoration to the cavern
  // var cavernData = createDecoratedCavern(cavernWidth, cavernHeight, detailedCavern);

  // // take the cavern data and turn it into a linear array for the JSON file
  // var linearCavernData = lineariseArray(cavernData);

  var jsonObject = { "height":cavernHeight,
   "layers":[
          {
           "data": linearCavernData,
           // [1, 2, 3, 1, 1, 3, 2, 2, 1, 1, 2, 2, 1, 1, 3, 3, 2, 2, 1, 2, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 2, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 3, 1, 1, 3, 1, 3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 1, 1, 0, 0, 2, 2, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 2, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 7, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 1, 6, 1, 2, 1, 2, 1, 3, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 6, 6, 6, 4, 6, 6, 3, 1, 1, 2, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 3, 3, 2, 1, 1, 2, 3, 3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 5, 5, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 2, 1, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 1, 1, 2, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 1, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 6, 3, 1, 2, 3, 1, 1, 1, 6, 5, 5, 6, 5, 5, 5, 5, 6, 6, 5, 6, 6, 5, 4, 6, 5, 5, 5, 5, 2, 3, 1, 1, 1, 2, 3, 1, 2],
           "height":cavernHeight,
           "name":"Tiles",
           "opacity":1,
           "type":"tilelayer",
           "visible":true,
           "width":cavernWidth,
           "x":0,
           "y":0
           },
        entitiesLayer,
        enemiesLayer
        ],
     "orientation":"orthogonal",
     "properties":
      {

      },
     "tileheight":32,
     "tilesets":[
          {
           "firstgid":1,
           "image":"tiles.png",
           "imageheight":128,
           "imagewidth":256,
           "margin":0,
           "name":"tiles",
           "properties":
              {

              },
           "spacing":0,
           "tileheight":32,
           "tilewidth":32
          }],
     "tilewidth":32,
    "version":1,
    "width":cavernWidth
  };
  // console.log(jsonObject);
  console.log("returning map");
  return jsonObject;
}



// // creates a json object containing all the fun stuff like spikes and bateries, 
// // based on cavern data
// function createEntitiesLayer(cavernWidth, cavernHeight, cavernArray){
//   // the JSON object where all the exciting stuff lives!
//    var entitiesLayer = 
//   {
//     "height":cavernHeight,
//     "name":"Entities",
//     "objects":[],
//     "opacity":1,
//     "type":"objectgroup",
//     "visible":true,
//     "width":cavernWidth,
//     "x":0,
//     "y":0
//    };
//   var num;
//   for (var i = 0; i < cavernHeight-1; i++){
//     for(var j = 0; j < cavernWidth; j++){
//       if (cavernArray[i][j] == 0){
//         num = getRandomInt (1,300);
//         if (num < 2){
//           var newBatteryObject = {
//             "gid":16,
//             "height":16,
//             "name":"",
//             "properties":
//             {

//             },
//             "type":"battery",
//             "visible":true,
//             "width":16,
//             "x":j*32,
//             "y":(i+1)*32
//           };
//           entitiesLayer.objects.push(newBatteryObject);
//         } else 
//         // 20% chance of creating a spike on a floor with 2 spaces above it
//         if (i > 1 && cavernArray[i][j] == 0 && cavernArray[i+1][j] != 0 && cavernArray[i-1][j] == 0 ){
//           //object is on floor!
//           num = getRandomInt(1,100);
//           if (num < 20){
//             var newSpikeObject = {
//               "gid":24,
//               "height":16,
//               "name":"",
//               "properties":
//               {
//               },
//               "type":"spike",
//               "visible":true,
//               "width":32,
//               "x":(j*32),
//               "y":((i+1)*32)
//             };
//             entitiesLayer.objects.push(newSpikeObject);
//           } 
//         }
//       } 
//     }
//   }
//   return entitiesLayer;
// }


// creates a json object containing all the fun stuff like spikes and bateries, 
// based on cavern data
function createEntitiesLayer(cavernWidth, cavernHeight, batteryLocations, spikeLocations){
  // the JSON object where all the exciting stuff lives!
   var entitiesLayer = 
  {
    "height":cavernHeight,
    "name":"Entities",
    "objects":[],
    "opacity":1,
    "type":"objectgroup",
    "visible":true,
    "width":cavernWidth,
    "x":0,
    "y":0
   };
   console.log(spikeLocations);
  for (var i = 0; i < cavernHeight-1; i++){
    for(var j = 0; j < cavernWidth; j++){
      if (batteryLocations[i][j] == 1){
        var newBatteryObject = {
          "gid":16,
          "height":16,
          "name":"",
          "properties":
          {

          },
          "type":"battery",
          "visible":true,
          "width":16,
          "x":j*32,
          "y":(i+1)*32
        };
        entitiesLayer.objects.push(newBatteryObject);
      } else if (spikeLocations[i][j] == 1){
        var newSpikeObject = {
          "gid":24,
          "height":16,
          "name":"",
          "properties": {},
          "type":"spike",
          "visible":true,
          "width":32,
          "x":(j*32),
          "y":((i+1)*32)
          };
        entitiesLayer.objects.push(newSpikeObject);
      } 
    }
  }
  console.log(entitiesLayer);
  return entitiesLayer;
}

// function createEnemiesLayer(cavernWidth, cavernHeight, cavernArray){
//   var enemiesLayer = {
//     "height":cavernHeight,
//     "name":"Enemies",
//     "objects":[],
//     "opacity":1,
//     "type":"objectgroup",
//     "visible":true,
//     "width":cavernWidth,
//     "x":0,
//     "y":0
//     }
//   var num;
//   for (var i = 0; i < cavernHeight-1; i++){
//     for(var j = 0; j < cavernWidth; j++){
//       if (cavernArray[i][j] == 0 && cavernArray[i+1][j] != 0){
//         num = getRandomInt(1,100);
//         if (num < 10){
//           var newSlimeObject = {
//             "gid":21,
//             "height":8,
//             "name":"",
//             "properties": {},
//             "type":"slime",
//             "visible":true,
//             "width":20,
//             "x":(j*32),
//             "y":(i*32 - 16)
//           };
//           enemiesLayer.objects.push(newSlimeObject);
//         }
//       }
//     }
//   }
//   return enemiesLayer;
// }

function createEnemiesLayer(cavernWidth, cavernHeight,slimeLocations){
  var enemiesLayer = {
    "height":cavernHeight,
    "name":"Enemies",
    "objects":[],
    "opacity":1,
    "type":"objectgroup",
    "visible":true,
    "width":cavernWidth,
    "x":0,
    "y":0
    };
  var num;
  for (var i = 0; i < cavernHeight-1; i++){
    for(var j = 0; j < cavernWidth; j++){
      if (slimeLocations[i][j] == 1){
        var newSlimeObject = {
          "gid":21,
          "height":8,
          "name":"",
          "properties": {},
          "type":"slime",
          "visible":true,
          "width":20,
          "x":(j*32),
          "y":(i*32 - 16)
        };
        enemiesLayer.objects.push(newSlimeObject);
      }
    }
  }
  return enemiesLayer;
}

// // create the main cavern data
// function createCavern(cavernWidth, cavernHeight){
//   // var cavernArray = new Array();
//   var initialArray = createDetailedCavern(cavernWidth, cavernHeight);
//   //   for (var i = 0; i < cavernHeight; i++){
//   //     for (var j = 0; j < cavernWidth; j++){
//   //       cavernArray[i*cavernWidth + j] = initialArray[i][j];
//   //     }
//   //   }
//   // return cavernArray;
//   return lineariseArray(initialArray);
// }

// turns an array of arrays into a single linear array;
function lineariseArray(initialArray){
  var count= 0;
  var linearArray = new Array();
  for (var i = 0; i < initialArray.length; i++){
    for (var j = 0; j < initialArray[i].length; j++){
      linearArray[count] = initialArray[i][j];
      count++;
    }
  }
  return linearArray;
}


// function createDecoratedCavern(cavernWidth, cavernHeight, initialArray){
//   var val;
//   var vali;
//   var num;
//   var cavernArray = new Array();
//   for (var i = 0; i < cavernHeight; i++){
//     cavernArray[i]=new Array();
//     for (var j = 0; j < cavernWidth; j++){
//       val = initialArray[i][j];
//       if (i == cavernHeight-1){
//         cavernArray[i][j] = val;    
//       } else {
//         vali = initialArray[i+1][j];
//         if (val==0 && vali != 0){
//           num = getRandomInt(1,100);
//           if (num < 40){
//             num = getRandomInt(25,32);
//             cavernArray[i][j] = num;
//           } else {
//             cavernArray[i][j] = val;
//           }
//         } else {
//         cavernArray[i][j] = val;
//         }
//       }
//     }
//   }
//   // return initialArray;
//   return cavernArray;
// }

function createDecorationArray(cavernWidth, cavernHeight, detailedCavernArray){
  var cavernArray = new Array();
  for (var i = 0; i < cavernHeight; i++){
     cavernArray[i] = new Array();
    for (var j = 0; j < cavernWidth; j++){
      cavernArray[i][j] = 0;
    }
  }
  // return initialArray;
  return cavernArray;
}


// create a cavern with randomised tiles and grass on top
function createDetailedCavernArray(cavernWidth, cavernHeight, rawCavernNess, backgroundArray){
  var cavernArray = new Array();
  // var initialArray = createRawCavernNess(cavernWidth, cavernHeight);
  for (var i = 0; i < cavernHeight; i++){
    cavernArray[i]=new Array();
    for (var j = 0; j < cavernWidth; j++){
      if (i >0 &&  rawCavernNess[i][j] != 0 && rawCavernNess[i-1][j] == 0){
        cavernArray[i][j] =  getRandomInt(5,8);
      } else if (rawCavernNess[i][j] != 0){
         cavernArray[i][j] =  getRandomInt(1,4);
      } else if (backgroundArray[i][j] != 0){
         cavernArray[i][j] = getRandomInt(17,20);
      } else {
         cavernArray[i][j] = 0;
      }
    }
  }
  return cavernArray;
}


function createBackgroundArray(cavernWidth, cavernHeight, rawCavernNess){
  var spanDist = 5;
  var backgroundArray = new Array();
  for (var i = 0; i < cavernHeight; i++){
    backgroundArray[i]=new Array();
    for (var j = 0; j < cavernWidth; j++){
      if (rawCavernNess[i][j] != 0){
        backgroundArray[i][j] = 0;
      } else if (i < spanDist || i > cavernHeight-spanDist || j < spanDist || j > cavernWidth - spanDist ){
        backgroundArray[i][j] = 1;
      } else if ((rawCavernNess[i-1][j] != 0 && rawCavernNess[i+1][j] != 0)  ||  (rawCavernNess[i][j-1] != 0 && rawCavernNess[i][j+1] != 0)) {
        backgroundArray[i][j] = 1;
      } else {
        backgroundArray[i][j] = 0;
      }
    }
  }
  return backgroundArray;
}

function createSlimeLocations(cavernWidth, cavernHeight, rawCavernNess, forbiddenSpaces){
  var num; 
  var slimeLocations= new Array();
  for (var i = 0; i < cavernHeight; i++){
    slimeLocations[i]=new Array();
    for (var j = 0; j < cavernWidth; j++){
      if (rawCavernNess[i][j] != 0){
        slimeLocations[i][j] = 0;
        // chance of being a slime if it's a space above ground 
      } else if (i < cavernHeight - 1 && rawCavernNess[i+1][j] != 0){
        num = getRandomInt (1,100);
        if (num < 10){
          slimeLocations[i][j] = 1;
        } else {
          slimeLocations[i][j] = 0;
        }
      }
    }
  }
  return slimeLocations;
}

function createSpikeLocations(cavernWidth, cavernHeight, rawCavernNess, forbiddenSpaces){
  var num; 
  var spikeLocations= new Array();
  console.log(rawCavernNess);
  console.log(forbiddenSpaces);
  for (var i = 0; i < cavernHeight; i++){
    spikeLocations[i]=new Array();
    for (var j = 0; j < cavernWidth; j++){
      if (rawCavernNess[i][j] == 1 || forbiddenSpaces == -1){
        spikeLocations[i][j] = 0;
        // chance of being a spike if it's a space above ground and below another space
      } else if (i > 1 && i< cavernHeight - 1 && rawCavernNess[i+1][j] == 1 && rawCavernNess[i-1][j] == 0){
        num = getRandomInt (1,100);
        if (num < 20){
         spikeLocations[i][j] = 1;
        } else {
         spikeLocations[i][j] = 0;
        } 
      } else {
          spikeLocations[i][j] = 0;
      }
    }
  }
  return spikeLocations;
}

function createBatteryLocations(cavernWidth, cavernHeight, rawCavernNess){
  var num;
  var batteryLocations= new Array();
  for (var i = 0; i < cavernHeight; i++){
    batteryLocations[i]=new Array();
    for (var j = 0; j < cavernWidth; j++){
      if (rawCavernNess[i][j] != 0){
        batteryLocations[i][j] = 0;
      } else {
        num = getRandomInt (1,300);
        if (num < 2){
          batteryLocations[i][j] = 1;
        } else {
          batteryLocations[i][j] = 0;
        }
      }
    }
  }
  return batteryLocations;
}

// Update forbidden spaces array based on a new bject array: add a -1 if the new object has a +1 in it, basically.
function addForbiddenSpaces(cavernWidth, cavernHeight, forbiddenSpaces, newObjectLocations){
  var newArray = new Array();
  for (var i = 0; i < cavernHeight; i++){
    newArray[i]=new Array();
    for (var j = 0; j < cavernWidth; j++){
      // set to -1 if there's a new object there and forbiddenSpaces doesn't say there should be a block
      if (forbiddenSpaces[i][j] < 1 && newObjectLocations[i][j] > 0){
        newArray[i][j] = -1;
      } else {
        newArray[i][j] = forbiddenSpaces[i][j];
      }
    }
  }
  return newArray;
}





// This is a bit of a kludge, but: returns a 2t-length array. First 2 entries are the y and x co-ordinate of the start point.
// other pairs are y-x co-ordinates for exits.
function createTerminalPoints(cavernWidth, cavernHeight, cavernSkeleton, forbiddenSpaces){
  var terminalPoints = new Array();
  terminalPoints[0] = 15;
  terminalPoints[1] = 15;
  terminalPoints[2] = cavernHeight - 15; 
  terminalPoints[3] = cavernWidth - 15;
}

function updateForbiddenWithTerminals(cavernWidth, cavernHeight, forbiddenSpaces, terminalPoints){
  return forbiddenSpaces;
}


// create the undetailed cavern shape: 1 for rock, 0 for not rock.
// this function and cellularAutomation are based on http://www.roguebasin.com/index.php?title=Cellular_Automata_Method_for_Generating_Random_Cave-Like_Levels
function createRawCavernNess(cavernWidth, cavernHeight, cavernSkeleton){
  var cavernArray = new Array();
  for (var i = 0; i < cavernHeight; i++){
    cavernArray[i]=new Array();
    for (var j = 0; j < cavernWidth; j++){
      cavernArray[i][j] = 0;
    }
  }
  var random;
  // var cavernSkeleton = createCavernSkeleton(cavernWidth, cavernHeight);
  for (var i = 0; i < cavernHeight; i++){
    for (var j = 0; j < cavernWidth; j++){
      if(cavernSkeleton[i][j] ==1){
        cavernArray[i][j] = 1;
      } else if (cavernSkeleton[i][j] == -1){
        cavernArray[i][j] = 0;
      } else {
        random = getRandomInt(1,20);
        // 45% chance of rockage
        if(random < 10){
          cavernArray[i][j] = 1;
        } else {
          cavernArray[i][j] = 0;
        }
      }
    }
  }

  return cellularAutomation(cavernWidth, cavernHeight, cavernArray, cavernSkeleton, 5);
}

// Do a cellular automation step - given a weighted array and a skeleton, create an array with 1 if the weight is at least 5 and 0 otherwise
// (unless the skeleton says otherwise). Then either return that, or update the weighted array and do another iteration.
// This function and createRawCavernNess are based on http://www.roguebasin.com/index.php?title=Cellular_Automata_Method_for_Generating_Random_Cave-Like_Levels
function cellularAutomation(cavernWidth, cavernHeight, cavernArray, cavernSkeleton, iterations){
  if (iterations <= 0){
    return cavernArray;
  } else {
    var weightedArray = new Array();
    var otherWeightedArray = new Array();
    weightedArray = new Array();
    for (var i = 0; i < cavernHeight; i++){
      weightedArray[i]=new Array();
      for (var j = 0; j < cavernWidth; j++){
        weightedArray[i][j] = 0;
      }
    }
    otherWeightedArray = new Array();
    for (var i = 0; i < cavernHeight; i++){
      otherWeightedArray[i]=new Array();
      for (var j = 0; j < cavernWidth; j++){
        otherWeightedArray[i][j] = 0;
      }
    }
    // the good news about having that big border in cavernSkeleton is that we don't have to check edge cases, we can just start from
    // one layer in. TODO: remember this for the future when you start letting caves go off the edge of the map and the level generation
    // gets all weird.
    for (var i = 1; i < cavernHeight-1; i++){
      for (var j = 1; j < cavernWidth-1; j++){
        weightedArray[i][j] = cavernArray[i-1][j-1] + cavernArray[i-1][j] + cavernArray[i-1][j+1] + cavernArray[i][j-1] + cavernArray[i][j] + cavernArray[i][j+1] + cavernArray[i+1][j-1] + cavernArray[i+1][j] + cavernArray[i+1][j+1];
      }
    }
    for (var i = 2; i < cavernHeight-2; i++){
      otherWeightedArray[i] = new Array();
      for (var j = 2; j < cavernWidth-2; j++){
        otherWeightedArray[i][j] = cavernArray[i-2][j-2] + cavernArray[i-2][j-1] +cavernArray[i-2][j] +cavernArray[i-2][j+1] +cavernArray[i-2][j+2] +
        cavernArray[i-1][j-2] + cavernArray[i-1][j-1] + cavernArray[i-1][j] + cavernArray[i-1][j+1] + cavernArray[i-1][j+2] +
        cavernArray[i][j-2] + cavernArray[i][j-1] + cavernArray[i][j] + cavernArray[i][j+1] + cavernArray[i][j+2] +
        cavernArray[i+1][j-2] + cavernArray[i+1][j-1] + cavernArray[i+1][j] + cavernArray[i+1][j+1] + cavernArray[i+1][j+2] + 
        cavernArray[i+2][j-2] + cavernArray[i+2][j-1] + cavernArray[i+2][j] + cavernArray[i+2][j+1] + cavernArray[i+2][j+2];
      }
    }

    //now update cavernArray so that cells are set to 1 if their weighting is at least 5  or the other weighting is 0;
    // set them to 0 otherwise (unless they're in the skeleton)
    for (var i = 0; i < cavernHeight; i++){
     for (var j = 0; j < cavernWidth; j++){
       if(cavernSkeleton[i][j] ==1){
         cavernArray[i][j] = 1;
        } else if (cavernSkeleton[i][j] == -1){
          cavernArray[i][j] = 0;
        } else {
          // update based on weightedArray and otherWeightedArray
          if(weightedArray[i][j] < 5 && otherWeightedArray[i][j] > 0){
            cavernArray[i][j] = 0;
          } else {
            cavernArray[i][j] = 1;
          }
        }
      }
    } 
    iterations--;
    return cellularAutomation(cavernWidth, cavernHeight, cavernArray, cavernSkeleton, iterations);
  }
}

// returns an array giving the parts of the cavern that are definitely going to be rock (1) or space (-1).
// These parts will never change during the celular automota phase.
function createCavernSkeleton(cavernWidth, cavernHeight, forbiddenSpaces){  
  // intialise array
  var cavernArray = new Array();
  for (var i = 0; i < cavernHeight; i++){
    cavernArray[i]=new Array();
    for (var j = 0; j < cavernWidth; j++){
      cavernArray[i][j] = 0;
    }
  }
  //create a border of rock 10 blocks thick round the edge;
  for (var i = 0; i < cavernHeight; i++){
    for (var j = 0; j < 10; j++){
      cavernArray[i][j] = 1;
    }
    for (var j = cavernWidth-10; j < cavernWidth; j++){
      cavernArray[i][j] = 1;
    }
  }
  for (var i = 0; i < 10; i++){
    for (var j = 0; j < cavernWidth; j++){
      cavernArray[i][j] = 1;
    }
  }
  for (var i = cavernHeight-10; i < cavernHeight; i++){
    for (var j = 0; j < cavernWidth; j++){
      cavernArray[i][j] = 1;
    }
  }
  // draw some extra barriers so it's not just a big cave
  for (var j = 0; j < cavernWidth - 20; j++){
    cavernArray[20][j] = 1;
  }
  for (var j = 20; j < cavernWidth; j++){
    cavernArray[30][j] = 1;
  }


  // now draw a wigglly route corresponding that will have to stay clear
  for (var j = 15; j < cavernWidth - 15; j++){
    cavernArray[15][j] = -1;
  }
  for (var j = 15; j < cavernWidth-15; j++){
    cavernArray[25][j] = -1;
  }
  for (var j = 15; j < cavernWidth; j++){
    cavernArray[35][j] = -1;
  }
  for (var i = 0; i < 15; i++){
    cavernArray[i][15] = -1;
  }
  for (var i = 15; i < 25; i++){
    cavernArray[i][cavernWidth-15] = -1;
  }
  for (var i = 25; i < 35; i++){
    cavernArray[i][15] = -1;
  }


  // Also update based on the forbiddenSpaces array (just to see if you're listening)
  for (var i = 0; i < cavernHeight; i++){
    for (var j = 0; j < cavernWidth; j++){
      if (forbiddenSpaces[i][j] == 1){
        cavernArray[i][j] = 1;
      } else if (forbiddenSpaces[i][j] == -1){
        cavernArray[i][j] = -1;
      }
    }
  }

  //That's it!
  return cavernArray;
}



function createForbiddenSpaces(cavernWidth, cavernHeight){
  var forbiddenSpaces= new Array();
  for (var i = 0; i < cavernHeight; i++){
    forbiddenSpaces[i]=new Array();
    for (var j = 0; j < cavernWidth; j++){
      forbiddenSpaces[i][j] = 0;
    }
  }
  return forbiddenSpaces;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
