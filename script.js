let ul = document.getElementById('list');
let li = document.createElement('li');
let span = document.createElement('span');
let deleteButton = document.createElement('i');
let checkDone = document.createElement('i');
let uncheckBtn = 'fas fa-square fa-lg uncheck';
let checkBtn = 'fas fa-check-square fa-lg check';
let deleteBtn = 'fas fa-times-circle delete-btn fa-lg';
let storedList = window.localStorage;
let listKeys = Object.keys(storedList).sort();
let listValues = [];
let listDataArr = Object.values(storedList);
let clearButton = document.getElementById('clear-btn');

function loadStoredElements() {
	if (storedList.length != 0) {
		for (let i = 0; i < storedList.length; i++) {
			listValues.push(JSON.parse(storedList[listKeys[i]])[0]);
		}
		for (let i = 0; i < storedList.length; i++) {
			createListElement(JSON.parse(storedList[listKeys[i]])[0], JSON.parse(storedList[listKeys[i]])[1]);
		}
		renderClearButton();
	}
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
		createListElement(newTodo.toLowerCase());
		document.getElementById('newTodo').value = null;
	}
}

function createListElement(todo, checkStatus = 'uncheckBtn') {
	ul = document.getElementById('list');
	li = document.createElement('li');
	span = document.createElement('span');
	span.appendChild(document.createTextNode(todo.toLowerCase()));
	deleteButton = document.createElement('i');
	deleteButton.className = deleteBtn;
	deleteButton.style.visibility = 'hidden';
	deleteButton.addEventListener('click', todoDelete);
	checkDone = document.createElement('i');
	checkDone.addEventListener('click', todoCheck);
	li.appendChild(checkDone);
	li.appendChild(span);
	li.appendChild(deleteButton);
	ul.appendChild(li);
	if (checkStatus === 'uncheckBtn') {
		checkDone.className = uncheckBtn;
		checkDone.setAttribute('data-done', 'false');
	} else if (checkStatus === 'checkBtn') {
		checkDone.className = checkBtn;
		checkDone.nextElementSibling.className = 'strike';
		checkDone.nextElementSibling.nextElementSibling.style.visibility = 'visible';
		checkDone.setAttribute('data-done', 'true');
	}

	if (!listValues.includes(todo.toLowerCase())) {
		storeListItem(todo);
	}
}

function storeListItem(listItem) {
	listKeys = Object.keys(storedList).sort();
	if (listKeys.length === 0) {
		storedList.setItem(storedList.length, JSON.stringify([ listItem, 'uncheckBtn' ]));
		listKeys = Object.keys(storedList).sort();
		listDataArr = Object.values(storedList);
		listValues.push(JSON.parse(storedList.getItem(listKeys[listKeys.length - 1]))[0]);
		renderClearButton();
	} else {
		storedList.setItem(parseInt(listKeys[listKeys.length - 1]) + 1, JSON.stringify([ listItem, 'uncheckBtn' ]));
		listKeys = Object.keys(storedList).sort();
		listDataArr = Object.values(storedList);
		listValues.push(JSON.parse(storedList.getItem(listKeys[listKeys.length - 1]))[0]);
		renderClearButton();
	}
}

function todoCheck() {
	let isDone = this.getAttribute('data-done') === 'false' ? false : true;
	isDone = !isDone;
	if (isDone) {
		this.nextElementSibling.className = 'strike';
		this.setAttribute('data-done', 'true');
		this.className = checkBtn;
		this.nextElementSibling.nextElementSibling.style.visibility = 'visible';
		storedList[
			Object.keys(storedList).find((key) => JSON.parse(storedList[key])[0] === this.nextElementSibling.innerHTML)
		] = JSON.stringify([ this.nextElementSibling.innerHTML, 'checkBtn' ]);
	} else {
		this.nextElementSibling.classList.remove('strike');
		this.setAttribute('data-done', 'false');
		this.className = uncheckBtn;
		this.nextElementSibling.nextElementSibling.style.visibility = 'hidden';
		storedList[
			Object.keys(storedList).find((key) => JSON.parse(storedList[key])[0] === this.nextElementSibling.innerHTML)
		] = JSON.stringify([ this.nextElementSibling.innerHTML, 'uncheckBtn' ]);
	}
}

function todoDelete() {
	this.parentNode.remove();
	let deleteKey = Object.keys(storedList).find(
		(key) => JSON.parse(storedList[key])[0] === this.previousElementSibling.innerHTML
	);
	storedList.removeItem(deleteKey);
	listValues.splice(listValues.indexOf(this.previousElementSibling.innerHTML), 1);
	listKeys.splice(deleteKey, 1);
	renderClearButton();
}

function clearList() {
	storedList.clear();
	ul.innerHTML = '';
	renderClearButton();
}

function renderClearButton() {
	if (storedList.length > 0) {
		clearButton.style.visibility = 'visible';
	} else {
		clearButton.style.visibility = 'hidden';
	}
}

loadStoredElements();
renderClearButton();
