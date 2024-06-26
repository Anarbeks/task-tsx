import React from "react";

import { useTodo } from "../../utils";
import { Todo } from "..//..//..//types";

import styles from "./TodoPanel.module.css";

const DEFAULT_TODO = { name: "", description: "" };

interface AddTodoPanelProps {
  mode: "add";
}

interface EditTodoPanelProps {
  mode: "edit";
  editTodo: Omit<Todo, "id" | "checked">;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {
  const isEdit = props.mode === "edit";
  const { changeTodo, addTodo } = useTodo();
  const [todo, setTodo] = React.useState(
    isEdit ? props.editTodo : DEFAULT_TODO
  );

  const onClick = () => {
    if (isEdit) {
      return changeTodo(todo);
    }
    addTodo(todo);
    setTodo(DEFAULT_TODO);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  return (
    <div className={styles.todo_panel_container}>
      <div className={styles.fields_container}>
        <div className={styles.field_container}>
          <label htmlFor="name">
            <div>name</div>
            <input
              autoComplete="off"
              id="name"
              value={todo.name}
              onChange={onChange}
              name="name"
            />
          </label>
        </div>
        <div className={styles.field_container}>
          <label htmlFor="description">
            <div>description</div>
            <input
              autoComplete="off"
              id="description"
              value={todo.description}
              onChange={onChange}
              name="description"
            />
          </label>
        </div>
      </div>
      <div className={styles.button_container}>
        {!isEdit && (
          <button className={styles.button_add} onClick={onClick}>
            ADD
          </button>
        )}
        {isEdit && (
          <button className={styles.button_edit} onClick={onClick}>
            EDIT
          </button>
        )}
      </div>
    </div>
  );
};
