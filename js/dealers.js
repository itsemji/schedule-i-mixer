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
// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', (event) => {
    event.preventDefault();
    navMenu.classList.toggle('show');
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
      navMenu.classList.remove('show');
    }
  });
});