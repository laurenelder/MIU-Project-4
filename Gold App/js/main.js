$('#homePage').on('pageinit', function(){
	//code needed for home page goes here
});	
		
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
		var editLink = idvalue("displayResults").createElement("a");
		editLink.href = "#addItem";
		editLink.key = key;
		var editText = "Edit User"
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		// Break Tag
		var breakTag = idvalue("displayResults").createElement("br");
		linksLi.appendChild(breakTag);

		// Delete Link
		var deleteLink = idvalue("displayResults").createElement("a");
		deleteLink.href = "#resultsPage";
		deleteLink.key = key;
		var deleteText = "Delete User"
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};

// Get Data Function
	var getData	= function() {
		if (window.localStorage.length === 0) {
			alert("There is no data in local storage so default data has been entered.");
			autoFillData();
		}
		//toggleLinks("on");

		var makeDiv = idvalue("displayResults").createElement("div");
		makeDiv.setAttribute("id", "item");
		var makeList = idvalue("displayResults").createElement("ul");
		makeDiv.appendChild(makeList);
		idvalue("displayResults").appendChild(makeDiv);
		idvalue("item").style.display = "block";
		for (var i = 0, j = window.localStorage.length; i < j; i++) {
			var makeLi = idvalue("displayResults").createElement("li");
			var linksLi = idvalue("displayResults").createElement("li");
			makeList.appendChild(makeLi);
			var key = window.localStorage.key(i);
			var value = window.localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = idvalue("displayResults").createElement("ul");
			makeLi.appendChild(makeSubList);
			getImage(obj.gender[1], obj.orientation[1], makeSubList);
			for(var n in obj) {
				var makeSubLi = idvalue("displayResults").createElement("li");
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
	var imageLi = idvalue("resultsPage").createElement("li");
	makeSubList.appendChild(imageLi);
	var newImgOne = idvalue("resultsPage").createElement("img");
	var newImgTwo = idvalue("resultsPage").createElement("img");
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
		if (item.vehicle[1] == "Yes") {
			idvalue("vehicle").setAttribute("checked", "checked");
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
		save.removeEventListener("click", validate);
		idvalue("submit").value = "Edit User";
		var editSubmit = idvalue("submit");
		editSubmit.value = "Edit User";
		editSubmit.addEventListener("click", validate);
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

// Global Variables
	var genderValue = "Unspecified"
	var orientationValue = "Unspecified"

// Event Listeners
	var displayLink = idvalue("display");
	displayLink.addEventListener("click", getData);
	var clearLink = idvalue("clear");
	clearLink.addEventListener("click", confirmDelete);
	var save = idvalue("submit");
	save.addEventListener("click", confirmDelete);


