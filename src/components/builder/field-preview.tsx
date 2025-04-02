import type { FC } from "react";
import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";

import type { BuilderFormField } from "@/context/form-builder-context";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface FormFieldPreviewProps {
  field: BuilderFormField;
  formField: {
    value: string;
    onChange: (value: string | boolean | File | string[]) => void;
  };
}

export const FormFieldPreview: FC<FormFieldPreviewProps> = ({
  field,
  formField,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      field.acceptedFileTypes &&
      !file.type.match(field.acceptedFileTypes.replace("*", ".*"))
    ) {
      toast.error(
        `Please select a valid file type (${field.acceptedFileTypes})`,
      );
      return;
    }

    // Check file size
    if (field.maxFileSizeMB && file.size > field.maxFileSizeMB * 1024 * 1024) {
      toast.error(
        `File size exceeds the maximum limit of ${field.maxFileSizeMB}MB`,
      );
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    formField.onChange(file);
  };

  const clearImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    formField.onChange("");
  };

  useEffect(() => {
    // Cleanup preview URL when component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  switch (field.type) {
    case "text":
      return (
        <Input
          type="text"
          placeholder={field.placeholder}
          className="text-sm"
          required={field.required}
          value={formField.value}
          onChange={(e) => formField.onChange(e.target.value)}
        />
      );

    case "textarea":
      return (
        <Textarea
          placeholder={field.placeholder}
          className="min-h-[80px] text-sm"
          required={field.required}
          value={formField.value}
          onChange={(e) => formField.onChange(e.target.value)}
        />
      );

    case "dropdown":
      return (
        <Select
          onValueChange={formField.onChange}
          defaultValue={formField.value}
          required={field.required}
        >
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option} value={option} className="text-sm">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "radio":
      return (
        <RadioGroup
          onValueChange={formField.onChange}
          defaultValue={formField.value}
          className="space-y-1"
          required={field.required}
        >
          {field.options?.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option}
                id={`${field.id}-option-${option}`}
              />
              <Label
                htmlFor={`${field.id}-option-${option}`}
                className="text-sm"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );

    case "checkbox":
      if (field.isMultiSelect && field.options) {
        const selectedValues = formField.value
          ? formField.value.split(",").filter(Boolean)
          : [];

        return (
          <div className="space-y-2">
            {field.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.id}-${option}`}
                  checked={selectedValues.includes(option)}
                  onCheckedChange={(checked) => {
                    const newValues = checked
                      ? [...selectedValues, option]
                      : selectedValues.filter((val) => val !== option);
                    formField.onChange(newValues.join(","));
                  }}
                  required={field.required && selectedValues.length === 0}
                />
                <Label htmlFor={`${field.id}-${option}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      }

      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={field.id}
            checked={formField.value === "true"}
            onCheckedChange={(checked) =>
              formField.onChange(checked ? "true" : "false")
            }
            required={field.required}
          />
          <Label htmlFor={field.id} className="text-sm">
            {field.label}
          </Label>
        </div>
      );

    case "image":
      return (
        <div className="space-y-3">
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4">
            {previewUrl ? (
              <div className="space-y-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mx-auto max-h-48 rounded-md object-contain"
                />
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearImage}
                    type="button"
                  >
                    Remove Image
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Label
                  htmlFor={`file-upload-${field.id}`}
                  className="mb-1 cursor-pointer rounded-md bg-primary px-4 py-2 text-primary-foreground text-xs hover:bg-primary/90"
                >
                  Upload Image
                </Label>
                <p className="mt-2 text-muted-foreground text-xs">
                  {field.acceptedFileTypes?.replace("*", "All")} (Max:{" "}
                  {field.maxFileSizeMB}MB)
                </p>
              </div>
            )}
            <input
              id={`file-upload-${field.id}`}
              type="file"
              accept={field.acceptedFileTypes}
              onChange={handleFileChange}
              required={field.required}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};
