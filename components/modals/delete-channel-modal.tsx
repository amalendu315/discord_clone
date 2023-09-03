"use client";
import qs from "query-string"
import axios from "axios";
import { useState } from "react";
import {  useParams, useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { useModalStore } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

const DeleteChannelModal = () => {

  const router = useRouter();
    const { isOpen, onClose, type,data } = useModalStore();
    const {channel,server} = data;
    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const isModalOpen = isOpen && type === "deleteChannel";

    const onConfirmClick = async () => {
      try {
       setIsLoading(true);

       const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: params?.serverId,
        }
       })
       await axios.delete(url);
       onClose();
       router.refresh(); 
       router.push(`/servers/${params?.serverId}`);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            <span
              className="
                        text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500
                    "
            >
              Delete
            </span>{" "}
            Channel
          </DialogTitle>
          <DialogDescription
            className="text-sm text-center text-zinc-500"
  
          >
            Are you sure you want to do this? <br />
            <span className="text-indigo-500 font-semibold">{channel?.name}</span> will be deleted permanently.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              variant={"ghost"}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant={"primary"}
              onClick={onConfirmClick}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteChannelModal