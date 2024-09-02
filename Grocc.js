document.addEventListener('DOMContentLoaded', () => {
    const cartLink = document.getElementById('cartLink');
    const modal = document.getElementById('cartModal');
    const closeModal = document.getElementById('closeModal');

    // Example data
    const itemCount = 0; // Replace with actual item count
    const totalWeight = 00; // Replace with actual weight
    const totalAmount = 00; // Replace with actual amount

    // Update modal content
    document.getElementById('itemCount').textContent = itemCount;
    document.getElementById('totalWeight').textContent = totalWeight;
    document.getElementById('modalTotal').textContent = totalAmount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });

    // Show modal when cart link is clicked
    cartLink.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'block';
    });

    // Close modal when close button is clicked
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});


document.getElementById('myButton').addEventListener('click', function() {
        window.location.href = 'MoGrocery.html';
    });

    

    document.querySelector('.cart-icon').addEventListener('click', function() {
        const cartSummary = document.querySelector('.cart-summary');
        cartSummary.style.display = cartSummary.style.display === 'block' ? 'none' : 'block';
    });
    

     