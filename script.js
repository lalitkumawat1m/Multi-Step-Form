const menuItems = document.querySelectorAll(".nav-item");
const menuBtns = document.querySelectorAll(".nav-item-num");
const form = document.querySelector(".input-wrapper");
const inputs = document.querySelectorAll(".input");
const back = document.querySelector(".back");
const next = document.querySelector(".next");
const planSwitchIcon = document.querySelector(".switch");
const planSwitch = document.querySelector(".switch-btn");
const monthlyPlan = document.querySelector(".monthly");
const yearlyPlan = document.querySelector(".yearly");
const cardYearly = document.querySelector(".card-yearly");
const cardMonthly = document.querySelector(".card-monthly");
const planCards = document.querySelectorAll(".plan-card");
const addOns = document.querySelectorAll(".add-ons");
const labels = document.querySelectorAll("add-ons-plan");
const addOnsYearly = document.querySelector(".add-ons-yearly");
const addOnsMonthly = document.querySelector(".add-ons-monthly");
const mobileMenus = document.querySelectorAll(".mobile-item");
const checkboxes = document.querySelectorAll(".checkbox");

console.log(mobileMenus);

// .........regex patterns..........

const pattern = {
  name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
  email: /^([\w\.\-]+)@([a-zA-Z\d\-]+)\.([a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/,
  phone: /^\+[0-9]{11,15}$/,
};

// .........form validation........

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    validate(e.target, pattern[e.target.attributes.name.value]);
  });
});

// ............functions.............

const validate = (field, regex) => {
  if (regex.test(field.value)) {
    field.setAttribute("class", "valid");
  } else {
    field.setAttribute("class", "invalid");
  }
};

// .............Change Step..............
const changePage = (url, step) => {
  localStorage.setItem("currentStep", step);
  location.replace(url);
};

// ...............Change bg of current step number................
const highlightCurrentStep = (currentStep) => {
  menuItems.forEach((item, index) => {
    item
      .querySelector(".nav-item-num")
      .classList.toggle("step-background", index === currentStep);
  });
  mobileMenus.forEach((item, index) => {
    item.classList.toggle("step-background", index === currentStep);
  });
};

// Get current step from local storage or set to 0 if not set
let currentStep = parseInt(localStorage.getItem("currentStep")) || 0;

// Highlight the initial step
highlightCurrentStep(currentStep);

// Function to validate inputs
const validateInputs = () => {
  let allValid = true;
  inputs.forEach((input) => {
    const regex = pattern[input.name];
    if (!regex.test(input.value)) {
      input.classList.add("invalid");
      allValid = false;
    } else {
      input.classList.remove("invalid");
      input.classList.add("valid");
    }
  });
  return allValid;
};

// ........switching to different pages..........

// Event listener for menu items
menuItems.forEach((item, index) => {
  if (!validateInputs()) {
    // alert("Please enter valid input!")
    return;
  }

  item.addEventListener("click", () => {
    switch (index) {
      case 0:
        changePage("./index.html", 0);
        break;
      case 1:
        changePage("./step2.html", 1);
        break;
      case 2:
        changePage("./step3.html", 2);
        break;
      case 3:
        changePage("./step4.html", 3);
        break;
    }
  });
});

// Event listener for mobile menu items
mobileMenus.forEach((item, index) => {
  if (!validateInputs()) {
    // alert("Please enter valid input!")
    return;
  }
  item.addEventListener("click", () => {
    switch (index) {
      case 0:
        changePage("./index.html", 0);
        break;
      case 1:
        changePage("./step2.html", 1);
        break;
      case 2:
        changePage("./step3.html", 2);
        break;
      case 3:
        changePage("./step4.html", 3);
        break;
    }
  });
});

// Event listener for the next button
next.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateInputs()) {
    // alert("Please enter valid input!")
    return;
  }
  switch (location.pathname) {
    case "/index.html":
      changePage("./step2.html", 1);
      break;
    case "/step2.html":
      changePage("./step3.html", 2);
      break;
    case "/step3.html":
      const selectedAddOns = [];
      const addOnsContainer = isYearly ? addOnsYearly : addOnsMonthly;
      const checkboxes = addOnsContainer.querySelectorAll(".checkbox");

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          const label = checkbox.nextElementSibling;
          const addOnName = label.childNodes[0].textContent.trim();
          const addOnPrice = checkbox.parentElement
            .querySelector(".add-ons-price")
            .textContent.trim()
            .split("/")[0]
            .substring(2);

          selectedAddOns.push({
            name: addOnName,
            price: parseInt(addOnPrice),
          });
        }
      });

      console.log("Storing Add-Ons:", selectedAddOns); // Debugging line
      localStorage.setItem("selectedAddOns", JSON.stringify(selectedAddOns));
      changePage("./step4.html", 3);
      break;
    case "/step4.html":
      changePage("./step5.html", 4);
      break;
  }
});

