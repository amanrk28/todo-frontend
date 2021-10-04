import React from "react";
import { Checkbox, Modal, Button, Input, Message } from "semantic-ui-react";

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
      {currentList.name !== "" && (
        <div>
          <h2> Task Under {currentList.name} </h2>
          <br />

          {tasks.map((task) => {
            return (
              <div key={task.id}>
                <Checkbox
                  label={task.text}
                  checked={task.Completed}
                  onClick={() => updateTaskStatus(task.id)}
                />
                &emsp;&emsp;&emsp;&emsp;
                <Button
                  onClick={() => deleteTask(task.id)}
                  size="mini"
                  negative
                >
                  Delete
                </Button>
                <br />
                <br />
              </div>
            );
          })}

          <br />
          <Modal
            basic
            size={"small"}
            trigger={<Button positive>Add Task</Button>}
            header="Add a Task"
          >
            <Modal.Content>
              <Modal.Description>
                <h4>Task to be created under {currentList.name}</h4>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Input
                name="newTaskName"
                fluid
                placeholder="EX. Need to buy groceries ..."
                onChange={updateText}
              />
              <br />
              <Button
                positive
                onClick={() => {
                  createNewEntity("tasks");
                }}
                inverted
              >
                Add Task
              </Button>
            </Modal.Actions>
          </Modal>
          <br />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};
