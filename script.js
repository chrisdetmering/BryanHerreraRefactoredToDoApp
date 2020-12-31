
let uncheckBtn = 'fas fa-square fa-lg uncheck';
let checkBtn = 'fas fa-check-square fa-lg check';
let deleteBtn = 'fas fa-times-circle delete-btn fa-lg';


const getSavedTodos = () => { 
		return JSON.parse(localStorage.getItem("todos")) || [];
}

const saveTodo = todo => { 
	const savedTodos = getSavedTodos(); 
	const newTodos = [...savedTodos, todo];

	localStorage.setItem("todos", JSON.stringify(newTodos)); 
}

const deleteSavedTodo = id => { 
	const savedTodos = getSavedTodos(); 
	const newTodos = savedTodos.filter(todo => todo.id !== id); 

	localStorage.setItem("todos", JSON.stringify(newTodos)); 
}


const createTodoListItem = (todo) => { 
	const todoListItem = document.createElement('li');
	todoListItem.textContent = todo.text; 
	return todoListItem; 
} 

const createDeleteTodoButton = (todo, todoListItem) => { 
	const deleteButton = document.createElement('i');
	deleteButton.className = deleteBtn; 

	deleteButton.addEventListener('click', () => { 
		todoListItem.remove();
		deleteSavedTodo(todo.id); 
	});

	return deleteButton; 
}

const displayTodo = (todo) => { 
	const todoListItem = createTodoListItem(todo); 
	const deleteButton = createDeleteTodoButton(todo, todoListItem)


	todoListItem.append(deleteButton); 

	const todosUnordedList = document.getElementById('todos');
	todosUnordedList.append(todoListItem); 
}



document.querySelector("#add-btn").addEventListener("click", () => { 
	const input = document.querySelector("#todo-text"); 
	const todoText = input.value

	if (todoText === '') {	
		return;
	}


	const todo = {
		id: Date.now(), 
		text: todoText, 
		isCompleted: false, 
	}

	displayTodo(todo); 
	saveTodo(todo); 
	input.value = ''; 
})



// function loadStoredElements() {
// 	if (storedList.length != 0) {
// 		for (let i = 0; i < storedList.length; i++) {
// 			listValues.push(JSON.parse(storedList[listKeys[i]])[0]);
// 		}
// 		for (let i = 0; i < storedList.length; i++) {
// 			createListElement(JSON.parse(storedList[listKeys[i]])[0], JSON.parse(storedList[listKeys[i]])[1]);
// 		}
// 		renderClearButton();
// 	}
// }




// function validateInput() {
	
// 	if (todoText === '') {
// 		alert('Enter a to do item.');
// 		return false;
// 	} else if (storedList.length > 0 && listValues.includes(newTodo.toLowerCase())) {
// 		alert('That item already exists.');
// 		document.getElementById('newTodo').value = null;
// 		return false;
// 	} else {
// 		createListElement(todoText.toLowerCase());
// 		document.getElementById('todo-text').value = null;
// 	}
// }

// function createListElement(todo, checkStatus = 'uncheckBtn') {
	
// 	span = document.createElement('span');
// 	span.appendChild(document.createTextNode(todo.toLowerCase()));
	
// 	checkDone = document.createElement('i');
// 	checkDone.addEventListener('click', todoCheck);
// 	li.appendChild(checkDone);
// 	li.appendChild(span);
// 	li.appendChild(deleteButton);
// 	ul.appendChild(li);
// 	if (checkStatus === 'uncheckBtn') {
// 		checkDone.className = uncheckBtn;
// 		checkDone.setAttribute('data-done', 'false');
// 	} else if (checkStatus === 'checkBtn') {
// 		checkDone.className = checkBtn;
// 		checkDone.nextElementSibling.className = 'strike';
// 		checkDone.nextElementSibling.nextElementSibling.style.visibility = 'visible';
// 		checkDone.setAttribute('data-done', 'true');
// 	}

// 	if (!listValues.includes(todo.toLowerCase())) {
// 		storeListItem(todo);
// 	}
// }

// function storeListItem(listItem) {
// 	listKeys = Object.keys(storedList).sort();
// 	if (listKeys.length === 0) {
// 		storedList.setItem(storedList.length, JSON.stringify([ listItem, 'uncheckBtn' ]));
// 		listKeys = Object.keys(storedList).sort();
// 		listDataArr = Object.values(storedList);
// 		listValues.push(JSON.parse(storedList.getItem(listKeys[listKeys.length - 1]))[0]);
// 		renderClearButton();
// 	} else {
// 		storedList.setItem(parseInt(listKeys[listKeys.length - 1]) + 1, JSON.stringify([ listItem, 'uncheckBtn' ]));
// 		listKeys = Object.keys(storedList).sort();
// 		listDataArr = Object.values(storedList);
// 		listValues.push(JSON.parse(storedList.getItem(listKeys[listKeys.length - 1]))[0]);
// 		renderClearButton();
// 	}
// }

// function todoCheck() {
// 	let isDone = this.getAttribute('data-done') === 'false' ? false : true;
// 	isDone = !isDone;
// 	if (isDone) {
// 		this.nextElementSibling.className = 'strike';
// 		this.setAttribute('data-done', 'true');
// 		this.className = checkBtn;
// 		this.nextElementSibling.nextElementSibling.style.visibility = 'visible';
// 		storedList[
// 			Object.keys(storedList).find((key) => JSON.parse(storedList[key])[0] === this.nextElementSibling.innerHTML)
// 		] = JSON.stringify([ this.nextElementSibling.innerHTML, 'checkBtn' ]);
// 	} else {
// 		this.nextElementSibling.classList.remove('strike');
// 		this.setAttribute('data-done', 'false');
// 		this.className = uncheckBtn;
// 		this.nextElementSibling.nextElementSibling.style.visibility = 'hidden';
// 		storedList[
// 			Object.keys(storedList).find((key) => JSON.parse(storedList[key])[0] === this.nextElementSibling.innerHTML)
// 		] = JSON.stringify([ this.nextElementSibling.innerHTML, 'uncheckBtn' ]);
// 	}
// }


// function clearList() {
// 	storedList.clear();
// 	ul.innerHTML = '';
// 	listKeys = Object.keys(storedList).sort();
// 	listValues = [];
// 	renderClearButton();
// }

// function renderClearButton() {
// 	if (storedList.length > 0) {
// 		clearButton.style.visibility = 'visible';
// 	} else {
// 		clearButton.style.visibility = 'hidden';
// 	}
// }

// loadStoredElements();
// renderClearButton();
