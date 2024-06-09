"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DatePicker,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import SubmitTodo, { DeleteTodo, testTodo } from "../../actions";
import { Todo } from "../../utils/types";
import { todo } from "node:test";
import { formatTime, formatFutureTime } from "../../utils/timeFormat";
import DropDown from "../DropDown";
import Latex from "react-latex-next";
import { now, getLocalTimeZone } from "@internationalized/date";
import moment from "moment";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NewUserModal({}: {}) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [count, setCount] = useState(0);
  const [disabledForNow, setDisabledForNow] = useState(true);
  const firstTodo = {
    id: "abcdef-12345-ghijkl",
    content: "Breathe",
    created_at: moment().utc().format(),
    due_date: moment(now(getLocalTimeZone()).subtract({ days: 1 }).toString())
      .utc()
      .format(),
    completed: false,
    sent: false,
  };

  const [open, setOpen] = useState(true);

  useEffect(() => {
    toast.success(
      "Todo sent! Check your Discord DMs! If everything looks good, you can end the tutorial.",
      {
        duration: 8000,
      }
    );
  }, [count]);

  return (
    <Modal
      isOpen={open}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      closeButton={<></>}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="">
              Welcome to {" {Todo}"}
              <Latex>$^2$!</Latex>
            </ModalHeader>
            <form action={testTodo}>
              <ModalBody>
                <text className="text-md">
                  Welcome! This is your first time using the application, so I
                  am going to be walking you through how to use it!
                </text>
                <Divider />
                <div className="flex flex-col gap-3">
                  <text className="text-sm">
                    First, make sure you have connected the bot to your Discord
                    account. If you have not done that, click the button below.
                  </text>
                  <Button
                    color="primary"
                    variant="solid"
                    as={Link}
                    href="javascript:window.open('https://discord.com/oauth2/authorize?client_id=1238871856896016444%27,%27Discord%27,%27width=600,height=400%27)"
                  >
                    <DiscordLogoIcon />
                    Give Discord Bot Permissions
                  </Button>
                </div>
                <Divider />
                <Card className="max-w-full">
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">
                        Created {formatTime(firstTodo.created_at || "")}
                      </p>
                      <Tooltip content={"Date spoofed to be 5 days ago"}>
                        <p className="text-small text-default-500">
                          Due date spoofed to be 5 days ago
                        </p>
                      </Tooltip>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>{firstTodo.content}</p>
                  </CardBody>
                  <Divider />
                </Card>
                <input name="todoId" type="hidden" value={firstTodo.id} />
                <text className="text-md">
                  Now that you have connected the bot to your Discord account,
                  {" let's"} add a fake todo to test if the bot is able to
                  contact you. Go ahead and click the button below to add the
                  todo.
                </text>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    localStorage.setItem("returningUser", "true");
                    setOpen(false);
                  }}
                  isDisabled={disabledForNow}
                >
                  End Tutorial
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  onPress={() => {
                    setCount(count + 1);
                    setDisabledForNow(false);
                  }}
                >
                  Send Todo
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
