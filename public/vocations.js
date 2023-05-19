const vocations = [
    { name: 'Knight',
      description: 'The Knight is a skilled warrior known for their prowess in combat and their unwavering loyalty. They excel in close-quarters combat, wielding heavy weapons and wearing sturdy armor. Knights are often the frontline defenders, protecting their allies and standing against the forces of darkness.'},
    { name: 'Mage',
      description: 'The Mage is a master of arcane arts and spellcasting. They harness the raw power of magic to manipulate the elements, cast devastating spells, and unravel the mysteries of the arcane. Mages are scholarly individuals who spend years honing their magical abilities and unlocking the secrets of the universe.'},
    { name: 'Elf',
      description: 'The Elf is an ancient and graceful being connected to nature and possessing innate magical talents. Elves are known for their exceptional agility, keen senses, and affinity for archery. They are attuned to the natural world, often dwelling in enchanted forests and wielding natures blessings to defend their lands.'},
    { name: 'Warrior', 
      description: 'The Warrior is a battle-hardened fighter with exceptional combat skills and unwavering determination. They specialize in various weapon styles and excel in the art of warfare. Warriors are known for their physical strength, endurance, and resilience, often leading the charge in battles and inspiring their allies through their bravery.'},
    { name: 'Druid',
      description: 'The Druid is a compassionate individual with the ability to mend wounds, cure ailments, and restore vitality to others. They possess extensive knowledge of restorative magic and medicinal arts. Healers are indispensable in any adventuring party, ensuring the well-being of their companions and providing vital support during battles.'},
      { name: 'Paladin', 
      description: 'The Paladin is a holy warrior blessed with divine powers. They combine martial skills with potent spells to uphold justice and smite evil. Paladins are renowned for their unwavering faith, their ability to heal wounds, and their proficiency in banishing dark creatures. They are often seen as beacons of hope in times of darkness.'}
  ];
  
  const vocationContainer = document.getElementById('vocation-container');

  vocations.forEach((vocation, index) => {
    const card = document.createElement('div');
    card.className = 'card flex-row';
  
    const img = document.createElement('img');
    img.className = 'book';
    img.src = `sprites/player/sample${index + 1}.png`;
  
    const info = document.createElement('div');
    info.className = 'flex-column info';
  
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = vocation.name;
  
    const summary = document.createElement('div');
    summary.className = 'hidden bottom summary';
    summary.textContent = vocation.description;
  
    info.appendChild(title);
    info.appendChild(summary);
  
    const joinButton = document.createElement('button');
    joinButton.className = 'simple hidden bottom';
    joinButton.textContent = 'Start!';
    joinButton.addEventListener('click', () => {
      localStorage.setItem('selectedVocation', vocation.name);
      localStorage.setItem('isPromoted', 'false');
      setPlayerImages(vocation.name);
      window.location.href = 'game.html';
    });
  
    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(joinButton);
  
    vocationContainer.appendChild(card);
  });

function setPlayerImages(selectedVocation) {
  let playerImage = 'player1.png';
  let playerDeadImage = 'playerDead1.png';

  switch (selectedVocation) {
    case 'Knight':
      playerImage = 'player1.png';
      playerDeadImage = 'playerDead1.png';
      break;
    case 'Paladin':
      playerImage = 'player6.png';
      playerDeadImage = 'playerDead6.png';
      break;
    case 'Mage':
      playerImage = 'player2.png';
      playerDeadImage = 'playerDead2.png';
      break;
    case 'Elf':
      playerImage = 'player3.png';
      playerDeadImage = 'playerDead3.png';
      break;
    case 'Warrior':
      playerImage = 'player4.png';
      playerDeadImage = 'playerDead4.png';
      break;
    case 'Druid':
      playerImage = 'player5.png';
      playerDeadImage = 'playerDead5.png';
      break;
    default:
      // Default player images
      playerImage = 'player.png';
      playerDeadImage = 'playerDead.png';
  }

  localStorage.setItem('playerImage', playerImage);
  localStorage.setItem('playerDeadImage', playerDeadImage);
}