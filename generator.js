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

function createRawCavernNess(cavernWidth, cavernHeight){
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
  //That's it!
  return cavernArray;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}