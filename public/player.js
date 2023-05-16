let attack = 10;
let defense = 10;
let totalAttack = 0;
let promotionValue = 100;
let swordAttackTimes = 0;
let crossBowAttackTimes = 0;
let wandAttackTimes = 0;
let bowAttackTimes = 0;
let axeAttackTimes = 0;
let rodAttackTimes = 0;
let defenseTimes = 0;
let attacksEachPercentage = 0;
let nextSwordSkill = 100;
let nextCrossBowSkill = 100;
let nextWandSkill = 100;
let nextBowSkill = 100;
let nextAxeSkill = 100;
let nextRodSkill = 100;
let nextShieldingSkill = 100;

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
        playerImageElement.src = `sprites/player/${promotedVocationImagesData.alive}`;
        playerDeadImageElement.src = `sprites/player/${promotedVocationImagesData.dead}`;
      }
      selectedVocation = promotedVocation;
      localStorage.setItem('selectedVocation', selectedVocation);
    }
    moneyCount -= promotionValue;
    moneyCountSpan.textContent = moneyCount;
    updateLog("Congratulations! You have been promoted!");
    promotionButton.style.display = 'none';
    localStorage.setItem('isPromoted', 'true');
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
      if (selectedVocation === 'Knight' || selectedVocation === 'Elite Knight'){
        totalAttack = attack + Math.round(swordSkill + 1.25);
      } else if (selectedVocation === 'Paladin' || selectedVocation === 'Holy Paladin'){
        totalAttack = attack + Math.round(crossBowSkill + 1.25);
      } else if (selectedVocation === 'Mage' || selectedVocation === 'Archmage'){
        totalAttack = attack + Math.round(wandSkill + 1.25);
      } else if (selectedVocation === 'Elf' || selectedVocation === 'Elder Elf'){
        totalAttack = attack + Math.round(bowSkill + 1.25);
      } else if (selectedVocation === 'Warrior' || selectedVocation === 'Warlord'){
        totalAttack = attack + Math.round(axeSkill + 1.25);
      } else if (selectedVocation === 'Druid' || selectedVocation === 'Archdruid'){
        totalAttack = attack + Math.round(rodSkill + 1.25);
      }
      const normalDamageDealt = Math.floor(Math.random() * 8) + totalAttack - 5
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
      if (selectedVocation === 'Knight' || selectedVocation === 'Elite Knight'){
        totalAttack = attack + Math.round(shieldingSkill + 1.25);
      } else if (selectedVocation === 'Paladin' || selectedVocation === 'Holy Paladin'){
        totalAttack = attack + Math.round(shieldingSkill + 1);
      } else if (selectedVocation === 'Mage' || selectedVocation === 'Archmage'){
        totalAttack = attack + Math.round(shieldingSkill + 0.5);
      } else if (selectedVocation === 'Elf' || selectedVocation === 'Elder Elf'){
        totalAttack = attack + Math.round(shieldingSkill + 0.8);
      } else if (selectedVocation === 'Warrior' || selectedVocation === 'Warlord'){
        totalAttack = attack + Math.round(shieldingSkill + 1.1);
      } else if (selectedVocation === 'Druid' || selectedVocation === 'Archdruid'){
        totalAttack = attack + Math.round(shieldingSkill + 0.5);
      }
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
    clickButton.addEventListener('click', function() {
      if (swordSkillPercentage >= 100) {
        swordSkillLevelUp();
      }
      if (crossBowSkillPercentage >= 100) {
        crossBowSkillLevelUp();
      }
      if (wandSkillPercentage >= 100) {
        wandSkillLevelUp();
      }
      if (bowSkillPercentage >= 100) {
        bowSkillLevelUp();
      }
      if (axeSkillPercentage >= 100) {
        axeSkillLevelUp();
      }
      if (rodSkillPercentage >= 100) {
        rodSkillLevelUp();
      }
      if (shieldingSkillPercentage >= 100) {
        shieldingSkillLevelUp();
      }
      swordAttackTimes++;
      crossBowAttackTimes++;
      wandAttackTimes++;
      bowAttackTimes++;
      axeAttackTimes++;
      rodAttackTimes++;
      defenseTimes++;
      skillsProgressBar();
      getSwordSkillPercentage();
      getCrossBowSkillPercentage();
      getWandSkillPercentage();
      getBowSkillPercentage();
      getAxeSkillPercentage();
      getRodSkillPercentage();
      getShieldingSkillPercentage();
        calculateDamage(attack);
        calculateDamageBlocked(defense);
        updateExperienceBar(experienceCount, levelUpExperience(level));
        updatePlayerHealthBar();
        showOrHidePromotionButton(level);
      
      // Create the restoreHealthButton element
      const restoreHealthButton = document.createElement('button');
      restoreHealthButton.setAttribute('id', 'restoreHealthButton');
      restoreHealthButton.textContent = 'Restore Health (Cost: 100 Money and 1% of experience)';
      restoreHealthButton.style.display = 'none';
      
      // Create the hardRestoreHealthButton element
      const hardRestoreHealthButton = document.createElement('button');
      hardRestoreHealthButton.setAttribute('id', 'hardRestoreHealthButton');
      hardRestoreHealthButton.textContent = 'Restore Health (Cost: 10% of experience)';
      hardRestoreHealthButton.style.display = 'none';
    
      
      if (currentPlayerHealth <= 0) {
        updateLog("You have been killed by the monster!");
        handlePlayerDeath();
        updateExperienceBar(experienceCount, levelUpExperience(level));
      }
      
      
        if (currentMonsterHealth <= 0) {
          defeatMonster();
          monsterKills++;
          updateExperienceBar(experienceCount, levelUpExperience(level));
        }
      
        // Update counters
        moneyCountSpan.textContent = moneyCount;
        monsterKillSpan.textContent = monsterKills;
        swordSkillSpan.textContent = swordSkill;
        crossBowSkillSpan.textContent = crossBowSkill;
        wandSkillSpan.textContent = wandSkill;
        bowSkillSpan.textContent = bowSkill;
        axeSkillSpan.textContent = axeSkill;
        rodSkillSpan.textContent = rodSkill;
        shieldingSkillSpan.textContent = shieldingSkill;
    });

    function showDeadOverlay() {
      const overlay = document.getElementById('overlay');
      overlay.style.display = 'flex';
    }
    
    document.body.appendChild(restoreHealthButton);
    document.body.appendChild(hardRestoreHealthButton);
    overlay.appendChild(restoreHealthButton);
    overlay.appendChild(hardRestoreHealthButton);
    
    // Define function to handle player death
    function handlePlayerDeath() {
      menuDiv.style.display = 'none';
      leftDiv.style.display = 'none';
      centerDiv.style.display = 'none';
      rightDiv.style.display = 'none';
      playerDeadImage.style.display = 'block';
    
      showDeadOverlay();
    
      const reviveCost = 100;
    
      if (moneyCount >= reviveCost) {
        restoreHealthButton.style.display = 'block';
      } else {
        hardRestoreHealthButton.style.display = 'block';
      }
    }
    
    restoreHealthButton.addEventListener('click', () => {
      skillsLevelDown();
      const reviveCost = 100;
      const experienceLost = experienceCount - Math.floor(experienceCount * 0.99);
      moneyCount -= reviveCost;
      currentPlayerHealth = playerHealth;
      experienceCount -= experienceLost;
      updatePlayerHealthBar();
      moneyCountSpan.textContent = moneyCount;
      menuDiv.style.display = 'flex';
      leftDiv.style.display = 'grid';
      centerDiv.style.display = 'flex';
      rightDiv.style.display = 'flex';
      restoreHealthButton.style.display = 'none';
      dead.style.display = 'none';
      playerDeadImage.style.display = 'none';
      updateLog("You died, lost " + experienceLost + " experience points\n");
      deathCount++;
      deathCountSpan.textContent = deathCount;        
      const overlay = document.getElementById('overlay');
      overlay.style.display = 'none';
      spawnMonster();
      updateExperienceBar(experienceCount, levelUpExperience(level));
    });
    
    hardRestoreHealthButton.addEventListener('click', () => {
      const hardExperienceLost = experienceCount - Math.floor(experienceCount * 0.90);
      updateLog("You don't have enough money, so you will lose 10% of your experience!");
      currentPlayerHealth = playerHealth;
      experienceCount -= hardExperienceLost;
      updatePlayerHealthBar();
      moneyCountSpan.textContent = moneyCount;
      menuDiv.style.display = 'flex';
      leftDiv.style.display = 'grid';
      centerDiv.style.display = 'flex';
      rightDiv.style.display = 'flex';
      hardRestoreHealthButton.style.display = 'none';
      dead.style.display = 'none';
      playerDeadImage.style.display = 'none';
      updateLog("You died, you lost " + hardExperienceLost + " experience points\n");
      deathCount++;
      deathCountSpan.textContent = deathCount;   
        const overlay = document.getElementById('overlay');
      overlay.style.display = 'none';  
      spawnMonster();   
      updateExperienceBar(experienceCount, levelUpExperience(level));
    });

    function getSwordSkillPercentage() {
      const requiredSwordAttacks = nextSwordSkill;
      const swordAttacksEachPercentage = Math.floor(requiredSwordAttacks / 100);
      if (swordAttacksEachPercentage === 0){
        swordSkillPercentage++
        swordAttackTimes=0;
      } else if (swordAttackTimes === swordAttacksEachPercentage){
        swordSkillPercentage++
        swordAttackTimes=0;
      }
    }

    function getCrossBowSkillPercentage() {
      const requiredCrossBowAttacks = nextCrossBowSkill;
      const crossBowAttacksEachPercentage = Math.floor(requiredCrossBowAttacks / 100);
      
      if (crossBowAttacksEachPercentage === 0) {
        crossBowSkillPercentage++;
        crossBowAttackTimes = 0;
      } else if (crossBowAttackTimes === crossBowAttacksEachPercentage) {
        crossBowSkillPercentage++;
        crossBowAttackTimes = 0;
      }
    }
    
    function getWandSkillPercentage() {
      const requiredWandAttacks = nextWandSkill;
      const wandAttacksEachPercentage = Math.floor(requiredWandAttacks / 100);
      
      if (wandAttacksEachPercentage === 0) {
        wandSkillPercentage++;
        wandAttackTimes = 0;
      } else if (wandAttackTimes === wandAttacksEachPercentage) {
        wandSkillPercentage++;
        wandAttackTimes = 0;
      }
    }
    
    function getBowSkillPercentage() {
      const requiredBowAttacks = nextBowSkill;
      const bowAttacksEachPercentage = Math.floor(requiredBowAttacks / 100);
      
      if (bowAttacksEachPercentage === 0) {
        bowSkillPercentage++;
        bowAttackTimes = 0;
      } else if (bowAttackTimes === bowAttacksEachPercentage) {
        bowSkillPercentage++;
        bowAttackTimes = 0;
      }
    }

    function getAxeSkillPercentage() {
      const requiredAxeAttacks = nextAxeSkill;
      const axeAttacksEachPercentage = Math.floor(requiredAxeAttacks / 100);
      
      if (axeAttacksEachPercentage === 0) {
        axeSkillPercentage++;
        axeAttackTimes = 0;
      } else if (axeAttackTimes === axeAttacksEachPercentage) {
        axeSkillPercentage++;
        axeAttackTimes = 0;
      }
    }    
    
    function getRodSkillPercentage() {
      const requiredRodAttacks = nextRodSkill;
      const rodAttacksEachPercentage = Math.floor(requiredRodAttacks / 100);
      
      if (rodAttacksEachPercentage === 0) {
        rodSkillPercentage++;
        rodAttackTimes = 0;
      } else if (rodAttackTimes === rodAttacksEachPercentage) {
        rodSkillPercentage++;
        rodAttackTimes = 0;
      }
    }   

    function getShieldingSkillPercentage() {
      const requiredShielding = nextShieldingSkill;
      const ShieldingEachPercentage = Math.floor(requiredShielding / 100);
      
      if (ShieldingEachPercentage === 0) {
        shieldingSkillPercentage++;
        defenseTimes = 0;
      } else if (defenseTimes === ShieldingEachPercentage) {
        shieldingSkillPercentage++;
        defenseTimes = 0;
      }
    }  

    function swordSkillLevelUp(){
      swordSkillPercentage = 0;
      swordSkill++;
      swordSkillSpan.textContent = swordSkill;
      if (selectedVocation === 'Knight'){
        nextSwordSkill *= 1.2;
      } else if (selectedVocation === 'Elite Knight'){
        nextSwordSkill *= 1.15;
      } else if (selectedVocation === 'Paladin'){
        nextSwordSkill *= 1.8;
      } else if (selectedVocation === 'Holy Paladin'){
        nextSwordSkill *= 1.7;
      } else if (selectedVocation === 'Mage'){
        nextSwordSkill *= 2;
      } else if (selectedVocation === 'Archmage'){
        nextSwordSkill *= 1.9;
      } else if (selectedVocation === 'Elf'){
        nextSwordSkill *= 1.6;
      } else if (selectedVocation === 'Elder Elf'){
        nextSwordSkill *= 1.5;
      } else if (selectedVocation === 'Warrior'){
        nextSwordSkill *= 1.4;
      } else if (selectedVocation === 'Warlord'){
        nextSwordSkill *= 1.3;
      } else if (selectedVocation === 'Druid'){
        nextSwordSkill *= 2;
      } else if (selectedVocation === 'Archdruid'){
        nextSwordSkill *= 1.9;
      }
    }

    function crossBowSkillLevelUp(){
      crossBowSkillPercentage = 0;
      crossBowSkill++;
      crossBowSkillSpan.textContent = crossBowSkill;
      
      if (selectedVocation === 'Knight'){
        nextCrossBowSkill *= 2;
      } else if (selectedVocation === 'Elite Knight'){
        nextCrossBowSkill *= 1.9;
      } else if (selectedVocation === 'Paladin'){
        nextCrossBowSkill *= 1.15;
      } else if (selectedVocation === 'Holy Paladin'){
        nextCrossBowSkill *= 1.1;
      } else if (selectedVocation === 'Mage'){
        nextCrossBowSkill *= 1.8;
      } else if (selectedVocation === 'Archmage'){
        nextCrossBowSkill *= 1.7;
      } else if (selectedVocation === 'Elf'){
        nextCrossBowSkill *= 1.3;
      } else if (selectedVocation === 'Elder Elf'){
        nextCrossBowSkill *= 1.25;
      } else if (selectedVocation === 'Warrior'){
        nextCrossBowSkill *= 2;
      } else if (selectedVocation === 'Warlord'){
        nextCrossBowSkill *= 1.9;
      } else if (selectedVocation === 'Druid'){
        nextCrossBowSkill *= 1.8;
      } else if (selectedVocation === 'Archdruid'){
        nextCrossBowSkill *= 1.7;
      }
    }
    
    function wandSkillLevelUp(){
      wandSkillPercentage = 0;
      wandSkill++;
      wandSkillSpan.textContent = wandSkill;
      
      if (selectedVocation === 'Knight'){
        nextWandSkill *= 2.1;
      } else if (selectedVocation === 'Elite Knight'){
        nextWandSkill *= 2;
      } else if (selectedVocation === 'Paladin'){
        nextWandSkill *= 1.7;
      } else if (selectedVocation === 'Holy Paladin'){
        nextWandSkill *= 1.6;
      } else if (selectedVocation === 'Mage'){
        nextWandSkill *= 1.3;
      } else if (selectedVocation === 'Archmage'){
        nextWandSkill *= 1.25;
      } else if (selectedVocation === 'Elf'){
        nextWandSkill *= 1.6;
      } else if (selectedVocation === 'Elder Elf'){
        nextWandSkill *= 1.5;
      } else if (selectedVocation === 'Warrior'){
        nextWandSkill *= 2.1;
      } else if (selectedVocation === 'Warlord'){
        nextWandSkill *= 2;
      } else if (selectedVocation === 'Druid'){
        nextWandSkill *= 1.4;
      } else if (selectedVocation === 'Archdruid'){
        nextWandSkill *= 1.35;
      }
    }

    function bowSkillLevelUp(){
      bowSkillPercentage = 0;
      bowSkill++;
      bowSkillSpan.textContent = bowSkill;
      
      if (selectedVocation === 'Knight'){
        nextBowSkill *= 2;
      } else if (selectedVocation === 'Elite Knight'){
        nextBowSkill *= 1.85;
      } else if (selectedVocation === 'Paladin'){
        nextBowSkill *= 1.3;
      } else if (selectedVocation === 'Holy Paladin'){
        nextBowSkill *= 1.25;
      } else if (selectedVocation === 'Mage'){
        nextBowSkill *= 1.8;
      } else if (selectedVocation === 'Archmage'){
        nextBowSkill *= 1.7;
      } else if (selectedVocation === 'Elf'){
        nextBowSkill *= 1.15;
      } else if (selectedVocation === 'Elder Elf'){
        nextBowSkill *= 1.1;
      } else if (selectedVocation === 'Warrior'){
        nextBowSkill *= 2;
      } else if (selectedVocation === 'Warlord'){
        nextBowSkill *= 1.9;
      } else if (selectedVocation === 'Druid'){
        nextBowSkill *= 1.8;
      } else if (selectedVocation === 'Archdruid'){
        nextBowSkill *= 1.7;
      }
    }
    
    function axeSkillLevelUp(){
      axeSkillPercentage = 0;
      axeSkill++;
      axeSkillSpan.textContent = axeSkill;
      
      if (selectedVocation === 'Knight'){
        nextAxeSkill *= 1.4;
      } else if (selectedVocation === 'Elite Knight'){
        nextAxeSkill *= 1.3;
      } else if (selectedVocation === 'Paladin'){
        nextAxeSkill *= 1.8;
      } else if (selectedVocation === 'Holy Paladin'){
        nextAxeSkill *= 1.7;
      } else if (selectedVocation === 'Mage'){
        nextAxeSkill *= 2;
      } else if (selectedVocation === 'Archmage'){
        nextAxeSkill *= 1.9;
      } else if (selectedVocation === 'Elf'){
        nextAxeSkill *= 1.6;
      } else if (selectedVocation === 'Elder Elf'){
        nextAxeSkill *= 1.5;
      } else if (selectedVocation === 'Warrior'){
        nextAxeSkill *= 1.19;
      } else if (selectedVocation === 'Warlord'){
        nextAxeSkill *= 1.14;
      } else if (selectedVocation === 'Druid'){
        nextAxeSkill *= 2;
      } else if (selectedVocation === 'Archdruid'){
        nextAxeSkill *= 1.9;
      }
    }
    
    function rodSkillLevelUp(){
      rodSkillPercentage = 0;
      rodSkill++;
      rodSkillSpan.textContent = rodSkill;
      
      if (selectedVocation === 'Knight'){
        nextRodSkill *= 2.1;
      } else if (selectedVocation === 'Elite Knight'){
        nextRodSkill *= 2;
      } else if (selectedVocation === 'Paladin'){
        nextRodSkill *= 1.7;
      } else if (selectedVocation === 'Holy Paladin'){
        nextRodSkill *= 1.6;
      } else if (selectedVocation === 'Mage'){
        nextRodSkill *= 1.4;
      } else if (selectedVocation === 'Archmage'){
        nextRodSkill *= 1.35;
      } else if (selectedVocation === 'Elf'){
        nextRodSkill *= 1.6;
      } else if (selectedVocation === 'Elder Elf'){
        nextRodSkill *= 1.5;
      } else if (selectedVocation === 'Warrior'){
        nextRodSkill *= 2.1;
      } else if (selectedVocation === 'Warlord'){
        nextRodSkill *= 2;
      } else if (selectedVocation === 'Druid'){
        nextRodSkill *= 1.3;
      } else if (selectedVocation === 'Archdruid'){
        nextRodSkill *= 1.25;
      }
    }    

    function shieldingSkillLevelUp(){
      shieldingSkillPercentage = 0;
      shieldingSkill++;
      shieldingSkillSpan.textContent = shieldingSkill;
      
      if (selectedVocation === 'Knight'){
        nextShieldingSkill *= 1.15;
      } else if (selectedVocation === 'Elite Knight'){
        nextShieldingSkill *= 1.1;
      } else if (selectedVocation === 'Paladin'){
        nextShieldingSkill *= 1.7;
      } else if (selectedVocation === 'Holy Paladin'){
        nextShieldingSkill *= 1.6;
      } else if (selectedVocation === 'Mage'){
        nextShieldingSkill *= 2;
      } else if (selectedVocation === 'Archmage'){
        nextShieldingSkill *= 1.85;
      } else if (selectedVocation === 'Elf'){
        nextShieldingSkill *= 1.6;
      } else if (selectedVocation === 'Elder Elf'){
        nextShieldingSkill *= 1.5;
      } else if (selectedVocation === 'Warrior'){
        nextShieldingSkill *= 1.16;
      } else if (selectedVocation === 'Warlord'){
        nextShieldingSkill *= 1.11;
      } else if (selectedVocation === 'Druid'){
        nextShieldingSkill *= 2;
      } else if (selectedVocation === 'Archdruid'){
        nextShieldingSkill *= 1.85;
      }
    }  

    function skillsLevelDown() {
      let swordSkillPercentageLost = Math.round(swordSkill / 3);
      if (swordSkillPercentageLost < 1) {
        swordSkillPercentageLost = 1;
      }
      const swordPercentageDemote = swordSkillPercentage - swordSkillPercentageLost;
      if (swordPercentageDemote <= 0) {
        if (swordSkill > 0) {
          swordSkill--;
        }
      } else {
        swordSkillPercentage = swordSkillPercentage - swordSkillPercentageLost;
      }
    
      let crossBowSkillPercentageLost = Math.round(crossBowSkill / 3);
      if (crossBowSkillPercentageLost < 1) {
        crossBowSkillPercentageLost = 1;
      }
      const crossBowPercentageDemote = crossBowSkillPercentage - crossBowSkillPercentageLost;
      if (crossBowPercentageDemote <= 0) {
        if (crossBowSkill > 0) {
          crossBowSkill--;
        }
      } else {
        crossBowSkillPercentage = crossBowSkillPercentage - crossBowSkillPercentageLost;
      }
    
      let wandSkillPercentageLost = Math.round(wandSkill / 3);
      if (wandSkillPercentageLost < 1) {
        wandSkillPercentageLost = 1;
      }
      const wandPercentageDemote = wandSkillPercentage - wandSkillPercentageLost;
      if (wandPercentageDemote <= 0) {
        if (wandSkill > 0) {
          wandSkill--;
        }
      } else {
        wandSkillPercentage = wandSkillPercentage - wandSkillPercentageLost;
      }
    
      let bowSkillPercentageLost = Math.round(bowSkill / 3);
      if (bowSkillPercentageLost < 1) {
        bowSkillPercentageLost = 1;
      }
      const bowPercentageDemote = bowSkillPercentage - bowSkillPercentageLost;
      if (bowPercentageDemote <= 0) {
        if (bowSkill > 0) {
          bowSkill--;
        }
      } else {
        bowSkillPercentage = bowSkillPercentage - bowSkillPercentageLost;
      }
    
      let axeSkillPercentageLost = Math.round(axeSkill / 3);
      if (axeSkillPercentageLost < 1) {
        axeSkillPercentageLost = 1;
      }
      const axePercentageDemote = axeSkillPercentage - axeSkillPercentageLost;
      if (axePercentageDemote <= 0) {
        if (axeSkill > 0) {
          axeSkill--;
        }
      } else {
        axeSkillPercentage = axeSkillPercentage - axeSkillPercentageLost;
      }
    
      let rodSkillPercentageLost = Math.round(rodSkill / 3);
      if (rodSkillPercentageLost < 1) {
        rodSkillPercentageLost = 1;
      }
      const rodPercentageDemote = rodSkillPercentage - rodSkillPercentageLost;
      if (rodPercentageDemote <= 0) {
        if (rodSkill > 0) {
          rodSkill--;
        }
      } else {
        rodSkillPercentage = rodSkillPercentage - rodSkillPercentageLost;
      }

      let shieldingSkillPercentageLost = Math.round(shieldingSkill / 3);
      if (shieldingSkillPercentageLost < 1) {
        shieldingSkillPercentageLost = 1;
      }
      const shieldingPercentageDemote = shieldingSkillPercentage - shieldingSkillPercentageLost;
      if (shieldingPercentageDemote <= 0) {
        if (shieldingSkill > 0) {
          shieldingSkill--;
        }
      } else {
        shieldingSkillPercentage = shieldingSkillPercentage - shieldingSkillPercentageLost;
      }
    
      swordSkillSpan.textContent = swordSkill;
      crossBowSkillSpan.textContent = crossBowSkill;
      wandSkillSpan.textContent = wandSkill;
      bowSkillSpan.textContent = bowSkill;
      axeSkillSpan.textContent = axeSkill;
      rodSkillSpan.textContent = rodSkill;
      shieldingSkillSpan.textContent = shieldingSkill;
    
      skillsProgressBar();
    }    
    
    function skillsProgressBar() {
      const swordProgressBar = document.querySelector(".swordProgressBar span");
      const crossBowProgressBar = document.querySelector(".crossBowProgressBar span");
      const wandProgressBar = document.querySelector(".wandProgressBar span");
      const bowProgressBar = document.querySelector(".bowProgressBar span");
      const axeProgressBar = document.querySelector(".axeProgressBar span");
      const rodProgressBar = document.querySelector(".rodProgressBar span");
      const shieldingProgressBar = document.querySelector(".shieldingProgressBar span");
    
      swordProgressBar.style.width = swordSkillPercentage + "%";
      swordProgressBar.textContent = swordSkillPercentage + "%";
    
      crossBowProgressBar.style.width = crossBowSkillPercentage + "%";
      crossBowProgressBar.textContent = crossBowSkillPercentage + "%";
    
      wandProgressBar.style.width = wandSkillPercentage + "%";
      wandProgressBar.textContent = wandSkillPercentage + "%";
    
      bowProgressBar.style.width = bowSkillPercentage + "%";
      bowProgressBar.textContent = bowSkillPercentage + "%";
    
      axeProgressBar.style.width = axeSkillPercentage + "%";
      axeProgressBar.textContent = axeSkillPercentage + "%";
    
      rodProgressBar.style.width = rodSkillPercentage + "%";
      rodProgressBar.textContent = rodSkillPercentage + "%";

      shieldingProgressBar.style.width = shieldingSkillPercentage + "%";
      shieldingProgressBar.textContent = shieldingSkillPercentage + "%";
    }
    
    skillsProgressBar();

    while (swordSkillPercentage >= 100) {
      swordSkillLevelUp();
      swordSkillSpan.textContent = swordSkill;
      skillsProgressBar();
      swordAttackTimes = 0;
    }
    
    while (crossBowSkillPercentage >= 100) {
      crossBowSkillLevelUp();
      crossBowSkillSpan.textContent = crossBowSkill;
      skillsProgressBar();
      crossBowAttackTimes = 0;
    }
    
    while (wandSkillPercentage >= 100) {
      wandSkillLevelUp();
      wandSkillSpan.textContent = wandSkill;
      skillsProgressBar();
      wandAttackTimes = 0;
    }
    
    while (bowSkillPercentage >= 100) {
      bowSkillLevelUp();
      bowSkillSpan.textContent = bowSkill;
      skillsProgressBar();
      bowAttackTimes = 0;
    }
    
    while (axeSkillPercentage >= 100) {
      axeSkillLevelUp();
      axeSkillSpan.textContent = axeSkill;
      skillsProgressBar();
      axeAttackTimes = 0;
    }
    
    while (rodSkillPercentage >= 100) {
      rodSkillLevelUp();
      rodSkillSpan.textContent = rodSkill;
      skillsProgressBar();
      rodAttackTimes = 0;
    }

    while (shieldingSkillPercentage >= 100) {
      shieldingSkillLevelUp();
      shieldingSkillSpan.textContent = shieldingSkill;
      skillsProgressBar();
      defenseTimes = 0;
    }
    
  
    if (swordSkill >= 1) {
      while (swordSkillPercentage <= 0) {
        skillsLevelDown();
        swordSkillSpan.textContent = swordSkill;
        skillsProgressBar();
      }
    }
    
    if (crossBowSkill >= 1) {
      while (crossBowSkillPercentage <= 0) {
        skillsLevelDown();
        crossBowSkillSpan.textContent = crossBowSkill;
        skillsProgressBar();
      }
    }
    
    if (wandSkill >= 1) {
      while (wandSkillPercentage <= 0) {
        skillsLevelDown();
        wandSkillSpan.textContent = wandSkill;
        skillsProgressBar();
      }
    }
    
    if (bowSkill >= 1) {
      while (bowSkillPercentage <= 0) {
        skillsLevelDown();
        bowSkillSpan.textContent = bowSkill;
        skillsProgressBar();
      }
    }
    
    if (axeSkill >= 1) {
      while (axeSkillPercentage <= 0) {
        skillsLevelDown();
        axeSkillSpan.textContent = axeSkill;
        skillsProgressBar();
      }
    }
    
    if (rodSkill >= 1) {
      while (rodSkillPercentage <= 0) {
        skillsLevelDown();
        rodSkillSpan.textContent = rodSkill;
        skillsProgressBar();
      }
    }
    
    if (shieldingSkill >= 1) {
      while (shieldingSkillPercentage <= 0) {
        skillsLevelDown();
        shieldingSkillSpan.textContent = shieldingSkill;
        skillsProgressBar();
      }
    }    