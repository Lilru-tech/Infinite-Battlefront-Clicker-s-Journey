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

    function calculateDamage(attack){
      const normalDamageDealt = (Math.floor(Math.random() * 8) + attack - 5)
      const criticalDamageDealt = normalDamageDealt + (Math.floor(Math.random() * ((normalDamageDealt * criticalDamage)/100) + 20));
      if (criticalChance >= Math.random() *100) {
        damageDealt = criticalDamageDealt;
        const playerDamageLog = "Critical! You dealt " + damageDealt + " damage to the monster.\n";
        updateLog(playerDamageLog);
      } else {
        damageDealt = Math.floor(Math.random() * 8) + attack - 5;
        const playerDamageLog = "You dealt " + damageDealt + " damage to the monster.\n";
        updateLog(playerDamageLog);
      }
    }
  function calculateDamageBlocked(defense){
    const monsterAttack = Math.floor(Math.random() * 50) + 1;
    const damageTaken = Math.max(0, monsterAttack - damageBlocked);
    damageBlocked = Math.floor(Math.random() * (defense / 2)) + (defense / 2);
    if (damageTaken === 0){
      const monsterDamageLog = "You blocked the monster attack!.\n";
      updateLog(monsterDamageLog);

    } else {
      const monsterDamageLog = "The monster did " + damageTaken + " damage to you.\n";
      updateLog(monsterDamageLog);
    }
    if (damageDealt > maxDamageDealt) {
      maxDamageDealt = damageDealt;
      topDamageDealt.textContent = maxDamageDealt;
    }
    currentMonsterHealth -= damageDealt;
    updateHealthBar();
    // take damage from the monster
    if (damageTaken > maxDamageTaken) {
      maxDamageTaken = damageTaken;
      topDamageTaken.textContent = maxDamageTaken;
    }
    currentPlayerHealth -= damageTaken;
  }