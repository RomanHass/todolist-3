import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
};

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  addTask: (title: string) => void
  changeFilter: (newFilterValue: FilterValuesType) => void
};

export function Todolist(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

   const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
   };

   const addTaskHandler = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle('');
  };

  const onAllClickHandler = () => props.changeFilter('all');
  const onAactiveClickHandler = () => props.changeFilter('active');
  const onCompletedClickHandler = () => props.changeFilter('completed');

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle} 
               onChange={onChangeHandler}
               onKeyDown={onKeyDownHandler} />
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(t => {

            const onClickRemoveHandler = () => props.removeTask(t.id)

            return (
              <li key={t.id}>
                <input type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={onClickRemoveHandler}>x</button>
              </li>
            );
          })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>Alll</button>
        <button onClick={onAactiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}