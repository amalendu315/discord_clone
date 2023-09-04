"use client";
import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";

export const SocketIndicator = () => {

    const [isMounted, setIsMounted] = useState(false);

    const { isConnected } = useSocket();

     useEffect(() => {
       setIsMounted(true);
     }, []);

    if(!isMounted){
        return null;
    }

    if(!isConnected){
        return (
            <Badge variant={"outline"} className="bg-yellow-600 text-white border-none">
                Fallback: Polling every 1s
            </Badge>
        )
    }
     return (
       <Badge
         variant={"outline"}
         className="bg-emerald-600 text-white border-none"
       >
         Live: Real-time updates
       </Badge>
     );
}