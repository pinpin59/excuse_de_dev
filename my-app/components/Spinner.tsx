import {Spinner} from "@heroui/react";

export default function Loader() {
  return (
    <div className="flex gap-4">
      <Spinner color="secondary" labelColor="secondary" />
    </div>
  );
}