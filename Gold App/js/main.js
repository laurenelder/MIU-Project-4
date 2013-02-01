$('#addItem').on('pageinit', function(){

		var myForm = $('#addUserForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

// Shortcut Function
	var idvalue = function(x) {
		var theElement = document.getElementById(x);
		return theElement;
	};

// Radio Button Functions
	var getRadioGender = function() {
		var radioOne = document.forms[0].gender;
		for (var i = 0; i < radioOne.length; i++) {
			if (radioOne[i].checked) {
				genderValue = radioOne[i].value;
			}
		};
	};
	var getRadioOrientation = function() {
		var radioTwo = document.forms[0].orientation;
		for (var i = 0; i < radioTwo.length; i++) {
			if (radioTwo[i].checked) {
				orientationValue = radioTwo[i].value;
			}
		};
	};

// Check Box Function
	var getCheckBoxValue = function() {
		if (idvalue("favoriteBox").checked) {
			favoriteValue = "Yes";
		} else {
			favoriteValue = "No"
		}
		if (idvalue("vehicle").checked) {
			vehicleValue = "Yes";
		} else {
			vehicleValue = "No"
		}
		if (idvalue("shared_interests").checked) {
			interestsValue = "Yes";
		} else {
			interestsValue = "No";
		}
		if (idvalue("financially_stable").checked) {
			stableValue = "Yes";
		} else {
			stableValue = "No";
		}
		if (idvalue("drinks").checked) {
			drinksValue = "Yes";
		} else {
			drinksValue = "No";
		}
		if (idvalue("smokes").checked) {
			smokesValue = "Yes";
		} else {
			smokesValue = "No";
		}
		if (idvalue("has_kids").checked) {
			hasKidsValue = "Yes";
		} else {
			hasKidsValue = "No";
		}
		if (idvalue("wants_kids").checked) {
			wantsKidsValue = "Yes";
		} else {
			wantsKidsValue = "No";
		}
		if (idvalue("has_pets").checked) {
			hasPetsValue = "Yes";
		} else {
			hasPetsValue = "No";
		}
	};

// Make Links Function
	var makeItemLinks = function(key, linksLi) {

		// Edit Link
		var editLink = document.createElement("a");
		editLink.href = "#addItem";
		editLink.key = key;
		var editText = "Edit User"
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		// Break Tag
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);

		// Delete Link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#addItem";
		deleteLink.key = key;
		var deleteText = "Delete User"
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};

// Results Function
	var resultsData	= function(fav, browseItem, browseVal, search, specificOne, specificTwo) {
		$("resultsPage").page("reload");
		var makeDivResult = document.createElement("div");
		makeDivResult.setAttribute("id", "item");
		var makeListResult = document.createElement("ul");
		makeDivResult.appendChild(makeListResult);
		idvalue("displayResults").appendChild(makeDivResult);
		idvalue("item").style.display = "block";
		console.log("ello");
		for (var i = 0, j = window.localStorage.length; i < j; i++) {
			var keyResult = window.localStorage.key(i);
			var valueResult = window.localStorage.getItem(keyResult);
			var objResult = JSON.parse(valueResult);
			if (objResult.favorite[1] == fav || 
				objResult.gender[1] == browseVal || 
				objResult.orientation[1] == browseVal ||
				objResult.gender[1] == specificOne && objResult.orientation[1] == specificTwo) {
				//|| obj[n][0] == search || 
				//obj[n][1] == search)
				var makeLiResult = document.createElement("li");
				var linksLiResult = document.createElement("li");
				makeListResult.appendChild(makeLiResult);
				var makeSubListResult = document.createElement("ul");
				makeLiResult.appendChild(makeSubListResult);
				getImage(objResult.gender[1], objResult.orientation[1], makeSubListResult);
				for(var n in objResult) {
					var makeSubLiResult = document.createElement("li");
					makeSubListResult.appendChild(makeSubLiResult);
					var optSubTextResult = objResult[n][0] + " " + objResult[n][1];
					makeSubLiResult.innerHTML = optSubTextResult;
					makeSubListResult.appendChild(linksLiResult)
				};
			makeItemLinks(window.localStorage.key(i), linksLiResult);
			} else {
				console.log("Bye");
			};
		};
	};

// Get Data Function
	var getData	= function() {
		if (window.localStorage.length === 0) {
			alert("There is no data in local storage so default data has been entered.");
			autoFillData();
		}
		//toggleLinks("on");
		$("resultsPage").page("reload");
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "item");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		idvalue("displayResults").appendChild(makeDiv);
		document.getElementById("item").style.display = "block";
		console.log("hi");
		for (var i = 0, j = window.localStorage.length; i < j; i++) {
			var makeLi = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = window.localStorage.key(i);
			var value = window.localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			getImage(obj.gender[1], obj.orientation[1], makeSubList);
			for(var n in obj) {
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0] + " " + obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi)
			};
		makeItemLinks(window.localStorage.key(i), linksLi);
		};
	};

