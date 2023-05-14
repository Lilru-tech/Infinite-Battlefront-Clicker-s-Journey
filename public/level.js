clickButton.addEventListener('click', () => {
    if (experienceCount >= levelUpExperience(level)) {
      levelUp();
      totalExperienceCount += levelUpExperience;
    }
    experienceCountSpan.textContent = experienceCount + "/";
    levelUpExperienceSpan.textContent = levelUpExperience(level);
  });

  const levelUpExperience = function(level) {
    if (level === 1){
      return 100
    } else {
      return Math.floor(50 * (level) ** 3 - 150 * (level) ** 2 + 400 * (level))/3;
    }
  };

  const levelUp = function() {
    level++;
    let attackIncrease = 0;
    let defenseIncrease = 0;
    let playerHealthIncrease = 0;
  
    if (selectedVocation === 'Knight') {
      attackIncrease = Math.floor(Math.random() * 6) + 3;
      defenseIncrease = Math.floor(Math.random() * 4) + 2;
      playerHealthIncrease = Math.floor(Math.random() * 10) + 10;
    } else if (selectedVocation === 'Elite Knight') {
      attackIncrease = Math.floor((Math.random() * 6 + 3) * 1.2);
      defenseIncrease = Math.floor((Math.random() * 4 + 2) * 1.2);
      playerHealthIncrease = Math.floor((Math.random() * 10 + 10) * 1.2);
    } else if (selectedVocation === 'Paladin') {
      attackIncrease = Math.floor(Math.random() * 4) + 2;
      defenseIncrease = Math.floor(Math.random() * 6) + 3;
      playerHealthIncrease = Math.floor(Math.random() * 8) + 8;
    } else if (selectedVocation === 'Holy Paladin') {
      attackIncrease = Math.floor((Math.random() * 4 + 2) * 1.2);
      defenseIncrease = Math.floor((Math.random() * 6 + 3) * 1.2);
      playerHealthIncrease = Math.floor((Math.random() * 8 + 8) * 1.2);
    } else if (selectedVocation === 'Mage') {
      attackIncrease = Math.floor(Math.random() * 4) + 1;
      defenseIncrease = Math.floor(Math.random() * 2) + 1;
      playerHealthIncrease = Math.floor(Math.random() * 6) + 6;
    } else if (selectedVocation === 'Archmage') {
      attackIncrease = Math.floor((Math.random() * 4 + 1) * 1.2);
      defenseIncrease = Math.floor((Math.random() * 2 + 1) * 1.2);
      playerHealthIncrease = Math.floor((Math.random() * 6 + 6) * 1.2);
    } else if (selectedVocation === 'Elf') {
      attackIncrease = Math.floor(Math.random() * 3) + 1;
      defenseIncrease = Math.floor(Math.random() * 3) + 1;
      playerHealthIncrease = Math.floor(Math.random() * 4) + 4;
    } else if (selectedVocation === 'Elder Elf') {
      attackIncrease = Math.floor((Math.random() * 3 + 1) * 1.2);
      defenseIncrease = Math.floor((Math.random() * 3 + 1) * 1.2);
      playerHealthIncrease = Math.floor((Math.random() * 4 + 4) * 1.2);
    } else if (selectedVocation === 'Warrior') {
      attackIncrease = Math.floor(Math.random() * 6) + 4;
      defenseIncrease = Math.floor(Math.random() * 3) + 1;
      playerHealthIncrease = Math.floor(Math.random() * 8) + 6;
    } else if (selectedVocation === 'Warlord') {
      attackIncrease = Math.floor((Math.random() * 6 + 4) * 1.2);
      defenseIncrease = Math.floor((Math.random() * 3 + 1) * 1.2);
      playerHealthIncrease = Math.floor((Math.random() * 8 + 6) * 1.2);
    } else if (selectedVocation === 'Druid') {
      attackIncrease = Math.floor(Math.random() * 3) + 1;
      defenseIncrease = Math.floor(Math.random() * 2) + 2;
      playerHealthIncrease = Math.floor(Math.random() * 8) + 4;
    } else if (selectedVocation === 'Archdruid') {
      attackIncrease = Math.floor((Math.random() * 3 + 1) * 1.2);
      defenseIncrease = Math.floor((Math.random() * 2 + 2) * 1.2);
      playerHealthIncrease = Math.floor((Math.random() * 8 + 4) * 1.2);
    }

    updateLog("Your stats increased by +" + attackIncrease + " attack, +" + defenseIncrease + " defense and +" + playerHealthIncrease + " health points.");
    updateLog("Congratulations! You have leveled up to level "+level+"!");
  
    attack += attackIncrease;
    defense += defenseIncrease;
    playerHealth += playerHealthIncrease;
    levelSpan.textContent = level;
    attackSpan.textContent = attack;
    defenseSpan.textContent = defense;
    playerHealthSpan.textContent = playerHealth;
    updatePlayerHealthBar();
  };
  
  function updateExperienceBar(experienceCount, levelUpExperience) {
    let displayedExperience = experienceCount;
    if (experienceCount > levelUpExperience) {
      displayedExperience = `${experienceCount}/${levelUpExperience}`;
    }
    const expPercentage = (experienceCount / levelUpExperience) * 100;
    if (expPercentage > 100) {
      experienceBar.style.width = `${expPercentage - 100}%`;
    } else {
      experienceBar.style.width = `${expPercentage}%`;
    }
  }
  
  updateExperienceBar(experienceCount, levelUpExperience(level));
  
  while (experienceCount >= levelUpExperience(level)) {
    levelUp();
    updateExperienceBar(experienceCount, levelUpExperience(level));
  }