"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModalStore } from "@/hooks/use-modal-store";

const NavigationAction = () => {

    const { onOpen } = useModalStore();

  return (
    <div>
      <ActionTooltip
        label="Add a Server"
        align="center"
        side="right"
      >
        <button className="group flex items-center">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500"
          onClick={()=>onOpen("createServer")}
          >
            <Plus
              className="text-emerald-500 group-hover:text-white transition"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}

export default NavigationAction