//ABOUT SECTION HOVER EFFECT AND LINK
function hoverOnText() {
  let aboutSection = document.querySelector(".about-text");
  let originalText = aboutSection.textContent;
  let isHovered = false;

  aboutSection.addEventListener('mouseover', function(event) {
    if (!isHovered) {
      aboutSection.textContent = "CHECK OUT THIS MONTH'S SHOWCASE";
      isHovered = true;
    } else {
      aboutSection.textContent = originalText;
      isHovered = false;
    }
  });
}


//SHOW THE IMAGES IN THE SHOWCASE DISPLAY
function showImages() {
  let images = document.querySelectorAll(".image");

  images.forEach(function (image, index) {
    let srcValue = 'images/gallery' + (index + 1) + '.jpg';

    image.setAttribute('src', srcValue);

    image.addEventListener("click", function () {
      openImageInSamePage(srcValue);
    });
  });


  // FULL SCREEN IMAGE VIEW UPON CLICKING WITH DARK BACKGROUND EFFECT
  function openImageInSamePage(imageUrl) {
    let imageModal = document.createElement("div");

    imageModal.style.position = "fixed";
    imageModal.style.top = "0";
    imageModal.style.left = "0";
    imageModal.style.width = "100%";
    imageModal.style.height = "100%";
    imageModal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    imageModal.style.zIndex = "9999";
    imageModal.style.display = "flex";
    imageModal.style.justifyContent = "center";
    imageModal.style.alignItems = "center";

    let imageElement = document.createElement("img");

    imageElement.src = imageUrl;
    imageElement.style.maxWidth = "90%";
    imageElement.style.maxHeight = "90%";

    imageModal.appendChild(imageElement);
    document.body.appendChild(imageModal);

    imageModal.addEventListener("click", function (event) {
      if (event.target === imageModal) {
        document.body.removeChild(imageModal);
      }
    });
  }
}


//SHOWS TEXTS FOR ALL IMAGES DYNAMICALLY 
let dataList = {
  imageTitles: [
    '"PEEL THE LAYERS" - KRYNN ITZO',
    '"WHITE PATH" - VEXIA NILO',
    '"HELLO" - ZARAE ETHON',
    '"AS I WAS WALKING" - HAELA CENDRIC',
    '"DRAWN BOY" - VESPERA SHADE',
    '"L0V3" - ZAYNE VALTOR',
    '"THE HANDSHAKE" - THERYN JAXON',
    '"OBTUSE" - SYLAS RAVENWOOD',
    '"DISOBEY" - IYRA MISTRAL',
    '"NO PARKING" - KAELEN ELWYNN',
    '"OI!" - ERYNDOR KESTREL',
    '"DISTORTION" - ZEPHYR RAINIER',
    '"THIS WALL" - LYRON XUL',
    '"WAITING" - KYRIE SOLSTICE',
  ],

  cartCounts: [],
  priceTags: []
};

function showTitles() {
  let titles = document.querySelectorAll(".item-title");

  titles.forEach(function (title, index) {
    title.textContent = dataList.imageTitles[index];
  });
};


//SHOWS CURRENT MONTH AND YEAR 
function getCurrentMonthYear() {
  let currentDate = new Date();
  let month = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
  let year = currentDate.getFullYear();
  return month + ' ' + year + ' SHOWCASE';
}

document.querySelector('.showcase-text').textContent = getCurrentMonthYear();


// GALLERY VERTICAL SCROLL = HORIZONTAL SCROLL
// WHEN ALL IMAGES ARE SCROLLED THROUGH, SCROLL FUNCTION IS BACK TO NORMAL
// ONLY APPLIES TO NON MOBILE DEVICES
let scrollGallery = document.querySelector(".image-all");
let scrollingHorizontally = true;
let isFirstScroll = true;

let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

