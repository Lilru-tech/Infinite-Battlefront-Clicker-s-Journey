let moneyCount = 0
let experienceCount = 0;
let totalExperienceCount = 0;
let level = 1;
let monsterHealth;
let currentMonsterHealth;
let currentPlayerHealth;
let currentPlayerMana;
let playerHealth = 100;
let playerMana = 50;
let deathCount = 0;
let criticalChance = 0;
let criticalDamage = 100;
let maxDamageDealt = 0;
let maxDamageTaken = 0;
let monsterKills = 0;
let bossKills = 0;
let grandBossKills = 0;
let damageDealt = 0;
let damageBlocked = 0;
let magicSkill = 0;
let magicSkillPercentage = 0;
let swordSkill = 0;
let swordSkillPercentage = 0;
let crossBowSkill = 0;
let crossBowSkillPercentage = 0;
let wandSkill = 0;
let wandSkillPercentage = 0;
let bowSkill = 0;
let bowSkillPercentage = 0;
let axeSkill = 0;
let axeSkillPercentage = 0;
let rodSkill = 0;
let rodSkillPercentage = 0;
let shieldingSkill = 0;
let shieldingSkillPercentage = 0;

const menuDiv = document.getElementById('menu');
const centerDiv = document.getElementById('center');
const leftDiv = document.getElementById('left');
const rightDiv = document.getElementById('right');
const bottomDiv = document.getElementById('bottom');
const moneyCountSpan = document.getElementById('moneyCount');
const experienceCountSpan = document.getElementById('experienceCount');
const levelSpan = document.getElementById('level');
const monsterImage = document.getElementById('monster');
const healthBar = document.getElementById('healthBar');
const healthBarContainer = document.getElementById('healthBarContainer');
const logDiv = document.getElementById('log');
const playerHealthBar = document.getElementById('playerHealthBar');
const playerManaBar = document.getElementById('playerManaBar');
const restoreHealthButton = document.getElementById('restoreHealthButton');
const hardRestoreHealthButton = document.getElementById('hardRestoreHealthButton');
const playerImage = document.getElementById('playerImage');
const playerDeadImage = document.getElementById('playerDeadImage');
const deathCountSpan = document.getElementById('deathCount');
const statsButton = document.getElementById('statsButton');
const combatStatsButton = document.getElementById('combatStatsButton');
const skillsButton = document.getElementById('skillsButton');
const leftFoldableContainer = document.getElementById('leftFoldableContainer');
const leftFoldableContainer2 = document.getElementById('leftFoldableContainer2');
const leftFoldableContainer3 = document.getElementById('leftFoldableContainer3');
const criticalChanceSpan = document.getElementById('criticalChance');
const criticalDamageSpan = document.getElementById('criticalDamage');
const topDamageDealt = document.getElementById('topDamageDealt');
const topDamageTaken = document.getElementById('topDamageTaken');
const monsterKillSpan = document.getElementById('monsterKill');
const bossKillSpan = document.getElementById('bossKill');
const grandBossKillSpan = document.getElementById('grandBossKill');
const experienceBar = document.getElementById('experienceBar');
const levelUpExperienceSpan = document.getElementById('levelUpExperience');
const playerHealthSpan = document.getElementById('playerHealth');
const playerManaSpan = document.getElementById('playerMana');
const updateCurrentPlayerHealth = document.getElementById('currenPlayerHealth');
const updateCurrentPlayerMana = document.getElementById('currenPlayerMana');
const swordSkillSpan = document.getElementById('swordSkill');
const swordSkillPercentageSpan = document.getElementById('swordSkillPercentage');
const magicSkillSpan = document.getElementById('magicSkill');
const magicSkillPercentageSpan = document.getElementById('magicSkillPercentage');
const crossBowSkillSpan = document.getElementById('crossBowSkill');
const crossBowSkillPercentageSpan = document.getElementById('crossBowSkillPercentage');
const wandSkillSpan = document.getElementById('wandSkill');
const wandSkillPercentageSpan = document.getElementById('wandSkillPercentage');
const bowSkillSpan = document.getElementById('bowSkill');
const bowSkillPercentageSpan = document.getElementById('bowSkillPercentage');
const axeSkillSpan = document.getElementById('axeSkill');
const axeSkillPercentageSpan = document.getElementById('axeSkillPercentage');
const rodSkillSpan = document.getElementById('rodSkill');
const rodSkillPercentageSpan = document.getElementById('rodSkillPercentage');
const shieldingSkillSpan = document.getElementById('shieldingSkill');
const shieldingSkillPercentageSpan = document.getElementById('shieldingSkillPercentage');

