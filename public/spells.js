let wastedMana = 0;
let effectApply = 0;

function calculateSpellEffect() {
    const base = Math.floor(Math.random() * 5 + (magicSkill + 1) * level);

    
    switch (selectedVocation) {
      case 'Knight':
        return base;
      case 'Elite Knight':
        return Math.round(base * 1.1);
      case 'Warrior':
        return base;
      case 'Warlord':
        return Math.round(base * 1.2);
      case 'Paladin':
        return Math.round(base * 1.2);
      case 'Holy Paladin':
        return Math.round(base * 1.3);
      case 'Elf':
        return Math.round(base * 1.4);
      case 'Elder Elf':
        return Math.round(base * 1.5);
      case 'Mage':
      case 'Druid':
      return Math.round(base * 1.6);
      case 'Archmage':
      case 'Archdruid':
        return Math.round(base * 1.8);
      default:
        return base;
    }
  }

const spellsItems = [
    {
      name: 'Luminura',
      description: 'Harness the gentle glow of divine light. Restore a modest amount of health, rejuvenating your body and rekindling hope in times of need.',
      spellType: 'health',
      price: 100,
      level: 2,
      vocation: ['Knight', 'Elite Knight', 'Paladin', 'Holy Paladin', 'Mage', 'Archmage', 'Elf', 'Elder Elf', 'Warrior', 'Warlord', 'Druid', 'Archdruid'],
      manaCost: 25,
      image: 'smallHealing.png',
      coolDown: 2,
      onCooldown: false,
      spellEffect: () => {
        let healingAmount;
        if ((currentPlayerHealth + calculateSpellEffect()) > playerHealth) {
          healingAmount = playerHealth - currentPlayerHealth;
          currentPlayerHealth = playerHealth;
        } else {
          healingAmount = calculateSpellEffect();
          currentPlayerHealth = currentPlayerHealth + healingAmount;
        }
        if (isHealNumberEnabled) {
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
      }
      
        updatePlayerHealthBar();
      }      
    },
    {
        name: 'Mediura',
        description: 'Channel the healing energies of the arcane. Infuse yourself with revitalizing power, mending wounds and restoring vitality to embark on your heroic journey.',
        spellType: 'health',
        price: 100,
        level: 3,
        vocation: [ 'Paladin', 'Holy Paladin', 'Mage', 'Archmage', 'Elf', 'Elder Elf', 'Druid', 'Archdruid'],
        manaCost: 50,
        image: 'mediumHealing.png',
        coolDown: 4,
        onCooldown: false,
        spellEffect: () => {
          let healingAmount;
          if ((currentPlayerHealth + (calculateSpellEffect() * 1.8)) > playerHealth) {
            healingAmount = playerHealth - currentPlayerHealth;
            currentPlayerHealth = playerHealth;
          } else {
            healingAmount = calculateSpellEffect();
            currentPlayerHealth = currentPlayerHealth + healingAmount;
          }
        
          if (isHealNumberEnabled) {
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
          }
        
          updatePlayerHealthBar();
        }        
        },
        {
            name: 'Levitori',
            description: 'Unleash a powerful strike, harnessing your knightly strength. Crush foes with a mighty blow and emerge as a champion of justice',
            spellType: 'attack',
            price: 100,
            level: 3,
            vocation: [ 'Knight', 'Elite Knight', 'Paladin', 'Holy Paladin', 'Mage', 'Archmage', 'Elf', 'Elder Elf', 'Druid', 'Archdruid'],
            manaCost: 30,
            image: 'smallAttack.png',
            coolDown: 3.5,
            onCooldown: false,
            spellEffect: () => {
              let attackSpellAmount;
              attackSpellAmount = calculateSpellEffect();
              currentMonsterHealth -= attackSpellAmount;
              if (currentMonsterHealth<= 0){
                defeatMonster();
              }
              updateHealthBar();
            
              if (isSpellDamageEnabled) {
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
          },
          {
            name: 'Ignisori',
            description: 'Set enemies ablaze with fiery fury. Engulf your foes in relentless flames, scorching them turn after turn. Burn, conquer, and leave nothing but ashes in your wake.',
            spellType: 'attack',
            price: 100,
            level: 4,
            vocation: ['Holy Paladin', 'Mage', 'Archmage', 'Elder Elf', 'Druid', 'Archdruid'],
            manaCost: 35,
            image: 'smallIgnite.png',
            coolDown: 14,
            onCooldown: false,
            spellEffect: () => {
              let attackSpellAmount = Math.floor(calculateSpellEffect()/6); // Use Math.floor to round down and remove decimals
              let hitCount = 0;
              const intervalId = setInterval(() => {
                currentMonsterHealth -= attackSpellAmount;
                if (currentMonsterHealth <= 0) {
                  defeatMonster();
                  clearInterval(intervalId);
                }
                updateHealthBar();
                hitCount++;
                if(hitCount === 5) {
                  clearInterval(intervalId);
                }
          
                // Move the damage display code into the interval function
                if (isSpellDamageEnabled) {
                  const randomX = Math.random();
                  const randomY = Math.random();
                  const attackNumber = document.createElement('span');
                  attackNumber.classList.add('damage-number');
                  attackNumber.textContent = attackSpellAmount;
                  attackNumber.style.color = 'orange'; // Make the damage numbers orange
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
                
              }, 2000); // Apply damage every 2 seconds
            }
          },
          {
            name: 'Lumito',
            description: 'Unleash the power within. Tap into your hidden potential, amplifying your skills by 5 points. Become an unstoppable force, surpassing all limitations with newfound mastery.',
            spellType: 'attack',
            price: 100,
            level: 5,
            vocation: [ 'Knight', 'Elite Knight', 'Holy Paladin', 'Elder Elf'],
            manaCost: 40,
            image: 'smallEnforcement.png',
            coolDown: 60,
            onCooldown: false,
            spellEffect: () => {
              swordSkill += 5;
              crossBowSkill += 5;
              wandSkill += 5;
              bowSkill += 5;
              axeSkill += 5;
              rodSkill += 5;
              setTimeout(() => {
                swordSkill -= 5;
                crossBowSkill -= 5;
                wandSkill -= 5;
                bowSkill -= 5;
                axeSkill -= 5;
                rodSkill -= 5;
              }, 20000);
            }
          },
          {
            name: 'Sacrum Hastam',
            description: 'Holy Spear of Radiance: Channel divine energy to pierce darkness, dealing devastating damage. Vanquish evil with righteous might.',
            spellType: 'attack',
            price: 100,
            level: 5,
            vocation: ['Holy Paladin', 'Elder Elf'],
            manaCost: 45,
            image: 'smallAttackDistance.png',
            coolDown: 4,
            onCooldown: false,
            spellEffect: () => {
              let attackSpellAmount;
              attackSpellAmount = Math.round((calculateSpellEffect())*1.4);
              currentMonsterHealth -= attackSpellAmount;
              if (currentMonsterHealth<= 0){
                defeatMonster();
              }
              updateHealthBar();
            
              if (isSpellDamageEnabled) {
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
          },
          {
            name: 'Terrafirmus',
            description: 'Terrafirmus is a powerful spell that harnesses the earth\'s essence to bind and immobilize the targeted monster, rendering it rooted to the ground. The roots emerge from the earth, entangling the creature and restricting its movement, disabling its attacks for 5 turns.',
            spellType: 'root',
            price: 100,
            level: 5,
            vocation: ['Archmage', 'Archdruid'],
            manaCost: 70,
            image: 'smallRooting.png',
            coolDown: 45,
            onCooldown: false,
            spellEffect: () => {
              const disableAttackTurns = 5;
              // Set the disableAttackTurns to the desired duration
              
              // Store the original attack values of the monster, boss, and grand boss
              const originalMonsterAttack = monsterAttack;
              const originalBossAttack = bossAttack;
              const originalGrandBossAttack = grandBossAttack;
              
              // Set the attack values to 0 for the specified number of turns
              monsterAttack = 0;
              bossAttack = 0;
              grandBossAttack = 0;
              
              if (isSpellDamageEnabled) {
                const randomX = Math.random();
                const randomY = Math.random();
                const rootedMessage = document.createElement('span');
                rootedMessage.classList.add('rootedMessage');
                rootedMessage.textContent = 'Rooted!';
                rootedMessage.style.top = `calc(${randomY} * 100%)`;
                rootedMessage.style.left = `calc(${randomX} * 100%)`;
                const gameContainer = document.getElementById('game-container');
                gameContainer.appendChild(rootedMessage);
                const animationDuration = 6;
                rootedMessage.style.animationDuration = `${animationDuration}s`;
                setTimeout(() => {
                  monsterAttack = originalMonsterAttack;
                  bossAttack = originalBossAttack;
                  grandBossAttack = originalGrandBossAttack;
                  rootedMessage.remove();
                }, disableAttackTurns * 1000);
              }
            }                       
          },
          {
            name: 'Essentia Amplifica',
            description: 'Essentia Amplifica is a potent spell that channels the raw essence of magic, enhancing the healing and mana restoration capabilities of the caster. For a duration of 10 seconds, the healing and mana rates are multiplied by 3.',
            spellType: 'health',
            price: 100,
            level: 10,
            vocation: ['Elite Knight', 'Royal Paladin', 'Warlord', 'Elder Elf', 'Archmage', 'Archdruid'],
            manaCost: 70,
            image: 'smallHealEnhancement.png',
            coolDown: 100,
            onCooldown: false,
            spellEffect: () => {
              const duration = 15; // Duration in seconds
              
              // Store the original healing and mana rates
              const originalHealingRate = healingRates[selectedVocation].healthRate;
              const originalManaRate = manaRates[selectedVocation].manaRate;
              
              // Multiply the rates by 3
              healingRates[selectedVocation].healthRate *= 4;
              manaRates[selectedVocation].manaRate *= 4;
              
              // Restore the original rates after the duration
              setTimeout(() => {
                healingRates[selectedVocation].healthRate = originalHealingRate;
                manaRates[selectedVocation].manaRate = originalManaRate;
              }, duration * 1000);
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
  
    spellsContainer.boughtItems.forEach((item, index) => {
      const boughtItem = document.createElement('div');
      boughtItem.className = 'bought-item';
      boughtItem.dataset.index = index;
      boughtItem.style.display = 'flex';
      boughtItem.style.flexDirection = 'column';
      boughtItem.style.justifyContent = 'center';
      boughtItem.style.alignItems = 'center';
      item.key = item.key || `${index + 1}`; // Use saved key or assign a default key
      boughtItem.dataset.key = item.key;
  
      const spellImage = document.createElement('img');
      spellImage.src = `/sprites/spells/${item.image}`;
      spellImage.alt = item.name;
      spellImage.className = 'spell-img';
      spellImage.style.marginTop = '15px';
  
      const assignedKey = document.createElement('div');
      assignedKey.textContent = item.key; // Keys are 1-indexed
      assignedKey.style.fontSize = '14px'; // Adjust font size as needed
      assignedKey.style.color = '#fff'; // Adjust color as needed
  
      const coolDownOverlay = document.createElement('div');
      coolDownOverlay.className = 'cooldown-overlay';
  
      const coolDownTimer = document.createElement('span');
      coolDownTimer.className = 'cooldown-timer';
  
      boughtItem.append(spellImage, assignedKey, coolDownOverlay, coolDownTimer);
      spellsBought.appendChild(boughtItem);
  
      boughtItem.onclick = () => {
        if (currentPlayerMana < item.manaCost) {
          updateLog("You don't have enough Mana.");
        } else {
          if (!item.onCooldown) {
            currentPlayerMana -= item.manaCost;
            wastedMana += item.manaCost;
            item.spellEffect();
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
    });
  
    // Retrieve saved key assignments and update the displayed keys
    const keyAssignmentsContainer = document.getElementById('keyAssignments');
    keyAssignmentsContainer.innerHTML = ''; // Clear previous inputs
  
    spellsContainer.boughtItems.forEach((item, index) => {
      const keyAssignmentDiv = document.createElement('div');
  
      const label = document.createElement('label');
      label.textContent = `Key for ${item.name}: `;
      keyAssignmentDiv.appendChild(label);
  
      const input = document.createElement('input');
      input.type = 'text';
      input.value = item.key; // Current key assignment
      input.dataset.index = index; // Store index of spell this input corresponds to
      input.addEventListener('change', function() {
        const newKey = this.value;
        if (newKey.length !== 1) {
          alert('Invalid key assignment. Please enter a single character.');
          this.value = item.key; // Reset to current key assignment
        } else {
          // Update key assignment
          item.key = newKey;
  
          // Update key displayed under spell image
          const boughtItems = document.getElementsByClassName('bought-item');
          boughtItems[index].children[1].textContent = newKey;
  
          // Update dataset property
          boughtItems[index].dataset.key = newKey;
        }
      });
  
      keyAssignmentDiv.appendChild(input);
  
      keyAssignmentsContainer.appendChild(keyAssignmentDiv);
    });
  }
  
  window.addEventListener('keydown', function(event) {
    const key = event.key;
    const activeElement = document.activeElement;
    const isInputFocused = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
  
    if (!isInputFocused) {
      // Find the bought spell that is assigned to this key
      const spellElement = Array.from(document.getElementsByClassName('bought-item')).find(
        element => element.dataset.key === key
      );
  
      // If a spell is found, simulate a click event on the spell
      if (spellElement) {
        spellElement.click();
      }
    }
  });
  
  