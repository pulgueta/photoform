import type { FC, HTMLInputTypeAttribute } from "react";

import type { Subscription } from "@prisma/client";
import { BadgeCheck, ChevronDown, Image, Radio, Type } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BuilderFormField } from "@/context/form-builder-context";
import {
  useFormBuilderActions,
  useFormBuilderFields,
} from "@/context/form-builder-context";

type ActiveTab = "edit" | "preview";

interface BuilderTypesProps {
  subscription: Subscription["status"] | undefined;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedField: (field: BuilderFormField | null) => void;
}

export const BuilderTypes: FC<BuilderTypesProps> = ({
  subscription,
  setActiveTab,
  setSelectedField,
}) => {
  const fields = useFormBuilderFields();
  const { addField, removeAllFields } = useFormBuilderActions();

  const isFreeSubscription = subscription === "FREE";

  const freeUserFields: HTMLInputTypeAttribute[] = [
    "text",
    "textarea",
    "radio",
  ] as const;
  const proUserFields: HTMLInputTypeAttribute[] = [
    ...freeUserFields,
    "checkbox",
    "image",
  ] as const;

  const fieldIcons = {
    text: <Type />,
    textarea: <Type />,
    dropdown: <ChevronDown />,
    radio: <Radio />,
    checkbox: <BadgeCheck />,
    image: <Image />,
  };

  const handleAddField = (type: BuilderFormField["type"]) => {
    const newField: BuilderFormField = {
      id: `field-${Date.now()}`,
      name: `field-${Date.now()}`,
      type,
      label: `New ${type} Field`,
      required: false,
      ...(type === "dropdown" || type === "radio"
        ? { options: ["Option 1"] }
        : {}),
      ...(type === "checkbox"
        ? {
            isMultiSelect: true,
            options: ["Option 1"],
          }
        : {}),
      ...(type === "image"
        ? {
            acceptedFileTypes: "image/*",
            maxFileSizeMB: 5,
          }
        : {}),
      requiredMessage: undefined,
    };
    addField(newField);
    setSelectedField(newField);
    setActiveTab("edit");
  };

  const handleClearForm = () => {
    removeAllFields();
    setSelectedField(null);
    setActiveTab("preview");
  };

  return (
    <Card className="w-full flex-shrink-0 md:row-span-1 lg:col-span-1 lg:w-full">
      <CardHeader>
        <CardTitle>Field types</CardTitle>
        <CardDescription>
          Add different types of fields to your form
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {proUserFields.map((type) => (
            <Button
              key={type}
              variant="outline"
              className="relative flex h-full flex-col items-center justify-center gap-2"
              disabled={isFreeSubscription && !freeUserFields.includes(type)}
              onClick={() => handleAddField(type)}
            >
              {fieldIcons[type]}
              <span className="text-base xl:text-xs">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>

              {isFreeSubscription && !freeUserFields.includes(type) && (
                <Badge className="-left-2 absolute top-0">Pro</Badge>
              )}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-y-2">
        <Button
          fullWidth
          variant="destructive"
          onClick={handleClearForm}
          disabled={fields.length === 0}
        >
          Clear form
        </Button>

        {/* <Form {...formPreview}>
          <form className="w-full">
            <Button
              fullWidth
              disabled={!formPreview.formState.isValid || fields.length === 0}
            >
              Save form
            </Button>
          </form>
        </Form> */}
      </CardFooter>
    </Card>
  );
};
