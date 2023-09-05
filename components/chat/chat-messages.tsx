"use client";
import { Fragment } from "react";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { ChannelType, Member, Message, Profile } from "@prisma/client";

import ChatItem from "./chat-item";
import ChatWelcome from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";


const DATE_FORMAT = "d MMM yyyy 'at' h:mm a";

interface ChatMessagesProps {
    name:string;
    channelType?:ChannelType;
    member:Member;
    chatId:string;
    apiUrl:string;
    socketUrl:string;
    socketQuery:Record<string,string>;
    paramKey:"channelId" | "conversationId";
    paramValue:string;
    type:"channel" | "conversation";
}

type MessageWithMemberWithProfile = Message & {
    member:Member & {
        profile:Profile;
    }
};

const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    channelType,
    type,
}:ChatMessagesProps) => {

    const queryKey = `chat:${chatId}`
    const addKey = `chat:${chatId}:messages`
    const updateKey = `chat:${chatId}:messages:update`

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    })

    useChatSocket({ queryKey,addKey,updateKey })

    if(status === "loading") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 
                    className="h-7 w-7 text-zinc-500 animate-spin my-4"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading messages...
                </p>
            </div>
        )
    }

    if (status === "error") {
      return (
        <div className="flex flex-col flex-1 justify-center items-center">
          <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Something went wrong...
          </p>
        </div>
      );
    }

  return (
    <div
        className='flex-1 flex flex-col py-4 overflow-y-auto'
    >
        <div className="flex-1" />
        <ChatWelcome 
            type={type}
            name={name}
            channelType={channelType}
        />
        <div className="flex flex-col-reverse mt-auto">
            {data?.pages.map((page, i) => (
                <Fragment
                    key={i}
                >
                    {page.items.map((message:MessageWithMemberWithProfile) => (
                        <ChatItem 
                            key={message.id}
                            currentMember={member}
                            member={message.member}
                            id={message.id}
                            content={message.content}
                            fileUrl={message.fileUrl}
                            deleted={message.deleted}
                            timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                            isUpdated={message.updatedAt !== message.createdAt}
                            socketUrl={socketUrl}
                            socketQuery={socketQuery}
                        />
                    ))}
                </Fragment>
            ))}
        </div>
    </div>
  )
}

export default ChatMessages