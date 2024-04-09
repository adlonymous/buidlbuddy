import { getRoom } from "@/data-access/rooms";
import { Github } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function RoomPage(props: any) {
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) {
    return <div>No room for this ID exists :(</div>;
  }

  const tags = room.tags.split(",").map((tag) => tag.trim());

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          VIDEO PLAYER
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-xl">{room?.name}</h1>
          {room?.githubRepo && (
            <Link
              href={room?.githubRepo}
              className="flex items-center gap-2 text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
              Github Project
            </Link>
          )}
          <p className="text-base text-gray-600">{room?.description}</p>
          <h3>Tags:</h3>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <Badge className="w-fit" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
