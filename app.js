let inp = document.getElementById('input');
let list = document.getElementById('list');
let inProgress = document.getElementById('in-progress');
let done = document.getElementById('done');

function add() {
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" class="rounded" onclick="strikeThrough(event)">
    <input type="text" class="p-1" value="${inp.value}" disabled>
    <button class="red btn btn-light" onclick="remove(event)">X</button>
      <button class="green" onclick="update(event)">&#8635</button>
  `;
  li.setAttribute('draggable', 'true');
  li.setAttribute('id', 'card-' + Date.now()); // Assign a unique ID
  li.addEventListener('dragstart', drag);
  list.appendChild(li);
  inp.value = "";
}

inp.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    add();
  }
});

function remove(event) {
  event.target.parentNode.remove();
}

function update(event) {
  event.target.parentNode.querySelector('input[type=text]').disabled = false;
  event.target.parentNode.querySelector('input[type=text]').focus();
}

function strikeThrough(event) {
  const span = event.target.nextElementSibling;
  if (event.target.checked) {
    span.style.textDecoration = 'line-through';
  } else {
    span.style.textDecoration = 'none';
  }
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const element = document.getElementById(data);
  if (event.target.id === 'in-progress' || event.target.id === 'done') {
    event.target.appendChild(element);
  } else {
    const parent = event.target.closest('#in-progress, #done');
    if (parent) {
      parent.appendChild(element);
    }
  }
}

function allowDrop(event) {
  event.preventDefault();
}

// Add these attributes 
inProgress.setAttribute('ondrop', 'drop(event)');
inProgress.setAttribute('ondragover', 'allowDrop(event)');
done.setAttribute('ondrop', 'drop(event)');
done.setAttribute('ondragover', 'allowDrop(event)');
