import {Alert} from "@heroui/react";

export default function AlertError({error}: {error: string}) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col sm:min-w-[500px] min-w-[300px]">
          <div key="danger" className="w-full flex items-center my-3">
            <Alert color="danger" title={error} />
          </div>
      </div>
    </div>
  );
}