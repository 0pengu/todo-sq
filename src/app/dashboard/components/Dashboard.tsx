"use client";

import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Tooltip,
  useDisclosure,
  Switch,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { formatTime, formatFutureTime } from "../utils/timeFormat";
import CreateTodo from "./CreateTodo";
import DropDown from "./DropDown";
import { createClient } from "@/utils/supabase/client";
import moment from "moment";
import { Todo } from "../utils/types";
import EditModal from "./change/ChangeTodoModal";
import DeleteModal from "./delete/DeleteTodoModal";
import NewUserModal from "./newUser/NewUserModal";

export default function Dashboard({
  serverTodos,
  discordId,
}: {
  serverTodos: Todo[];
  discordId: string;
}) {
  const [todos, setTodos] = useState<Todo[]>(serverTodos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(
    serverTodos[0] || null
  );

  const supabase = createClient();

  useEffect(() => {
    const sortTodos = (todos: Todo[]) => {
      return todos.sort((a, b) => {
        if (a.completed === b.completed) {
          return (
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          );
        }
        return a.completed ? 1 : -1;
      });
    };

    const channel = supabase
      .channel("todos")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "todos",
          filter: `discord_id=eq.${discordId}`,
        },
        (payload: { new: Todo }) => {
          const updatedTodos = sortTodos([...todos, payload.new]);
          setTodos(updatedTodos);
          setSelectedTodo(updatedTodos[0] || null);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "todos",
          filter: `discord_id=eq.${discordId}`,
        },
        (payload: { new: Todo }) => {
          const updatedTodos = sortTodos(
            todos.map((todo) =>
              todo.id === payload.new.id ? payload.new : todo
            )
          );
          setTodos(updatedTodos);
          setSelectedTodo(updatedTodos[0] || null);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverTodos, supabase, discordId, todos]);

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();

  const handleSwitchChange = async (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
    );
    try {
      await supabase
        .from("todos")
        .update({ completed: updatedTodo.completed })
        .eq("id", todo.id);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  let returningUser: boolean | undefined = undefined;

  if (typeof window !== "undefined") {
    const status: boolean = JSON.parse(
      localStorage.getItem("returningUser") || "false"
    );
    console.log(status);
    if (status === false) {
      console.log("i am new user");
      returningUser = status;
    } else {
      console.log("i am returning user");
      returningUser = true;
    }
  }

  return (
    <>
      <CreateTodo />
      <EditModal
        onOpenChange={onOpenChangeEdit}
        isOpen={isOpenEdit}
        selectedTodo={selectedTodo}
      />
      <DeleteModal
        onOpenChange={onOpenChangeDelete}
        isOpen={isOpenDelete}
        selectedTodo={selectedTodo}
      />
      {returningUser === false && <NewUserModal />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {todos.length === 0 ? (
          <div className="text-center">
            No todos found. Time to make your first one!
          </div>
        ) : (
          todos &&
          todos.map((todo, index) =>
            todo.is_deleted ? null : (
              <Card key={index} className="max-w-full">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">
                      Created {formatTime(todo.created_at)}
                    </p>
                    <Tooltip
                      content={moment(todo.due_date)
                        .local()
                        .format("MM/DD/YYYY h:mm a z")}
                    >
                      <p className="text-small text-default-500">
                        {moment().diff(todo.due_date) > 0
                          ? "Due " +
                            formatTime(
                              moment(todo.due_date).local().toLocaleString()
                            ) +
                            (todo.completed ? " (Completed)" : " (Overdue)")
                          : "Due " +
                            formatFutureTime(
                              moment(todo.due_date).local().toLocaleString()
                            ) +
                            (todo.completed ? " (Completed)" : "")}
                      </p>
                    </Tooltip>
                    <p className="text-small text-default-500">
                      {todo.sent ? "Sent msg via Discord" : "Not sent yet"}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>{todo.content}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Tooltip content="Completed?">
                    <Switch
                      isSelected={todo.completed}
                      onValueChange={() => handleSwitchChange(todo)}
                    />
                  </Tooltip>
                  <DropDown
                    index={index}
                    todo={todo}
                    onOpenEdit={onOpenEdit}
                    onOpenDelete={onOpenDelete}
                    setSelectedTodo={setSelectedTodo}
                  />
                </CardFooter>
              </Card>
            )
          )
        )}
      </div>
    </>
  );
}
