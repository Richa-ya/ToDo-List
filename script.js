// fetched all the required classes
var input = document.querySelector(".input");

var left = document.getElementById("left");
var btn = document.querySelector(".add");
var item = document.querySelector(".add-items");
var task = document.querySelector(".task");
var justifyLine = document.getElementsByClassName("justify-line");
//  created an empty array
var itemList = [];
// this will maintain  value of count ie how many elements are left
left.innerHTML = itemList.length;
//  this is for enter event
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();

    btn.click();
  }
});

//  adding click on button

btn.addEventListener("click", function (event) {
  event.preventDefault();
  // here we are trimming spaces
  if (input.value.trim() != 0) {
    var data = input.value.trim();
    // before adding data we have trimmed the spaces

    //  we have created an object
    const todo = {
      data,
      checked: false,
      id: Date.now(),
    };
    // whenever we will add new item msg will pop up
    task.innerHTML = `<span class="trying"> New Task Added<i class="fas fa-plus"></i></span>`;
    setTimeout(function () {
      task.innerHTML = "";
    }, 3000);
    // pushing object in a array
    itemList.push(todo);
    item.innerHTML = "";
    input.value = "";
    refreshitems();
  }
});
function showitems() {
  currentTab(event);
  task.innerHTML = `<span class="trying"> ALL Items<i class="fas fa-plus"></i></span>`;
  setTimeout(function () {
    task.innerHTML = "";
  }, 3000);
  refreshitems();
}

function refreshitems() {
  item.innerHTML = "";
  //  as we have to iterate in array so using for each
  itemList.forEach(function (todo) {
    // console.log(itemList);

    items = `<li onclick="line(event,${todo.id})" value=${
      todo.id
    } class="justify-line ${todo.checked ? "checked" : ""}" &nbsp; &nbsp;>
         ${todo.data}
        <div class="ho">
          <button type="button"  value=${
            todo.id
          } class="delete2" onclick="deleteTask(event,${todo.id},'${
      todo.data
    }')">
     
   
            <i class="fas fa-trash" ></i>
          </button>
        </div>
      </li>`;

    item.innerHTML += items;
    left.innerHTML = itemList.length;
    input.innerHTML = "";
  });
}

function line(event, id) {
  event.stopPropagation();

  let index = 0;
  for (let todo of itemList) {
    if (todo.id === id) {
      todo.checked = !todo.checked;
      break;
    }
    index++;
  }
  console.log(itemList);
  justifyLine[index].classList.toggle("checked");
}
var list2 = [];
// here we are deleting task and pushing into another array to show that in history
function deleteTask(event, id, data) {
  // so that call will not go upto parent
  event.stopPropagation();
  // console.log("data" + data);
  task.innerHTML = `<span class="trying">Task Deleted <i class="fas fa-minus-circle"></i></span>`;
  setTimeout(function () {
    task.innerHTML = "";
  }, 3000);

  console.log(data);
  list2.push(data);
  // here we are deleting using filter method .it will return all the id except the one which we are deleting
  itemList = itemList.filter(function (todo) {
    return todo.id != id;
  });
  // this will show left elemnts
  left.innerHTML = itemList.length;
  refreshitems();
  // this will append
}
// here we aill delete all elements and wll push in another array for history
function deleteAll(event) {
  item.innerHTML = "";
  currentTab(event);

  if (itemList.length === 0) {
    task.innerHTML = `<span class="trying"> List Is Empty && Add The List</span> </span>`;
    return;
  }
  itemList.forEach(function (todo) {
    if (todo.data.trim() != 0) {
      list2.push(todo.data);
    }
    // console.log(list2 + "list2");
    // console.log(list2.length);
  });
  while (itemList.length != 0) {
    itemList.pop();
  }

  task.innerHTML = `<span class="trying">  All Task Deleted </span> </span>`;
  setTimeout(function () {
    task.innerHTML = "";
  }, 2000);
  left.innerHTML = itemList.length;
  refreshitems();
}

// this will show all the deleted item which are pushed in another array
function history(event) {
  currentTab(event);
  item.innerHTML = "";
  task.innerHTML = `<span class="trying">History Of Deleted Tasks</span>`;
  setTimeout(function () {
    task.innerHTML = "";
  }, 2000);

  list2.forEach(function (element) {
    {
      var complete = "";
      complete = ` <li> ${element} </li>`;

      item.innerHTML += complete;
    }
  });
}
var activeState = document.querySelectorAll(".second");
// this is to show which button is active and will show blue color
function currentTab(event) {
  for (let i = 0; i < activeState.length; i++) {
    activeState[i].classList.remove("color");
  }

  event.target.classList.add("color");
}
