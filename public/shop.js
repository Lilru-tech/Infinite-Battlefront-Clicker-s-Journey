function healPlayerPotion(amount) {
  if (currentPlayerHealth + amount > playerHealth){
    currentPlayerHealth = playerHealth;
  } else {
    currentPlayerHealth += amount;
  }
}

function manaPlayerPotion(amount) {
  if (currentPlayerMana+amount>playerMana){
    currentPlayerMana = playerMana;
  } else {
    currentPlayerMana = currentPlayerMana+amount;
  }
}

const shopStatsItems = [
    {
      name: '+1 Attack',
      description: 'Increase attack',
      itemType: 'attack',
      price: 10,
      effect: () => {
        attack += 1;
        shopStatsItems[0].price = Math.round(shopStatsItems[0].price * 1.15);
      }
    },
    {
        name: '+1 Defense',
        description: 'Increase defense',
        itemType: 'defense',
        price: 10,
        effect: () => {
          defense += 1;
          shopStatsItems[1].price = Math.round(shopStatsItems[1].price * 1.15);
        }
      },
      {
        name: '+1 Health Point',
        description: 'Increase health',
        itemType: 'playerHealth',
        price: 100,
        effect: () => {
          playerHealth += 1;
          shopStatsItems[2].price = Math.round(shopStatsItems[2].price * 1.15);
          updatePlayerHealthBar();
        }
      },
      {
        name: '+1% Critical Chance',
        description: 'Increase critical probability',
        itemType: 'criticalChance',
        price: 500,
        effect: () => {
          criticalChance += 1;
          shopStatsItems[3].price = Math.round(shopStatsItems[3].price * 1.15);
        }
      },
      {
        name: '+1% Critical Damage',
        description: 'Increase critical damage',
        itemType: 'criticalDamage',
        price: 1000,
        effect: () => {
          criticalDamage += 1;
          shopStatsItems[4].price = Math.round(shopStatsItems[4].price * 1.15);
        }
      },
      {
        name: '+1 Backpack Slot',
        description: 'Increase backpack size',
        itemType: 'backpackSlot',
        price: 500, 
        effect: () => {
          if (backpackSize < 20) {
            backpackSize++;
            addBackpackSlot();
            backPackAchievement();
            shopStatsItems[shopStatsItems.length-1].price = Math.round(shopStatsItems[shopStatsItems.length-1].price * 1.15);
          }
          if (backpackSize >= 20) {
            let buySlotButtons = document.querySelectorAll('[id=shopBuyButton]');
            for(let i = 0; i < buySlotButtons.length; i++) {
              if(buySlotButtons[i].dataset.index == "5") {
                  buySlotButtons[i].classList.add('button-disabled'); // Add the 'button-disabled' class
                  buySlotButtons[i].disabled = true; // Disable the button
                  break;
              }
            }
          }
        }
      }
  ];

  const shopItemsItems = [
    {
      name: 'Small Health Potion',
      description: 'It heals you 100 health points',
      itemType: 'smallHealth',
      price: 100,
      img: 'sprites/objects/smallHealthPotion.png',
      effect: function(){
        healPlayerPotion(100);
        updatePlayerHealthBar();
      }
    },
    {
      name: 'Small Mana Potion',
      description: 'It recovers you 100 mana points',
      itemType: 'smallMana',
      price: 100,
      img: 'sprites/objects/smallManaPotion.png',
      effect: function(){
        manaPlayerPotion(100);
        updatePlayerManaBar();
      }
    },
    {
      name: 'Medium Health Potion',
      description: 'It heals you 250 health points',
      itemType: 'mediumHealth',
      price: 300,
      img: 'sprites/objects/mediumHealthPotion.png',
      effect: function(){
        healPlayerPotion(250);
        updatePlayerHealthBar();
      }
    },
    {
      name: 'Medium Mana Potion',
      description: 'It recovers you 250 mana points',
      itemType: 'mediumMana',
      price: 300,
      img: 'sprites/objects/mediumManaPotion.png',
      effect: function(){
        manaPlayerPotion(250);
        updatePlayerManaBar();
      }
    },
    {
      name: 'Great Health Potion',
      description: 'It heals you 500 health points',
      itemType: 'greatHealth',
      price: 750,
      img: 'sprites/objects/greatHealthPotion.png',
      effect: function(){
        healPlayerPotion(500);
        updatePlayerHealthBar();
      }
    },
    {
      name: 'Great Mana Potion',
      description: 'It recovers you 500 mana points',
      itemType: 'greatMana',
      price: 750,
      img: 'sprites/objects/greatManaPotion.png',
      effect: function(){
        manaPlayerPotion(500);
        updatePlayerManaBar();
      }
    }
  ];
  
  let originalEffects = new Map();
  shopItemsItems.forEach((item) => {
      if (typeof item.effect === 'function') {
          originalEffects.set(item.itemType, item.effect);
          item.effect = () => addPotionToBackpack(item); // Overwrite the effect here
      } else {
          console.log(`Effect not found or not a function for itemType: ${item.itemType}`);
      }
  });
  
  function addPotionToBackpack(item) {
    let sameItemSlot = Array.from(document.getElementsByClassName('backpack-slot')).find(slot => {
        let child = slot.firstChild;
        return child && child.dataset.itemType === item.itemType && parseInt(child.dataset.count, 10) < 100;
    });
  
    if (sameItemSlot) {
        let itemImg = sameItemSlot.firstChild;
        let itemCount = sameItemSlot.getElementsByClassName('item-count')[0];
        let count = parseInt(itemImg.dataset.count, 10);
        itemImg.dataset.count = count + 1;
        itemCount.textContent = count + 1;
    } else {
        // find first empty slot
        let emptySlot = Array.from(document.getElementsByClassName('backpack-slot')).find(slot => !slot.firstChild);
        if (emptySlot) {
            let itemImg = document.createElement('img');
            itemImg.src = item.img;
            itemImg.dataset.count = 1;
            itemImg.dataset.itemType = item.itemType;
            itemImg.width = 50;
            itemImg.height = 50;
            itemImg.title = item.name;
            const originalEffect = originalEffects.get(item.itemType);
            if (originalEffect) {
              itemImg.onclick = () => {
                originalEffect();
                let count = parseInt(itemImg.dataset.count, 10);
                if (count > 1) {
                  itemImg.dataset.count = count - 1;
                  itemCount.textContent = count - 1;
                } else {
                  emptySlot.removeChild(itemCount);
                  emptySlot.removeChild(itemImg);
                }
              };
            } else {
              console.log(`No effect found for itemType: ${item.itemType}`);
            }
            emptySlot.appendChild(itemImg);
  
            let itemCount = document.createElement('span');
            itemCount.className = 'item-count';
            itemCount.textContent = '1';
            emptySlot.appendChild(itemCount);
        }
    }
}
  