criticalChanceSpan.textContent = criticalChance+ "%";
criticalDamageSpan.textContent = criticalDamage+ "%";
restoreHealthButton.style.display = 'none';
hardRestoreHealthButton.style.display = 'none';
playerImage.style.display = 'block';
playerDeadImage.style.display = 'none';
dead.style.display = 'none';

function saveData() {
  const savedData = {
    moneyCount,
    experienceCount,
    totalExperienceCount,
    level,
    monsterHealth,
    currentMonsterHealth,
    currentPlayerHealth,
    playerHealth,
    currentPlayerMana,
    playerMana,
    deathCount,
    criticalChance,
    criticalDamage,
    maxDamageDealt,
    maxDamageTaken,
    monsterKills,
    bossKills,
    grandBossKills,
    damageDealt,
    damageBlocked,
    attack,
    defense,
    promotionValue,
    swordSkill,
    swordSkillPercentage,
    magicSkill,
    magicSkillPercentage,
    crossBowSkill,
    crossBowSkillPercentage,
    wandSkill,
    wandSkillPercentage,
    bowSkill,
    bowSkillPercentage,
    axeSkill,
    axeSkillPercentage,
    rodSkill,
    rodSkillPercentage,
    shieldingSkill,
    shieldingSkillPercentage,
    nextMagicSkill,
    nextSwordSkill,
    nextCrossBowSkill,
    nextWandSkill,
    nextBowSkill,
    nextAxeSkill,
    nextRodSkill,
    nextShieldingSkill,
    achievements,
    isDamageEnabled,
    isDamageTakenEnabled,
    isSpellDamageEnabled,
    isHealNumberEnabled,
    quests,
    questPoints,
    activeQuest,
    questsDone,
    backpackSize,
    spellsBought: spellsContainer.boughtItems.map(item => ({...item, assignedKey: item.key})),
    cooldowns: {},
    shopStatsItems: shopStatsItems.map(item => ({ ...item, price: item.price })),
    shopItemsItems: shopItemsItems.map(item => ({ ...item, price: item.price })),
    shopItemsItems: shopItemsItems.map(item => ({ ...item, effect: item.effect })),
    items: $('.sortable-item').map(function() { 
      return {id: this.id, parent: $(this).parent().attr('id')}; 
    }).get()
  };

  const backpackSlots = Array.from(document.getElementsByClassName('backpack-slot'));
  const backpackItems = backpackSlots.map(slot => {
    if (slot.firstChild) {
      const itemImg = slot.firstChild;
      const itemCount = slot.getElementsByClassName('item-count')[0];
      return {
        img: itemImg.src,
        count: itemImg.dataset.count,
        itemType: itemImg.dataset.itemType,
        name: itemImg.title,
        consumable: itemImg.dataset.consumable === 'true'
      }
    } else {
      return null;
    }
  });
  
  savedData.backpackItems = backpackItems;

  const equippedItems = Array.from(document.getElementsByClassName('equipped-item'))
  .filter(div => div.classList.contains('occupied'))
  .map(div => {
    const img = div.getElementsByTagName('img')[0];
    return {
      type: div.parentElement.id.split('-')[0],
      img: img.src,
      name: img.alt,
      attack: parseInt(img.dataset.attack, 10) || 0,
      defense: parseInt(img.dataset.defense, 10) || 0,
      objectEffect: img.dataset.objectEffect || '',
      itemType: img.dataset.itemType,
      consumable: img.dataset.consumable === 'true' ? true : false,
      class: img.dataset.class
    };
  });

savedData.equippedItems = equippedItems;
  
  localStorage.setItem("gameData", JSON.stringify(savedData));
  console.log("Data saved.");
}


