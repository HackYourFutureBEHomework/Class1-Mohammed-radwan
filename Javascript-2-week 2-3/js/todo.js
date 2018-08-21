let TODOS = [];
//Flag to know the active function
let flag=0;
let editingId=null;

function update() {
  const $todoList = document.querySelector(".todo-list");
  const $todoCount = document.querySelector('.todo-count');
  $todoList.innerHTML = "";
  

  //The normal update function which show all items
  if (flag===0){
    for (const item of TODOS) {
      const $li = document.createElement("li");
      // $li.setAttribute("id",item.id);
      if (item.done) {
        $li.classList.add("completed");
      }
      $todoList.appendChild($li);
      // Toggle button
      const $toggle = document.createElement("input");
      $toggle.className = "toggle";
      $toggle.setAttribute("type", "checkbox");
      if (item.done) 
        $toggle.setAttribute("checked", "checked");

      $toggle.addEventListener("change", onToggleTodo.bind(null, item.id));
      $li.appendChild($toggle);
      
      // Label
      const $label = document.createElement("label");
      $label.innerHTML = item.title;
      $li.appendChild($label);

      $label.addEventListener('dblclick',onStartEditing.bind(null,item.id));
      

      // Delete button
      const $button = document.createElement("button");
      $button.className = "destroy";
      $button.addEventListener('click',onDeleteTodo.bind(null, item.id));
      $li.appendChild($button);

      
      //completed Items
      const $completed=TODOS.filter(todo=>todo.done===true);
      const $clearCompleted =document.querySelector('.clear-completed');
      if($completed.length>0)
        document.querySelector('.clear-completed').style.display="block";
      else
        document.querySelector('.clear-completed').style.display="none";
      $clearCompleted.addEventListener("click",completedTodo);

      function completedTodo(){
        TODOS = TODOS.filter(TODOS =>TODOS.done===false);
        update();
      }
      //Set The Counter
      const $count = TODOS.filter(todo=> todo.done === false).length;
      if ($count === 1)
        $todoCount.innerHTML=$count +' item left' ;
      else
        $todoCount.innerHTML=$count +' items left' ;
  
      //Hide the main section if the list is empty
      if(TODOS.length!==0){
        document.querySelector(".main").style.display = "block";
      }else{
        document.querySelector(".main").style.display = "none";
      }
      if(editingId===item.id){
        $li.className = "editing";
        const $input= document.createElement('input');
        $input.className = "edit";
        $input.addEventListener('change',onEndEditing.bind(null,item.id));
        $li.appendChild($input);
        $input.value=item.title;
      }
       
    }
  }
  else if (flag===1){
    for (const item of TODOS) {
      const $li = document.createElement("li");
      // $li.setAttribute("id",item.id);
      if (item.done) {
        $li.classList.add("completed");
      }
      if ($li.className!=='completed'){
      $todoList.appendChild($li);
      // Toggle button
      const $toggle = document.createElement("input");
      $toggle.className = "toggle";
      $toggle.setAttribute("type", "checkbox");
      if (item.done) 
        $toggle.setAttribute("checked", "checked");

      $toggle.addEventListener("change", onToggleTodo.bind(null, item.id));
      $li.appendChild($toggle);
      
      // Label
      const $label = document.createElement("label");
      $label.innerHTML = item.title;
      $li.appendChild($label);
      $label.addEventListener('dblclick',onStartEditing.bind(null,item.id));


      // Delete button
      const $button = document.createElement("button");
      $button.className = "destroy";
      $button.addEventListener('click',onDeleteTodo.bind(null, item.id));
      $li.appendChild($button);

      
      //completed Items
      const $completed=TODOS.filter(todo=>todo.done===true);
      const $clearCompleted =document.querySelector('.clear-completed');
      // console.log($completed.length);
        if($completed.length>0)
        document.querySelector('.clear-completed').style.display="block";
        else
        document.querySelector('.clear-completed').style.display="none";
      $clearCompleted.addEventListener("click",completedTodo);

      function completedTodo(){
        TODOS = TODOS.filter(TODOS =>TODOS.done===false);
        // console.log(TODOS);
        update();
      }
      if(editingId===item.id){
        //console.log('im editing');
        $li.className = "editing";
        const $input= document.createElement('input');
        $input.className = "edit";
        $input.addEventListener('change',onEndEditing.bind(null,item.id));
        $li.appendChild($input);
        $input.value=item.title;
      }   
          
    }
    
        //Set The Counter
      const $count = TODOS.filter(todo=> todo.done === false).length;
      if ($count === 1)
      $todoCount.innerHTML=$count +' item left' ;
      else
      $todoCount.innerHTML=$count +' items left' ;

      //Hide the main section if the list is empty
      if(TODOS.length!==0){
      document.querySelector(".main").style.display = "block";
      }else
      document.querySelector(".main").style.display = "none"; 
    }
  }
  else if (flag===2){
    for (const item of TODOS) {
      const $li = document.createElement("li");
      // $li.setAttribute("id",item.id);
      if (item.done) {
        $li.classList.add("completed");
      }
      if ($li.className==='completed'){
      $todoList.appendChild($li);
      // Toggle button
      const $toggle = document.createElement("input");
      $toggle.className = "toggle";
      $toggle.setAttribute("type", "checkbox");
      if (item.done) 
        $toggle.setAttribute("checked", "checked");

      $toggle.addEventListener("change", onToggleTodo.bind(null, item.id));
      $li.appendChild($toggle);
      
      // Label
      const $label = document.createElement("label");
      $label.innerHTML = item.title;
      $li.appendChild($label);
      $label.addEventListener('dblclick',onStartEditing.bind(null,item.id));


      // Delete button
      const $button = document.createElement("button");
      $button.className = "destroy";
      $button.addEventListener('click',onDeleteTodo.bind(null, item.id));
      $li.appendChild($button);
      
      
      //completed Items
      const $completed=TODOS.filter(todo=>todo.done===true);
      const $clearCompleted =document.querySelector('.clear-completed');
      // console.log($completed.length);
        if($completed.length>0)
        document.querySelector('.clear-completed').style.display="block";
        else
        document.querySelector('.clear-completed').style.display="none";
      $clearCompleted.addEventListener("click",completedTodo);

      function completedTodo(){
        TODOS = TODOS.filter(TODOS =>TODOS.done===false);
        // console.log(TODOS);
        update();
      } 
      if(editingId===item.id){
        //console.log('im editing');
        $li.className = "editing";
        const $input= document.createElement('input');
        $input.className = "edit";
        $input.addEventListener('change',onEndEditing.bind(null,item.id));
        $li.appendChild($input);
        $input.value=item.title;
      }         
    }
        //Set The Counter
      const $count = TODOS.filter(todo=> todo.done === false).length;
      if ($count === 1)
      $todoCount.innerHTML=$count +' item left' ;
      else
      $todoCount.innerHTML=$count +' items left' ;

      //Hide the main section if the list is empty
      if(TODOS.length!==0){
      document.querySelector(".main").style.display = "block";
      }else
      document.querySelector(".main").style.display = "none"; 
    }
   
  }
  
}
function onStartEditing(id) {
  // console.log('Start editing');
  editingId=id;
  update();

}
function onEndEditing(id,e){
  const item = TODOS.find(todo => todo.id === id);
  item.title = e.target.value;
  editingId = null;
  update();

}
//Check or unckeck the whole list.
function onToggleAll(e){

  for(const i of TODOS){
    i.done=$toggleAll.checked;
  }
  update();

}

