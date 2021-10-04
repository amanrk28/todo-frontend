import React, { Component } from "react";
import axios from "axios";
import { Tasklist } from "./Tasklist";
import { Tasks } from "./Tasks";
import { taskListApi, tasksApi } from "./api";

class App extends Component {
  state = {
    lists: [],
    tasks: [],
    currentList: { name: "", id: "" },
  };

  componentDidMount() {
    axios
      .get(taskListApi)
      .then((res) => {
        this.setState({ lists: res.data.tasklist });
        if (res.data.tasklist?.length > 0) {
          const currentList = res.data.tasklist[0];
          const tasksUrl = `${tasksApi}?task_list=${currentList.id}`;
          axios.get(tasksUrl).then((res) => {
            this.setState({ tasks: res.data.task, currentList });
          });
        }
      })
      .catch((err) => console.log(err));
  }

  updateList = (list) => {
    this.setState({ currentList: list });
    const taskURL = `${tasksApi}?task_list=${list.id}`;
    axios
      .get(taskURL)
      .then((res) => {
        this.setState({ tasks: res.data.task });
      })
      .catch((err) => console.log(err));
  };

  updateText = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createNewEntity = (type) => {
    const {
      currentList: { id },
    } = this.state;
    const taskURL = `${tasksApi}?task_list=${id}`;
    if (type === "list") {
      axios
        .post(taskListApi, { name: this.state.newListName })
        .then((postRes) => {
          axios
            .get(taskListApi)
            .then((getRes) => {
              this.setState({ lists: getRes.data.tasklist });
            })
            .catch((err) => alert(err));
        })
        .catch((err) => alert(err));
    } else {
      axios
        .post(tasksApi, {
          text: this.state.newTaskName,
          list_id: this.state.currentList.id,
        })
        .then((res) => {
          axios
            .get(taskURL)
            .then((res) => {
              this.setState({ tasks: res.data.task });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  updateTaskStatus = (id) => {
    const putTaskUrl = `${tasksApi}/${id}`;
    const taskURL = `${tasksApi}?task_list=${this.state.currentList.id}`;
    axios
      .put(putTaskUrl)
      .then((res) => {
        axios
          .get(taskURL)
          .then((res) => {
            this.setState({ tasks: res.data.task });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  deleleTask = (id) => {
    alert("Do You really want to delete the task?");
    const deleteTaskUrl = `${tasksApi}/${id}`;
    const taskURL = `${tasksApi}?task_list=${this.state.currentList.id}`;
    axios
      .delete(deleteTaskUrl)
      .then((res) => {
        alert("task has been deleted sucessfully");
        axios
          .get(taskURL)
          .then((res) => {
            this.setState({ tasks: res.data.task });
          })
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err));
  };

  render() {
    return (
      <div className="Apptest">
        <Tasklist
          currentList={this.state.currentList}
          lists={this.state.lists}
          updateList={this.updateList}
          updateText={this.updateText}
          createNewEntity={this.createNewEntity}
        />
        <Tasks
          currentList={this.state.currentList}
          tasks={this.state.tasks}
          updateText={this.updateText}
          createNewEntity={this.createNewEntity}
          updateTaskStatus={this.updateTaskStatus}
          deleleTask={this.deleleTask}
        />
      </div>
    );
  }
}

export default App;
