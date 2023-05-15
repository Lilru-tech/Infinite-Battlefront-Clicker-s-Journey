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
      }
  ];

  const shopItemsItems = [
    {
      name: 'Small Health Potion',
      description: 'It heals you 100 health points',
      itemType: 'health',
      price: 100,
      effect: () => {
        if (currentPlayerHealth+100>playerHealth){
          currentPlayerHealth = playerHealth;
        } else {
          currentPlayerHealth = currentPlayerHealth+100;
        }
        updatePlayerHealthBar();
      }
    },
    {
      name: 'Medium Health Potion',
      description: 'It heals you 250 health points',
      itemType: 'health',
      price: 300,
      effect: () => {
        if (currentPlayerHealth+250>playerHealth){
          currentPlayerHealth = playerHealth;
        } else {
          currentPlayerHealth = currentPlayerHealth+250;
        }
        updatePlayerHealthBar();
      }
    }
  ];

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
  
    rightFoldableContainer1.innerHTML = '';
    rightFoldableContainer1.appendChild(firstColumn);
    rightFoldableContainer1.appendChild(secondColumn);
  
    if (rightFoldableContainer1.style.display === 'none') {
      shopStatsButton.innerHTML = 'Stats Shop';
    } else {
      shopStatsButton.innerHTML = 'Stats Shop';
    }
    shopStatsButton.addEventListener('click', () => {
      if (rightFoldableContainer1.style.display === 'none') {
        rightFoldableContainer1.style.display = 'grid';
        shopStatsButton.innerHTML = 'Stats Shop';
      } else {
        rightFoldableContainer1.style.display = 'none';
        shopStatsButton.innerHTML = 'Stats Shop';
      }
    });
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
          item.effect();
          moneyCount -= price;
          updateMoneyCount(moneyCount);
          if (item.itemType === 'health') {
            playerHealthBar.textContent = `HP: ${currentPlayerHealth}/${playerHealth}`;
          }
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
  
    if (rightFoldableContainer2.style.display === 'none') {
      shopItemsButton.innerHTML = 'Items Shop';
    } else {
      shopItemsButton.innerHTML = 'Items Shop';
    }
    shopItemsButton.addEventListener('click', () => {
      if (rightFoldableContainer2.style.display === 'none') {
        rightFoldableContainer2.style.display = 'grid';
        shopItemsButton.innerHTML = 'Items Shop';
      } else {
        rightFoldableContainer2.style.display = 'none';
        shopItemsButton.innerHTML = 'Items Shop';
      }
    });
  }
  

  function updateMoneyCount(newMoneyCount) {
    moneyCount = newMoneyCount;
    moneyCountSpan.textContent = moneyCount;
  }