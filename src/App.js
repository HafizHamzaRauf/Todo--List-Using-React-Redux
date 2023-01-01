import classes from "./App.module.css";
import Form from "./components/Form";
import Tasks from "./components/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks, removeTask, tasksSliceActions } from "./store/tasks-slice";
const App = function (props) {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const isSending = useSelector((state) => state.tasks.sending);
  const showList = tasks.length > 0;
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const clearListHandler = () => {
    dispatch(removeTask([]));
  };
  return (
    <>
      <h1 className={classes["primary-heading"]}>Todo List</h1>
      <Form></Form>
      {showList && <Tasks></Tasks>}
      {!showList && !isSending && (
        <p className={classes.empty}>You Don't Have any Task yet</p>
      )}
      {isSending && <p className={classes.empty}>Fetching Tasks</p>}
      {showList && (
        <button onClick={clearListHandler} className={classes["clear-btn"]}>
          Clear List
        </button>
      )}
    </>
  );
};
export default App;
