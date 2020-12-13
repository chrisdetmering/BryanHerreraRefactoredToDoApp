let todoList = [];
let ul = document.getElementById('list');
let uncheckBtn = 'fas fa-square fa-lg uncheck';
let checkBtn = 'fas fa-check-square fa-lg check';
let deleteBtn = 'fas fa-times-circle delete-btn fa-lg';
let storedList = window.localStorage;
let listKeys = Object.keys(storedList).sort();
let listValues = Object.values(storedList);

function loadStoredElements() {
	if (storedList.length != 0) {
		console.log('Loading saved list items');
		for (let i = 0; i < storedList.length; i++) {
			console.log(storedList[listKeys[i]]);
			createListElement(storedList[listKeys[i]]);
		}
	} else {
		console.log('No stored list items');
	}
}

function renderList(listItem) {
	ul.innerHTML += listItem;
}

function validateInput() {
	let newTodo = document.getElementById('newTodo').value;
	if (newTodo === '') {
		alert('Enter a to do item.');
		return false;
	} else if (storedList.length > 0 && listValues.includes(newTodo.toLowerCase())) {
		alert('That item already exists.');
		document.getElementById('newTodo').value = null;
		return false;
	} else {
		createListElement(newTodo);
		document.getElementById('newTodo').value = null;
	}
}

function createListElement(todo) {
	ul = document.getElementById('list');
	let li = document.createElement('li');
	let span = document.createElement('span');
	span.appendChild(document.createTextNode(todo));
	let deleteButton = document.createElement('i');
	deleteButton.className = deleteBtn;
	deleteButton.style.visibility = 'hidden';
	deleteButton.addEventListener('click', todoDelete);
	let checkDone = document.createElement('i');
	checkDone.className = uncheckBtn;
	checkDone.setAttribute('data-done', 'false');
	checkDone.addEventListener('click', todoCheck);
	li.appendChild(checkDone);
	li.appendChild(span);
	li.appendChild(deleteButton);
	ul.appendChild(li);
	todoList.push(todo.toLowerCase());
	if (!listValues.includes(todo.toLowerCase())) {
		console.log('Store me Im new');
		storeListItem(todo);
	}
}

function storeListItem(listItem) {
	storedList.setItem(storedList.length, listItem);
	listValues = Object.values(storedList);
	console.log(storedList);
	console.log(listValues);
}

function todoCheck() {
	let isDone = this.getAttribute('data-done') === 'false' ? false : true;
	console.log(isDone);
	isDone = !isDone;
	console.log(isDone);
	if (isDone) {
		console.log(' done');
		this.nextElementSibling.className = 'strike';
		this.setAttribute('data-done', 'true');
		this.className = checkBtn;
		this.nextElementSibling.nextElementSibling.style.visibility = 'visible';
	} else {
		console.log('not done');
		this.nextElementSibling.classList.remove('strike');
		this.setAttribute('data-done', 'false');
		this.className = uncheckBtn;
		this.nextElementSibling.nextElementSibling.style.visibility = 'hidden';
	}
}

function todoDelete() {
	console.log(' delete');
	console.log(this.previousElementSibling.innerHTML);
	this.parentNode.remove();
	storedList.removeItem(
		Object.keys(storedList).find((key) => storedList[key] === this.previousElementSibling.innerHTML)
	);
}

loadStoredElements();
