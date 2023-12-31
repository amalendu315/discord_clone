import { Hash, Mic, Video } from "lucide-react";
import MobileToggle from "@/components/mobile-toggle";
import { UserAvatar } from "../user-avatar";
import { SocketIndicator } from "../socket-indicator";
import { ChannelType } from "@prisma/client";
import ChatVideoButton from "./chat-video-button";


interface ChatHeaderProps {
    serverId:string;
    name:string;
    type:"conversation" | "channel";
    channelType?:ChannelType;
    imageUrl?:string;
}



export const ChatHeader = ({
    serverId,
    name,
    type,
    channelType,
    imageUrl
}:ChatHeaderProps) => {
  
    return (
      <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
        <MobileToggle serverId={serverId} />
        {type === "channel" && channelType === ChannelType.TEXT && (
          <Hash className="mr-2 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        )}
        {type === "channel" && channelType === ChannelType.AUDIO && (
          <Mic className="mr-2 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        )}
        {type === "channel" && channelType === ChannelType.VIDEO && (
          <Video className="mr-2 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        )}
        {type === "conversation" && (
          <UserAvatar src={imageUrl} className="mr-2 h-8 w-8 md:h-8 md:w-8" />
        )}
        <p className="font-semibold text-md text-black dark:text-white">
          {name}
        </p>
        <div className="ml-auto flex items-center">
          {type === "conversation" && (
            <ChatVideoButton />
          )}
          <SocketIndicator />
        </div>
      </div>
    );
};