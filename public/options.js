document.getElementById('options').addEventListener('click', function() {
    document.getElementById('optionsModal').style.display = 'block';
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('optionsModal').style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == document.getElementById('optionsModal')) {
        document.getElementById('optionsModal').style.display = 'none';
    }
}

let isDamageEnabled = false; // Global variable

// Add this code where you set up your checkbox event listener
const enableDamageElement = document.getElementById('enableDamage');
if (enableDamageElement) {
    enableDamageElement.addEventListener('change', function() {
        isDamageEnabled = this.checked;
    });
    // Set initial state based on checkbox
    isDamageEnabled = enableDamageElement.checked;
} else {
    console.error('Could not find enableDamage element.');
}

let isDamageTakenEnabled = true;

const enableDamageTakenElement = document.getElementById('enableDamageTaken');
if (enableDamageTakenElement) {
    enableDamageTakenElement.addEventListener('change', function() {
        isDamageTakenEnabled = this.checked;
    });
}

let isSpellDamageEnabled = true;

const enableSpellDamageElement = document.getElementById('enableSpellDamage');
if (enableSpellDamageElement) {
    enableSpellDamageElement.addEventListener('change', function() {
        isSpellDamageEnabled = this.checked;
    });
}

let isHealNumberEnabled = true;

const enableSpellHealElement = document.getElementById('enableSpellHeal');
if (enableSpellHealElement) {
    enableSpellHealElement.addEventListener('change', function() {
        isHealNumberEnabled = this.checked;
    });
}

document.getElementById('showCompletedQuests').addEventListener('change', generateQuestsHtml);

document.getElementById('options').addEventListener('click', function() {
    const keyAssignmentsContainer = document.getElementById('keyAssignments');
    keyAssignmentsContainer.innerHTML = ''; // Clear previous inputs

    const modalOptionsContent = document.querySelector('.modal-options-content');

    // Add margin-bottom to child elements
    const childElements = modalOptionsContent.children;
    for (let i = 0; i < childElements.length; i++) {
        childElements[i].style.marginBottom = '10px';
    }

    spellsContainer.boughtItems.forEach((item, index) => {
        const keyAssignmentDiv = document.createElement('div');

        const label = document.createElement('label');
        label.textContent = `Key for ${item.name}: `;
        keyAssignmentDiv.appendChild(label);

        const input = document.createElement('input');
        input.style.marginBottom = '10px';
        input.type = 'text';
        input.value = item.key; // Current key assignment
        input.dataset.index = index; // Store index of spell this input corresponds to
        input.addEventListener('change', function() {
            const newKey = this.value;
            if (newKey.length !== 1) {
                alert('Invalid key assignment. Please enter a single character.');
                this.value = item.key; // Reset to current key assignment
            } else {
                // Update key assignment
                item.key = newKey;

                // Update key displayed under spell image
                const boughtItems = document.getElementsByClassName('bought-item');
                boughtItems[index].children[1].textContent = newKey;

                // Update dataset property
                boughtItems[index].dataset.key = newKey;
            }
        });

        input.style.width = '40px';

        keyAssignmentDiv.appendChild(input);

        keyAssignmentsContainer.appendChild(keyAssignmentDiv);
    });

    document.getElementById('optionsModal').style.display = 'block';
});