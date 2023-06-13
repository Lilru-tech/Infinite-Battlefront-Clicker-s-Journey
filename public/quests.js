let quests = [
    { id: 1, description: "Kill 10 monsters", goal: 1, completed: false, active: false, questProgress: 0, points: 1 },
    { id: 2, description: "Hit more than 100", goal: 100, completed: false, active: false, questProgress: 0, points: 1 },
    { id: 3, description: "Waste more than 1000 mana", goal: 1000, completed: false, active: false, questProgress: 0, points: 2 }
];

let questPoints = 0;
let activeQuest = false;
let questsDone = 0;

function startQuest(id) {
    for (let quest of quests) {
        if (quest.id === id) {
            quest.active = true;
            quest.questProgress = 0;
            activeQuest = true;
        } else {
            quest.active = false;
        }
    }
    generateQuestsHtml();
}

function updateQuests() {
    for (let quest of quests) {
        if (quest.active && !quest.completed) {
            if ((quest.id === 1 && quest.questProgress >= quest.goal) ||
            (quest.id === 2 && (damageDealt > 25 || criticalDamageDealt > 100)) ||
            (quest.id === 3 && questWastedMana > 1000)) {
                quest.completed = true;
                quest.active = false;
                questPoints += quest.points;
                questsDone++;
                updateQuestPointsDisplay();
                activeQuest = false;
                if (quest.id === 3) {
                    questWastedMana = 0;
                }
                if (quest.id === 1) {
                  giveObject('Wooden Sword');
                  giveObject('Radiant Wand');
              }
              if (quest.id === 2) {
                  giveObject('Wooden Shield');
              }              
            }
        }
    }
    questsAchievements();
    generateQuestsHtml();
}

function giveObject(objectName) {
  const backpackSlots = document.querySelectorAll('.backpack-slot');
  for (let i = 0; i < backpackSlots.length; i++) {
      if (!backpackSlots[i].hasChildNodes()) {
          // Find the object with the specified name in the objects array
          const object = objects.find(obj => obj.name === objectName);
          if (object) {
              addItemToBackpack(object);
              break;
          } else {
              console.error(`Object with name ${objectName} not found in objects array`);
          }
      }
  }
}
  
function updateQuestPointsDisplay() {
    document.getElementById('questPoints').textContent = questPoints;
}

function generateQuestsHtml() {
    let questsHtml = '';
    const showCompletedQuests = document.getElementById('showCompletedQuests').checked;
  
    for (let quest of quests) {
      if (quest.completed && !showCompletedQuests) {
        continue;
      }
  
      questsHtml += `<div class="quest ${quest.completed ? 'completed' : ''} ${quest.active ? 'active' : ''}">
                          <span>${quest.description}</span>
                          <span>${quest.completed ? 'Completed' : quest.active ? 'Active' : 'Incomplete'}</span>`;
      if (!quest.completed && !activeQuest) {
        questsHtml += `<button onclick="startQuest(${quest.id})">Start Quest</button>`;
      }
      questsHtml += `</div>`;
    }
  
    document.querySelector('.quests').innerHTML = questsHtml;
  }  
generateQuestsHtml();