if (!isTouchDevice) {
  scrollGallery.addEventListener("wheel", (event) => {
    if (scrollingHorizontally) {
      let scrollLeftBefore = scrollGallery.scrollLeft;

      scrollGallery.scrollBy({
        left: event.deltaY < 0 ? -70 : 70,
      });

      let scrollLeftAfter = scrollGallery.scrollLeft;

      if (scrollLeftBefore === scrollLeftAfter) {
        scrollingHorizontally = false;
        scrollGallery.style.overflowY = "auto";
      } else {
        event.preventDefault();
      }

      if (scrollGallery.scrollLeft === 0 && !isFirstScroll) {
        scrollingHorizontally = false;
        scrollGallery.style.overflowY = "auto";
      }

      if (scrollGallery.scrollLeft >= scrollGallery.scrollWidth - scrollGallery.clientWidth) {
        if (isFirstScroll) {
          isFirstScroll = false;
        } else {
          scrollingHorizontally = false;
          scrollGallery.style.overflowY = "auto";
        }
      }
    } else {
      scrollingHorizontally = true;
      scrollGallery.style.overflowY = "hidden";
    }
  });
} else {
  scrollGallery.style.overflowX = "scroll";
}



//SHOWS PRICETAG, CART, RECEIPT AND DISCLAIMER
function showCarts() {
  let theCarts = document.querySelectorAll(".price-tag");


  // SHOWS AND HIDES HOW MANY ITEMS ARE THERE IN THE CART
  function visibilityToggles() {
    let totalItems = dataList.cartCounts.reduce((accumulator, count) => accumulator + count, 0);
    let cartNumber = document.querySelector(".cart-total-number");
    let emptyCart = document.querySelector(".empty-cart");
    let receiptCart = document.querySelector(".receipt-cart");
    let addedItem = document.querySelectorAll(".added-item *, .shipping-list *, .bill-price-number *");

    cartNumber.style.visibility = totalItems > 0 ? 'visible' : 'hidden';
    emptyCart.style.display = totalItems > 0 ? 'none' : 'flex';
    receiptCart.style.display = totalItems > 0 ? 'flex' : 'none';

    cartNumber.textContent = totalItems;

    addedItem.forEach(function (item) {
      item.style.visibility = totalItems > 0 ? 'visible' : 'hidden';
    });
  }


  // ADD AND REMOVE BUTTONS THAT DETERMINE THE NUMBER OF ITEMS SHOWN IN THE CART
  theCarts.forEach(function (theCart, index) {
    let addButton = document.createElement("span");

    addButton.className = "addButtonElement";
    addButton.textContent = " +";

    let removeButton = document.createElement("span");

    removeButton.className = "removeButtonElement";
    removeButton.textContent = "- ";


    //IMPLEMENTS LOCAL STORAGE TO SAVE COUNTS UPON RELOADS
    let cartCount = parseInt(localStorage.getItem(`cartNum_${index}`)) || 0;
    dataList.cartCounts.push(cartCount);


    // GENERATES RANDOM PRICES FOR EACH ITEM INDIVIDUALLY
    // USES SEED SO THE NUMBER STAYS CONSISTENT UPON RELOADS
    let seed = index + 1;

    let generatedPrice = ((Math.sin(seed) + 1) * 36.21 + 24.23);
    let priceTag = Math.round(generatedPrice * 100) / 100;


    // INITIAL CONTENT FOR EACH ITEM'S PRICE TAG
    theCart.textContent = "$ " + priceTag + " //" + "ADD TO CART";
    dataList.priceTags[index] = priceTag;


    // UPDATES THE CART COUNT ON EACH CLICK, SAVED IN THE LOCAL STORAGE
    theCart.addEventListener("click", function () {
      theCart.innerHTML = "";
      theCart.appendChild(removeButton);
      theCart.appendChild(document.createTextNode(" " + cartCount + " "));
      theCart.appendChild(addButton);

      dataList.cartCounts[index] = cartCount;
      localStorage.setItem(`cartNum_${index}`, cartCount);

      visibilityToggles();
    });


    // MODAL APPEARS WHEN THE MAX NUMBER OF QUANTITY IS REACHED.
    addButton.addEventListener("click", function () {
      if (cartCount < 99) {
        cartCount++;
        theCart.textContent = cartCount;
      } else {
        let modalForText = document.querySelector(".all-modal");
        let spanModal = document.querySelector(".close");
        let modalText = document.querySelector(".modal-text");

        modalForText.style.display = "flex";
        modalText.textContent =
          "We value your demand, but unfortunately, you have reached the maximum quantity allowed for this item. Please revisit us at a later time to place a new order.";

        spanModal.onclick = function () {
          modalForText.style.display = "none";
        }

        window.onclick = function (event) {
          if (event.target == modalForText) {
            modalForText.style.display = "none";
          }
        }
      }
    });


    // WHEN THE CART NUMBER ON THE ITEM IS ZERO AGAIN, THE PRICE TAG CONTENT IS UPDATED BACK TO THE INITIAL STAGE
    removeButton.addEventListener("click", function () {
      if (cartCount > 0) {
        cartCount--;
        theCart.textContent = cartCount;
      } else {
        theCart.textContent = "";

        requestAnimationFrame(function () {
          theCart.textContent = "$ " + priceTag + " //" + "ADD TO CART";
        });
      }
    });


    //WHEN CART NUMBER ON THE ITEM IS MORE THAN ZERO, THE PRICE TAG INITIAL STAGE IS REPLACED AND THE ADD AND REMOVE BUTTONS APPEAR
    if (cartCount > 0) {
      theCart.innerHTML = "";
      theCart.appendChild(removeButton);
      theCart.appendChild(document.createTextNode(" " + cartCount + " "));
      theCart.appendChild(addButton);
    }
  });

  visibilityToggles();


  //WHEN THE CART COUNT IS ABOVE ZERO, THE RECEIPT SHOWS 
  function showReceipt() {
    let addList = document.querySelector(".added-item");
    let nameList = dataList.imageTitles;
    let sumPrices = [];

    let addedItemHTML =
      '<div class="added-item">' +
      '<div class="item-name"></div>' +
      '<div class="item-price">' +
      '<div>$</div>' +
      '<div class="item-price-number"></div>' +
      '</div>' +
      '<div class="item-qty">' +
      '<div>x</div>' +
      '<div class="item-qty-number"></div>' +
      '</div>' +
      '<div class="price-with-qty">' +
      '<div>$</div>' +
      '<div class="price-with-qty-number"></div>' +
      '</div>' +
      '</div>';


    // SHOWS INDEXED DATA ON EACH ADDED ITEM ON THE CART
    for (let i = 0; i < dataList.cartCounts.length; i++) {
      if (dataList.cartCounts[i] > 0) {
        let filteredList = [];
        let filteredName = [];
        let filteredPrice = [];

        filteredList.push({ quantity: dataList.cartCounts[i], index: i });
        filteredName.push({ name: nameList[i], index: i });
        filteredPrice.push({ price: dataList.priceTags[i], index: i });

        let qtyList = filteredList.map(obj => obj.quantity);

        let existingAddedItem = document.querySelector(`#added-item-${i}`);

        // SHOWS PRICE
        if (existingAddedItem) {
          existingAddedItem.querySelector('.item-qty-number').textContent = qtyList;
          let priceQty = filteredPrice[0].price * Math.max(...qtyList);
          existingAddedItem.querySelector('.price-with-qty-number').textContent = priceQty.toFixed(2);

          sumPrices.push(priceQty);

          //ADDS NEW ROW OF ADDED ITEM
        } else {
          let tempParentDiv = document.createElement('div');
          tempParentDiv.innerHTML = addedItemHTML;

          let addedItem = tempParentDiv.querySelector('.added-item');
          addedItem.id = `added-item-${i}`;

          addedItem.querySelector('.item-name').textContent = filteredName[0].name;
          addedItem.querySelector('.item-price-number').textContent = filteredPrice[0].price;
          addedItem.querySelector('.item-qty-number').textContent = qtyList;
          let priceQty = filteredPrice[0].price * Math.max(...qtyList);
          addedItem.querySelector('.price-with-qty-number').textContent = priceQty.toFixed(2);

          sumPrices.push(priceQty);

          addList.insertAdjacentElement('afterend', addedItem);
        }

      //REMOVES THE ROW IF THE ITEM IS REMOVED
      } else {
        let existingAddedItem = document.querySelector(`#added-item-${i}`);
        if (existingAddedItem) {
          existingAddedItem.remove();
        }
      }
    }

    // UPDATES THE CONTENT IN THE RECEIPT
    let totalPrice = document.querySelector(".bill-price-number");
    let shippingPrice = 10.99;
    let totalSumPrices = sumPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    totalPrice.textContent = (totalSumPrices + shippingPrice).toFixed(2);
  }

  showReceipt();

  // IMPLEMENTS ALL THE PREVIOUS ONLOAD FEATURES TO ALSO HAVE EFFECTS WITH CLICKS
  theCarts.forEach(function (theCart, index) {
    theCart.addEventListener("click", function () {
      showReceipt();
    })
  })

  let confirmOrder = document.querySelector(".proceed-button");
  let paymentModal = document.querySelector(".payment-modal-wrapper");

  // LOADS DISCLAIMER, SHIPPING, AND PAYMENT SECTIONS AS A MODAL
  function openPayment() {
    paymentModal.style.position = "fixed";
    paymentModal.style.top = "0";
    paymentModal.style.left = "0%";
    paymentModal.style.width = "100%";
    paymentModal.style.height = "100%";
    paymentModal.style.zIndex = "9999";
    paymentModal.style.display = "flex";
    paymentModal.style.justifyContent = "center";
    paymentModal.style.alignItems = "center";

    // CLOSES THE MODAL UPON WINDOW CLICK
    paymentModal.addEventListener("click", function (event) {
      if (event.target === paymentModal) {
        paymentModal.style.visibility = "hidden";
        paymentModal.style.display = "none";
      }
    });
  }

  // MODAL LOADS UPON ORDER CONFIRMATION CLICK
  function handleConfirmOrderClick() {
    openPayment();
    paymentModal.style.visibility = "visible";
    paymentModal.style.display = "flex";
  }

  confirmOrder.addEventListener("click", handleConfirmOrderClick);
}



