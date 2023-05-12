clickButton.addEventListener('click', () => {
    if (experienceCount >= levelUpExperience(level)) {
      levelUp();
      totalExperienceCount += levelUpExperience;
    }
    experienceCountSpan.textContent = experienceCount + " / " + levelUpExperience(level);
    totalExperienceCountSpan.textContent = totalExperienceCount;
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
    levelSpan.textContent = level;
    updateLog("Congratulations! You have leveled up to level "+level+"!");
    updateExperienceBar(experienceCount, levelUpExperience(level));
  };
  
    // Level up if necessary
    while (experienceCount >= levelUpExperience(level)) {
      levelUp();
    }

function updateExperienceBar(experienceCount, levelUpExp) {
  const expPercentage = (experienceCount / levelUpExperience) * 100;
  experienceBar.style.width = expPercentage + '%';
  experienceCountSpan.textContent = experienceCount;
  levelUpExperienceSpan.textContent = levelUpExp;
}

updateExperienceBar(experienceCount, levelUpExperience(level));