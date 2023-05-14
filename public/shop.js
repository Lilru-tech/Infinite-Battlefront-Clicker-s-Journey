// Define the shop items
const shopItems = [
    {
      name: '+1 Attack',
      description: 'Increase attack',
      itemType: 'attack',
      price: 10,
      effect: () => {
        attack += 1;
          shopItems[0].price = Math.round(shopItems[0].price * 1.15);
      }
    },
    {
        name: '+1 Defense',
        description: 'Increase defense',
        itemType: 'defense',
        price: 10,
        effect: () => {
          defense += 1;
          shopItems[1].price = Math.round(shopItems[1].price * 1.15);
        }
      },
      {
        name: '+1 Health Point',
        description: 'Increase health',
        itemType: 'playerHealth',
        price: 100,
        effect: () => {
          playerHealth += 1;
          shopItems[2].price = Math.round(shopItems[2].price * 1.15);
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
          shopItems[3].price = Math.round(shopItems[3].price * 1.15);
        }
      },
      {
        name: '+1% Critical Damage',
        description: 'Increase critical damage',
        itemType: 'criticalDamage',
        price: 1000,
        effect: () => {
          criticalDamage += 1;
          shopItems[4].price = Math.round(shopItems[4].price * 1.15);
        }
      }
  ];

// Create the shop
const shop = {
    element: document.getElementById('shop'),
    items: shopItems
  };
  
  // Generate the shop items
  function generateShopItems() {
    const shopList = document.createElement('ul');
    shopList.className = 'shop-list';
  
    const rightFoldableContainer = document.getElementById('rightFoldableContainer');
    rightFoldableContainer.style.display = 'grid';
    rightFoldableContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    rightFoldableContainer.style.gap = '10px';
  
    const firstColumn = document.createElement('div');
    const secondColumn = document.createElement('div');
  
    shop.items.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'shop-item';
  
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
          } else if (item.itemType === 'playerHealth') {
            playerHealthBar.textContent = 'HP: ' + currentPlayerHealth + '/' + playerHealth;
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
  
    rightFoldableContainer.innerHTML = '';
    rightFoldableContainer.appendChild(firstColumn);
    rightFoldableContainer.appendChild(secondColumn);
  
    if (rightFoldableContainer.style.display === 'none') {
      shopButton.innerHTML = 'Shop';
    } else {
      shopButton.innerHTML = 'Shop';
    }
    shopButton.addEventListener('click', () => {
      if (rightFoldableContainer.style.display === 'none') {
        rightFoldableContainer.style.display = 'grid';
        shopButton.innerHTML = 'Shop';
      } else {
        rightFoldableContainer.style.display = 'none';
        shopButton.innerHTML = 'Shop';
      }
    });
  }
  

  function updateMoneyCount(newMoneyCount) {
    moneyCount = newMoneyCount;
    moneyCountSpan.textContent = moneyCount;
  }