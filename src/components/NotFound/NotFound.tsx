import { CircleHelp } from "lucide-react";

export default function NotFound({ text }: { text?: string }) {
  return (
    <div className="flex flex-row space-x-1 bg-white p-4 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100">
      <div className="text-gray-500 items-center justify-center mx-auto flex flex-col">
        <CircleHelp className="w-16 h-16 mb-3" />
        <h1>{`Ooops! We couldn't find any ${
          text ? text : "data"
        }  that you're looking for.`}</h1>
        <p>{`Please create a new ${text ? text : "one"}.`}</p>
      </div>
    </div>
  );
}
