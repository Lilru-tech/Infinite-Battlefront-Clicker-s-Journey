let monsterLevel = Math.floor(Math.random() * level)+5;
let bossLevel = Math.floor(Math.random() * level)+15;
let grandBossLevel = Math.floor(Math.random() * level)+50;
let monsterAttack = Math.floor(Math.random() * 15) + monsterLevel;
let bossAttack = Math.floor(Math.random() * 50) + bossLevel;
let grandBossAttack = Math.floor(Math.random() * 150) + grandBossLevel;
let isBoss = false;
let isGrandBoss = false;


const damageNumber = document.getElementById('damage-number');

function updateHealthBar() {
  const healthPercentage = (currentMonsterHealth / (monsterHealth + healthBonus)) * 100;
  healthBar.style.width = `${healthPercentage}%`;
  if (healthPercentage > 70) {
    healthBar.style.backgroundColor = 'green';
  } else if (healthPercentage > 50) {
    healthBar.style.backgroundColor = 'orange';
  } else if (healthPercentage > 30){
    healthBar.style.backgroundColor = '#d8fb17'
  } else if (healthPercentage > 5){
    healthBar.style.backgroundColor = '#9b2c2c'
  } else {
    healthBar.style.backgroundColor = 'black';
  }
  document.getElementById('currentMonsterHealth').textContent = currentMonsterHealth;
  document.getElementById('maxMonsterHealth').textContent = monsterHealth + healthBonus;
}

  function getRandomMonsterHealth() {
    return Math.floor(Math.random() * 40) + (monsterLevel);
  }

  function getRandomBossHealth() {
    return Math.floor(Math.random() * 80) + (bossLevel * 5);
  }
  function getRandomGrandBossHealth() {
    return Math.floor(Math.random() * 150) + (grandBossLevel * 15);
  }
  
  function spawnBoss() {
    isBoss = true;
    monsterHealth = getRandomBossHealth();
    healthBonus = monsterHealth * level;
    currentMonsterHealth = monsterHealth + healthBonus;
    updateHealthBar();
    monsterImage.classList.add('boss');
  }

  function spawnGrandBoss() {
    isGrandBoss = true;
    monsterHealth = getRandomGrandBossHealth();
    healthBonus = monsterHealth * level;
    currentMonsterHealth = monsterHealth + healthBonus;
    updateHealthBar();
    monsterImage.classList.add('grandBoss');
  }

    function spawnMonster() {
    monsterImage.classList.remove('boss');
    monsterImage.classList.remove('grandBoss');
    if (Math.random() < 0.005) {
      spawnBoss();
    } else if (Math.random() < 0.0005) {
      spawnGrandBoss();
    } else {
      isBoss = false;
      isGrandBoss = false;
      monsterHealth = getRandomMonsterHealth();
      healthBonus = monsterHealth * level;
      currentMonsterHealth = monsterHealth + healthBonus;
      updateHealthBar();
    }
  }
  
  spawnMonster();

  function defeatMonster() {
    let wasBoss = isBoss;
    let wasGrandBoss = isGrandBoss;
  
    let experience = Math.floor(Math.random() * 200) + 1;
    let money = Math.floor(Math.random() * 500) + 1;
  
    if (wasBoss) {
      experience *= 5;
      money *= 5;
    } else if (wasGrandBoss) {
      experience *= 25;
      money *= 25;
    }
  
    experienceCount += experience;
    experienceCountSpan.textContent = experienceCount+"/";
    levelUpExperienceSpan.textContent = levelUpExperience(level);
    let experienceMessage = "No exp for you :(";
    experienceMessage = "You have earned "+experience+" experience points.\n";

   let moneyMessage = "No money for you :(";
    if (Math.random() <= 1.0) {
      moneyCount += money;
      moneyCountSpan.textContent = moneyCount;
      moneyMessage = "You also earned "+money+" coins\n";
     }
  
    updateLog(experienceMessage + moneyMessage);
  
    spawnMonster(); // Moved this line to the end
    
    // Load new random monster image
    const monsterNum = Math.floor(Math.random() * 120) + 1;
    monsterImage.src = `sprites/monster/monster${monsterNum}.png`;
  }
  