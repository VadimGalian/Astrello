"use client"

import { toast } from "sonner"
import { List } from "@prisma/client"
import { ElementRef, useRef } from "react"
import { MoreHorizontal, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/_shared/ui/Popover"
import { useAction } from "@/_shared/hooks/use-action"
import { Button } from "@/_shared/ui/Button"
import { Separator } from "@/_shared/ui/Separator"
import { deleteList } from "@/app/actions/delete-list"
import { copyList } from "@/app/actions/copy-list"
import { FormSubmit } from "@/_shared/ui/FormSubmit"

interface ListOptionsProps {
    data: List
    onAddCard: () => void
}

export function ListOptions({ data, onAddCard }: ListOptionsProps) {
    const closeRef = useRef<ElementRef<"button">>(null)

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" deleted`)
            closeRef.current?.click()
        },
        onError: error => {
            toast.error(error)
        },
    })

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" copied`)
            closeRef.current?.click()
        },
        onError: error => {
            toast.error(error)
        },
    })

    function onDelete(formData: FormData) {
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        executeDelete({ id, boardId })
    }

    function onCopy(formData: FormData) {
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        executeCopy({ id, boardId })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    List actions
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    variant="ghost"
                >
                    Add card...
                </Button>
                <form action={onCopy}>
                    <input hidden name="id" id="id" defaultValue={data.id} />
                    <input hidden name="boardId" id="boardId" defaultValue={data.boardId} />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Copy list...
                    </FormSubmit>
                </form>
                <Separator />
                <form action={onDelete}>
                    <input hidden name="id" id="id" defaultValue={data.id} />
                    <input hidden name="boardId" id="boardId" defaultValue={data.boardId} />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Delete this list
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}