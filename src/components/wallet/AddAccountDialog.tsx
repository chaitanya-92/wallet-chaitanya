import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { addAccountContent, commonContent, toastMessages } from "@/data"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (name: string) => void
}

export default function AddAccountDialog({
  open,
  onOpenChange,
  onAdd,
}: Props) {
  const [accountName, setAccountName] = useState("")

  const handleSubmit = () => {
    if (!accountName.trim()) {
      toast.error(toastMessages.enterAccountName)
      return
    }
    onAdd(accountName.trim())
    toast.success(toastMessages.accountCreated)
    setAccountName("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{addAccountContent.title}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Input
            placeholder={addAccountContent.placeholder}
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            {commonContent.cancel}
          </Button>

          <Button variant="accent" onClick={handleSubmit}>
            {addAccountContent.createButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
