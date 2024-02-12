"use client"

import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/shared/ui/button"

interface FormSubmitProps {
    children: React.ReactNode
    disabled?: boolean
    className?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary"
}

export function FormSubmit({
    children,
    disabled,
    className,
    variant = "primary",
}: FormSubmitProps) {
    const { pending } = useFormStatus()

    return (
        <Button
            disabled={pending || disabled}
            type="submit"
            variant={variant}
            size="sm"
            className={cn(className)}
        >
            {children}
        </Button>
    )
}
