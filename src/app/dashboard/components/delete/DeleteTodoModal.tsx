import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";
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
} from "@nextui-org/react";
import { now } from "moment";
import SubmitTodo, { DeleteTodo, editTodo } from "../../actions";
import { Todo } from "../../utils/types";
import { parseAbsolute } from "@internationalized/date";
import moment from "moment";
import { todo } from "node:test";
import { formatTime, formatFutureTime } from "../../utils/timeFormat";
import DropDown from "../DropDown";

export default function DeleteModal({
  isOpen,
  onOpenChange,
  selectedTodo,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTodo: Todo | null;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Are you sure you want to delete this todo?
            </ModalHeader>
            <form action={DeleteTodo}>
              <ModalBody>
                <Card className="max-w-sm">
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">
                        Created {formatTime(selectedTodo?.created_at || "")}
                      </p>
                      <Tooltip
                        content={moment(selectedTodo?.due_date)
                          .local()
                          .format("MM/DD/YYYY h:mm a z")}
                      >
                        <p className="text-small text-default-500">
                          Due{" "}
                          {formatFutureTime(
                            moment(selectedTodo?.due_date)
                              .local()
                              .toLocaleString()
                          )}
                        </p>
                      </Tooltip>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>{selectedTodo?.content}</p>
                  </CardBody>
                  <Divider />
                </Card>
                <input name="todoId" type="hidden" value={selectedTodo?.id} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" onPress={onClose}>
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
