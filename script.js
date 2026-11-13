// --- Game State & UI Controller ---
const gameState = {
  coins: 150,
  teacups: 12,
  reputation: 1
};

// Update the top status bar numbers live on screen
function updateHUD() {
  document.getElementById('coin-count').textContent = gameState.coins;
  document.getElementById('teacup-count').textContent = gameState.teacups;
  document.getElementById('rep-count').textContent = gameState.reputation;
}

// --- Modal Management ---
// This creates and opens popup windows when you click the UI buttons
function openModal(title, contentHtml) {
  // Check if a modal already exists, remove it if so
  let existingModal = document.getElementById('game-modal');
  if (existingModal) existingModal.remove();

  // Build the modal overlay matching your Victorian aesthetic
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'game-modal';
  modalOverlay.className = 'modal-overlay';
  
  modalOverlay.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="close-modal-btn" onclick="closeModal()">×</button>
      </div>
      <div class="modal-body">
        ${contentHtml}
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);
}

function closeModal() {
  const modal = document.getElementById('game-modal');
  if (modal) modal.remove();
}

// --- Button Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
  updateHUD();

  // Hook up the Navigation Buttons
  // Make sure your HTML buttons have IDs like id="btn-recipes", id="btn-decorate", id="btn-cats"
  
  const recipeBtn = document.getElementById('btn-recipes');
  if (recipeBtn) {
    recipeBtn.addEventListener('click', () => {
      openModal('The Recipe Book', `
        <p>Unlock cozy Victorian teas and pastries to serve your guests!</p>
        <ul class="recipe-list">
          <li>🍵 <strong>Rose Oolong</strong> - Cost: 10 Coins (Unlocked)</li>
          <li>🍰 <strong>Earl Grey Madeleines</strong> - Cost: 25 Coins (Locked)</li>
        </ul>
      `);
    });
  }

  const decorateBtn = document.getElementById('btn-decorate');
  if (decorateBtn) {
    decorateBtn.addEventListener('click', () => {
      openModal('Café Decoration', `
        <p>Adorn your Victorian parlor with lace curtains and brass lamps.</p>
        <p class="sub-text">More furniture items coming soon!</p>
      `);
    });
  }

  const catsBtn = document.getElementById('btn-cats');
  if (catsBtn) {
    catsBtn.addEventListener('click', () => {
      openModal('Resident Cat Lounge', `
        <p>Your sleepy feline companions:</p>
        <ul>
          <li>🐈 <strong>Muffin</strong> - Sleeping peacefully by the rug.</li>
        </ul>
      `);
    });
  }
});
