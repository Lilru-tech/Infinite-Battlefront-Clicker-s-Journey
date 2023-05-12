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
        playerHealthBar.style.backgroundColor = 'yellow'
      } else if (playerHealthPercentage > 5) {
        playerHealthBar.style.backgroundColor = 'red'
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

      function updateExperienceBar(currentExp, levelUpExp) {
    const experienceBar = document.getElementById('experienceBar');
    const levelUpExperienceSpan = document.getElementById('levelUpExperience');
  
    // Calculate the percentage of experience earned for the current level
    const expPercentage = (currentExp / levelUpExp) * 100;
  
    // Update the experience bar width
    experienceBar.style.width = expPercentage + '%';
  
    // Update experience count and level up experience text
    levelUpExperienceSpan.textContent = levelUpExp;
  }
  updateExperienceBar(experienceCount, levelUpExperience(level));