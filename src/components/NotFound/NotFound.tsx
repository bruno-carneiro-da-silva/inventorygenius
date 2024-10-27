import { CircleHelp } from "lucide-react";

export default function NotFound({ text, no_create_text = false }: { text?: string, no_create_text?: boolean }) {
  return (
    <div className="flex flex-row space-x-1 bg-white p-4 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100">
      <div className="text-gray-500 items-center justify-center mx-auto flex flex-col">
        <CircleHelp className="w-16 h-16 mb-3" />
        <h1>{`Ops! Não conseguimos achar ${text ? text : "data"
          }  que você estava procurando.`}</h1>
        {!no_create_text && <p>{`Por favor crie um novo ${text ? text : "one"}.`}</p>}
      </div>
    </div>
  );
}
