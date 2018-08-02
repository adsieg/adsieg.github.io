// initialize page
function jsInit() {
  // collect DOM elements
  var navLabels = document.getElementsByClassName("header__nav__item"),
    navToggleBtn = document.getElementsByClassName("nav-toggle-btn")[0],
    sections = document.getElementsByClassName("main-section"),
    prevSectionIndex,
    filters = document.getElementsByClassName("filters__label"),
    projects = document.getElementsByClassName("portfolio__project");

  // helper callback
  function removeClass(classString) {
    return function(el) {
      el.classList.remove(classString);
    };
  }
  
  function updateNavLabels() {
    for (var i = 0; i < sections.length; i++) {
      // check which section is in viewport
      if ((prevSectionIndex != i) && ((sections[i].getBoundingClientRect().top < window.innerHeight / 3 && sections[i].getBoundingClientRect().top >= 0) || (sections[i].getBoundingClientRect().bottom > 3 * window.innerHeight / 4 && sections[i].getBoundingClientRect().bottom < sections[i].getBoundingClientRect().height))) {
        // update labels consequently
        [].forEach.call(navLabels, removeClass("is-active"));
        navLabels[i].classList.add("is-active");

        prevSectionIndex = i;
      }
    }

  }

 function navToggle() {
		var navToggleWrap = this.parentNode;
		//expand nav
		navToggleWrap.classList.toggle("expand");
		// close nav when clicking on a link
		[].forEach.call(navLabels, function(el) {
			el.addEventListener("click", collapseNav);
		});
		
		function collapseNav() {
			navToggleWrap.classList.remove("expand");
			[].forEach.call(navLabels, function(el) {
				el.removeEventListener("click", collapseNav);
			});
		}
	}

  function filterProjects() {

    var category = this.getAttribute("data-cat");

    // update active state for category labels
    updateFilterLabel(this);

    // display or hide elements depending on selected category
    if (!category) {
      // display all projects if "all" is selected
      [].forEach.call(projects, displayEl);
    } else {
      [].forEach.call(projects, function(el) {
        if (el.getAttribute("data-cat") !== category) {
          hideEl(el);
        } else {
          displayEl(el);
        }
      });
    }

    // utility
    function updateFilterLabel(activeEl) {
      [].forEach.call(filters, removeClass("is-active"));
      activeEl.classList.add("is-active");
    }

    function displayEl(el) {
      el.style.display = "block";
    }

    function hideEl(el) {
      el.style.display = "none";
    }

  }

  // display all js-dependent elements
  var jsEl = document.getElementsByClassName("js-dis");
  [].forEach.call(jsEl, removeClass("js-dis"));

  // display current section state in nav
  updateNavLabels();

  /** event listeners: **/
  // change current section label in nav when scrolling
  window.addEventListener("scroll", updateNavLabels);
  // toggle navigation when collapsed on smaller screens
  navToggleBtn.addEventListener("click", navToggle);
  // filtering function
  [].forEach.call(filters, function(el) {
    el.addEventListener("click", filterProjects)
  });

}

jsInit();


// Add Google Maps
function initMap() {
  var customMapType = new google.maps.StyledMapType([{
    "featureType": "all",
    "elementType": "labels.text",
    "stylers": [{
      "color": "#6c6753"
    }]
  }, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#ffffff"
    }]
  }, {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#444444"
    }]
  }, {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#ffffff"
    }, {
      "lightness": "0"
    }, {
      "gamma": "1.00"
    }]
  }, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "color": "#51e6a6"
    }]
  }, {
    "featureType": "road",
    "elementType": "labels.text",
    "stylers": [{
      "color": "#6c6753"
    }, {
      "visibility": "simplified"
    }]
  }, {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{
      "saturation": "-100"
    }, {
      "lightness": "11"
    }]
  }, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{
      "visibility": "on"
    }]
  }, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
      "color": "#51ffa6"
    }, {
      "lightness": "27"
    }, {
      "saturation": "-14"
    }]
  }], {
    name: 'Styled'
  });
  var customMapTypeId = 'custom_style';

  var latLng = {
    lat: 39.2257618,
    lng: 9.122245
  };

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: latLng,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });

  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: "I'm here!"
  });

  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);

}