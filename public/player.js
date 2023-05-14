let attack = 10;
let defense = 10;
let promotionValue = 100;

const promotionButton = document.getElementById('promotion');
const attackSpan = document.getElementById('attack');
const defenseSpan = document.getElementById('defense');

attackSpan.textContent = attack;
defenseSpan.textContent = defense;
promotionButton.textContent = `Promote for ${promotionValue} coins`;

function showOrHidePromotionButton(level) {
  const isPromoted = localStorage.getItem('isPromoted') === 'true';

  if (level >= 2 && !isPromoted) {
    promotionButton.style.display = 'block';
  } else {
    promotionButton.style.display = 'none';
  }
}
showOrHidePromotionButton(level);

const promotionMapping = {
  Knight: 'Elite Knight',
  Paladin: 'Holy Paladin',
  Mage: 'Archmage',
  Elf: 'Elder Elf',
  Warrior: 'Warlord',
  Druid: 'Archdruid'
};

function promotion() {
  if (moneyCount >= promotionValue) {
    if (selectedVocation && promotionMapping.hasOwnProperty(selectedVocation)) {
      const promotedVocation = promotionMapping[selectedVocation];
  
      if (vocationImages.hasOwnProperty(promotedVocation)) {
        const promotedVocationImagesData = vocationImages[promotedVocation];
        playerImageElement.src = `sprites/${promotedVocationImagesData.alive}`;
        playerDeadImageElement.src = `sprites/${promotedVocationImagesData.dead}`;
      }
    }
    moneyCount -= promotionValue;
    moneyCountSpan.textContent = moneyCount;
    promotionButton.style.display = 'none';
    localStorage.setItem('isPromoted', 'true');
    updateLog("Congratulations! You have been promoted!");
  } else {
    updateLog("You don't have enough coins for promotion.");
  }
}

promotionButton.addEventListener('click', promotion);

function updatePlayerHealthBar() {
    if (currentPlayerHealth <= 0) {
      playerHealthBar.style.width = `0%`;
      playerHealthBar.textContent = '';
      dead.style.display = 'block';
    } else {
      const playerHealthPercentage = (currentPlayerHealth / playerHealth) * 100;
      playerHealthBar.style.width = `${playerHealthPercentage}%`;
      if (playerHealthPercentage > 70) {
        playerHealthBar.style.backgroundColor = 'green';
      } else if (playerHealthPercentage > 50) {
        playerHealthBar.style.backgroundColor = 'orange';
      } else if (playerHealthPercentage > 30) {
        playerHealthBar.style.backgroundColor = '#d8fb17'
      } else if (playerHealthPercentage > 5) {
        playerHealthBar.style.backgroundColor = '#9b2c2c'
      }
      playerHealthBar.textContent = `HP: ${currentPlayerHealth}/${playerHealth}`;
    }
  }
    
    function getPlayerHealth (){
      playerHealth = 100;
      currentPlayerHealth = playerHealth;
      updatePlayerHealthBar();
    }
    getPlayerHealth();

    function calculateDamage(attack) {
      const normalDamageDealt = Math.floor(Math.random() * 8) + attack - 5;
      let isCritical = false;    
      if (criticalChance >= Math.random() * 100) {
        const criticalDamageDealt = normalDamageDealt + Math.floor(Math.random() * (normalDamageDealt * criticalDamage) / 100 + 20);
        damageDealt = criticalDamageDealt;
        isCritical = true;
      } else {
        damageDealt = normalDamageDealt;
      }
      const randomX = Math.random();
      const randomY = Math.random();
      const damageContainer = document.createElement('div');
      damageContainer.classList.add('damage-container');
      const damageNumber = document.createElement('span');
      damageNumber.classList.add('damage-number');
      if (isCritical) {
        damageNumber.classList.add('critical');
      }
      damageNumber.textContent = damageDealt;
      damageNumber.style.top = `calc(${randomY} * 100%)`;
      damageNumber.style.left = `calc(${randomX} * 100%)`;
      const gameContainer = document.getElementById('game-container');
      gameContainer.appendChild(damageNumber);
      const animationDuration = Math.random() * 2 + 1;
      damageNumber.style.animationDuration = `${animationDuration}s`;
      setTimeout(() => {
        damageNumber.remove();
      }, animationDuration * 1000);
    }
    
    
    damageNumber.addEventListener('animationend', () => {
      damageNumber.textContent = '';
    });

    function calculateDamageBlocked(defense) {
      const monsterAttack = Math.floor(Math.random() * 50) + 1;
      const damageTaken = Math.max(0, monsterAttack - damageBlocked);
      damageBlocked = Math.floor(Math.random() * (defense / 2)) + (defense / 2);
    
      if (damageDealt > maxDamageDealt) {
        maxDamageDealt = damageDealt;
        topDamageDealt.textContent = maxDamageDealt;
      }
      currentMonsterHealth -= damageDealt;
      updateHealthBar();
    
      if (damageTaken > maxDamageTaken) {
        maxDamageTaken = damageTaken;
        topDamageTaken.textContent = maxDamageTaken;
      }
      currentPlayerHealth -= damageTaken;
    
      if (damageTaken === 0) {
        const randomX = Math.random();
        const randomY = Math.random();
        const blockedMessage = document.createElement('span');
        blockedMessage.classList.add('damage-number');
        blockedMessage.classList.add('blocked');
        blockedMessage.textContent = 'Blocked!';
        blockedMessage.style.top = `calc(${randomY} * 100%)`;
        blockedMessage.style.left = `calc(${randomX} * 100%)`;
        blockedMessage.style.color = 'blue';
    
        const gameContainer = document.getElementById('game-container2');
        gameContainer.appendChild(blockedMessage);
    
        const animationDuration = Math.random() * 2 + 1;
        blockedMessage.style.animationDuration = `${animationDuration}s`;
    
        setTimeout(() => {
          blockedMessage.remove();
        }, animationDuration * 1000);
      } else {
        const randomX = Math.random();
        const randomY = Math.random();
        const damageNumber = document.createElement('span');
        damageNumber.classList.add('damage-number');
        damageNumber.textContent = damageTaken;
        damageNumber.style.top = `calc(${randomY} * 100%)`;
        damageNumber.style.left = `calc(${randomX} * 100%)`;
    
        const gameContainer = document.getElementById('game-container2');
        gameContainer.appendChild(damageNumber);
    
        const animationDuration = Math.random() * 2 + 1;
        damageNumber.style.animationDuration = `${animationDuration}s`;
    
        setTimeout(() => {
          damageNumber.remove();
        }, animationDuration * 1000);
      }
    }
    