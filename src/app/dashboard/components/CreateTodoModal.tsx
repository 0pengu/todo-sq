"use client";

import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { BoxIcon, LockClosedIcon } from "@radix-ui/react-icons";
import moment from "moment";
import SubmitTodo from "../actions";
import { now, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";

export default function CreateTodoModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Todo
            </ModalHeader>
            <form action={SubmitTodo}>
              <ModalBody>
                <Input
                  autoFocus
                  name="todoName"
                  type="text"
                  isRequired
                  min={1}
                  max={1000}
                  label="What do you want to complete?"
                  placeholder="Walk the fish"
                  variant="bordered"
                />
                <DatePicker
                  label="When do you want to complete it by?"
                  isRequired
                  name="todoDate"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  suppressHydrationWarning
                  defaultValue={now(getLocalTimeZone()).add({ days: 1 })}
                  onChange={(value) => {
                    if (value.compare(now(getLocalTimeZone())) < 0) {
                      setError(
                        "Due date is not in the future! This message will be sent immediately. If this is intended, proceed."
                      );
                    } else {
                      setError(null);
                    }
                  }}
                />
                {error && <div className="text-danger text-sm">{error}</div>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
