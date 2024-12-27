import { type ToastActionElement, type ToastProps } from "@/components/ui/toast"
import { toast } from "sonner"

export { toast }

export function useToast() {
    return { toast }
} 