// Get Image Function
var getImage = function(genderType, oValue, makeSubList) {
	var imageLi = document.createElement("li");
	makeSubList.appendChild(imageLi);
	var newImgOne = document.createElement("img");
	var newImgTwo = document.createElement("img");
	var setSrcOne = newImgOne.setAttribute("src", "img/" + genderType + ".png");
	if (oValue === "Straight") {
		var setSrcTwo = newImgTwo.setAttribute("src", "img/Straight.png");
	}
	if (oValue === "Bisexual") {
		var setSrcTwo = newImgTwo.setAttribute("src", "img/Bisexual.png");
	}
	if (oValue === "Gay" && genderType === "Male") {
		var setSrcTwo = newImgTwo.setAttribute("src", "img/gayMale.png");
	}
	if (oValue === "Gay" && genderType === "Female") {
		var setSrcTwo = newImgTwo.setAttribute("src", "img/gayFemale.png");
	}
	imageLi.appendChild(newImgOne);
	imageLi.appendChild(newImgTwo);
};

// Auto Fill Data Function
	var autoFillData = function() {
		for (var n in json) {
			var id = Math.floor(Math.random() * 1000001);
			window.localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};

	var	storeData = function(key) {
		if (!key) {
			var id				= Math.floor(Math.random() * 1000001);
		} else {
			id = key;
		}
		getRadioGender();
		getRadioOrientation();
		getCheckBoxValue();
		var item				= {};
			item.userName		= ["Username: ", idvalue("uname").value];
			item.age			= ["Age: ", idvalue("age").value];
			item.city			= ["City: ", idvalue("city").value];
			item.website		= ["Dating Website: ", idvalue("wsite").value];
			item.contacted		= ["First Contacted: ", idvalue("fcontact").value];
			item.gender			= ["Gender: ", genderValue];
			item.orientation	= ["Sexual Orientation: ", orientationValue];
			item.favorite 		= ["Favorite", favoriteValue]
			item.vehicle		= ["Has a Vehicle: ", vehicleValue];
			item.interests		= ["Has Shared Interests: ", interestsValue];
			item.stable			= ["Is Financially Stable: ", stableValue];
			item.drinks			= ["Drinks: ", drinksValue];
			item.smokes			= ["Smokes: ", smokesValue];
			item.hasKids		= ["Has Kids: ", hasKidsValue];
			item.wantsKids		= ["Wants Kids: ", wantsKidsValue];
			item.hasPets		= ["Has Pets: ", hasPetsValue];
			item.music			= ["Favorite Music Genre: ", idvalue("music").value];
			item.movie			= ["Favorite Movie Genre: ", idvalue("movie").value];
			item.compatible		= ["Level of Compatibility: ", idvalue("compatibility").value];
			item.notes			= ["Additional Information: ", idvalue("comments").value];
		
		window.localStorage.setItem(id, JSON.stringify(item));
		alert("User Saved!");
	};

// Edit Item Function
	var editItem = function() {
		var value = window.localStorage.getItem(this.key);
		var item = JSON.parse(value);

		idvalue("uname").value = item.userName[1];
		idvalue("age").value = item.age[1];
		idvalue("city").value = item.city[1];
		idvalue("wsite").value = item.website[1];
		idvalue("fcontact").value = item.contacted[1];
		var radioOne = document.forms[0].gender;
		for (var i = 0; i < radioOne.length; i++) {
			if (radioOne[i].value == "Male" && item.gender[1] == "Male") {
				radioOne[i].setAttribute("checked", "checked");
			} else if (radioOne[i].value == "Female" && item.gender[1] == "Female") {
				radioOne[i].setAttribute("checked", "checked");
			}
		};
		var radioTwo = document.forms[0].orientation;
		for (var i = 0; i < radioTwo.length; i++) {
			if (radioTwo[i].value == "Straight" && item.orientation[1] == "Straight") {
				radioTwo[i].setAttribute("checked", "checked");
			} else if (radioTwo[i].value == "Bisexual" && item.orientation[1] == "Bisexual") {
				radioTwo[i].setAttribute("checked", "checked");
			} else if (radioTwo[i].value == "Gay" && item.orientation[1] == "Gay") {
				radioTwo[i].setAttribute("checked", "checked");
			}
		};
		if (item.favorite[1] == "Yes") {
			idvalue("favoriteBox").setAttribute("checked", "checked");
		}
		if (item.vehicle[1] == "Yes") {
			document.getElementById("vehicle").setAttribute("checked", "checked");
		}
		if (item.interests[1] == "Yes") {
			idvalue("shared_interests").setAttribute("checked", "checked");
		}
		if (item.stable[1] == "Yes") {
			idvalue("financially_stable").setAttribute("checked", "checked");
		}
		if (item.drinks[1] == "Yes") {
			idvalue("drinks").setAttribute("checked", "checked");
		}
		if (item.smokes[1] == "Yes") {
			idvalue("smokes").setAttribute("checked", "checked");
		}
		if (item.hasKids[1] == "Yes") {
			idvalue("has_kids").setAttribute("checked", "checked");
		}
		if (item.wantsKids[1] == "Yes") {
			idvalue("wants_kids").setAttribute("checked", "checked");
		}
		if (item.hasPets[1] == "Yes") {
			idvalue("has_pets").setAttribute("checked", "checked");
		}
		idvalue("music").value = item.music[1];
		idvalue("movie").value = item.movie[1];
		idvalue("compatibility").value = item.compatible[1];
		idvalue("comments").value = item.notes[1];
		save.removeEventListener("click", storeData);
		idvalue("submit").value = "Edit User";
		var editSubmit = idvalue("submit");
		editSubmit.value = "Edit User";
		editSubmit.addEventListener("click", storeData);
		editSubmit.key = this.key;
	};

// Delete Item Function
	var deleteItem = function() {
		var ask = confirm("Are you sure you want to delete this user?");
		if (ask) {
			window.localStorage.removeItem(this.key);
			alert("User has been deleted.");
			window.location.reload();
		} else {
			alert("User was not deleted.");
		}
	};

// Clear Data Function
	var clearLocal = function() {
			window.localStorage.clear();
			alert("All users deleted.");
			window.location.reload();
			return false;	
	};

// Delete users confirm function
	var confirmDelete = function() {
		if (window.localStorage.length === 0) {
			alert("There is no data to clear.");
		} else {
			var ask = confirm("Delete all users?");
			if (ask) {
				clearLocal();
			} else {
				alert("Users not deleted.");
			}
		}
	};

// Restore color function
	var restoreField = function(field) {
		idvalue(field).style.color = "black";
		idvalue(field).value = "";
	};

// Global Variables
	var genderValue = "Unspecified";
	var orientationValue = "Unspecified";

// Event Listeners
	var displayLink = idvalue("display");
	displayLink.addEventListener("click", getData);
	var clearLink = idvalue("clear");
	clearLink.addEventListener("click", confirmDelete);
	var save = idvalue("submit");
	save.addEventListener("click", storeData(this.key));
	/*var bMale = idvalue("browseMale");
	bMale.addEventListener("click", resultsData("", "", "Male", "", "", ""));
	var bFemale = idvalue("browseFemale");
	bFemale.addEventListener("click", resultsData("", "", "Female", "", "", ""));
	var bStraight = idvalue("browseStraight");
	bStraight.addEventListener("click", resultsData("", "", "Straight", "", "", ""));
	var bBisexual = idvalue("browseBisexual");
	bBisexual.addEventListener("click", resultsData("", "", "Bisexual", "", "", ""));
	var bGayMale = idvalue("browseGayMale");
	browseGayMale.addEventListener("click", resultsData("", "", "", "", "Male", "Gay"));
	var bGayFemale = idvalue("browseGayFemale");
	bGayFemale.addEventListener("click", resultsData("", "", "", "", "Female", "Gay"));
	var bHasKids = idvalue("browseHasKids");
	bHasKids.addEventListener("click", resultsData("", "hasKids", "Yes", "", "", ""));
	var bWantsKids = idvalue("browseWantsKids");
	bWantsKids.addEventListener("click", resultsData("", "wantsKids", "Yes", "", "", ""));
	var bVehicle = idvalue("browseVehicle");
	bVehicle.addEventListener("click", resultsData("", "vehicle", "Yes", "", "", ""));
	var bInterests = idvalue("browseInterests");
	bInterests.addEventListener("click", resultsData("", "interests", "Yes", "", "", ""));
	var bStable = idvalue("browseStable");
	bStable.addEventListener("click", resultsData("", "stable", "Yes", "", "", ""));
	var bDrinks = idvalue("browseDrinks");
	bDrinks.addEventListener("click", resultsData("", "drinks", "Yes", "", "", ""));
	var bSmokes = idvalue("browseSmokes");
	bSmokes.addEventListener("click", resultsData("", "smokes", "Yes", "", "", ""));
	var bPets = idvalue("browsePets");
	bPets.addEventListener("click", resultsData("", "hasPets", "Yes", "", "", ""));
	var bfavorites = idvalue("favorites");
	//bfavorites.addEventListener("click", resultsData("Yes", "", "", "", "", ""));
	var bsearchBar = idvalue("searchBar");
	//bsearchBar.addEventListener("click", resultsData("", "", "", "", "", ""));
	var userField = idvalue("uname");
	userField.addEventListener("focus", restoreField("uname"));
	var ageField = idvalue("age")
	userField.addEventListener("focus", restoreField("age"));
	var cityField = idvalue("city")
	userField.addEventListener("focus", restoreField("city"));
	var wsiteField = idvalue("wsite")
	userField.addEventListener("focus", restoreField("wsite"));
	*/
