function createMap(){
	console.log("creating map");

  var testSpikeObject = {
    "gid":1,
    "height":16,
    "name":"",
    "properties":
      {
      },
    "type":"spike",
    "visible":true,
    "width":32,
    "x":736,
    "y":512
    };

  var cavernData = createCavern(50,50);
  console.log(cavernData);

	var jsonObject = { "height":50,
	 "layers":[
  	      {
    	     "data": cavernData,
           // [1, 2, 3, 1, 1, 3, 2, 2, 1, 1, 2, 2, 1, 1, 3, 3, 2, 2, 1, 2, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 2, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 3, 1, 1, 3, 1, 3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 1, 1, 0, 0, 2, 2, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 2, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 7, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 1, 6, 1, 2, 1, 2, 1, 3, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 6, 6, 6, 4, 6, 6, 3, 1, 1, 2, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 3, 3, 2, 1, 1, 2, 3, 3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 5, 5, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 2, 1, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 1, 1, 2, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 1, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 6, 3, 1, 2, 3, 1, 1, 1, 6, 5, 5, 6, 5, 5, 5, 5, 6, 6, 5, 6, 6, 5, 4, 6, 5, 5, 5, 5, 2, 3, 1, 1, 1, 2, 3, 1, 2],
      	   "height":50,
        	 "name":"Tiles",
        	 "opacity":1,
        	 "type":"tilelayer",
        	 "visible":true,
        	 "width":50,
        	 "x":0,
        	 "y":0
   	     }, 
   	     {
   	      "height":30,
   	      "name":"Objects",
   		      "objects":[
                {
   	              "gid":1,
   	              "height":16,
   	              "name":"",
   	              "properties":
   	                 {

                    }	,
  	               "typ	e":"spike",
 	                "versionible":true,
    	             "width"	:32,
    	             "x":544	,
    	             "y":640	
    	            }, 
    	            {
    	             "gid":1,
    	             "height":16,
    	             "name":"",
    	             "properties":
    	                {

	                    },
	                 "type":"spike",
	                 "visible":true,
	                 "width":32,
	                 "x":576,
	                 "y":640
  	              }, 
    	            {
    	             "gid":1,
    	             "height":16,
    	             "name":"",
      	           "properties":
      	              {

      	              },
      	           "type":"spike",
      	           "visible":true,
      	           "width":32,
      	           "x":640,
      	           "y":608
      	          },
                  testSpikeObject,
      	          {
      	           "gid":2,
      	           "height":16,
      	           "name":"",
      	           "properties":
        	            {

       	             },
       	          "type":"battery",
        	         "visible":true,
        	         "width":16,
          	       "x":328,
         	        "y":672
         	       }],
         	"opacity":1,
   	      "type":"objectgroup",
   	      "visible":true,
   	      "width":30,
   	      "x":0,
   	      "y":0
   	     }],
 	"orientation":"orthogonal",
 	"properties":
 	   {

    	},
	 "tileheight":32,
	 "tilesets":[
	        {
	         "firstgid":1,
	         "image":"tiles.png",
	         "imageheight":32,
	         "imagewidth":224,
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
 	"width":50
	};
	console.log("returning map");
	return jsonObject;
}

// create the main cavern data
function createCavern(cavernWidth, cavernHeight){
  var cavernArray = new Array();
  var initialArray = createDetailedCavern(cavernWidth, cavernHeight);
    for (var i = 0; i < cavernHeight; i++){
      for (var j = 0; j < cavernWidth; j++){
        cavernArray[i*cavernWidth + j] = initialArray[i][j];
      }
    }
  return cavernArray;
}

// create a cavern with randomised tiles and grass on top
function createDetailedCavern(cavernWidth, cavernHeight){
  var cavernArray = new Array();
  var initialArray = createRawCavernNess(cavernWidth, cavernHeight);
    for (var i = 0; i < cavernHeight; i++){
      cavernArray[i]=new Array();
      for (var j = 0; j < cavernWidth; j++){
        if (initialArray[i][j] == 0){
          cavernArray[i][j] = 0;
        } else if (i >0 && initialArray[i-1][j] == 0){
           cavernArray[i][j] = getRandomInt(4,6);
        } else {
           cavernArray[i][j] = getRandomInt(1,3);
        }
      }
    }
  return cavernArray;
}

// create the undetailed cavern shape: 1 for rock, 0 for not rock.
// this function and cellularAutomation are based on http://www.roguebasin.com/index.php?title=Cellular_Automata_Method_for_Generating_Random_Cave-Like_Levels
function createRawCavernNess(cavernWidth, cavernHeight){
  var cavernArray = new Array();
  for (var i = 0; i < cavernHeight; i++){
    cavernArray[i]=new Array();
    for (var j = 0; j < cavernWidth; j++){
      cavernArray[i][j] = 0;
    }
  }
  var random;
  var cavernSkeleton = createCavernSkeleton(cavernWidth, cavernHeight);
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
function createCavernSkeleton(cavernWidth, cavernHeight){    // intialise array
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
  //That's it!
  return cavernArray;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}