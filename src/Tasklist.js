import React from "react";
import { Menu, Sidebar, Modal, Button, Input } from "semantic-ui-react";

export const Tasklist = ({
  currentList,
  lists,
  updateList,
  updateText,
  createNewEntity,
}) => {
  return (
    <Sidebar as={Menu} visible vertical inverted>
      <Menu.Item>
        <h2 style={{ textShadow: "2px 2px #555", fontSize: "32px" }}>
          TODO LIST
        </h2>
      </Menu.Item>
      {lists.map((list) => (
        <Menu.Item
          key={list.id}
          active={currentList.name === list.name}
          onClick={() => updateList(list)}
        >
          {list.name}
        </Menu.Item>
      ))}
      <Modal
        size="small"
        basic
        trigger={
          <div style={{ margin: "1rem" }}>
            <Button.Group fluid widths="1">
              <Button fluid color="green" inverted>
                Add new List
              </Button>
            </Button.Group>
          </div>
        }
      >
        <Modal.Header>Add TaskList </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Type the name of the Task list you want to create</p>
            <Input
              name="newListName"
              fluid
              placeholder="Ex. Work, Home ..."
              onChange={updateText}
            />
            <br />
            <Button
              positive
              onClick={() => createNewEntity("list")}
              fluid
              inverted
            >
              Add List
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Sidebar>
  );
};
