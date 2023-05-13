let attack = 10;
let defense = 10;
let moneyCount = 0
let experienceCount = 0;
let totalExperienceCount = 0;
let level = 1;
let monsterHealth;
let monsterHealthBonus;
let playerHealthBonus;
let currentMonsterHealth;
let currentPlayerHealth;
let playerHealth = 100;
let deathCount = 0;
let criticalChance = 0;
let criticalDamage = 100;
let maxDamageDealt = 0;
let maxDamageTaken = 0;
let monsterKills = 0;
let damageDealt = 0;
let damageBlocked = 0;

const centerDiv = document.getElementById('center');
const leftDiv = document.getElementById('left');
const clickButton = document.getElementById('clickButton');
const moneyCountSpan = document.getElementById('moneyCount');
const experienceCountSpan = document.getElementById('experienceCount');
const levelSpan = document.getElementById('level');
const monsterImage = document.getElementById('monster');
const healthBar = document.getElementById('healthBar');
const healthBarContainer = document.getElementById('healthBarContainer');
const logDiv = document.getElementById('log');
const attackSpan = document.getElementById('attack');
const defenseSpan = document.getElementById('defense');
const playerHealthBar = document.getElementById('playerHealthBar');
const restoreHealthButton = document.getElementById('restoreHealthButton');
const hardRestoreHealthButton = document.getElementById('hardRestoreHealthButton');
const playerImage = document.getElementById('playerImage');
const playerDeadImage = document.getElementById('playerDeadImage');
const deathCountSpan = document.getElementById('deathCount');
const statsButton = document.getElementById('statsButton');
const leftFoldableContainer = document.getElementById('leftFoldableContainer');
const logFoldableContainer = document.getElementById('logFoldableContainer');
const criticalChanceSpan = document.getElementById('criticalChance');
const criticalDamageSpan = document.getElementById('criticalDamage');
const topDamageDealt = document.getElementById('topDamageDealt');
const topDamageTaken = document.getElementById('topDamageTaken');
const monsterKillSpan = document.getElementById('monsterKill');
const experienceBar = document.getElementById('experienceBar');
const levelUpExperienceSpan = document.getElementById('levelUpExperience');
attackSpan.textContent = attack;
defenseSpan.textContent = defense;
criticalChanceSpan.textContent = criticalChance+ "%";
criticalDamageSpan.textContent = criticalDamage+ "%";
restoreHealthButton.style.display = 'none';
hardRestoreHealthButton.style.display = 'none';
playerImage.style.display = 'block';
playerDeadImage.style.display = 'none';
dead.style.display = 'none';

  const vocationImages = {
    Knight: {
      alive: 'player.png',
      dead: 'playerDead.png'
    },
    Paladin: {
      alive: 'player6.png',
      dead: 'playerDead6.png'
    },
    Mage: {
      alive: 'player2.png',
      dead: 'playerDead2.png'
    },
    Elf: {
      alive: 'player3.png',
      dead: 'playerDead3.png'
    },
    Warrior: {
      alive: 'player4.png',
      dead: 'playerDead4.png'
    },
    Druid: {
      alive: 'player5.png',
      dead: 'playerDead5.png'
    }
  };

  const selectedVocation = localStorage.getItem('selectedVocation');
  const playerImageElement = document.getElementById('playerImage');
  const playerDeadImageElement = document.getElementById('playerDeadImage');

  if (vocationImages.hasOwnProperty(selectedVocation)) {
    const vocationImagesData = vocationImages[selectedVocation];
    playerImageElement.src = `sprites/${vocationImagesData.alive}`;
    playerDeadImageElement.src = `sprites/${vocationImagesData.dead}`;
  }


if (leftFoldableContainer.style.display === 'block') {
  statsButton.innerHTML = 'Stats';
} else {
  statsButton.innerHTML = 'Stats';
}

statsButton.addEventListener('click', () => {
  if (leftFoldableContainer.style.display === 'none') {
    leftFoldableContainer.style.display = 'block';
  } else {
    leftFoldableContainer.style.display = 'none';
  }
});

if (logFoldableContainer.style.display === 'block') {
  logStyle.innerHTML = 'Log';
} else {
  logStyle.innerHTML = 'Log';
}

logStyle.addEventListener('click', () => {
  if (logFoldableContainer.style.display === 'none') {
    logFoldableContainer.style.display = 'block';
  } else {
    logFoldableContainer.style.display = 'none';
  }
});

clickButton.addEventListener('click', function() {
  calculateDamage(attack);
  calculateDamageBlocked(defense);
  updateExperienceBar(experienceCount, levelUpExperience(level));
  updatePlayerHealthBar();

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
  leftDiv.style.display = 'none';
  centerDiv.style.display = 'none';
  hideShop.style.display = 'none';
  rightFoldableContainer.style.display = 'none';
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
  updateExperienceBar(experienceCount, levelUpExperience(level));
  const reviveCost = 100;
  const experienceLost = experienceCount - Math.floor(experienceCount * 0.99);
  moneyCount -= reviveCost;
  currentPlayerHealth = playerHealth;
  experienceCount -= experienceLost;
  updatePlayerHealthBar();
  moneyCountSpan.textContent = moneyCount;
  leftDiv.style.display = 'flex';
  centerDiv.style.display = 'flex';
  hideShop.style.display = 'block';
  rightFoldableContainer.style.display = 'block';
  restoreHealthButton.style.display = 'none';
  dead.style.display = 'none';
  playerDeadImage.style.display = 'none';
  updateLog("You died, lost " + experienceLost + " experience points.\n");
  deathCount++;
  deathCountSpan.textContent = deathCount;        
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
  spawnMonster();
});

hardRestoreHealthButton.addEventListener('click', () => {
  updateExperienceBar(experienceCount, levelUpExperience(level));
  const hardExperienceLost = experienceCount - Math.floor(experienceCount * 0.90);
  updateLog("You don't have enough money, so you will lose 10% of your experience!");
  currentPlayerHealth = playerHealth;
  experienceCount -= hardExperienceLost;
  updatePlayerHealthBar();
  moneyCountSpan.textContent = moneyCount;
  leftDiv.style.display = 'flex';
  centerDiv.style.display = 'flex';
  hideShop.style.display = 'block';
  rightFoldableContainer.style.display = 'block';
  hardRestoreHealthButton.style.display = 'none';
  dead.style.display = 'none';
  playerDeadImage.style.display = 'none';
  updateLog("You died, you lost " + hardExperienceLost + " experience points.\n");
  deathCount++;
  deathCountSpan.textContent = deathCount;   
    const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';  
  spawnMonster();   
});

// Check if the player has died
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
});

function updateLog(message) {
  const logContent = document.getElementById('logContent');
  const newMessage = document.createElement('p');
  newMessage.textContent = message;
  logContent.insertBefore(newMessage, logContent.firstChild);
  if (logContent.childNodes.length > 25) {
    logContent.removeChild(logContent.lastChild);
  }
}

