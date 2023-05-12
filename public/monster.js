function updateHealthBar() {
    const healthPercentage = (currentMonsterHealth / (monsterHealth + healthBonus)) * 100;
    healthBar.style.width = `${healthPercentage}%`;
    if (healthPercentage > 70) {
      healthBar.style.backgroundColor = 'green';
    } else if (healthPercentage > 50) {
      healthBar.style.backgroundColor = 'orange';
    } else if (healthPercentage > 30){
        healthBar.style.backgroundColor = 'yellow'
    } else if (healthPercentage > 5){
        healthBar.style.backgroundColor = 'red'
    } else {
      healthBar.style.backgroundColor = 'black';
    }
    healthBar.textContent = `HP: ${currentMonsterHealth}/${monsterHealth + healthBonus}`;
  }

  function getRandomMonsterHealth() {
    return Math.floor(Math.random() * 20) + 1;
  }

  function spawnMonster() {
    monsterHealth = getRandomMonsterHealth();
    healthBonus =  monsterHealth*level;
    currentMonsterHealth = monsterHealth + healthBonus;
    updateHealthBar();
  }
  
  spawnMonster();

  function defeatMonster() {
    // Player defeated the monster
    spawnMonster();

    // Gain experience and money
const experience = Math.floor(Math.random() * 50) + 1;
experienceCount += experience;
experienceCountSpan.textContent = experienceCount;
const experienceMessage = "You have earned "+experience+" experience points.\n";

let moneyMessage = "No money for you :(";
if (Math.random() <= 1.0) {
  const money = Math.floor(Math.random() * 500) + 1;
  moneyCount += money;
  moneyCountSpan.textContent = moneyCount;
  moneyMessage = "You also earned "+money+" coins\n";
}

updateLog(experienceMessage + moneyMessage);

  // Load new random monster image
  const monsterNum = Math.floor(Math.random() * 52) + 1;
  monsterImage.src = `sprites/monster${monsterNum}.png`;
}