const shopStats = {
    element: document.getElementById('shopStats'),
    items: shopStatsItems
  };
  
  const shopItems = {
    element: document.getElementById('shopItems'),
    items: shopItemsItems
  };  
  
  function generateShopStatsItems() {
    const shopList = document.createElement('ul');
    shopList.className = 'shop-list';
  
    const rightFoldableContainer1 = document.getElementById('rightFoldableContainer1');
    rightFoldableContainer1.style.display = 'grid';
    rightFoldableContainer1.style.gridTemplateColumns = 'repeat(2, 1fr)';
    rightFoldableContainer1.style.gap = '10px';
  
    const firstColumn = document.createElement('div');
    const secondColumn = document.createElement('div');
  
    shopStats.items.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'shop-stats-item';
  
      const purchaseButton = document.createElement('button');
      purchaseButton.className = 'button';
      purchaseButton.id = 'shopBuyButton';
      purchaseButton.dataset.price = item.price;
      purchaseButton.dataset.index = index;
      purchaseButton.title = item.description;
  
      const itemName = document.createElement('span');
      itemName.textContent = item.name;
      purchaseButton.appendChild(itemName);
  
      const itemPrice = document.createElement('p');
      itemPrice.textContent = `${item.price} coins`;
      purchaseButton.appendChild(itemPrice);
  
      listItem.appendChild(purchaseButton);
  
      if (index % 2 === 0) {
        firstColumn.appendChild(listItem);
      } else {
        secondColumn.appendChild(listItem);
      }
  
      purchaseButton.onclick = () => {
        const price = parseInt(purchaseButton.dataset.price, 10);
        if (moneyCount >= price) {
          updateLog("You bought " + item.name + " for " + item.price + " coins");
          item.effect();
          moneyCount -= price;
          updateMoneyCount(moneyCount);
          if (item.itemType === 'attack') {
            attackSpan.textContent = attack;
          } else if (item.itemType === 'defense') {
            defenseSpan.textContent = defense;
          } else if (item.itemType === 'criticalChance') {
            criticalChanceSpan.textContent = ' ' + criticalChance + '%';
          } else if (item.itemType === 'criticalDamage') {
            criticalDamageSpan.textContent = ' ' + criticalDamage + '%';
          }
          itemPrice.textContent = `${item.price} coins`;
          purchaseButton.dataset.price = item.price;
        } else {
          updateLog("You don't have enough money to buy this item.");
        }
      };
    });
  
    rightFoldableContainer1.innerHTML = '';
    rightFoldableContainer1.appendChild(firstColumn);
    rightFoldableContainer1.appendChild(secondColumn);
  
  }

  function purchaseItem(item) {
    addPotionToBackpack(item);
  }  

  function generateShopItemsItems() {
    const shopList = document.createElement('ul');
    shopList.className = 'shop-list';
  
    const rightFoldableContainer2 = document.getElementById('rightFoldableContainer2');
    rightFoldableContainer2.style.display = 'grid';
    rightFoldableContainer2.style.gridTemplateColumns = 'repeat(2, 1fr)';
    rightFoldableContainer2.style.gap = '10px';
  
    const firstColumn = document.createElement('div');
    const secondColumn = document.createElement('div');

    shopItems.items.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'shop-items-item';
  
      const purchaseButton = document.createElement('button');
      purchaseButton.className = 'button';
      purchaseButton.id = 'shopBuyButton';
      purchaseButton.dataset.price = item.price;
      purchaseButton.dataset.index = index;
      purchaseButton.title = item.description;
  
      const itemName = document.createElement('span');
      itemName.textContent = item.name;
      purchaseButton.appendChild(itemName);
  
      const itemPrice = document.createElement('p');
      itemPrice.textContent = `${item.price} coins`;
      purchaseButton.appendChild(itemPrice);
  
      listItem.appendChild(purchaseButton);
  
      if (index % 2 === 0) {
        firstColumn.appendChild(listItem);
      } else {
        secondColumn.appendChild(listItem);
      }
  
      purchaseButton.onclick = () => {
        const price = parseInt(purchaseButton.dataset.price, 10);
        if (moneyCount >= price) {
          updateLog("You bought " + item.name + " for " + item.price + " coins");
          purchaseItem(item);  // This is the new function you'd define
          moneyCount -= price;
          updateMoneyCount(moneyCount);
          itemPrice.textContent = `${item.price} coins`;
          purchaseButton.dataset.price = item.price;
        } else {
          updateLog("You don't have enough money to buy this item.");
        }
      };      
    });

    rightFoldableContainer2.innerHTML = '';
    rightFoldableContainer2.appendChild(firstColumn);
    rightFoldableContainer2.appendChild(secondColumn);
  }
  

  function updateMoneyCount(newMoneyCount) {
    moneyCount = newMoneyCount;
    moneyCountSpan.textContent = moneyCount;
  }