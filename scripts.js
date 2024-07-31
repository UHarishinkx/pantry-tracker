document.addEventListener('DOMContentLoaded', function () {
    const itemForm = document.getElementById('item-form');
    const itemNameInput = document.getElementById('item-name');
    const itemQuantityInput = document.getElementById('item-quantity');
    const itemList = document.getElementById('item-list');

    const items = JSON.parse(localStorage.getItem('pantryItems')) || [];
    items.forEach(addItemToList);

    itemForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const itemName = itemNameInput.value.trim();
        const itemQuantity = itemQuantityInput.value.trim();

        if (itemName === '' || itemQuantity === '') {
            alert('Please enter both item name and quantity.');
            return;
        }

        addItem(itemName, itemQuantity);

        itemNameInput.value = '';
        itemQuantityInput.value = '';
    });

    function addItem(name, quantity) {
        const item = { name, quantity };
        items.push(item);
        localStorage.setItem('pantryItems', JSON.stringify(items));
        addItemToList(item);
    }

    function updateItem(index, name, quantity) {
        items[index] = { name, quantity };
        localStorage.setItem('pantryItems', JSON.stringify(items));
        renderList();
    }

    function addItemToList(item, index = items.length - 1) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">Quantity: ${item.quantity}</span>
            </div>
            <div class="item-buttons">
                <button class="edit" onclick="editItem(${index}, this)">Edit</button>
                <button class="remove" onclick="removeItem(${index})">Remove</button>
            </div>
            <form class="hidden" onsubmit="saveItem(event, ${index}, this)">
                <input type="text" value="${item.name}" required>
                <input type="number" value="${item.quantity}" required>
                <button type="submit" class="save">Save</button>
            </form>
        `;
        itemList.appendChild(li);
    }

    window.editItem = function (index, button) {
        const li = button.parentElement.parentElement;
        const itemDetails = li.querySelector('.item-details');
        const itemButtons = li.querySelector('.item-buttons');
        const form = li.querySelector('form');

        itemDetails.classList.add('hidden');
        itemButtons.classList.add('hidden');
        form.classList.remove('hidden');
    };

    window.saveItem = function (event, index, form) {
        event.preventDefault();
        const inputs = form.querySelectorAll('input');
        const name = inputs[0].value.trim();
        const quantity = inputs[1].value.trim();

        if (name === '' || quantity === '') {
            alert('Please enter both item name and quantity.');
            return;
        }

        updateItem(index, name, quantity);
    };

    window.removeItem = function (index) {
        items.splice(index, 1);
        localStorage.setItem('pantryItems', JSON.stringify(items));
        renderList();
    };

    function renderList() {
        itemList.innerHTML = '';
        items.forEach(addItemToList);
    }
});