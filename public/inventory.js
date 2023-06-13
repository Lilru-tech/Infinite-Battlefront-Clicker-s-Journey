function addToInventory(item) {
  let slotId = `${item.type}-slot`;
  let slot = document.getElementById(slotId);

  if (slot) {
    let equippedItemDiv = slot.getElementsByClassName('equipped-item')[0];
    let defaultImageDiv = slot.getElementsByClassName('default-image')[0];
    let defaultImage = defaultImageDiv ? defaultImageDiv.getElementsByTagName('img')[0] : null;

    if (defaultImage === null) {
      console.log("defaultImage not found");
      return;
    }

    if (!equippedItemDiv.classList.contains('occupied') && (!equippedItemDiv.firstChild || equippedItemDiv.firstChild.tagName !== 'IMG')) {
      equippedItemDiv.classList.add('occupied'); // Add the "occupied" class to the equipped item div
      defaultImage.style.visibility = 'hidden';

      // Add item to the inventory
      let itemImg = document.createElement('img');
      itemImg.src = item.img;
      itemImg.width = 75;
      itemImg.height = 75;
      itemImg.alt = item.name;
      itemImg.title = `${item.name}\nAttack: ${item.attack}\nDefense: ${item.defense}\n${item.objectEffect}`;

      defaultImageDiv.style.display = 'none';
      equippedItemDiv.appendChild(itemImg);

      // Store the default image in the 'data' attribute of the item image for future use
      itemImg.dataset.defaultImage = defaultImage.src;

      let backpackSlot = Array.from(document.getElementsByClassName('backpack-slot')).find(slot => slot.firstChild && slot.firstChild.dataset.itemType === item.itemType);
      if (backpackSlot) {
        let itemCount = backpackSlot.getElementsByClassName('item-count')[0];
        let count = parseInt(itemCount.textContent, 10);
        if (count > 1) {
          itemCount.textContent = count - 1;
        } else {
          backpackSlot.removeChild(itemCount);
          backpackSlot.removeChild(backpackSlot.firstChild);
        }
      }

      // Add event listener to the equipped item for unequipping
      itemImg.addEventListener('click', function() {
        equippedItemDiv.removeChild(itemImg);
        defaultImageDiv.style.display = 'block';
        defaultImage.style.visibility = 'visible';

        // Remove the "occupied" class from the equipped item div
        equippedItemDiv.classList.remove('occupied');

        // Add the item back to the backpack
        addItemToBackpack(item);
      });
    } else if (equippedItemDiv.classList.contains('occupied')) {
      updateLog(`Cannot equip item: ${item.type} because the slot is already occupied.`);
    } else {
      updateLog(`No empty slot in inventory for item: ${item.type}`);
    }
  }
}


// Add event listeners to inventory slots
function attachItemEventListeners() {
  // Add event listeners to inventory slots
  Array.from(document.getElementsByClassName('slot')).forEach(slot => {
    slot.addEventListener('click', function() {
      const equippedItemDiv = slot.getElementsByClassName('equipped-item')[0];
      const defaultImageDiv = slot.getElementsByClassName('default-image')[0];

      // Only proceed if there is an item equipped in the slot
      if (equippedItemDiv.firstChild && equippedItemDiv.firstChild.tagName === 'IMG') {
        const item = {
          type: slot.id.split('-')[0], // Extract the item type from the slot id
          img: equippedItemDiv.firstChild.src,
          name: equippedItemDiv.firstChild.alt,
          attack: parseInt(equippedItemDiv.firstChild.dataset.attack, 10) || 0,
          defense: parseInt(equippedItemDiv.firstChild.dataset.defense, 10) || 0,
          objectEffect: equippedItemDiv.firstChild.dataset.objectEffect || '',
          itemType: equippedItemDiv.firstChild.dataset.itemType,
          consumable: equippedItemDiv.firstChild.dataset.consumable === 'true' ? true : false,
          class: equippedItemDiv.firstChild.dataset.class
        };

        // Clean the equippedItemDiv
        equippedItemDiv.innerHTML = '';

        // Show the default image again
        defaultImageDiv.firstChild.style.visibility = 'visible';

        // Add the item back to the backpack
        addToBackpack(item);
      }
    });
  });
}