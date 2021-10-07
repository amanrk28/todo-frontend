import React from "react";
import {
  Checkbox,
  Modal,
  Button,
  Input,
  Message,
  Icon,
} from "semantic-ui-react";

export const Tasks = ({
  currentList,
  tasks,
  updateTaskStatus,
  deleteTask,
  updateText,
  createNewEntity,
}) => {
  return (
    <div style={{ marginLeft: "300px" }}>
      <br />
      <br />
      {currentList.name === "" && (
        <div>
          <Message size="huge" info compact>
            <Message.Header>You haven't selected a list yet</Message.Header>
            <p>
              Please select a List from Panel on the left
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            </p>
          </Message>
        </div>
      )}
      {currentList.name && (
        <div>
          <h2>
            Tasks Under&nbsp;
            <span style={{ fontSize: "32px", fontWeight: 700 }}>
              {currentList.name}
            </span>
          </h2>
          <br />
          {tasks.map((task) => (
            <div key={task.id} style={{ display: "flex", margin: "1.5rem 0" }}>
              <div
                onClick={() => deleteTask(task.id)}
                style={{ marginRight: "1rem" }}
              >
                <Icon name="trash" color="red" link />
              </div>
              <Checkbox
                label={task.text}
                checked={task.Completed}
                onClick={() => updateTaskStatus(task.id)}
              />
            </div>
          ))}
          <Modal
            basic
            size="small"
            trigger={<Button color="green">Add Task</Button>}
          >
            <Modal.Content>
              <Modal.Description>
                <p style={{ fontSize: "20px" }}>
                  Add Task under&nbsp;
                  <span style={{ fontWeight: 600, fontSize: "24px" }}>
                    {currentList.name}
                  </span>
                </p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Input
                name="newTaskName"
                fluid
                placeholder="Eg. Need to buy groceries ..."
                onChange={updateText}
              />
              <br />
              <Button
                color="green"
                onClick={() => createNewEntity("tasks")}
                inverted
              >
                Add Task
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      )}
    </div>
  );
};
