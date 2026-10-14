//changed to persistent storage
let shoppingList =
    JSON.parse(localStorage.getItem('shoppingList')) || [];

const form = document.querySelector('form');
const container = document.querySelector('.container');

function saveShoppinglist(){
    localStorage.setItem(
    'shoppingList',
    JSON.stringify(shoppingList)
    );
}

// Display items
function displayItems() {
    container.innerHTML = '';

    shoppingList.forEach((item, index) => {
        const itemCard = `<div class="item">
        <div id="details-${index}" class="">
            <h4 class="title">${item.name}</h4>
            <p class="price">Ksh ${item.price}</p>
         </div>

        <div class="check">
        <input type="checkbox" id="mark-${index}"
                onclick="togglePurchased(${index})" />
            <label for="mark-${index}">Mark as purchased</label>
        </div>

            <button type="button" onclick="removeItem(${index})">-</button>
        </div>`;

        container.insertAdjacentHTML('beforeend', itemCard);
    });

    clearList();
}

// Mark an item as purchased
function togglePurchased(index) {
    const checkbox = document.getElementById(`mark-${index}`);
    const details = document.getElementById(`details-${index}`);

    if (checkbox.checked) {
        details.classList.add('purchased');
    } else {
        details.classList.remove('purchased');
    }
}

// minus button
function removeItem(index) {
    shoppingList.splice(index, 1);
    saveShoppinglist();
    displayItems();
}

// Show or hide the Clear List button
function clearList() {
    const btns = document.querySelector('.btn-sections');

    if (shoppingList.length > 0) {
        btns.classList.remove('hidden');
    } else {
        btns.classList.add('hidden');
    }
}

// Clears
const clear = document.querySelector('.clear-list');

clear.addEventListener('click', () => {
    shoppingList = [];
    saveShoppinglist();
    container.innerHTML = '';
    clearList();
});

// Adds items
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const itemName = e.target.product.value;
    const itemPrice = e.target.price.value;

    shoppingList.push({
        name: itemName,
        price: itemPrice,
    });

    saveShoppinglist();
    form.reset();
    displayItems();
});

displayItems();