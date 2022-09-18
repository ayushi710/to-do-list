import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const Home = ({ tasks, deleteTask }) => {

  const getPriority = (priority) => {
    switch(parseInt(priority)) {
      case 1 : return 'Low';
      case 2 : return 'Medium';
      case 3 : return 'High';
      default: return 'High'
    }
  }
  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <Link to="/add" className="btn btn-outline-primary my-2 mx-auto w-25">
          Add New Task
        </Link>
        <div className="col-md-11 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Priority</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{getPriority(task.priority)}</td>
                    <td>
                      <Link
                        to={`/edit/${task.id}`}
                        className="btn btn-sm btn-primary ml-4"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        className="btn btn-sm btn-danger ml-3"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No tasks found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
