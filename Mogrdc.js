document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSummary = document.querySelector('.cart-summary');
    const viewCartButton = document.getElementById('view-cart-button');
    const cartModal = document.getElementById('cart-modal');
    const modalClose = document.getElementById('modal-close');
    const checkoutForm = document.getElementById('checkout-form');
    const mpesaNotification = document.getElementById('mpesa-notification');
    const cartMpesaNotification = document.getElementById('cart-mpesa-notification');
    const paybillDetails = document.getElementById('paybill-details');
    const cartPaybillDetails = document.getElementById('cart-paybill-details');
    const cartItems = document.getElementById('cart-items');
    const cartPrice = document.getElementById('cart-price');
    const cartDetails = document.getElementById('cart-details');
    const modalTotal = document.getElementById('modal-total');
    let cart = [];

    // Toggle cart summary visibility
    cartIcon.addEventListener('click', () => {
        cartSummary.style.display = cartSummary.style.display === 'block' ? 'none' : 'block';
    });

    // Show cart modal
    viewCartButton.addEventListener('click', () => {
        updateCartModal();
        cartModal.style.display = 'flex';
    });

    // Close cart modal
    modalClose.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const price = parseFloat(product.getAttribute('data-price'));
            const name = product.querySelector('h3').textContent;
            const quantity = parseInt(product.querySelector('.quantity-input').value);

            // Check if item is already in the cart
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.total = existingItem.quantity * price;
            } else {
                cart.push({
                    name,
                    quantity,
                    price,
                    total: quantity * price
                });
            }

            updateCartSummary();
            updateCartModal();
        });
    });

    // Update cart summary
    function updateCartSummary() {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = cart.reduce((acc, item) => acc + item.total, 0).toFixed(2);

        cartItems.textContent = `Total Items: ${totalItems}`;
        cartPrice.textContent = `Total Price: Ksh ${totalPrice}`;
    }

    // Update cart modal
    function updateCartModal() {
        cartDetails.innerHTML = '';
        const total = cart.reduce((acc, item) => acc + item.total, 0).toFixed(2);
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Ksh ${item.total.toFixed(2)}</td>
            `;
            cartDetails.appendChild(row);
        });
        modalTotal.textContent = `Total: Ksh ${total}`;
    }

    // Checkout form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

        if (paymentMethod === 'mpesa') {
            mpesaNotification.classList.remove('hidden');
            paybillDetails.style.display = 'none';
        } else {
            mpesaNotification.classList.add('hidden');
            paybillDetails.style.display = 'block';
        }
        
        // Simulate a checkout process
        alert(`Proceeding to payment with ${paymentMethod}`);
    });

    // Checkout form submission in cart modal
    document.getElementById('cart-checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

        if (paymentMethod === 'mpesa') {
            cartMpesaNotification.classList.remove('hidden');
            cartPaybillDetails.style.display = 'none';
        } else {
            cartMpesaNotification.classList.add('hidden');
            cartPaybillDetails.style.display = 'block';
        }
        
        // Simulate a checkout process
        alert(`Proceeding to payment with ${paymentMethod}`);
    });

    // Search functionality
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        document.querySelectorAll('.product').forEach(product => {
            const name = product.querySelector('h3').textContent.toLowerCase();
            const isVisible = name.includes(query);
            product.style.opacity = isVisible ? '1' : '0.5';
        });
    });

    // Display search suggestions
    document.getElementById('search-input').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const suggestions = document.getElementById('suggestions');
        suggestions.innerHTML = '';
        
        if (query) {
            const visibleProducts = Array.from(document.querySelectorAll('.product'))
                .filter(product => product.querySelector('h3').textContent.toLowerCase().includes(query));
            
            visibleProducts.forEach(product => {
                const suggestionItem = document.createElement('li');
                suggestionItem.textContent = product.querySelector('h3').textContent;
                suggestionItem.addEventListener('click', () => {
                    document.getElementById('search-input').value = suggestionItem.textContent;
                    suggestions.classList.add('hidden');
                    document.querySelectorAll('.product').forEach(p => {
                        p.style.opacity = p.querySelector('h3').textContent.toLowerCase() === suggestionItem.textContent.toLowerCase() ? '1' : '0.5';
                    });
                });
                suggestions.appendChild(suggestionItem);
            });
            
            suggestions.classList.remove('hidden');
        } else {
            suggestions.classList.add('hidden');
        }
    });
});

function openCategory(evt, categoryName) {
    // Hide all tab content
    document.querySelectorAll('.tabcontent').forEach(tab => {
        tab.style.display = 'none';
    });
    // Remove "active" class from all tab links
    document.querySelectorAll('.tablinks').forEach(tab => {
        tab.className = tab.className.replace(' active', '');
    });
    // Show the current tab content
    document.getElementById(categoryName).style.display = 'block';
    // Add "active" class to the clicked tab link
    evt.currentTarget.className += ' active';
}

// Set default tab to be open
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.tablinks').click();
});


            //  Testimonials
            let currentSlide = 0;
        const slideInterval = 7000; // 7 seconds
        const slides = document.querySelectorAll('.testimonial');
        const totalSlides = slides.length;

        function moveSlide(step) {
            currentSlide = (currentSlide + step + totalSlides) % totalSlides;
            const offset = -currentSlide * 100;
            document.querySelector('.testimonial-carousel').style.transform = `translateX(${offset}%)`;
        }

        function autoSlide() {
            moveSlide(1);
        }

        document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
        document.querySelector('.next').addEventListener('click', () => moveSlide(1));

        // Start automatic sliding
        let slideIntervalId = setInterval(autoSlide, slideInterval);

        // Reset interval on manual slide change
        function resetAutoSlide() {
            clearInterval(slideIntervalId);
            slideIntervalId = setInterval(autoSlide, slideInterval);
        }

        document.querySelector('.prev').addEventListener('click', resetAutoSlide);
        document.querySelector('.next').addEventListener('click', resetAutoSlide);


        document.addEventListener("DOMContentLoaded", function() {
            const urlParams = new URLSearchParams(window.location.search);
            const tab = urlParams.get('tab');
            if (tab) {
                document.querySelector(`.tab-link[data-tab="${tab}"]`).click();
            }
        });
        