// --- Game State & HUD ---
const gameState = {
  coins: 150,
  teacups: 12,
  reputation: 1
};

function updateHUD() {
  document.getElementById('coin-count').textContent = gameState.coins;
  document.getElementById('teacup-count').textContent = gameState.teacups;
  document.getElementById('rep-count').textContent = gameState.reputation;
}

// --- Modal System ---
function openModal(title, contentHtml) {
  let existingModal = document.getElementById('game-modal');
  if (existingModal) existingModal.remove();

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

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
  updateHUD();

  document.getElementById('btn-recipes').addEventListener('click', () => {
    openModal('The Recipe Book', `
      <p>Unlock cozy Victorian teas and pastries to serve your guests!</p>
      <ul>
        <li>🍵 <strong>Rose Oolong</strong> - Cost: 10 Coins (Unlocked)</li>
        <li>🍰 <strong>Earl Grey Madeleines</strong> - Cost: 25 Coins (Locked)</li>
      </ul>
    `);
  });

  document.getElementById('btn-decorate').addEventListener('click', () => {
    openModal('Café Decoration', `
      <p>Adorn your Victorian parlor with lace curtains and brass lamps.</p>
      <p><em>More furniture options coming soon!</em></p>
    `);
  });

  document.getElementById('btn-cats').addEventListener('click', () => {
    openModal('Resident Cat Lounge', `
      <p>Your sleepy feline companions:</p>
      <ul>
        <li>🐈 <strong>Muffin</strong> - Sleeping peacefully by the rug.</li>
      </ul>
    `);
  });
});
