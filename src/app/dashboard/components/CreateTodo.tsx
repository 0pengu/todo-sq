"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import CreateTodoModal from "./CreateTodoModal";

export default function CreateTodo() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <CreateTodoModal onOpenChange={onOpenChange} isOpen={isOpen} />
      <Button onPress={onOpen} className="m-4">
        Create new Todo
      </Button>
    </>
  );
}
