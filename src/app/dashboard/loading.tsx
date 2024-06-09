import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
  Skeleton,
} from "@nextui-org/react";
import { formatFutureTime, formatTime } from "./utils/timeFormat";

const todos = [
  {
    completed: false,
    content: "Buy milk",
    created_at: "2022-01-01",
    discord_id: 112012304129481294,
    dueDate: "2022-01-01",
    id: "13-958-5212-049",
    sent: false,
  },
  {
    completed: false,
    content: "Buy eggs",
    created_at: "2022-01-01",
    discord_id: 112012304129481294,
    dueDate: "2022-01-01",
    id: "13-958-5212-049",
    sent: false,
  },
  {
    completed: false,
    content: "Buy bread",
    created_at: "2022-01-01",
    discord_id: 112012304129481294,
    dueDate: "2022-01-01",
    id: "13-958-5212-049",
    sent: false,
  },
  {
    completed: false,
    content: "Buy butter",
    created_at: "2022-01-01",
    discord_id: 112012304129481294,
    dueDate: "2022-01-01",
    id: "13-958-5212-049",
    sent: false,
  },
  {
    completed: false,
    content: "Buy cheese",
    created_at: "2022-01-01",
    discord_id: 112012304129481294,
    dueDate: "2022-01-01",
    id: "13-958-5212-049",
    sent: false,
  },
];

export default function Loading() {
  return (
    <>
      <Button className="m-4">Create new Todo</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden p-4">
        {[...todos, ...todos, ...todos].map((todo, index) => (
          <Card key={index} className="max-w-full">
            <CardHeader className="flex gap-3">
              {/* <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          /> */}
              <div className="flex flex-col">
                <p className="text-sm">
                  <Skeleton isLoaded={false} className="rounded-lg pb-2 h-3/5">
                    Created {formatTime(todo.created_at)} ago
                  </Skeleton>
                </p>
                <p className="text-small text-default-500">
                  <Skeleton isLoaded={false} className="rounded-lg pt-2 h-3/5">
                    Due in {formatFutureTime(todo.dueDate)}
                  </Skeleton>
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Skeleton isLoaded={false} className="rounded-lg h-3/5">
                <p>{todo.content}</p>
              </Skeleton>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button isLoading={true} fullWidth color="default"></Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
