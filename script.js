const todoList = document.querySelector("#todo_list");
const todoInput = document.querySelector("#todo-input");

const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

const createTodo = (storageData) => {
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }

  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    saveItemsFn();
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn();
  });

  if (storageData && storageData.complete) {
    newLi.classList.add("complete");
  }

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";

  saveItemsFn();
};

const keyCodeCheck = () => {
  if (window.event.keyCode === 13 && todoInput.value !== "") {
    createTodo();
  }
};

const deleteAll = () => {
  const liList = document.querySelectorAll("li");
  for (let x of liList) {
    x.remove();
  }
  saveItemsFn();
};

const saveItemsFn = () => {
  const saveItems = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItems.push(todoObj);
  }

  saveItems.length === 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-items", JSON.stringify(saveItems));
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

const weatherSearch = (position) => {
  const weatherRes = fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${position.latitude}&lon=${position.longitude}&appid=8eddf61de653cefbc0e0482659e3ac34`
  );
  console.log(weatherRes);
};

const accesToGeo = (position) => {
  const positionObj = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };

  weatherSearch(positionObj);
};

const askForLocation = () => {
  navigator.geolocation.getCurrentPosition(accesToGeo, (err) => {
    console.log(err);
  });
};
askForLocation();
