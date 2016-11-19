var map;
var xmlhttp = new XMLHttpRequest();
var url = "https://harlem-eternal.firebaseio.com/.json";
var Lat="";
var Lng="";
var curLoc;

xmlhttp.open("GET", url, true);
xmlhttp.send();
var User;

setTimeout(function(){
       processRequest();
    }, 2000);

function refresh(){
	location.reload();
}

function processRequest(e) {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var myArr = JSON.parse(xmlhttp.responseText);
		initMap(myArr);
	}
}

function initMap(arr) {
		console.log(xmlhttp.readyState);
var styles = [
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e85113"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "weight": 6
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "color": "#efe9e4"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f0e4d3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#11ff00"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "hue": "#4cff00"
            },
            {
                "saturation": 58
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "44"
            },
            {
                "saturation": "73"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -25
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -40
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -10
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -20
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#19a0d8"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": -100
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    }
  ];

  navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
		curLoc=pos;
		map.setCenter(pos);
    });
  
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});
	
	map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.8157182, lng: -73.9407881 },
        zoom: 14
    });
	
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
	var marker = new google.maps.Marker({
		position: curLoc,
		map: map,
		icon:"img/Loc.png"
  });

	for (var x in arr) {
		var lat=parseFloat(arr[x].lat);
		var lng=parseFloat(arr[x].lng);
		var Location = new google.maps.LatLng(lat, lng);
		console.log(x);
        addMarker(map, arr[x].address,
						arr[x].locationNme,
						arr[x].name,
						arr[x].history,
                        arr[x].img,
                        arr[x].share,
						Location,
						lat,
						lng,
						x
						//arr[x].mail,
						//arr[x].img
						);
     }
}

var curID;
function addMarker(map, address, locName, name, history, img, share, Location, lat, lng, x) {
		var marker = new google.maps.Marker({
			position: Location,
			map: map,
			icon:"img/icon.png",
			animation:google.maps.Animation.DROP
		});
		
    google.maps.event.addListener(marker, 'click', function () {
		$("#event").modal('show');
		document.getElementById("place").innerHTML = locName;
		document.getElementById("address").innerHTML = address;
		document.getElementById("history").innerHTML = history;
		document.getElementById("name").innerHTML = name;
        document.getElementById("share").href = share;
        document.getElementById("img").src = img;
		curID=x;
		console.log("Current:" + curID);
    });
}

function Join() {
	var messageListRef = new Firebase("https://pickup-d2d07.firebaseio.com/location/"+curID);
	
	if(document.getElementById("clck").value=="Delete"){
		messageListRef.remove();
	}else{
		messageListRef.child("Joined").push(
			{
				"email": mail,
				"name": userName,
				"img": imgr
			});
	}
}