function onToggleTodo(id) {
  const todo = TODOS.find(todo => todo.id === id);

  // TODOS.find(function(todo) { return todo.id === id; });
  todo.done = !todo.done;

  update();
}
function onDeleteTodo(id){
// const $selector=document.querySelector(id);
  TODOS=TODOS.filter(todo=> todo.id !== id)

 update();
}

function onNewTodo(e) {
  //To set the main toggle input to false if we add anew item
  $toggleAll.checked=false;
  const title = e.target.value;
  // Same as this line:
  //const title = document.querySelector(".new-todo").value;
  console.log(title);
  TODOS.push({
    id: Date.now(),
    title,
    done: false
  });
  update();
  e.target.value = "";
}
//show the whole list
function onAllTodo(e){
  // console.log('Show Alll');
  flag=0;
  update();
}
//Show the active items
function OnActiveTodo(e){
  // console.log('Show Active');
  flag=1;
  update();
}
//Show the completed items
function OnCompletedTodo(e){
  flag=2;
  update();
}

// Select the new todo input field.
const $newTodo = document.querySelector(".new-todo");
$newTodo.addEventListener("change", onNewTodo); 

const $allSelected = document.querySelector(".selected");
$allSelected.addEventListener("click" , onAllTodo);

const $active = document.querySelector(".active");
$active.addEventListener("click", OnActiveTodo);

const $completed = document.querySelector(".completedItems");
$completed.addEventListener('click',OnCompletedTodo);

const $toggleAll = document.querySelector('.toggle-all');
$toggleAll.addEventListener('change',onToggleAll);