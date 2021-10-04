import React, { useState } from "react";
import {
  List,
  Drawer,
  ListItemText,
  ListItemButton,
  Divider,
  Modal,
  Button,
  Box,
  Input,
} from "@mui/material";

const drawerWidth = 300;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "white",
  padding: "16px",
  boxShadow: "4px 4px 32px #555",
};

export const Tasklist = ({
  lists,
  updateList,
  currentList,
  updateText,
  createNewEntity,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#666",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <h1
        style={{
          margin: "8px auto",
          color: "white",
          textShadow: "2px 2px #333",
        }}
      >
        Todo List
      </h1>
      <Divider />
      <h3
        style={{
          color: "white",
          padding: "0 16px",
          margin: "8px 0",
        }}
      >
        Your Lists
      </h3>
      <List>
        {lists.map((list) => (
          <ListItemButton
            key={list.id}
            selected={currentList.name === list.name}
            divider
            sx={{
              ".MuiListItemText-root": {
                color: "white",
              },
              "&.Mui-selected": {
                backgroundColor: "#00b100",
                color: "white",
                "&:hover": {
                  backgroundColor: "#00b100aa",
                },
              },
            }}
          >
            <ListItemText
              primary={list.name}
              onClick={() => updateList(list)}
            />
          </ListItemButton>
        ))}
      </List>
      <Button
        variant="contained"
        sx={{
          margin: "8px auto",
          width: "fit-content",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Add another List
      </Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={style}>
          <Input
            placeholder="Todo List Name"
            color="primary"
            name="newListName"
            focused
            onChange={updateText}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              createNewEntity("list");
              setIsModalOpen(false);
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </Drawer>
  );
};
