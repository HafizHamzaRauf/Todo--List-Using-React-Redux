import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], sending: true },
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    setTasks(state, action) {
      const data = action.payload;
      const newArray = [];
      for (let item in data) {
        newArray.push({ id: item, description: data[item].description });
      }
      state.tasks = newArray;
    },
    setSending(state, action) {
      state.sending = action.payload;
    },

    removeTask(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const tasksSliceActions = tasksSlice.actions;
export const tasksSliceReducers = tasksSlice.reducer;
export const sendTask = function (task) {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-complete-guide-9e243-default-rtdb.firebaseio.com/tasks.json",
        {
          method: "POST",
          body: JSON.stringify({ description: task }),
        }
      );
      return await response.json();
    };
    const id = await sendRequest();
    const obj = { id: id.name, description: task };
    dispatch(tasksSliceActions.addTask(obj));
  };
};
export const fetchTasks = function () {
  return async (dispatch) => {
    const request = async () => {
      const resposne = await fetch(
        "https://react-complete-guide-9e243-default-rtdb.firebaseio.com/tasks.json"
      );
      const data = await resposne.json();
      return data;
    };
    const data = await request();
    dispatch(tasksSliceActions.setTasks(data));
    dispatch(tasksSliceActions.setSending(false));
  };
};

export const removeTask = function (newTasks) {
  return async (dispatch) => {
    dispatch(tasksSliceActions.removeTask(newTasks));
    await fetch(
      "https://react-complete-guide-9e243-default-rtdb.firebaseio.com/tasks.json",
      {
        method: "PUT",
        body: JSON.stringify(newTasks),
      }
    );
  };
};
