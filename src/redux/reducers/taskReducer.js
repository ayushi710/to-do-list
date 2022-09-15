const initialState = [
  { id: 0, title: "Learn React", description: "react is a libary", priority: 3 },
  { id: 1, title: "Learn CSS", description: "css is for styling", priority:1 },
];


export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      state = [...state, action.payload];
      return state;
    case "DELETE_TASK":
      const taskFilter = state.filter((task) =>
        task.id === action.payload ? null : task
      );
      state = taskFilter;
      return state;
    case "UPDATE_TASK":
      const taskUpdate = state.filter((task) =>
        task.id === action.payload.id
          ? Object.assign(task, action.payload)
          : task
      );
      state = taskUpdate;
      return state;
    case "RESET_TASK":
      state = [{ name: null, email: null, phone: null }];
      return state;
    default:
      return state;
  }
};
