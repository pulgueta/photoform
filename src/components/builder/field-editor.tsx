import type { FC } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BuilderFormField } from "@/context/form-builder-context";

interface FieldEditorProps {
  field: BuilderFormField;
  onUpdate: (field: BuilderFormField) => void;
}

export const FieldEditor: FC<FieldEditorProps> = ({ field, onUpdate }) => {
  const [localField, setLocalField] = useState(field);

  const handleChange = (
    prop: string,
    value: string | boolean | string[] | number,
  ) => {
    const updated = { ...localField };

    if (prop.includes(".")) {
      const [parent, child] = prop.split(".");
      updated[parent] = { ...updated[parent], [child]: value };
    } else {
      if (prop === "isMultiSelect") {
        updated.isMultiSelect = value as boolean;
        if (value && !updated.options) {
          updated.options = ["Option 1"];
        }
      } else {
        updated[prop] = value;
      }
    }

    setLocalField(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="field-label" className="text-sm">
          Label
        </Label>
        <Input
          id="field-label"
          type="text"
          value={localField.label}
          onChange={(e) => handleChange("label", e.target.value)}
          className="text-sm"
        />
      </div>

      {["text", "textarea"].includes(field.type) && (
        <div className="space-y-1">
          <Label htmlFor="field-placeholder" className="text-sm">
            Placeholder
          </Label>
          <Input
            id="field-placeholder"
            type="text"
            value={localField.placeholder || ""}
            onChange={(e) => handleChange("placeholder", e.target.value)}
            className="text-sm"
          />
        </div>
      )}

      {(field.type === "dropdown" ||
        field.type === "radio" ||
        field.type === "checkbox") && (
        <div className="space-y-3">
          {field.type === "checkbox" && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="field-multi-select"
                checked={!!localField.isMultiSelect}
                onCheckedChange={(checked) =>
                  handleChange("isMultiSelect", !!checked)
                }
              />
              <Label htmlFor="field-multi-select" className="text-sm">
                Allow multiple selections
              </Label>
            </div>
          )}

          {(field.type !== "checkbox" || localField.isMultiSelect) && (
            <>
              <Label className="text-sm">Options</Label>
              <div className="space-y-1.5">
                {localField.options?.map((option, index) => (
                  <div
                    key={`${field.id}-option-${index}`}
                    className="flex items-center space-x-1"
                  >
                    <Input
                      type="text"
                      value={option}
                      className="text-sm"
                      onChange={(e) => {
                        const newOptions = [...(localField.options || [])];
                        newOptions[index] = e.target.value;
                        handleChange("options", newOptions);
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 flex-shrink-0 px-2 text-xs"
                      onClick={() =>
                        handleChange(
                          "options",
                          localField.options?.filter((_, i) => i !== index) ||
                            [],
                        )
                      }
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() =>
                  handleChange("options", [
                    ...(localField.options || []),
                    "New Option",
                  ])
                }
              >
                Add Option
              </Button>
            </>
          )}
        </div>
      )}

      {field.type === "image" && (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="accepted-file-types" className="text-sm">
              Accepted File Types
            </Label>
            <Input
              id="accepted-file-types"
              type="text"
              value={localField.acceptedFileTypes || "image/*"}
              onChange={(e) =>
                handleChange("acceptedFileTypes", e.target.value)
              }
              className="text-sm"
            />
            <p className="text-muted-foreground text-xs">
              Example: image/*, image/jpeg, image/png
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="max-file-size" className="text-sm">
              Max File Size (MB)
            </Label>
            <Input
              id="max-file-size"
              type="number"
              min="1"
              max="50"
              value={localField.maxFileSizeMB || 5}
              onChange={(e) =>
                handleChange("maxFileSizeMB", Number(e.target.value))
              }
              className="text-sm"
            />
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2 pt-1">
        <Checkbox
          id="field-required"
          checked={!!localField.required}
          onCheckedChange={(checked) => handleChange("required", !!checked)}
        />
        <Label htmlFor="field-required" className="text-sm">
          Required field
        </Label>
      </div>
    </div>
  );
};
