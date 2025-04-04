import type { FC } from "react";

import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Paragraph } from "@/components/ui/typography";
import type { BuilderFormField } from "@/context/form-builder-context";
import { cn } from "@/lib/utils";

interface FieldCardProps {
  field: BuilderFormField;
  selectedField: BuilderFormField | null;
  handleFieldClick: (field: BuilderFormField) => void;
  handleDeleteField: (field: BuilderFormField["id"]) => void;
}

export const FieldCard: FC<FieldCardProps> = ({
  field,
  selectedField,
  handleDeleteField,
  handleFieldClick,
}) => {
  return (
    <Card
      className={cn("cursor-pointer transition-all", {
        "ring-2 ring-primary": selectedField?.id === field.id,
      })}
      onClick={() => handleFieldClick(field)}
    >
      <CardContent className="flex flex-col items-center justify-between gap-2 p-2.5 lg:flex-row">
        <div className="w-full">
          <Paragraph className="line-clamp-1 truncate">{field.label}</Paragraph>
          <Paragraph muted variant="xs">
            {field.type} {field.required && "• Required"}
          </Paragraph>
        </div>

        <Button
          size="icon"
          variant="destructive"
          className="w-full lg:w-7"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteField(field.id);
          }}
        >
          <Trash2Icon className="size-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </CardContent>
    </Card>
  );
};
