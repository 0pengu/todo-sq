"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import { Dispatch, Key, SetStateAction, useState } from "react";
import ChangeTodoModal from "./change/ChangeTodoModal";
import { Todo } from "../utils/types";

export default function DropDown({
  index,
  todo,
  onOpenEdit,
  onOpenDelete,
  setSelectedTodo,
}: {
  index: Key;
  todo: Todo;
  onOpenEdit: () => void;
  onOpenDelete: () => void;
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
}) {
  return (
    <>
      <Dropdown key={index}>
        <DropdownTrigger>
          <Button fullWidth variant="bordered">
            Open Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label={`Static Actions`}>
          <DropdownItem
            key="edit"
            onPress={() => {
              setSelectedTodo(todo);
              onOpenEdit();
            }}
          >
            Edit Info
          </DropdownItem>
          <DropdownItem
            key="delete"
            onPress={() => {
              setSelectedTodo(todo);
              onOpenDelete();
            }}
            className="text-danger"
            color="danger"
          >
            Delete Todo
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