function loadData() {
  const savedData = localStorage.getItem("gameData");
  if (savedData) {
    const data = JSON.parse(savedData);
    moneyCount = data.moneyCount;
    experienceCount = data.experienceCount;
    totalExperienceCount = data.totalExperienceCount;
    level = data.level;
    playerHealth = data.playerHealth;
    currentPlayerHealth = data.currentPlayerHealth;
    playerMana = data.playerMana;
    currentPlayerMana = data.currentPlayerMana;
    deathCount = data.deathCount;
    criticalChance = data.criticalChance;
    criticalDamage = data.criticalDamage;
    maxDamageDealt = data.maxDamageDealt;
    maxDamageTaken = data.maxDamageTaken;
    monsterKills = data.monsterKills;
    bossKills = data.bossKills;
    grandBossKills = data.grandBossKills;
    damageDealt = data.damageDealt;
    damageBlocked = data.damageBlocked;
    attack = data.attack;
    defense = data.defense;
    promotionValue = data.promotionValue;
    magicSkill = data.magicSkill;
    magicSkillPercentage = data.magicSkillPercentage;
    swordSkill = data.swordSkill;
    swordSkillPercentage = data.swordSkillPercentage;
    crossBowSkill = data.crossBowSkill;
    crossBowSkillPercentage = data.crossBowSkillPercentage;
    wandSkill = data.wandSkill;
    wandSkillPercentage = data.wandSkillPercentage;
    bowSkill = data.bowSkill;
    bowSkillPercentage = data.bowSkillPercentage;
    axeSkill = data.axeSkill;
    axeSkillPercentage = data.axeSkillPercentage;
    rodSkill = data.rodSkill;
    rodSkillPercentage = data.rodSkillPercentage;
    shieldingSkill = data.shieldingSkill;
    shieldingSkillPercentage = data.shieldingSkillPercentage;
    nextMagicSkill = data.nextMagicSkill;
    nextSwordSkill = data.nextSwordSkill;
    nextCrossBowSkill = data.nextCrossBowSkill;
    nextWandSkill = data.nextWandSkill;
    nextBowSkill = data.nextBowSkill;
    nextAxeSkill = data.nextAxeSkill;
    nextRodSkill = data.nextRodSkill;
    nextShieldingSkill = data.nextShieldingSkill;
    isDamageEnabled = data.isDamageEnabled;
    isDamageTakenEnabled = data.isDamageTakenEnabled;
    isSpellDamageEnabled = data.isSpellDamageEnabled;
    isHealNumberEnabled = data.isHealNumberEnabled;
    backpackSize = data.backpackSize || 10; 
    backpack.innerHTML = '';
    for (let i = 0; i < backpackSize; i++) {
      addBackpackSlot();
    }
    shopStatsItems.forEach((item, index) => {
      if (data.shopStatsItems && data.shopStatsItems[index]) {
        item.price = data.shopStatsItems[index].price;
      }
    });
    shopItemsItems.forEach((item, index) => {
      if (data.shopItemsItems && data.shopItemsItems[index]) {
        item.price = data.shopItemsItems[index].price;
        item.effect = data.shopItemsItems[index].effect;
      }
    });

    moneyCountSpan.textContent = moneyCount;
    experienceCountSpan.textContent = experienceCount + "/";
    levelUpExperienceSpan.textContent = levelUpExperience(level);
    levelSpan.textContent = level;
    deathCountSpan.textContent = deathCount;
    criticalChanceSpan.textContent = criticalChance + "%";
    criticalDamageSpan.textContent = criticalDamage + "%";
    monsterKillSpan.textContent = monsterKills;
    bossKillSpan.textContent = bossKills;
    grandBossKillSpan.textContent = grandBossKills;
    attackSpan.textContent = attack;
    defenseSpan.textContent = defense;
    topDamageDealt.textContent = maxDamageDealt;
    topDamageTaken.textContent = maxDamageTaken;
    magicSkillSpan.textContent = magicSkill;
    swordSkillSpan.textContent = swordSkill;
    crossBowSkillSpan.textContent = crossBowSkill;
    wandSkillSpan.textContent = wandSkill;
    bowSkillSpan.textContent = bowSkill;
    axeSkillSpan.textContent = axeSkill;
    rodSkillSpan.textContent = rodSkill;
    shieldingSkillSpan.textContent = shieldingSkill;
    enableDamageElement.checked = isDamageEnabled;
    enableDamageTakenElement.checked = isDamageTakenEnabled;
    enableSpellDamageElement.checked = isSpellDamageEnabled;
    enableSpellHealElement.checked = isHealNumberEnabled;
    quests = data.quests;
    questPoints = data.questPoints;
    activeQuest = data.activeQuest;
    questsDone = data.questsDone;
    spellsContainer.boughtItems = data.spellsBought || [];
    spellsContainer.boughtItems.forEach((boughtItem, index) => {
      const originalItem = spellsItems.find(item => item.name === boughtItem.name);
      if (originalItem) {
        boughtItem.spellEffect = originalItem.spellEffect;
        boughtItem.key = boughtItem.assignedKey || `${index + 1}`;
        if (boughtItem.hasOwnProperty('onCooldown') && data.cooldowns && data.cooldowns[boughtItem.name]) {
          boughtItem.onCooldown = data.cooldowns[boughtItem.name];
        } else {
          boughtItem.onCooldown = false;
        }
      }
    });
    if (data.spellsBought) {
      spellsContainer.boughtItems = data.spellsBought.map(item => ({ ...item, key: item.assignedKey }));
    }

    // Load item order and parent list
    if (data.items) {
      data.items.forEach(function(item) {
        const parent = document.getElementById(item.parent);
        const itemElem = document.getElementById(item.id);
      
        // Temporarily detach the item from the DOM
        parent.removeChild(itemElem);

        // Append it to its original parent
        parent.appendChild(itemElem);
      });
    }
    const backpackSlots = Array.from(document.getElementsByClassName('backpack-slot'));
    backpackSlots.forEach((slot, i) => {
      if (data.backpackItems && data.backpackItems[i]) {
        const item = data.backpackItems[i];
        if (item) {
          const img = document.createElement('img');
          img.src = item.img;
          img.title = item.name;
          img.width = 75;
          img.height = 75;
          img.dataset.count = item.count;
          img.dataset.itemType = item.itemType;

          const itemCountDiv = document.createElement('div');
          itemCountDiv.className = 'item-count';
          itemCountDiv.textContent = item.count;

          slot.innerHTML = '';
          slot.appendChild(img);
          slot.appendChild(itemCountDiv);

          const originalEffect = originalEffects.get(item.itemType);
          if (originalEffect) {
            img.addEventListener('click', () => {
              originalEffect();
              let count = parseInt(img.dataset.count, 10);
              if (count > 1) {
                img.dataset.count = count - 1;
                itemCountDiv.textContent = count - 1;
              } else {
                slot.removeChild(itemCountDiv);
                slot.removeChild(img);
              }
            });
          } else {
            console.log(`No effect found for itemType: ${item.itemType}`);
          }
        }
      } else {
        slot.innerHTML = '';
      }
    });

    generateSpellsItems();
    if (data.achievements) {
      achievements = data.achievements;
      const achievementsDiv = document.querySelector('#achievements .sleft');
      achievementsDiv.innerHTML = '';
      achievements.forEach(({ name, description }) => {
        const achievementDiv = document.createElement('div');
        achievementDiv.classList.add('achievement');

        const achievementName = document.createElement('a');
        achievementName.textContent = name;
        achievementName.title = description;

        achievementDiv.appendChild(achievementName);
        achievementsDiv.appendChild(achievementDiv);
      });
    }

    if (data.equippedItems) {
      data.equippedItems.forEach(item => {
        addToInventory(item);
      });
    }

    generateQuestsHtml();
    updateQuestPointsDisplay();
    attachItemEventListeners();
  }
}


