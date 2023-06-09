document.querySelector('#inventory-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      let item = event.target;
      document.querySelector('#equipped-list').appendChild(item);
    }
  });
  
  document.querySelector('#equipped-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      let item = event.target;
      document.querySelector('#inventory-list').appendChild(item);
    }
  });