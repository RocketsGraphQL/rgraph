import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./utils/rockets";
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";

const GET_TODOS = gql`
  subscription {
    todos {
      id
      created_at
      name
    }
  }
`;

const INSERT_TODO = gql`
  mutation($todo: todos_insert_input!) {
    insert_todos(objects: [$todo]) {
      affected_rows
    }
  }
`;

function App() {
  const { data, loading } = useSubscription(GET_TODOS);
  const [insertTodo] = useMutation(INSERT_TODO);
  const [todoName, setTodoName] = useState("");

  console.log("todos: ", data);
  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Link to="/login">Login</Link>
      <div onClick={() => auth.logout()}>Logout</div>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            try {
              await insertTodo({
                variables: {
                  todo: {
                    name: todoName,
                  },
                },
              });
            } catch (error) {
              console.error(error);
              return alert("Error creating todo", todoName);
            }
            alert("Todo created");
          }}
        >
          <input
            id="inputTodo"
            type="text"
            placeholder="todo"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <button id="createTodo">Create todo</button>
        </form>
      </div>
      {!data || !data.todos || !data.todos.length ? (
        "no data"
      ) : (
        <ul id="todosList">
          {data.todos.map((todo) => {
            return <li key={todo.id}>{todo.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default App;