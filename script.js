let ul = document.getElementById('list');
let uncheckBtn = 'fas fa-square fa-lg uncheck';
let checkBtn = 'fas fa-check-square fa-lg check';
let deleteBtn = 'fas fa-times-circle delete-btn fa-lg';
let storedList = window.localStorage;
let listKeys = Object.keys(storedList).sort();
let listValues = [];
let listDataArr = Object.values(storedList);

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

function createListElement(todo, checkStatus = 'uncheckBtn') {
	ul = document.getElementById('list');
	let li = document.createElement('li');
	let span = document.createElement('span');
	span.appendChild(document.createTextNode(todo));
	let deleteButton = document.createElement('i');
	deleteButton.className = deleteBtn;
	deleteButton.style.visibility = 'hidden';
	deleteButton.addEventListener('click', todoDelete);
	let checkDone = document.createElement('i');
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
	storedList.setItem(storedList.length, JSON.stringify([ listItem, 'uncheckBtn' ]));
	listDataArr = Object.values(storedList);
	listValues.push(JSON.parse(storedList.getItem(storedList.length - 1))[0]);
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
}

loadStoredElements();
