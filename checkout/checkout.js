const basketContainerElement = document.querySelector(".basket-list");

const basketItems = getBasketItemsFromLocalStorage();

function updateBasketCount() {
  let basketCount = getBasketCountFromLocalStorage() || 0;
  basketCount++;
  saveBasketCountToLocalStorage(basketCount);
  updateBasketDisplay(basketCount);
}

function saveBasketCountToLocalStorage(count) {
  localStorage.setItem("basketCount", count);
}

function getBasketCountFromLocalStorage() {
  return parseInt(localStorage.getItem("basketCount")) || 0;
}

function updateBasketDisplay(count) {
  const redCircle = document.querySelector(".red-circle p.my-basket");
  redCircle.textContent = count.toString();
}

function fillBasketItems(items) {
  items.forEach((item) => {
    const basketItemElement = document.createElement("div");
    basketItemElement.className = "selling-product";

    const leftSideElement = document.createElement("div");
    leftSideElement.className = "left-side";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerHTML = `<img src="../homepage/svg-icons/deleteicon.svg" />`;

    const productImageElement = document.createElement("img");
    productImageElement.src = item.image;

    const productNameElement = document.createElement("p");
    productNameElement.className = "sneaker-name";
    productNameElement.textContent = item.title;

    leftSideElement.appendChild(deleteButton);
    leftSideElement.appendChild(productImageElement);
    leftSideElement.appendChild(productNameElement);
    const lineElement = document.createElement("div");
    lineElement.className = "line";
    basketContainerElement.appendChild(lineElement);

    const rightSideItemsElement = document.createElement("div");
    rightSideItemsElement.className = "right-side-items";

    const priceTagElement = document.createElement("p");
    priceTagElement.className = "pricetag";
    priceTagElement.textContent = `$${item.price}`;

    const itemQuantityElement = document.createElement("div");
    itemQuantityElement.className = "item-quantity";

    const minusButton = document.createElement("button");
    minusButton.className = "minus";
    minusButton.innerHTML = `<img src="../homepage/svg-icons/decrease.svg" />`;

    const quantityElement = document.createElement("p");
    quantityElement.className = "num";
    quantityElement.textContent = item.quantity;

    const plusButton = document.createElement("button");
    plusButton.className = "plus";
    plusButton.innerHTML = `<img src="../homepage/svg-icons/increase.svg" />`;

    itemQuantityElement.appendChild(minusButton);
    itemQuantityElement.appendChild(quantityElement);
    itemQuantityElement.appendChild(plusButton);

    const unitPriceElement = document.createElement("p");
    unitPriceElement.className = "unit-price";
    unitPriceElement.textContent = `$${item.price}`;

    rightSideItemsElement.appendChild(priceTagElement);
    rightSideItemsElement.appendChild(itemQuantityElement);
    rightSideItemsElement.appendChild(unitPriceElement);

    minusButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        quantityElement.textContent = item.quantity;
        updateTotalPrice();
      }
    });

    plusButton.addEventListener("click", () => {
      item.quantity++;
      quantityElement.textContent = item.quantity;
      updateTotalPrice();
    });
    basketItemElement.appendChild(leftSideElement);
    basketItemElement.appendChild(rightSideItemsElement);
    basketContainerElement.appendChild(basketItemElement);
  });
}
function updateTotalPrice() {
  const items = getBasketItemsFromLocalStorage();
  let totalPrice = 0;

  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  const totalElement = document.querySelector(".final");
  totalElement.textContent = `$${totalPrice}`;
}
fillBasketItems(basketItems);
const initialBasketCount = getBasketCountFromLocalStorage() || 0;
updateBasketDisplay(initialBasketCount);
updateTotalPrice();
