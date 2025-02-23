document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const cartItems = document.getElementById('cart-items');
    const cartFloat = document.getElementById('cart-float');
    const cartPopup = document.getElementById('cart-popup');
    const closeCartPopup = document.querySelector('.close-cart-popup');
    const sendOrderButton = document.getElementById('send-order-button');
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const closeWhatsappPopup = document.querySelector('.close-whatsapp-popup');
    const whatsappForm = document.getElementById('whatsapp-form');
    const phoneNumber = "6287855379985"; // Replace with your WhatsApp number
    let orderList = [];

    // Handle adding items to cart
    if (menuItems) {
        menuItems.forEach(item => {
            const addToOrderButton = item.querySelector('.add-to-order');
            addToOrderButton.addEventListener('click', function() {
                const itemName = item.dataset.name;
                const itemPrice = item.dataset.price;
                const itemQuantity = parseInt(item.querySelector('.item-quantity').value);
                const existingItemIndex = orderList.findIndex(orderItem => orderItem.name === itemName);

                if (existingItemIndex !== -1) {
                    orderList[existingItemIndex].quantity += itemQuantity;
                } else {
                    const orderItem = { name: itemName, price: itemPrice, quantity: itemQuantity };
                    orderList.push(orderItem);
                }

                updateCart();
                alert(`${itemQuantity} x ${itemName} added to order.`);
                cartFloat.style.display = 'block'; // Show floating cart icon
            });
        });
    }

    // Update cart
    function updateCart() {
        cartItems.innerHTML = '';
        orderList.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            cartItem.innerHTML = `
                ${item.quantity} x ${item.name} - Rp ${item.price * item.quantity}
                <div class="btn-group" role="group">
                    <button class="btn btn-secondary btn-sm decrease-item" data-index="${index}">-</button>
                    <button class="btn btn-secondary btn-sm increase-item mr-1" data-index="${index}">+</button>
                    <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                orderList.splice(index, 1);
                updateCart();
                if (orderList.length === 0) {
                    cartFloat.style.display = 'none'; // Hide floating cart icon if cart is empty
                    cartPopup.style.display = 'none'; // Hide cart popup if cart is empty
                }
            });
        });

        const decreaseButtons = document.querySelectorAll('.decrease-item');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                if (orderList[index].quantity > 1) {
                    orderList[index].quantity -= 1;
                } else {
                    orderList.splice(index, 1);
                }
                updateCart();
                if (orderList.length === 0) {
                    cartFloat.style.display = 'none'; // Hide floating cart icon if cart is empty
                    cartPopup.style.display = 'none'; // Hide cart popup if cart is empty
                }
            });
        });

        const increaseButtons = document.querySelectorAll('.increase-item');
        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                orderList[index].quantity += 1;
                updateCart();
            });
        });
    }

    // Show cart popup
    if (cartFloat) {
        cartFloat.addEventListener('click', function() {
            cartPopup.style.display = 'block';
        });
    }

    // Close cart popup
    if (closeCartPopup) {
        closeCartPopup.addEventListener('click', function() {
            cartPopup.style.display = 'none';
        });
    }

    // Close cart popup when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == cartPopup) {
            cartPopup.style.display = 'none';
        }
    });

    // Send order via WhatsApp
    if (sendOrderButton) {
        sendOrderButton.addEventListener('click', function() {
            if (orderList.length === 0) {
                alert('Please add items to your order.');
                return;
            }
            let message = 'Haloo, saya pesan\n';
            orderList.forEach(item => {
                message += `${item.quantity} Porsi ${item.name} dengan harga Rp ${item.price * item.quantity}\n`;
            });
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Show or close WhatsApp popup
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function() {
            if (whatsappPopup.style.display === 'block') {
                whatsappPopup.style.display = 'none';
            } else {
                whatsappPopup.style.display = 'block';
            }
        });
    }

    // Close WhatsApp popup
    if (closeWhatsappPopup) {
        closeWhatsappPopup.addEventListener('click', function() {
            whatsappPopup.style.display = 'none';
        });
    }

    // Close WhatsApp popup when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == whatsappPopup) {
            whatsappPopup.style.display = 'none';
        }
    });

    // Handle WhatsApp form submission
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('wa-name').value;
            const message = document.getElementById('wa-message').value;
            const alamat = document.getElementById('wa-alamat').value;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Nama Saya ${name}\n, ${message} \n, Alamat Saya ${alamat}`)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});