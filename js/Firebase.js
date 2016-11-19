var xmlhttp = new XMLHttpRequest();
var url = "https://harlem-eternal.firebaseio.com/.json";
var id;

xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var myArr = JSON.parse(xmlhttp.responseText);
		id=myArr.length;
	}
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

var config = {
	apiKey: "AIzaSyCFoKW2DfzmgIwtHp2orM7NTdq7flRi8z8",
	authDomain: "pickup-d2d07.firebaseapp.com",
	databaseURL: "https://pickup-d2d07.firebaseio.com",
	storageBucket: "pickup-d2d07.appspot.com",
};
firebase.initializeApp(config);



function toggleSignIn() {
	if (!firebase.auth().currentUser) {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/plus.login');
		firebase.auth().signInWithRedirect(provider);
	}else{
		firebase.auth().signOut();
	}
}
var name;
var imgURL;
function initApp() {
	firebase.auth().getRedirectResult().then(function(result) {
		var user = result.user;
	});
	$('#loading').modal({show:true,backdrop:'static'});
setTimeout(function(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var displayName = user.displayName;
			var email = user.email;
			var photoURL = user.photoURL;
			console.log(displayName + "Signed in as" + email);
			$("#login").modal({show:false});
			if(photoURL==null){
				photoURL="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=64";
			}
			console.log(photoURL);
			getName(user.displayName,email,photoURL);
		}else{
			//console.log("not singed in");
			//$("#login").modal({show:true, backdrop: 'static'});
		}
	});
	   }, 5000);
}

function getName(curName,curEmail,img){
	name=curName;
	mail=curEmail;
	gapi.user=curEmail;
	imgURL=img;
	userName=name;
	imgr=img;
}

window.onload = function() {
	initApp();
}

function newEvent() {
	var geocoder = new google.maps.Geocoder();
	var address = document.getElementById("Address").value;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var latitude = results[0].geometry.location.lat();
			var longitude = results[0].geometry.location.lng();
			//alert(latitude);
			var messageListRef = new Firebase('https://harlem-eternal.firebaseio.com');
			var pos = {
				lat: latitude,
				lng: longitude
			};	
	messageListRef.push({"name": document.getElementById("name").value,
						"locationNme": document.getElementById("location").value,
						"history": document.getElementById("history").value,
						"img": document.getElementById("img").value,
						"address": document.getElementById("Address").value,
						"share": document.getElementById("share").value,
						"lat": pos.lat, 
						"lng": pos.lng
						}, function (error){
							if(error){
								alert(error + " Please Try Again.");
							}else{
								alert("Upload Complete");
							}
						});
		} 
	});
}