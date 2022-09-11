import React, {useState,useContext,createContext,useEffect} from 'react';
import './App.css';

const inputContext= createContext();
const todoContext= createContext();
const filterContext= createContext();
const anofilterContext = createContext();
function App() {
const [input,setInput]=useState('');
const [todo, setTodo]=useState([]);
const [status, setStatus]=useState ("All");
const [filteredTodos,setFilteredTodos]=useState([]);

function filterSwitch(){
   switch (status) {
     case "completed":
       setFilteredTodos(todo.filter((todo)=>todo.completed=== true))
       break;

       case "uncompleted":
       setFilteredTodos(todo.filter((todo)=>todo.completed=== false))
       break;
   
     default:
       setFilteredTodos(todo);
       break;
   }
}

  useEffect(()=>{filterSwitch();},[todo,status]);
  // useEffect(()=>{getLocalTodo()})

  //Save to Local
 
    localStorage.setItem("todo", JSON.stringify(todo))
  

  // const getLocalTodo=()=>{
  //   if (localStorage.getItem("todo")===null){
  //     localStorage.setItem("todo",JSON.stringify([]))
  //   } else{
  //     setTodo(JSON.parse(localStorage.getItem("todo")));
  //   }
  // }
 
  return (
  <>
  <header>
        <h1>Henry's Todo list</h1>
  </header>
  <inputContext.Provider value={{input,setInput}}>
    <todoContext.Provider value={{todo,setTodo}}>
       <filterContext.Provider value={{status,setStatus}}>
         <anofilterContext.Provider value={{filteredTodos,setFilteredTodos}}>
              <Form/>
              <TodoList/>
          
          </anofilterContext.Provider>
      </filterContext.Provider>
    </todoContext.Provider>
  </inputContext.Provider>
  
  </>
  )
}

export default App

function Form(){
  const{input,setInput}=useContext(inputContext)
  const {todo,setTodo}=useContext(todoContext)
  const {setStatus}=useContext(filterContext)

  function onChangeHandler(e){
    setInput(e.target.value)
  }
  
  function submitHandler(e){
    e.preventDefault();
    setTodo([...todo,{id: Math.random()*1000,value:input,completed:false}]);
    setInput('')
  }
   function filterHandler(e){
    setStatus(e.target.value);
   }

  return(
    <>
    <form>
      <input type="text" value={input} onChange={onChangeHandler}
          className='todo-input'/>
      <button className='todo-button' onClick={submitHandler}>
          <i class="fas fa-plus-square"></i>
      </button>
      <div className='select'>
         <select className='filter-todo' onChange={filterHandler}>
            <option>All</option>
            <option>completed</option>
            <option>uncompleted</option>
        </select>
      </div>
      
    </form>
    </>
  )}

  function TodoList(){
    
    const {todo,setTodo}=useContext(todoContext)
    const {filteredTodos}=useContext(anofilterContext)

    function deleteHandler(id){
     setTodo(todo.filter(el=>el.id!== id))
    }

    function completeHandler(id){
      setTodo(todo.map((item)=>{

        if(item.id===id){
          return {...item, completed:!item.completed,}
        }
        return item;
      })
      );
    };
    const pan= filteredTodos.map(todo=>
    <div className='todo'>
      <li className={`todo-item ${todo.completed ? "completed": ' '}`}
       key={todo.id}>{todo.value}</li>
      <button  className='trash-btn' onClick={()=>deleteHandler(todo.id)}>
        <i class= 'fas fa-trash'></i>
      </button>
      <button className='complete-btn' 
      onClick={()=>completeHandler(todo.id)}>
        <i class="fas fa-check"></i>
      </button>
    </div>
    )
    return(
      <>
      <div className='todo-container'>
          <ul className='todo-list'>
            {pan}
          </ul>
      </div>
      </>
    )
  }

 
