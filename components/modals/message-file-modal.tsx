"use client";
import * as z from "zod";
import axios from 'axios';
import qs from "query-string";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { useModalStore } from "@/hooks/use-modal-store";

const formSchema = z.object({
    fileUrl: z.string().url({
        message: "Server icon must be a valid URL",
    }),
});

const MessageFileModal = () => {
    const { isOpen, onClose,type,data } = useModalStore();
    const {apiUrl, query} = data;
    const router = useRouter();

    const isModalOpen = isOpen && type === "messageFile";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        },
    })

    const handleClose = () => {
        form.reset();
        onClose();
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values:z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url:apiUrl || "",
                query,
            });
            await axios.post(url, {
                ...values,
                content:values.fileUrl
            })
            form.reset();
            router.refresh();
            handleClose();
        } catch (err:any) {
            console.log(err)
        }
    }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent
            className="bg-white text-black p-0 overflow-hidden"
        >
            <DialogHeader className="pt-8 px-6" >
                <DialogTitle className="text-2xl font-bold text-center">
                    Add an <span className="
                        text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500
                    ">
                        Attachment
                    </span>
                </DialogTitle>
                <DialogDescription
                    className="text-center text-zinc-500"
                >
                    Send a file as a message.
                </DialogDescription>
            </DialogHeader>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-8 px-6">
                        <div className="flex items-center justify-center text-center">
                           <FormField 
                                control={form.control}
                                name="fileUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload 
                                                endpoint="messageFile"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                           />
                        </div>
                    </div>
                    <DialogFooter className="bg-gray-100 px-6 py-6">
                        <Button variant={"primary"} disabled={isLoading}>
                            Send
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default MessageFileModal