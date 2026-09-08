// FSDL Experiment 3/4: Interactive JavaScript and asynchronous programming

// Task 1: arrays, operators and conditional discount
function calculateBill() {
  const prices = [500, 250, 800, 300];
  const total = prices.reduce((sum, price) => sum + price, 0);
  const discount = total > 1500 ? total * 0.10 : 0;
  const finalAmount = total - discount;

  document.getElementById("billOutput").innerHTML =
    `Prices: ₹${prices.join(", ₹")}<br>
     Total Bill: ₹${total}<br>
     Discount: ₹${discount}<br>
     <strong>Final Amount: ₹${finalAmount}</strong>`;
}

// Task 2: this keyword
function changeButtonText(button) {
  button.textContent = "Clicked!";
  document.getElementById("buttonOutput").textContent =
    "The clicked button changed its own text using the this keyword.";
}

// Task 3: DOM manipulation and input event
function countCharacters() {
  const text = document.getElementById("textBox").value;
  document.getElementById("charCount").textContent = text.length;
}

// Task 4: registration form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const mobile = document.getElementById("regMobile").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirm").value;
    const gender = document.getElementById("regGender").value;
    const output = document.getElementById("formOutput");

    const mobilePattern = /^[6-9]\d{9}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) return showValidation(output, "Enter a valid name.", "danger");
    if (!mobilePattern.test(mobile))
      return showValidation(output, "Enter a valid 10-digit mobile number.", "danger");
    if (!emailPattern.test(email))
      return showValidation(output, "Enter a valid email address.", "danger");
    if (password.length < 6)
      return showValidation(output, "Password must contain at least 6 characters.", "danger");
    if (password !== confirmPassword)
      return showValidation(output, "Passwords do not match.", "danger");
    if (!gender)
      return showValidation(output, "Please select gender.", "danger");

    showValidation(output, "Registration successful! All fields are valid.", "success");
  });
});

function showValidation(element, message, type) {
  element.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}

// Small delay used to simulate asynchronous operations
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// Task 5: nested callbacks
function startFoodOrder() {
  const output = document.getElementById("callbackOutput");
  output.innerHTML = "Starting...<br>";

  selectFood((food) => {
    output.innerHTML += `1. ${food}<br>`;

    confirmOrder(food, (message) => {
      output.innerHTML += `2. ${message}<br>`;

      prepareFood((message) => {
        output.innerHTML += `3. ${message}<br>`;

        assignDeliveryPartner((message) => {
          output.innerHTML += `4. ${message}<br>`;

          deliverFood((message) => {
            output.innerHTML += `5. ${message}`;
          });
        });
      });
    });
  });
}

function selectFood(callback) {
  setTimeout(() => callback("Select Food: Pizza selected"), 500);
}
function confirmOrder(food, callback) {
  setTimeout(() => callback(`Confirm Order: ${food}`), 500);
}
function prepareFood(callback) {
  setTimeout(() => callback("Prepare Food: Order prepared"), 500);
}
function assignDeliveryPartner(callback) {
  setTimeout(() => callback("Assign Delivery Partner: Partner assigned"), 500);
}
function deliverFood(callback) {
  setTimeout(() => callback("Deliver Food: Food delivered successfully"), 500);
}

// Task 6: Promises + promise chaining
function asyncOperation(message) {
  return delay(500).then(() => message);
}

function startProductOrder() {
  const output = document.getElementById("promiseOutput");
  output.innerHTML = "Starting...<br>";

  asyncOperation("Select Product: Laptop selected")
    .then((message) => {
      output.innerHTML += `1. ${message}<br>`;
      return asyncOperation("Check Availability: Product available");
    })
    .then((message) => {
      output.innerHTML += `2. ${message}<br>`;
      return asyncOperation("Add to Cart: Product added");
    })
    .then((message) => {
      output.innerHTML += `3. ${message}<br>`;
      return asyncOperation("Make Payment: Payment successful");
    })
    .then((message) => {
      output.innerHTML += `4. ${message}<br>`;
      return asyncOperation("Generate Order Confirmation: Order confirmed");
    })
    .then((message) => {
      output.innerHTML += `5. ${message}`;
    })
    .catch((error) => {
      output.innerHTML += `<br>Error: ${error}`;
    });
}

// Task 7: async/await + try...catch
async function startMovieBooking() {
  const output = document.getElementById("asyncOutput");
  output.innerHTML = "Starting...<br>";

  try {
    let message = await asyncOperation("Select Movie: Interstellar selected");
    output.innerHTML += `1. ${message}<br>`;

    message = await asyncOperation("Check Seat Availability: Seats available");
    output.innerHTML += `2. ${message}<br>`;

    message = await asyncOperation("Reserve Seat: Seat A10 reserved");
    output.innerHTML += `3. ${message}<br>`;

    message = await asyncOperation("Make Payment: Payment successful");
    output.innerHTML += `4. ${message}<br>`;

    message = await asyncOperation("Generate Ticket: Ticket generated successfully");
    output.innerHTML += `5. ${message}`;
  } catch (error) {
    output.innerHTML += `<br>Booking failed: ${error}`;
  }
}
