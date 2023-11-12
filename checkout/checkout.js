const basketContainerElement = document.querySelector(".basket-list");

const basketItems = getBasketItemsFromLocalStorage();

function updateBasketCount() {
  let basketCount = getBasketCountFromLocalStorage() || 0;
  basketCount--;
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
  items.forEach((item, index) => {
    const basketItemElement = document.createElement("div");
    basketItemElement.className = "selling-product";

    const leftSideElement = document.createElement("div");
    leftSideElement.className = "left-side";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerHTML = `<img src="../homepage/svg-icons/deleteicon.svg" />`;
    deleteButton.addEventListener("click", () => {
      const isConfirmed = confirm("Are you sure you want to delete?");
      if(isConfirmed){
      basketItems.splice(index, 1);
      saveBasketItemsToLocalStorage();
      basketItemElement.remove();
      saveBasketItemsToLocalStorage();
      updateTotalPrice();
      updateBasketCount();
    }
    });

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

    const priceTagValue = item.price * item.quantity;
    priceTagElement.textContent = `$${priceTagValue}`;

    const itemQuantityElement = document.createElement("div");
    itemQuantityElement.className = "item-quantity";

    const minusButton = document.createElement("button");
    minusButton.className = "minus";
    minusButton.innerHTML = `<img src="../homepage/svg-icons/decrease.svg" />`;
    if (item.quantity === 1) {
        minusButton.style.opacity = 0.2;
      }

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
        const newPriceTagValue = item.price * item.quantity;
        priceTagElement.textContent = `$${newPriceTagValue}`;
        saveBasketItemsToLocalStorage();
        updateTotalPrice();
        if (item.quantity === 1) {
            minusButton.style.opacity = 0.2;
          }
      }
      
    });

    plusButton.addEventListener("click", () => {
      item.quantity++;
      quantityElement.textContent = item.quantity;
      const newPriceTagValue = item.price * item.quantity;
      priceTagElement.textContent = `$${newPriceTagValue}`;
      saveBasketItemsToLocalStorage();
      updateTotalPrice();
      
      if (item.quantity > 1) {
        minusButton.style.opacity = 1;
      }
    });
    basketItemElement.appendChild(leftSideElement);
    basketItemElement.appendChild(rightSideItemsElement);
    basketContainerElement.appendChild(basketItemElement);
  });
}

function updateTotalPrice() {
  const items = getBasketItemsFromLocalStorage();
  let subtotal = 0;

  items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
  });

  const totalElement = document.querySelector(".final");
  totalElement.textContent = `$${subtotal + 20}`; 

  const subtotalElement = document.querySelector(".subtotal .sub");
  subtotalElement.textContent = `$${subtotal}`;

}
function saveBasketItemsToLocalStorage() {
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
  }

fillBasketItems(basketItems);
const initialBasketCount = getBasketCountFromLocalStorage() || 0;
updateBasketDisplay(initialBasketCount);
updateTotalPrice();