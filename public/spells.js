let wastedMana = 0;
let effectApply = 0;

function calculateSpellEffect() {
    const base = Math.floor(Math.random() * 5 + (magicSkill + 1) * level);

    
    switch (selectedVocation) {
      case 'Knight':
      case 'Elite Knight':
        return base;
      case 'Warrior':
      case 'Warlord':
        return Math.round(base * 1.1);
      case 'Paladin':
      case 'Holy Paladin':
        return Math.round(base * 1.3);
      case 'Elf':
      case 'Elder Elf':
        return Math.round(base * 1.5);
      case 'Mage':
      case 'Archmage':
      case 'Druid':
      case 'Archdruid':
        return Math.round(base * 1.8);
      default:
        return base;
    }
  }

const spellsItems = [
    {
      name: 'Exura',
      description: 'It heals you a bit of health points, depending on your Magic level',
      spellType: 'health',
      price: 100,
      level: 2,
      vocation: ['Knight', 'Elite Knight', 'Paladin', 'Holy Paladin', 'Mage', 'Archmage', 'Elf', 'Elder Elf', 'Warrior', 'Warlord', 'Druid', 'Archdruid'],
      manaCost: 25,
      image: 'smallHealing.png',
      coolDown: 2,
      onCooldown: false,
      effect: () => {
        let healingAmount;
        if ((currentPlayerHealth + calculateSpellEffect()) > playerHealth) {
          healingAmount = playerHealth - currentPlayerHealth;
          currentPlayerHealth = playerHealth;
        } else {
          healingAmount = calculateSpellEffect();
          currentPlayerHealth = currentPlayerHealth + healingAmount;
        }
      
        const randomX = Math.random();
        const randomY = Math.random();
        const healNumber = document.createElement('span');
        healNumber.classList.add('heal-number');
        healNumber.textContent = healingAmount;
        healNumber.style.top = `calc(${randomY} * 100%)`;
        healNumber.style.left = `calc(${randomX} * 100%)`;
        const gameContainer = document.getElementById('game-container2');
        gameContainer.appendChild(healNumber);
        const animationDuration = Math.random() * 2 + 1;
        healNumber.style.animationDuration = `${animationDuration}s`;
        setTimeout(() => {
          healNumber.remove();
        }, animationDuration * 1000);
      
        updatePlayerHealthBar();
      }      
    },
    {
        name: 'Exura Gran',
        description: 'It heals you a bit of health points, depending on your Magic level',
        spellType: 'health',
        price: 100,
        level: 3,
        vocation: [ 'Paladin', 'Holy Paladin', 'Mage', 'Archmage', 'Elf', 'Elder Elf', 'Druid', 'Archdruid'],
        manaCost: 50,
        image: 'mediumHealing.png',
        coolDown: 4,
        onCooldown: false,
        effect: () => {
            let healingAmount;
            if ((currentPlayerHealth + (calculateSpellEffect() * 1.8)) > playerHealth) {
              healingAmount = playerHealth - currentPlayerHealth;
              currentPlayerHealth = playerHealth;
            } else {
              healingAmount = calculateSpellEffect();
              currentPlayerHealth = currentPlayerHealth + healingAmount;
            }
          
            const randomX = Math.random();
            const randomY = Math.random();
            const healNumber = document.createElement('span');
            healNumber.classList.add('heal-number');
            healNumber.textContent = healingAmount;
            healNumber.style.top = `calc(${randomY} * 100%)`;
            healNumber.style.left = `calc(${randomX} * 100%)`;
            const gameContainer = document.getElementById('game-container2');
            gameContainer.appendChild(healNumber);
            const animationDuration = Math.random() * 2 + 1;
            healNumber.style.animationDuration = `${animationDuration}s`;
            setTimeout(() => {
              healNumber.remove();
            }, animationDuration * 1000);
          
            updatePlayerHealthBar();
          }
        },
        {
            name: 'Exori',
            description: 'It heals you a bit of health points, depending on your Magic level',
            spellType: 'attack',
            price: 100,
            level: 3,
            vocation: [ 'Knight', 'Elite Knight', 'Paladin', 'Holy Paladin', 'Mage', 'Archmage', 'Elf', 'Elder Elf', 'Druid', 'Archdruid'],
            manaCost: 30,
            image: 'smallAttack.png',
            coolDown: 3.5,
            onCooldown: false,
            effect: () => {
                let attackSpellAmount;
                attackSpellAmount = calculateSpellEffect();
                currentMonsterHealth -= attackSpellAmount;
                if (currentMonsterHealth<= 0){
                    defeatMonster();
                }
                updateHealthBar();
                const randomX = Math.random();
                const randomY = Math.random();
                const attackNumber = document.createElement('span');
                attackNumber.classList.add('damage-number');
                attackNumber.textContent = attackSpellAmount;
                attackNumber.style.top = `calc(${randomY} * 100%)`;
                attackNumber.style.left = `calc(${randomX} * 100%)`;
                const gameContainer = document.getElementById('game-container');
                gameContainer.appendChild(attackNumber);
                const animationDuration = Math.random() * 2 + 1;
                attackNumber.style.animationDuration = `${animationDuration}s`;
                setTimeout(() => {
                    attackNumber.remove();
                }, animationDuration * 1000);
            }
        }            
    ];

  const spellsContainer = {
    element: document.getElementById('spellsContainer'),
    items: spellsItems,
    boughtItems: []
  };

  function generateSpellsItems() {
    if (spellsContainer.boughtItems.length === 0) {
      document.getElementById('spellsAvailables').style.display = 'none';
    } else {
      document.getElementById('spellsAvailables').style.display = 'block';
    }
    const spellsContent = document.getElementById('spellsContent');
    spellsContent.style.display = 'grid';
    spellsContent.style.gridTemplateColumns = 'repeat(2, 1fr)';
    spellsContent.style.gap = '10px';
  
    const firstColumn = document.createElement('div');
    const secondColumn = document.createElement('div');
  
    spellsContainer.items.forEach((item, index) => {
      if (level >= item.level && item.vocation.includes(selectedVocation)) {
        const isBought = spellsContainer.boughtItems.some(boughtItem => boughtItem.name === item.name);
        if (!isBought) {
          const listItem = document.createElement('li');
          listItem.className = 'spells-item';
  
          const purchaseButton = document.createElement('button');
          purchaseButton.className = 'button';
          purchaseButton.id = 'spellsBuyButton';
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
                updateLog("You bought " + item.name + " spell for " + item.price + " coins");
                moneyCount -= price;
                updateMoneyCount(moneyCount);
                spellsContainer.boughtItems.push(item);
                spellsContainer.items.splice(index, 1);
                generateSpellsItems();
                itemPrice.textContent = `${item.price} coins`;
                purchaseButton.dataset.price = item.price;
                listItem.removeChild(purchaseButton);
            } else {
                updateLog("You don't have enough money to buy this spell.");
            }
        };
        
          
        }
      }
    });
  
    spellsContent.innerHTML = '';
    spellsContent.appendChild(firstColumn);
    spellsContent.appendChild(secondColumn);
  
    const spellsBought = document.getElementById('spellsBought');
    spellsBought.innerHTML = '';
    spellsContainer.boughtItems.forEach(item => {
        const boughtItem = document.createElement('div');
        boughtItem.className = 'bought-item';
        const spellImage = document.createElement('img');
        spellImage.src = `/sprites/spells/${item.image}`;
        spellImage.alt = item.name;
        spellImage.className = 'spell-img';
      
        const coolDownOverlay = document.createElement('div');
        coolDownOverlay.className = 'cooldown-overlay';
        
        const coolDownTimer = document.createElement('span');
        coolDownTimer.className = 'cooldown-timer';
      
        boughtItem.append(spellImage, coolDownOverlay, coolDownTimer);
        spellsBought.appendChild(boughtItem);
        boughtItem.onclick = () => {
            if(currentPlayerMana < item.manaCost) {
              updateLog("You don't have enough Mana.");
            } else {
              if (!item.onCooldown) {
                currentPlayerMana -= item.manaCost;
                wastedMana += item.manaCost;
                console.log(`Total wasted mana: ${wastedMana}`);
                item.effect();
                updatePlayerManaBar();
                coolDownOverlay.style.animation = `cooldown-effect ${item.coolDown}s linear forwards`;
                coolDownOverlay.style.display = "block";
          
                coolDownTimer.textContent = item.coolDown;
                coolDownTimer.style.display = "block";
          
                let countDown = item.coolDown;
                let countDownInterval = setInterval(() => {
                  countDown--;
                  coolDownTimer.textContent = countDown;
                  if (countDown <= 0) {
                    clearInterval(countDownInterval);
                    coolDownOverlay.style.display = "none";
                    coolDownTimer.style.display = "none";
                    coolDownOverlay.style.animation = "";
                    item.onCooldown = false;
                  }
                }, 1000);
                
                item.onCooldown = true;
              } else {
                updateLog("Spell is on cooldown.");
              }
            }
          };
          })}