//SHIPPING & PAYMENT SECTIONS
// AN INPUT FUNCTION WITH 'BLUR' TO REDUCE INCOSISTENT FORM INPUT ERROR
document.addEventListener('blur', function (event) {
  let target = event.target;
  let inputName = target.name;

  // SHOWS AN ERROR INDICATOR WITH ON-HOVER MESSAGE FOR INVALID FORMAT CASE IN THE INPUT FIELD
  function showErrorTooltip(inputElement, errorMessage) {
    let parent = inputElement.parentNode;
    let tooltip = parent.querySelector('.error-tooltip');

    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'error-tooltip';
      parent.appendChild(tooltip);
    }

    tooltip.innerHTML = '<span class="error-symbol">!</span>';
    tooltip.setAttribute('title', errorMessage);

    inputElement.addEventListener('focus', function () {
      tooltip.setAttribute('title', '');
      tooltip.innerHTML = '';
      inputElement.setCustomValidity('');
    });
  }

  // REMOVES THE ERROR INDICATOR WHEN THE FORMAT IS VALID IN THE INPUT FIELD
  function removeErrorTooltip(inputElement) {
    let parent = inputElement.parentNode;
    let tooltip = parent.querySelector('.error-tooltip');
    let errorSymbol = parent.querySelector('.error-symbol');

    if (tooltip) {
      parent.removeChild(tooltip);
    };

    if (errorSymbol) {
      errorSymbol.style.display = 'none';
    };
  }

  // ACCEPTABLE FORMAT INPUT FOR THE NAME, EMAIL, ADDRESS, ZIPCODE, COUNTRY, PHONE, CARD NUMBER, AND CVV FIELDS
  // WITH THE ERROR MESSAGE FOR EACH INVALID FORMAT
  // AND ERROR MESSAGE IF THE FIELD IS EMPTY
  if (inputName === 'name') {
    let inputValue = target.value;

    if (!/^[a-zA-Z\s]*$/.test(inputValue)) {
      showErrorTooltip(target, 'Only alphabets and spaces are allowed.');
    } else {
      removeErrorTooltip(target);
    };

  } else if (inputName === 'email' && target.value !== '') {
    let inputValue = target.value;

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(inputValue)) {
      showErrorTooltip(target, 'Invalid email format.');
    } else {
      removeErrorTooltip(target);
    };

  } else if (inputName === 'address' || inputName === 'city' || inputName === 'exp') {
    let inputValue = target.value;

    if (inputValue !== '') {
      removeErrorTooltip(target);
    };

  } else if (inputName === 'zipcode') {
    let zipValue = target.value;
    let zipPattern = target.getAttribute('pattern');

    if (zipValue !== '' && !new RegExp(zipPattern).test(zipValue)) {
      showErrorTooltip(target, 'Invalid zip code format.');
    } else {
      removeErrorTooltip(target);
    };


    // COUNTRY FIELD AFFECTS THE PHONE FIELD WITH COUNTRY CODE AUTOFILL
  } else if (inputName === 'country') {
    let countryValue = target.value;
    let countryCode = getCountryCode(countryValue);
    let phoneField = document.querySelector('input[name="phone"]');
    let phoneValue = phoneField.value;
    let numericPhoneValue = phoneValue.replace(/\D/g, '');
    let countryCodeRegex = /^\+\d+/;

    if (countryValue === '') {
      removeErrorTooltip(phoneField);
      showErrorTooltip(target, 'Please select a country.');

    } else {
      removeErrorTooltip(target);
      if (countryCode !== '') {
        if (phoneValue === '' || !countryCodeRegex.test(phoneValue)) {
          phoneField.value = countryCode + numericPhoneValue;

        } else {
          let updatedPhoneValue = phoneValue.replace(countryCodeRegex, countryCode);
          phoneField.value = updatedPhoneValue;
        };
      };
    };

    // MINIMUM PHONE NUMBER LENGTH REQUIREMENT IS SET TO 4 (SHORTEST PHONE NUMBER LENGTH ACCORDING TO GOOGLE)
  } else if (inputName === 'phone') {
    let phoneValue = target.value;
    let numericPhoneValue = phoneValue.replace(/[^\d+\-]/g, '');
    let countryField = document.querySelector('select[name="country"]');
    let countryValue = countryField.value;
    let countryCodeRegex = /^\+\d+/;
    let phoneFieldLength = phoneValue.length;
    let phoneFieldEmpty = phoneFieldLength === 0;
    let countryCodeEntered = countryCodeRegex.test(phoneValue);

    if (phoneFieldLength > 0 && phoneFieldLength < 5) {
      showErrorTooltip(target, 'Please enter a valid phone number.');
    } else {
      removeErrorTooltip(target);
    };

    // SELECT THE COUNTRY TO GENERATE THE RELEVANT COUNTRY CODE IN THE PHONE FIELD
    if (numericPhoneValue !== '' && countryValue === '') {
      showErrorTooltip(countryField, 'Please select a country.');
    } else {
      removeErrorTooltip(countryField);
    };

    if (countryValue !== '' && !phoneFieldEmpty) {
      if (countryCodeEntered) {
        let countryCode = getCountryCode(countryValue);
        phoneField.value = countryCode + numericPhoneValue;
      } else {
        showErrorTooltip(target, 'Please enter a valid phone number.');
      };
    };

    phoneField.disabled = !phoneField.value.match(countryCodeRegex);

    if (phoneFieldEmpty && !countryCodeEntered) {
      showErrorTooltip(target, 'Please fill in empty field.');
    };

  } else if (inputName === 'card-number') {
    let cardValue = target.value;

    if (cardValue !== '' && !/^\d+$/.test(cardValue)) {
      showErrorTooltip(target, 'Please enter a valid card number.');
    } else {
      removeErrorTooltip(target);
    };

  } else if (inputName === 'cvv') {
    let passwordValue = target.value;

    if (passwordValue !== '' && !/^\d{3,4}$/.test(passwordValue)) {
      showErrorTooltip(target, 'CVV must be a 3 or 4-digit number.');
    } else {
      removeErrorTooltip(target);
    };
  };
}, true);

