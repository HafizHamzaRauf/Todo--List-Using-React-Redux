import classes from "./Form.module.css";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { sendTask } from "../store/tasks-slice";
const Form = function (props) {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const task = taskInputRef.current.value;
    //validation logic
    if (task.trim() === "") {
      setError(true);
      return;
    }
    dispatch(sendTask(task));
    setError(false);
    taskInputRef.current.value = "";
  };
  const taskInputRef = useRef();
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <input
        className={`${
          error ? classes.invalid + " " + classes.input : classes.input
        }`}
        type={"text"}
        placeholder={"Add a Task"}
        ref={taskInputRef}
      />

      <button type="submit" className={classes.btn}>
        Submit
      </button>
      {error && <p className={classes.error}>Please Enter a valid task</p>}
    </form>
  );
};

export default Form;
