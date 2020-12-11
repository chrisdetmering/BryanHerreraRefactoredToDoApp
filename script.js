let todoList = [];
let ul = document.getElementById('list');

function addTodo() {
	let newTodo = document.getElementById('newTodo').value;
	document.getElementById('newTodo').value = null;
	todoList.push(newTodo);
	listItem(newTodo);
	console.log(newTodo);
	console.log(todoList);
}

function listItem(todo) {
	ul = document.getElementById('list');
	let li = document.createElement('li');
	let span = document.createElement('span');
	let deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'Delete';
	deleteButton.addEventListener('click', function() {
		console.log(todo + ' delete');
		//console.log(deleteButton.parentNode);
		deleteButton.parentNode.remove();
	});
	let doneButton = document.createElement('button');
	doneButton.innerHTML = 'Done';
	doneButton.addEventListener('click', function() {
		console.log(todo + ' done');
		//console.log(doneButton.previousElementSibling.innerHTML);
		doneButton.previousElementSibling.innerHTML = '<s>' + doneButton.previousElementSibling.innerHTML + '</s>';
	});
	li.appendChild(span);
	span.appendChild(document.createTextNode(todo));
	li.appendChild(doneButton);
	li.appendChild(deleteButton);
	ul.appendChild(li);
}
