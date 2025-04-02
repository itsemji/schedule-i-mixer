// dealers.js – Manages the expand/collapse functionality for dealer cards

document.addEventListener('DOMContentLoaded', function() {
    // Select all dealer cards on the page.
    const dealerCards = document.querySelectorAll('.dealer-card');
  
    dealerCards.forEach(card => {
      // Add click event listener to toggle the expanded class.
      card.addEventListener('click', function() {
        card.classList.toggle('expanded');
        const toggleIcon = card.querySelector('.toggle-icon');
        // Change icon from '+' to '-' when expanded and vice versa.
        toggleIcon.textContent = card.classList.contains('expanded') ? '-' : '+';
      });
    });
  });
  