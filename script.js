//let todoList = [];
let ul = document.getElementById('list');

function validateInput() {
	let newTodo = document.getElementById('newTodo').value;
	addTodo(newTodo);
}

function addTodo(newTodo) {
	if (newTodo === '') {
		alert('Enter a to do item.');
		return false;
	} else {
		document.getElementById('newTodo').value = null;
		listItem(newTodo);
		console.log(newTodo);
	}
}

function listItem(todo) {
	ul = document.getElementById('list');
	let li = document.createElement('li');
	let span = document.createElement('span');
	span.appendChild(document.createTextNode(todo));
	let deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'Delete';
	deleteButton.addEventListener('click', function() {
		console.log(todo + ' delete');
		deleteButton.parentNode.remove();
	});
	let checkDone = document.createElement('input');
	checkDone.setAttribute('type', 'checkbox');
	checkDone.addEventListener('change', function() {
		if (checkDone.checked) {
			console.log(todo + ' done');
			checkDone.nextElementSibling.innerHTML = '<s>' + checkDone.nextElementSibling.innerHTML + '</s>';
		} else {
			console.log(todo + ' not done');
			checkDone.nextElementSibling.innerHTML = checkDone.nextElementSibling.innerText;
		}
	});
	li.appendChild(checkDone);
	li.appendChild(span);
	li.appendChild(deleteButton);
	ul.appendChild(li);
}