// Event listener for the back button
back.addEventListener("click", (e) => {
  e.preventDefault();

  switch (location.pathname) {
    case "/index.html":
      back.style.visibility = "hidden";
      break;
    case "/step2.html":
      changePage("./index.html", 0);
      back.style.visibility = "hidden";
      break;
    case "/step3.html":
      changePage("./step2.html", 1);
      break;
    case "/step4.html":
      changePage("./step3.html", 2);
      break;
  }
});

// .......selecting your plan.........

let isYearly = false;

// Toggle between monthly and yearly plans
planSwitchIcon.addEventListener("click", () => {
  let position = "";
  let color = "";
  let display = "";

  if (planSwitch.style.left === "8%") {
    isYearly = !isYearly;

    position = planSwitch.style.left = "60%";
    color = yearlyPlan.style.color = "var(--Marineblue)";
    color = monthlyPlan.style.color = "var(--Coolgray)";
    display = cardMonthly.classList.add("hidden");
    display = cardYearly.classList.remove("hidden");
  } else {
    isYearly = !isYearly;

    position = planSwitch.style.left = "8%";
    color = monthlyPlan.style.color = "var(--Marineblue)";
    color = yearlyPlan.style.color = "var(--Coolgray)";
    display = cardYearly.classList.add("hidden");
    display = cardMonthly.classList.remove("hidden");
  }
});

yearlyPlan.onclick = () => {
  isYearly = !isYearly;
  planSwitch.style.left = "60%";
  yearlyPlan.style.color = "var(--Marineblue)";
  monthlyPlan.style.color = "var(--Coolgray)";
  cardMonthly.classList.add("hidden");
  cardYearly.classList.remove("hidden");
};

monthlyPlan.onclick = () => {
  isYearly = !isYearly;
  planSwitch.style.left = "8%";
  monthlyPlan.style.color = "var(--Marineblue)";
  yearlyPlan.style.color = "var(--Coolgray)";
  cardYearly.classList.add("hidden");
  cardMonthly.classList.remove("hidden");
};

// selecting one card
planCards.forEach((plan) => {
  plan.addEventListener("click", () => {
    // change selected card color
    planCards.forEach((planCard) => {
      planCard.style.backgroundColor = "white";
      planCard.style.border = "1px solid var(--Coolgray)";
    });
    plan.style.backgroundColor = "var(--Magnolia)";
    plan.style.border = "1px solid var(--Marineblue)";

    // extracting plan data to set localstorage
    const planName = plan
      .querySelector(".plan")
      .textContent.trim()
      .split(" ")[0];
    const planPrice = isYearly
      ? plan
          .querySelector(".plan-price")
          .textContent.trim()
          .split("/")[0]
          .substring(1)
      : plan
          .querySelector(".plan-price")
          .textContent.trim()
          .split("/")[0]
          .substring(1);
    const planData = {
      name: planName,
      price: parseInt(planPrice),
      billing: isYearly ? "yearly" : "monthly",
    };
    console.log("Storing Plan:", planData); // Debugging line
    localStorage.setItem("selectedPlan", JSON.stringify(planData));
  });
});

// ...........choosing add-ons...........

addOns.forEach((addOn) => {
  let bc = "white";

  addOn.addEventListener("click", () => {
    // console.log(e.target.className==='add-ons-plan')

    if (addOn.style.backgroundColor === "white") {
      bc = addOn.style.backgroundColor = "var(--Magnolia)";
    } else {
      bc = addOn.style.backgroundColor = "white";
    }
  });

  labels.forEach((label) => {
    label.addEventListener("click", () => {
      if (addOn.style.backgroundColor === "white") {
        bc = addOn.style.backgroundColor = "var(--Magnolia)";
      } else {
        bc = addOn.style.backgroundColor = "white";
      }
    });
  });

  // addOn.add-ons-plan.addEventListener('click', () => {

  //     console.log(e.target.className==='add-ons-plan')
  //     if(addOn.style.backgroundColor === 'white'){
  //         bc = addOn.style.backgroundColor='var(--Magnolia)';

  //     }else{
  //         bc = addOn.style.backgroundColor = 'white';
  //     }
  // })
});
