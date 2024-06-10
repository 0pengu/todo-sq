import {
  getLocalTimeZone,
  now,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  DatePicker,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import moment from "moment";
import { editTodo } from "../../actions";
import { Todo } from "../../utils/types";
import { useState } from "react";

export default function EditModal({
  isOpen,
  onOpenChange,
  selectedTodo,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTodo: Todo | null;
}) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const [error, setError] = useState<string | null>(null);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Todo</ModalHeader>
            <form action={editTodo}>
              <ModalBody>
                <input name="todoId" type="hidden" value={selectedTodo?.id} />
                <Input
                  autoFocus
                  name="todoName"
                  type="text"
                  isRequired
                  label="What do you want to complete?"
                  placeholder="Walk the fish"
                  variant="bordered"
                  defaultValue={selectedTodo?.content || ""}
                />
                <DatePicker
                  label="When do you want to complete it by?"
                  isRequired
                  name="todoDate"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  suppressHydrationWarning
                  defaultValue={parseAbsoluteToLocal(
                    moment(selectedTodo?.due_date).utc().toISOString()
                  )}
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
                <Button color="danger" variant="flat" onPress={handleClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" onPress={handleClose}>
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
