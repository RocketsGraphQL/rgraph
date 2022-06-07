import React, { useState } from "react";
import { gql, useSubscription, useMutation } from "@apollo/client";

const GET_TODOS = gql`
  subscription {
    todos {
      id
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

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
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
              alert("Error creating todo");
              console.error(error);
              return;
            }
            alert("Todo created");
            setTodoName("");
          }}
        >
          <input
            type="text"
            placeholder="todo"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <button>Add todo</button>
        </form>
      </div>
      {!data ? (
        "no data"
      ) : (
        <ul>
          {data.todos.map((todo) => {
            return <li key={todo.id}>{todo.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default App;