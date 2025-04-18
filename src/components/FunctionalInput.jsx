import React, { useState } from "react";

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
  /*
    We declare two state variables and their setters,
    one to store the To-Do's
    and the other to store the value of the input field
  */
  const [todos, setTodos] = useState([
    {
      task: "Just some demo tasks",
      state: 0,
    },
    {
      task: "As an example",
      state: 0,
    },
  ],);
  
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleDeleteTask = (task) => {
    setTodos(todos.toSpliced(todos.indexOf(task), 1));
  };

  const handleEditTask = function (todo) {
    let n = todos;
    n[n.findIndex((t) => t.task == todo.task)].state = 1;
    setTodos([...n]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, {
      task: inputVal,
      state: 0
    }]);
    setInputVal("");
  };

  const handleTaskEditChange = function(e, todo) {
    let n = todos;
    n[n.findIndex((t) => t.task == todo.task)].task = e.target.placeholder;
    setTodos([...n]);
  }

  const checkState  = function(todo){
    if(todo.state == 0){
      return <p>{todo.task}</p>;
    }
      else {
        return (
          <input
            id = {todo.task}
            placeholder={todo.task}
            onFocus = {((event) => {
              handleTaskEditChange(event, todo);
            })}
          ></input>
        )
  }
}

const handleButtonNameSwitch = function(todo){
  todo.state == 0
   ? (document.getElementById(todo.task + "b").innerText = "Resubmit")
   : (document.getElementById(todo.task + "b").innerText = "Edit");
}

const handleExitEdit = function(todo){
    let n = todos;
    n[n.findIndex((t) => t.task == todo.task)].state = 0
    n[n.findIndex((t) => t.task == todo.task)].task = document.getElementById(todo.task).value
    setTodos([...n])
}
  return (
    <section>
      <h3>{name}</h3>
      {/* The input field to enter To-Do's */}
      <form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      <h5>Number of Tasks:{todos.length}</h5>
      {/* The list of all the To-Do's, displayed */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.task}>
            {checkState(todo)}
            <button onClick={() => handleDeleteTask(todo)}>Delete Task</button>
            <button 
            id = {todo.task + "b"}
            onClick={() => {
                  handleButtonNameSwitch(todo)
                  if(todo.state == 0){
                    handleEditTask(todo);
                  }
                  else{
                    handleExitEdit(todo)
                  }
                }}>Edit</button>
          </li>
        ))
      
      }
      </ul>
    </section>
  );
};

export default FunctionalInput;
