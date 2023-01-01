import classes from "./Tasks.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "../store/tasks-slice";
const Tasks = function () {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const removeHandler = (e) => {
    const newTasks = tasks.filter((item) => {
      return item.id !== e.target.id;
    });

    dispatch(removeTask(newTasks));
  };
  const listContent = tasks.map((item, index) => (
    <div key={item.id} className={classes["list-container"]}>
      <li key={item.id} className={classes["list-item"]}>
        {item.description}{" "}
      </li>
      <button id={item.id} onClick={removeHandler} className={classes.btn}>
        Remove
      </button>
    </div>
  ));
  return <ul className={classes.list}>{listContent}</ul>;
};

export default Tasks;
