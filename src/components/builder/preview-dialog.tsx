import type { FC } from "react";

import { EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { BuilderFormField } from "@/context/form-builder-context";
import { FormFieldPreview } from "./field-preview";

interface PreviewDialogProps {
  fields: BuilderFormField[];
}

export const PreviewDialog: FC<PreviewDialogProps> = ({ fields }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <EyeIcon size={16} />
          Preview form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription>
            This is how your form will look like to your customers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label>{field.label}</Label>
              <FormFieldPreview
                field={field}
                formField={{ value: "", onChange: () => {} }}
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
