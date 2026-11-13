
let coins = 100;
let currentOrder = null;

const menu = [
  { name: "Tea", price: 15, emoji: "🫖" },
  { name: "Coffee", price: 20, emoji: "☕" },
  { name: "Hot Chocolate", price: 25, emoji: "🍫" }
];

const customers = [
  "Miss Amelia",
  "Mr. Theodore",
  "Lady Florence",
  "Little Edward",
  "Miss Charlotte"
];

const cats = [
  "Oliver",
  "Miso",
  "Biscuit"
];

const coinsDisplay = document.getElementById("coins");
const ordersDisplay = document.getElementById("orders");
const messageDisplay = document.getElementById("message");

function updateCoins() {
  coinsDisplay.textContent = coins;
}

function newOrder() {
  if (currentOrder) {
    messageDisplay.textContent =
      "Your current customer is still waiting!";
    return;
  }

  const customer =
    customers[Math.floor(Math.random() * customers.length)];

  const drink =
    menu[Math.floor(Math.random() * menu.length)];

  currentOrder = {
    customer: customer,
    drink: drink
  };

  ordersDisplay.innerHTML = `
    <strong>${customer}</strong>
    <p>I'd love a ${drink.name}, please!</p>
    <p>Reward: 🪙 ${drink.price}</p>
  `;

  messageDisplay.textContent =
    `${customer} is waiting. Time to prepare something lovely!`;
}

function prepareDrink(drinkName) {
  if (!currentOrder) {
    messageDisplay.textContent =
      "Nobody has ordered anything yet!";
    return;
  }

  if (currentOrder.drink.name !== drinkName) {
    messageDisplay.textContent =
      "That's not what the customer ordered! Try again.";
    return;
  }

  const customer = currentOrder.customer;
  const reward = currentOrder.drink.price;

  coins += reward;
  updateCoins();

  ordersDisplay.innerHTML = `
    <p>☕ Order completed!</p>
    <strong>${customer}</strong>
    <p>Thank you! That was delicious!</p>
  `;

  messageDisplay.textContent =
    `Wonderful service! You earned ${reward} coins. 🩷`;

  currentOrder = null;
}

document.getElementById("new-order")
  .addEventListener("click", newOrder);

document.querySelectorAll(".drink").forEach(button => {
  button.addEventListener("click", () => {
    prepareDrink(button.dataset.drink);
  });
});

function catChaos() {
  const cat = cats[Math.floor(Math.random() * cats.length)];

  messageDisplay.textContent =
    `${cat} has stolen a little treat! Someone supervise this cat! 🐈`;
}

updateCoins();
