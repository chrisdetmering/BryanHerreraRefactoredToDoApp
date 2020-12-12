let todoList = [];
let ul = document.getElementById('list');
let uncheckBtn = 'fas fa-circle fa-lg uncheck';
let checkBtn = 'fas fa-check-circle fa-lg check';

function validateInput() {
	let newTodo = document.getElementById('newTodo').value;
	if (newTodo === '') {
		alert('Enter a to do item.');
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
	deleteButton.className = 'fas fa-times-circle delete-btn fa-lg';
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
}

function todoCheck() {
	let isDone = this.getAttribute('data-done') === 'false' ? false : true;
	console.log(isDone);
	isDone = !isDone;
	console.log(isDone);
	if (isDone) {
		console.log(' done');
		console.log(this);
		this.nextElementSibling.className = 'strike';
		this.setAttribute('data-done', 'true');
		//this.classList.remove('far');
		//this.classList.remove('fa-circle');
		this.className = checkBtn;
		this.nextElementSibling.nextElementSibling.style.visibility = 'visible';
	} else {
		console.log('not done');
		this.nextElementSibling.classList.remove('strike');
		this.setAttribute('data-done', 'false');
		//this.classList.remove('fas');
		//this.classList.remove('fa-check-circle');
		this.className = uncheckBtn;
		this.nextElementSibling.nextElementSibling.style.visibility = 'hidden';
	}
}

function todoDelete() {
	console.log(' delete');
	this.parentNode.remove();
}
