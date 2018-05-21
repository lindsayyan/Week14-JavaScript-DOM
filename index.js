// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateTimeInput = document.querySelector("#datetime");
var $city = document.querySelector("#city");
var $state = document.querySelector("#state");
var $country = document.querySelector("#country");
var $shape = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredCity to dataSet initially
var filteredCity = dataSet;

var current_page = 1;
var records_per_page = 50;
$tbody.innerHTML = "";


function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterDateTime = $dateTimeInput.value.trim().toLowerCase();
    var filterfromCity = $city.value.trim().toLowerCase();
    var filterState = $state.value.trim().toLowerCase();
    var filterCountry = $country.value.trim().toLowerCase();
    var filterShape = $shape.value.trim().toLowerCase();
   


  // Set filteredCity to an array of all cities whose "date" matches the filter
  filteredCity = dataSet.filter(function(city) {
      var cityDateTime = city.datetime.toLowerCase();
      var fromCity = city.city.toLowerCase();
      var state = city.state.toLowerCase();
      var country = city.country.toLowerCase();
      var shape = city.shape.toLowerCase();


      // If true, add the city to the filteredCity, otherwise don't add it to filteredCity
      if (filterfromCity != "" && filterDateTime != "" && filterState !="")
      {
          return fromCity === filterfromCity && cityDateTime === filterDateTime && state===filterState;
      }
      else if (filterfromCity == "" && filterDateTime !="" && filterState !="")
      {
          return cityDateTime === filterDateTime && state === filterState;
      }
      else if (filterfromCity != "" && filterDateTime == "" && filterState != "") {
          return fromCity === filterfromCity && state === filterState;
      }
      else if (filterfromCity != "" && filterDateTime == "" && filterState == "") {
          return fromCity === filterfromCity;
      }
      else if (filterfromCity == "" && filterDateTime != "" && filterState == "") {
          return cityDateTime === filterDateTime;
      }
      else if (filterCountry != "") {
          return country === filterCountry;
      }
      else if (filterShape != "") {
          return shape === filterShape;
      }
      else {
          return dataSet;
      }
    
  });
  changePage(1);
}

function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();
    $tbody.innerHTML = "";

    for (var i = (page - 1) * records_per_page; i < (page * records_per_page) ; i++) {
        // Get get the current city object and its fields
        var city = filteredCity[i];
        var fields = Object.keys(city);
        // Create a new row in the tbody, set the index to be i + startingIndex

        // $tbody.innerHTML += objJson[i].adName + "<br>";

        var rowNum = $tbody.childElementCount
        var $row = $tbody.insertRow(rowNum);
        for (var j = 0; j < fields.length; j++) {
            // For every field in the city object, create a new cell at set its inner text to be the current value at the current city's field
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = city[field];
        }
    }
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages() {
    return Math.ceil(filteredCity.length / records_per_page);
}

window.onload = function () {
    changePage(1);
};

// Render the table for the first time on page load
changePage(page);
