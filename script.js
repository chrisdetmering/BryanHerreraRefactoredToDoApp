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
let clearButton = document.getElementsByClassName('clear-btn')[0];

function loadStoredElements() {
	if (storedList.length != 0) {
		console.log('Loading saved list items');
		for (let i = 0; i < storedList.length; i++) {
			listValues.push(JSON.parse(storedList[listKeys[i]])[0]);
		}
		console.log(listValues);
		for (let i = 0; i < storedList.length; i++) {
			console.log(listDataArr);
			console.log(JSON.parse(storedList[listKeys[i]]));
			console.log(JSON.parse(storedList[listKeys[i]])[0]);
			createListElement(JSON.parse(storedList[listKeys[i]])[0], JSON.parse(storedList[listKeys[i]])[1]);
		}
		renderClearButton();
	} else {
		console.log('No stored list items');
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
		console.log('Store me Im new');
		storeListItem(todo);
	}
}

function storeListItem(listItem) {
	listKeys = Object.keys(storedList).sort();
	console.log(listKeys);
	if (listKeys.length === 0) {
		storedList.setItem(storedList.length, JSON.stringify([ listItem, 'uncheckBtn' ]));
		listKeys = Object.keys(storedList).sort();
	} else {
		listKeys = Object.keys(storedList).sort();
		console.log(listKeys[listKeys.length - 1]);
		storedList.setItem(parseInt(listKeys[listKeys.length - 1]) + 1, JSON.stringify([ listItem, 'uncheckBtn' ]));
	}
	//storedList.setItem(storedList.length + 1, JSON.stringify([ listItem, 'uncheckBtn' ]));
	renderClearButton();
	listDataArr = Object.values(storedList);
	console.log(JSON.parse(storedList.getItem(listKeys[listKeys.length - 1]))[0]);
	listValues.push(JSON.parse(storedList.getItem(listKeys[listKeys.length - 1]))[0]);
	console.log(storedList);
	console.log(listDataArr);
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
		storedList[
			Object.keys(storedList).find((key) => JSON.parse(storedList[key])[0] === this.nextElementSibling.innerHTML)
		] = JSON.stringify([ this.nextElementSibling.innerHTML, 'checkBtn' ]);
	} else {
		console.log('not done');
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
	console.log(' delete');
	console.log(this.previousElementSibling.innerHTML);
	this.parentNode.remove();
	storedList.removeItem(
		Object.keys(storedList).find((key) => JSON.parse(storedList[key])[0] === this.previousElementSibling.innerHTML)
	);
	listValues.splice(listValues.indexOf(this.previousElementSibling.innerHTML), 1);
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