function handleSaveButtonClick() {
  saveData();
}

const saveButton = document.getElementById("save");

saveButton.addEventListener("click", handleSaveButtonClick);

window.addEventListener("load", () => {
  loadData();
  spawnMonster();
  updatePlayerHealthBar();
  updatePlayerManaBar();
  updateExperienceBar(experienceCount, levelUpExperience(level));
  generateShopItemsItems();
  generateShopStatsItems();
  generateSpellsItems();
  skillsProgressBar();
});

setInterval(saveData, 1 * 30 * 1000);


  const vocationImages = {
    Knight: {
      alive: 'player1.png',
      dead: 'playerDead1.png'
    },
    'Elite Knight': { 
      alive: 'playerPromoted1.png', 
      dead: 'playerPromotedDead1.png' },
    Mage: {
      alive: 'player2.png',
      dead: 'playerDead2.png'
    },
    'Archmage': { 
      alive: 'playerPromoted2.png', 
      dead: 'playerPromotedDead2.png' },
    Elf: {
      alive: 'player3.png',
      dead: 'playerDead3.png'
    },
    'Elder Elf': { 
      alive: 'playerPromoted3.png', 
      dead: 'playerPromotedDead3.png' },
    Warrior: {
      alive: 'player4.png',
      dead: 'playerDead4.png'
    },
    'Warlord': { 
      alive: 'playerPromoted4.png', 
      dead: 'playerPromotedDead4.png' },
    Druid: {
      alive: 'player5.png',
      dead: 'playerDead5.png'
    },
    'Archdruid': { 
      alive: 'playerPromoted5.png', 
      dead: 'playerPromotedDead5.png' },
    Paladin: {
      alive: 'player6.png',
      dead: 'playerDead6.png'
    },
    'Holy Paladin': { 
      alive: 'playerPromoted6.png', 
      dead: 'playerPromotedDead6.png' }
  };

  let selectedVocation = localStorage.getItem('selectedVocation');
  const playerImageElement = document.getElementById('playerImage');
  const playerDeadImageElement = document.getElementById('playerDeadImage');


  if (vocationImages.hasOwnProperty(selectedVocation)) {
    const vocationImagesData = vocationImages[selectedVocation];
    playerImageElement.src = `sprites/player/${vocationImagesData.alive}`;
    playerDeadImageElement.src = `sprites/player/${vocationImagesData.dead}`;
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

if (leftFoldableContainer2.style.display === 'block') {
  combatStatsButton.innerHTML = 'Combat Stats';
} else {
  combatStatsButton.innerHTML = 'Combat Stats';
}

combatStatsButton.addEventListener('click', () => {
  if (leftFoldableContainer2.style.display === 'none') {
    leftFoldableContainer2.style.display = 'block';
  } else {
    leftFoldableContainer2.style.display = 'none';
  }
});

if (leftFoldableContainer3.style.display === 'block') {
  skillsButton.innerHTML = 'Skills';
} else {
  skillsButton.innerHTML = 'Skills';
}

skillsButton.addEventListener('click', () => {
  if (leftFoldableContainer3.style.display === 'none') {
    leftFoldableContainer3.style.display = 'block';
  } else {
    leftFoldableContainer3.style.display = 'none';
  }
});

function updateLog(message) {
  const logContent = document.getElementById('logContent');
  const newMessage = document.createElement('p');
  newMessage.textContent = message;
  logContent.insertBefore(newMessage, logContent.firstChild);
  if (logContent.childNodes.length > 10) {
    logContent.removeChild(logContent.lastChild);
  }
}