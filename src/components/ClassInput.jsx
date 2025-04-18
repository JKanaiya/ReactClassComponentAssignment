/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          task: "Just some demo tasks",
          state: 0,
        },
        {
          task: "As an example",
          state: 0,
        },
      ],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleTaskEdit = this.handleTaskEdit.bind(this);
  }

  handleTaskDelete(todo) {
    this.setState(() => ({
      todos: this.state.todos.toSpliced(this.state.todos.indexOf(todo), 1),
    }));
  }

  handleTaskEdit(todo) {
    let n = this.state.todos;
    n[n.findIndex((t) => t.task == todo.task)].state = 1;
    this.setState(() => ({
      todos: n,
    }));
  }

  handleButtonNameSwitch(todo){
     todo.state == 0
      ? (document.getElementById(todo.task + "b").innerText = "Resubmit")
      : (document.getElementById(todo.task + "b").innerText = "Edit");
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleTaskEditChange(e, todo) {
    let n = this.state.todos;
    n[n.findIndex((t) => t.task == todo.task)].task = e.target.placeholder;
    this.setState((state) => ({
      ...state,
      todos: n,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({ task: state.inputVal, state: 0 }),
      inputVal: "",
    }));
  }

  handleExitEdit(todo){
    let n = this.state.todos;
    n[n.findIndex((t) => t.task == todo.task)].state = 0
    n[n.findIndex((t) => t.task == todo.task)].task = document.getElementById(todo.task).value
    this.setState(() => ({
      todos: n,
    }))
  }

  checkState(todo) {
    if (todo.state == 0) {
      return <p>{todo.task}</p>;
    } else {
      return (
        <input
          id = {todo.task}
          placeholder={todo.task}
          onFocus = {((event) => {
            this.handleTaskEditChange(event, todo);
          })}
        ></input>
      );
    }
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <h5>Number of Tasks: {this.state.todos.length}</h5>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.task}>
              {this.checkState(todo)}
              <button
                onClick={() => {
                  this.handleTaskDelete(todo);
                }}
              >
                Delete Task
              </button>
              <button
                id={todo.task + "b"}
                onClick={() => {
                  this.handleButtonNameSwitch(todo)
                  if(todo.state == 0){
                    this.handleTaskEdit(todo);
                  }
                  else{
                   this.handleExitEdit(todo)
                  }
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
