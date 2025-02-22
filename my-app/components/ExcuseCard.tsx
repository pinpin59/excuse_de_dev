import { Excuse } from "@/types/excuse";
import { Card, CardHeader, CardBody, Divider, Image } from "@heroui/react";

export default function ExcuseCard({ excuse }: { excuse: Excuse }) {
  return (
    <Card className="sm:min-w-[500px] min-w-[300px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="heroui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">HTTP Code : {excuse.http_code}</p>
            <p className="text-small text-default-500">TAG: {excuse.tag}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{excuse.message}.</p>
        </CardBody>
        <Divider />
    </Card>
  );
}
