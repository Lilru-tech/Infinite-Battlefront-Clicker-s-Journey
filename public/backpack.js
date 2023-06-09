let backpack = document.getElementById('backpack-items');
let backpackSize = 10;

for (let i = 0; i < backpackSize; i++) {
    addBackpackSlot();
  }

  function addBackpackSlot() {
    let slot = document.createElement('div');
    slot.classList.add('backpack-slot');
    backpack.appendChild(slot);
  }