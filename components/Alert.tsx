import {Alert} from "@heroui/react";
interface AlertErrorProps {
  className?: string;
  message: string;
  color: "primary" | "secondary" | "success" | "danger" | "warning" | "default";
}


export default function AlertComponent({message, color, className} : AlertErrorProps) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <div className="flex flex-col sm:min-w-[500px] min-w-[300px]">
          <div key={color} className="w-full flex items-center my-3">
            <Alert color={color} title={message} />
          </div>
      </div>
    </div>
  );
}