// THE PROCEED BUTTON SHOWS ERROR INDICATOR IF THE FORMAT IS INVALID
// AND/OR IF IT IS EMPTY
let proceedButton = document.querySelector(".proceed-form-button");

proceedButton.addEventListener('click', function () {
  let errorFields = document.querySelectorAll('.error-tooltip');
  let emptyFields = document.querySelectorAll('input:required:invalid, select:required:invalid');
  let countryField = document.querySelector('select[name="country"]');

  let allFieldsFilled = true;

  errorFields.forEach(function (field) {
    let errorSymbol = field.querySelector('.error-symbol');

    if (errorSymbol) {
      errorSymbol.style.display = 'inline';
    };
  });

  emptyFields.forEach(function (field) {
    let parent = field.parentNode;
    let tooltip = parent.querySelector('.error-tooltip');

    if (field.value === '') {
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'error-tooltip';
        parent.appendChild(tooltip);
      };

      tooltip.innerHTML = '<span class="error-symbol">!</span>';
      tooltip.setAttribute('title', 'Please fill in empty field.');

    } else {
      if (tooltip && field.name !== 'address' && field.name !== 'city' && field.name !== 'exp') {
        par; ent.removeChild(tooltip);
      }
    };
  });

  if (countryField && countryField.value === '') {
    let parent = countryField.parentNode;
    let tooltip = parent.querySelector('.error-tooltip');

    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'error-tooltip';
      parent.appendChild(tooltip);
    };

    tooltip.innerHTML = '<span class="error-symbol">!</span>';
    tooltip.setAttribute('title', 'Please select a country.');

    allFieldsFilled = false;
  };

  let noErrors = document.querySelectorAll('.error-tooltip').length === 0;

  //  SHOWS A NEW MODAL IF THE FORM IS SUCCESSFUL AND THERE IS NO ERROR
  if (noErrors && allFieldsFilled) {
    let paymentModal = document.querySelector(".payment-modal-wrapper");

    paymentModal.style.display = "none";

    let modalForText = document.querySelector(".all-modal");
    let spanModal = document.querySelector(".close");
    let modalText = document.querySelector(".modal-text");

    modalForText.style.display = "flex";
    modalText.textContent =
      "Thank you for checking this far. For any questions, suggestions, or inquiry, feel free to use the contact form and send an email.";


    spanModal.onclick = function () {
      modalForText.style.display = "none";
      localStorage.clear();
      window.location.href = '#link-cart';
      window.location.reload();
    };

    window.onclick = function (event) {
      if (event.target == modalForText) {
        modalForText.style.display = "none";
        localStorage.clear();
        window.location.href = '#link-cart';
        window.location.reload();
      };
    };
  };
});


