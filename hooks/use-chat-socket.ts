import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import { Member, Message, Profile } from "@prisma/client";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  useEffect(() => {
    if(!socket) return;
    socket.on(updateKey,(message:MessageWithMemberWithProfile)=>(
        queryClient.setQueryData([queryKey],(oldData:any)=>{
            if(!oldData || !oldData.pages || oldData?.pages.length === 0) return oldData;
            const newPages = oldData.pages.map((page:any)=>{
                return {
                    ...page,
                    items:page.items.map((item:MessageWithMemberWithProfile)=>{
                        if(item.id === message.id) {
                            return message;
                        }
                        return item;
                    }),
                }
            })
            return {
                ...oldData,
                pages:newPages,
            }
        })
    ));
    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
        queryClient.setQueryData([queryKey], (oldData: any) => {
            if(!oldData || !oldData.pages || oldData?.pages.length === 0) {
                return {
                    pages: [{
                        items: [message]
                    }]
                }
            }
            const newPages = [...oldData.pages];
            newPages[0]={
                ...newPages[0],
                items:[
                    message,
                    ...newPages[0].items
                ]
            }
            return {
                ...oldData,
                pages: newPages,
            }
        });
    });
    return () => {
        socket.off(addKey);
        socket.off(updateKey);
    };
  }, [queryClient, socket, addKey, updateKey, queryKey]);
};
