import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddTask = ({ tasks, addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkTaskDescpExists = tasks.filter((Task) =>
      Task.description === description ? Task : null
    );

    if (!description || !title || !priority) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkTaskDescpExists.length > 0) {
      return toast.error("This description already exists!!");
    }
    

    const data = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
      title,
      description,
      priority,
    };

    addTask(data);
    toast.success("Task added successfully!!");
    navigate("/");
  };

  const goBack =() => {
    navigate("/");
  }

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Thing To Do</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control my-3"
                type="text"
                placeholder="Task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control my-3"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control my-3"
                placeholder="Priority"
                value={priority ? priority : '3'}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value='3'>High</option>
                <option value='2'>Medium</option>
                <option value='1'>Low</option>
              </select>
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Task"
              />
            </div>
          </form>
        </div>
      </div>
      <p><button className="btn btn-block btn-primary my-3" onClick={goBack}>Go Back</button></p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state,
});
const mapDispatchToProps = (dispatch) => ({
  addTask: (data) => {
    dispatch({ type: "ADD_TASK", payload: data });
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