function getCountryCode(countryName) {
  let countryCodes = {
    'Afghanistan': '+93',
    'Albania': '+355',
    'Algeria': '+213',
    'American Samoa': '+1',
    'Andorra': '+376',
    'Angola': '+244',
    'Anguilla': '+1',
    'Antarctica': '+672',
    'Antigua and Barbuda': '+1',
    'Argentina': '+54',
    'Armenia': '+374',
    'Aruba': '+297',
    'Australia': '+61',
    'Austria': '+43',
    'Azerbaijan': '+994',
    'Bahamas': '+1-242',
    'Bahrain': '+973',
    'Bangladesh': '+880',
    'Barbados': '+1',
    'Belarus': '+375',
    'Belgium': '+32',
    'Belize': '+501',
    'Benin': '+229',
    'Bermuda': '+1',
    'Bhutan': '+975',
    'Bolivia': '+591',
    'Bosnia and Herzegovina': '+387',
    'Botswana': '+267',
    'Brazil': '+55',
    'British Indian Ocean Territory': '+246',
    'British Virgin Islands': '+1',
    'Brunei': '+673',
    'Bulgaria': '+359',
    'Burkina Faso': '+226',
    'Burundi': '+257',
    'Cambodia': '+855',
    'Cameroon': '+237',
    'Canada': '+1',
    'Cape Verde': '+238',
    'Cayman Islands': '+1',
    'Central African Republic': '+236',
    'Chad': '+235',
    'Chile': '+56',
    'China': '+86',
    'Christmas Island': '+61',
    'Cocos Islands': '+61',
    'Colombia': '+57',
    'Comoros': '+269',
    'Cook Islands': '+682',
    'Costa Rica': '+506',
    'Croatia': '+385',
    'Cuba': '+53',
    'Curacao': '+599',
    'Cyprus': '+357',
    'Czech Republic': '+420',
    'Democratic Republic of the Congo': '+243',
    'Denmark': '+45',
    'Djibouti': '+253',
    'Dominica': '+1',
    'Dominican Republic': '+1',
    'East Timor': '+670',
    'Ecuador': '+593',
    'Egypt': '+20',
    'El Salvador': '+503',
    'Equatorial Guinea': '+240',
    'Eritrea': '+291',
    'Estonia': '+372',
    'Ethiopia': '+251',
    'Falkland Islands': '+500',
    'Faroe Islands': '+298',
    'Fiji': '+679',
    'Finland': '+358',
    'France': '+33',
    'French Polynesia': '+689',
    'Gabon': '+241',
    'Gambia': '+220',
    'Georgia': '+995',
    'Germany': '+49',
    'Ghana': '+233',
    'Gibraltar': '+350',
    'Greece': '+30',
    'Greenland': '+299',
    'Grenada': '+1-473',
    'Guam': '+1',
    'Guatemala': '+502',
    'Guernsey': '+44',
    'Guinea': '+224',
    'Guinea-Bissau': '+245',
    'Guyana': '+592',
    'Haiti': '+509',
    'Honduras': '+504',
    'Hong Kong': '+852',
    'Hungary': '+36',
    'Iceland': '+354',
    'India': '+91',
    'Indonesia': '+62',
    'Iran': '+98',
    'Iraq': '+964',
    'Ireland': '+353',
    'Isle of Man': '+44',
    'Israel': '+972',
    'Italy': '+39',
    'Ivory Coast': '+225',
    'Jamaica': '+1',
    'Japan': '+81',
    'Jersey': '+44-1534',
    'Jordan': '+962',
    'Kazakhstan': '+7',
    'Kenya': '+254',
    'Kiribati': '+686',
    'Kosovo': '+383',
    'Kuwait': '+965',
    'Kyrgyzstan': '+996',
    'Laos': '+856',
    'Latvia': '+371',
    'Lebanon': '+961',
    'Lesotho': '+266',
    'Liberia': '+231',
    'Libya': '+218',
    'Liechtenstein': '+423',
    'Lithuania': '+370',
    'Luxembourg': '+352',
    'Macau': '+853',
    'Macedonia': '+389',
    'Madagascar': '+261',
    'Malawi': '+265',
    'Malaysia': '+60',
    'Maldives': '+960',
    'Mali': '+223',
    'Malta': '+356',
    'Marshall Islands': '+692',
    'Mauritania': '+222',
    'Mauritius': '+230',
    'Mayotte': '+262',
    'Mexico': '+52',
    'Micronesia': '+691',
    'Moldova': '+373',
    'Monaco': '+377',
    'Mongolia': '+976',
    'Montenegro': '+382',
    'Montserrat': '+1',
    'Morocco': '+212',
    'Mozambique': '+258',
    'Myanmar': '+95',
    'Namibia': '+264',
    'Nauru': '+674',
    'Nepal': '+977',
    'Netherlands': '+31',
    'Netherlands Antilles': '+599',
    'New Caledonia': '+687',
    'New Zealand': '+64',
    'Nicaragua': '+505',
    'Niger': '+227',
    'Nigeria': '+234',
    'Niue': '+683',
    'North Korea': '+850',
    'Northern Mariana Islands': '+1',
    'Norway': '+47',
    'Oman': '+968',
    'Pakistan': '+92',
    'Palau': '+680',
    'Palestine': '+970',
    'Panama': '+507',
    'Papua New Guinea': '+675',
    'Paraguay': '+595',
    'Peru': '+51',
    'Philippines': '+63',
    'Pitcairn': '+64',
    'Poland': '+48',
    'Portugal': '+351',
    'Puerto Rico': '+1',
    'Qatar': '+974',
    'Republic of the Congo': '+242',
    'Reunion': '+262',
    'Romania': '+40',
    'Russia': '+7',
    'Rwanda': '+250',
    'Saint Barthelemy': '+590',
    'Saint Helena': '+290',
    'Saint Kitts and Nevis': '+1',
    'Saint Lucia': '+1',
    'Saint Martin': '+590',
    'Saint Pierre and Miquelon': '+508',
    'Saint Vincent and the Grenadines': '+1',
    'Samoa': '+685',
    'San Marino': '+378',
    'Sao Tome and Principe': '+239',
    'Saudi Arabia': '+966',
    'Senegal': '+221',
    'Serbia': '+381',
    'Seychelles': '+248',
    'Sierra Leone': '+232',
    'Singapore': '+65',
    'Sint Maarten': '+1',
    'Slovakia': '+421',
    'Slovenia': '+386',
    'Solomon Islands': '+677',
    'Somalia': '+252',
    'South Africa': '+27',
    'South Korea': '+82',
    'South Sudan': '+211',
    'Spain': '+34',
    'Sri Lanka': '+94',
    'Sudan': '+249',
    'Suriname': '+597',
    'Svalbard and Jan Mayen': '+47',
    'Swaziland': '+268',
    'Sweden': '+46',
    'Switzerland': '+41',
    'Syria': '+963',
    'Taiwan': '+886',
    'Tajikistan': '+992',
    'Tanzania': '+255',
    'Thailand': '+66',
    'Togo': '+228',
    'Tokelau': '+690',
    'Tonga': '+676',
    'Trinidad and Tobago': '+1',
    'Tunisia': '+216',
    'Turkey': '+90',
    'Turkmenistan': '+993',
    'Turks and Caicos Islands': '+1',
    'Tuvalu': '+688',
    'U.S. Virgin Islands': '+1',
    'Uganda': '+256',
    'Ukraine': '+380',
    'United Arab Emirates': '+971',
    'United Kingdom': '+44',
    'United States': '+1',
    'Uruguay': '+598',
    'Uzbekistan': '+998',
    'Vanuatu': '+678',
    'Vatican': '+379',
    'Venezuela': '+58',
    'Vietnam': '+84',
    'Wallis and Futuna': '+681',
    'Western Sahara': '+212',
    'Yemen': '+967',
    'Zambia': '+260',
    'Zimbabwe': '+263'
  };

  return countryCodes[countryName] || '';
}


window.onload = () => {
  hoverOnText();
  showImages();
  showTitles();
  showCarts();
}
