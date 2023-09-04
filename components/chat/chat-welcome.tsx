import { ChannelType } from "@prisma/client";
import { Hash, Mic, Video } from "lucide-react";



interface ChatWelcomeProps {
    name:string;
    type:"channel" | "conversation";
    channelType?:ChannelType;
}

const ChatWelcome = ({
    name,
    type,
    channelType
}:ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && channelType === ChannelType.TEXT && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      {type === "channel" && channelType === ChannelType.AUDIO && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Mic className="h-12 w-12 text-white" />
        </div>
      )}
      {type === "channel" && channelType === ChannelType.VIDEO && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Video className="h-12 w-12 text-white" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? `Welcome to #` : ""}
        {name}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of your direct message history with ${name}.`}
      </p>
    </div>
  );
}

export default ChatWelcome