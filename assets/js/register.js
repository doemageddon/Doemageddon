// assets/js/register.js
document.addEventListener('DOMContentLoaded', () => {
  const hunterInput = document.getElementById('hunterCount');
  const mealInput = document.getElementById('mealTickets');
  const totalDisplay = document.getElementById('totalAmount');

  function updateTotal() {
    const hunters = parseInt(hunterInput.value) || 0;
    const meals = parseInt(mealInput.value) || 0;
    const total = (hunters * 100) + (meals * 20);
    totalDisplay.textContent = total.toFixed(2);
  }

  hunterInput.addEventListener('input', updateTotal);
  mealInput.addEventListener('input', updateTotal);

  updateTotal(); // Initial load
});
