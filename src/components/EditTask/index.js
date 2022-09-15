import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const EditTask = ({ tasks, updateTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentTask = tasks.find(
    (Task) => Task.id === parseInt(id)
  );

  useEffect(() => {
    setTitle(currentTask.title);
    setDescription(currentTask.description);
    setPriority(currentTask.priority)
  }, [currentTask]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkTaskdescriptionExists = tasks.filter((Task) =>
      Task.description === description && Task.id !== currentTask.id
        ? Task
        : null
    );

    if (!description || !title || !priority) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkTaskdescriptionExists.length > 0) {
      return toast.error("This description already exists!!");
    }
    

    const data = {
      id: currentTask.id,
      title,
      description,
      priority,
    };

    updateTask(data);
    toast.success("Task updated successfully!!");
    navigate("/")
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-success ml-auto my-5 w-25 mx-auto"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentTask ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control my-3"
                  value={title}
                  placeholder={"Task"}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control my-3"
                  value={description}
                  placeholder={"Description"}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
              <select
                className="form-control my-3"
                placeholder="Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value='3'>High</option>
                <option value='2'>Medium</option>
                <option value='1'>Low</option>
              </select>
            </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary my-3">
                  Update Task
                </button>
                <button
                  type="button"
                  className="btn btn-danger my-3"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Task Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateTask: (data) => {
    dispatch({ type: "UPDATE_TASK", payload: data });
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
