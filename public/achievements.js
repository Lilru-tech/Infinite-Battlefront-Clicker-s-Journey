let achievements = [];

var modal = document.getElementById("achievement-popup");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-popup")[0];

function hidePopup() {
    // Add the animation class to the popup
    modal.classList.add('hide');
    
    // Remove the class after the animation ends
    setTimeout(function() {
        modal.style.display = "none";
        modal.classList.remove('hide');
    }, 500);
}

document.getElementById('close-popup').addEventListener('click', hidePopup);

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  hidePopup();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    hidePopup();
  }
}

function addAchievement(name, description) {
    // Check if the achievement is already in the achievements array
    if (achievements.some(achievement => achievement.name === name)) {
        // If it is, return early and don't add the achievement
        return;
    }

    const achievementsDiv = document.querySelector('#achievements .sleft');

    const achievementDiv = document.createElement('div');
    achievementDiv.classList.add('achievement');

    const achievementName = document.createElement('a');
    achievementName.textContent = name;
    achievementName.title = description;

    achievementDiv.appendChild(achievementName);
    achievementsDiv.appendChild(achievementDiv);

    achievements.push({ name, description });
    showPopup(name, description);
}


function onMonsterKilled() {
    if (monsterKills === 10) {
      addAchievement('Monster Slayer', 'Killed 10 monsters.');
    } else if (monsterKills === 20) {
      addAchievement('Monster Slayer II', 'Killed 20 monsters.');
    }
  
    if (bossKills === 1) {
      addAchievement('Boss Bane', 'Killed your first boss.');
    } else if (bossKills === 10) {
      addAchievement('Boss Bane II', 'Killed 10 bosses.');
    }
  
    if (grandBossKills === 1) {
      addAchievement('Grand Boss Vanquisher', 'Killed your first Grand Boss.');
    } else if (grandBossKills === 10) {
      addAchievement('Grand Boss Vanquisher II', 'Killed 10 Grand Bosses.');
    }
  }
  

function onLevelUp() {
    if (level === 3) {
        addAchievement('Rising Star', 'Reached Level 10');
    } else if (level === 5) {
        addAchievement('Seasoned Adventurer', 'Reached Level 20.');
    }
}

function attackAchievements() {
    if (maxDamageDealt >= 200) {
        addAchievement('Unstoppable Force', 'Dealt 200 damage in a single blow.');
    } else if (maxDamageDealt >= 100) {
        addAchievement('Demolisher', 'Dealt 100 damage in a single blow');
    }
}

function showPopup(name, message) {
    // Get the title and message elements of the modal
    var title = document.getElementById('achievement-popup-title');
    var achievementMessage = document.getElementById('achievement-popup-message');

    // Set their text
    title.textContent = `Congratulations! You won the '${name}' achievement.`;
    achievementMessage.textContent = message;

    // Show the modal
    modal.style.display = "block";

    // Hide the modal after 5 seconds
    setTimeout(hidePopup, 5000);
}
