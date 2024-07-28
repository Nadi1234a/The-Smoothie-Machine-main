/* 200521364 Ji Hee Rhou, 200530592 Jing-xian Wu */

// total price
let total = 0;

// JavaScript class called 'Smoothie'
class Smoothie {
  smoothie;
  ingredients;
  size;
  price;
  // constructor
  constructor(smoothie, ingredients, size) {
    this.smoothie = smoothie;
    this.ingredients = ingredients; // the value of ingredients is an array
    this.size = size;

    // Set this.price of the smoothie based on this.size & additional ingredients
    if (size == "Small") {
      this.price = 4.99;
    } else if (size == "Medium") {
      this.price = 6.49;
    } else if (size == "Large") {
      this.price = 7.99;
    }
    this.price += 1.49 * this.ingredients.length;
    total += this.price;
  }

  description() {
    let description =
      "▷ " + this.smoothie + " (" + this.size.toLowerCase() + ")";
    // add ingredients
    if (this.ingredients.length > 0) {
      description += " + " + this.ingredients.join(", ");
    }
    // count the price
    description += ": $" + this.price.toFixed(2);
    return description;
  }
}

// show image of selected smoothie flavour when the user selects a smoothie
let selectFlavour = document.querySelectorAll("input.flavour");
for (let i = 0; i < 6; i++) {
  selectFlavour[i].onchange = function () {
    if (selectFlavour[i].checked) {
      let selectedSmoothie = selectFlavour[i].value;

      let photo = document.createElement("img");
      document.querySelector("div.photo").innerHTML = "";
      // Set the src path for the IMG element
      let smoothieImage =
        "image/smoothie_" + selectedSmoothie.toLowerCase() + ".jpg";
      // Set the src attribute of the new IMG element
      photo.setAttribute("src", smoothieImage);
      // Set the size of the smoothie image based on this.size
      let width = "90";
      let height = "150";

      // Size the IMG in terms of its width and height based on above number from the switch
      photo.setAttribute("width", width);
      photo.setAttribute("height", height);
      photo.setAttribute("alt", selectedSmoothie + " Smoothie");
      photo.style.marginTop = "50px";
      // Add the new IMG element into the div
      document.querySelector("div.photo").appendChild(photo);
    }
  };
}

// Reset the selection
function resetSelection() {
  let smoothieChecked = document.querySelector(
    'input[name="smoothie"]:checked'
  );
  // Uncheck the radio button
  if (smoothieChecked != null) {
    document.querySelector('input[name="smoothie"]:checked').checked = false;
  }
  // Uncheck all the checkboxes of ingredients
  let ingredientsCheckbox = document.getElementsByName("ingredients");
  for (let i = 0; i < ingredientsCheckbox.length; i++) {
    if (ingredientsCheckbox[i].checked) {
      ingredientsCheckbox[i].checked = false;
    }
  }
  // Reset the size to Small
  document.getElementById("size").value = "Small";
}

// Reset Everything
function cancel() {
  // Reset the selection
  resetSelection();
  // All the selected smoothie delete
  total = 0;
  document.getElementById("name").value = ""; // clear the name column
  document.getElementById("description").innerHTML = ""; // clear the list of added smoothies at bottom
  document.getElementById("serve_smoothie").innerHTML = ""; // clear the image of ordered smoothies
  document.getElementById("serve_description").innerHTML = ""; // clear the description of ordered smoothies
  document.getElementById("serve").style.display = "none"; // hide the component showing ordered smoothies
  document.getElementById("order").style.display = "flex"; // show the component showing the menu
  document.getElementById("description").style.display = "none"; // Reset the selection in added list
  document.querySelector("div.photo").innerHTML = ""; // clear the image of selected smoothie
}

// Add event listener to the button 'Add'
let addSmoothieButton = document.querySelector(".add");
// Add selected Smoothie to div description and image to div serve_description
addSmoothieButton.onclick = function () {
  // Check if the user has selected a smoothie
  if (document.querySelector('input[name="smoothie"]:checked') == null) {
    alert("Please select your smoothie.");
    return; // stop the event listener and do nothing
  }
  let smoothie = document.querySelector('input[name="smoothie"]:checked').value;
  let ingredientsCheckbox = document.getElementsByName("ingredients");
  let ingredients = [];
  for (let i = 0; i < ingredientsCheckbox.length; i++) {
    if (ingredientsCheckbox[i].checked) {
      ingredients.push(ingredientsCheckbox[i].value);
    }
  }
  let size = document.getElementById("size").value;

  // Create a new Smoothie object based on the user's selection and the constructor in class Smoothie
  let createSmoothie = new Smoothie(smoothie, ingredients, size);
  // Add the description of the smoothie to the div description,
  // if there is already a description, add a line break before adding the new description
  let description = document.getElementById("description").innerHTML; // get the current description
  if (description != "") description += "<br>";
  description += createSmoothie.description();
  let des = document.getElementById("description");
  des.innerHTML = description;
  des.style.display = "block";
  // Reset the selection image
  document.querySelector("div.photo").innerHTML = "";

  // Generate an IMG of the smoothie ordered
  const serveSmoothie = document.createElement("img");
  // Set the src path for the IMG element
  let smoothieImage = "image/smoothie_" + smoothie.toLowerCase() + ".jpg";
  // Set the src attribute of the new IMG element
  serveSmoothie.setAttribute("src", smoothieImage);
  // Set the size of the smoothie image based on this.size
  let width = "90";
  let height = "200";
  if (size == "Small") {
    width = "90";
    height = "200";
  } else if (size == "Medium") {
    width = "100";
    height = "250";
  } else if (size == "Large") {
    width = "110";
    height = "300";
  }

  // Size the IMG in terms of its width and height based on above number from the switch
  serveSmoothie.setAttribute("width", width);
  serveSmoothie.setAttribute("height", height);
  serveSmoothie.setAttribute("alt", smoothie + " Smoothie");
  // Add the new IMG element into the div
  document.getElementById("serve_smoothie").appendChild(serveSmoothie);
  // Reset the selection
  resetSelection();
};

// Order all of the selected Smoothies
// Add event listener to the button 'Order'
let orderButton = document.querySelector(".order");
// Add selected Smoothie to div description and image to div serve_description
orderButton.onclick = function () {
  let name = document.getElementById("name").value;
  let description = document.getElementById("description").innerHTML;

  // Regular expression pattern to check for non-empty input (at least one non-whitespace character)
  let nonEmptyNameRegex = /\S/;
  if (!nonEmptyNameRegex.test(name)) {
    alert("Please enter your name.");
    return;
  } else if (description == "") {
    alert("Please select your smoothie.");
    return;
  }

  document.getElementById("order").style.display = "none"; // hide the component showing the menu
  document.getElementById("serve").style.display = "flex"; // show the component showing ordered smoothies

  description =
    "Customer Name: " +
    name +
    "<br><br>" +
    description +
    "<br><br>Total: $" +
    total.toFixed(2);
  document.getElementById("serve_description").innerHTML = description;

  // Reset the selection in added list
  let des = document.getElementById("description");
  des.style.display = "none";
};

// Add event listener to the button 'Cancel'
let cancelButton = document.querySelector(".cancel");
// Add selected Smoothie to div description and image to div serve_description
cancelButton.onclick = function () {
  cancel();
};

// Add event listener to the button 'Menu'
let menuButton = document.querySelector("input.menu");
// Add selected Smoothie to div description and image to div serve_description
menuButton.onclick = function () {
  cancel();
};
