"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

const LeaveServerModal = () => {

  const router = useRouter();
    const { isOpen, onClose, type,data } = useModalStore();
    const {server} = data;

    const [isLoading, setIsLoading] = useState(false);
    const isModalOpen = isOpen && type === "leaveServer";

    const onConfirmClick = async () => {
      try {
       setIsLoading(true);
       await axios.patch(`/api/servers/${server?.id}/leave`);
       onClose();
       router.refresh(); 
       router.push("/");
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
              Leave
            </span>{" "}
            Server
          </DialogTitle>
          <DialogDescription
            className="text-sm text-center text-zinc-500"
  
          >
            Are you sure you want to leave <span className="font-semibold text-indigo-500" >{server?.name}</span> server?
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

export default LeaveServerModal