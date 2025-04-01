import { useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { BuilderTypes } from "@/components/layout/builder/builder-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Heading, Paragraph } from "@/components/ui/typography";
import type { BuilderFormField } from "@/context/form-builder-context";
import {
  useFormBuilderActions,
  useFormBuilderFields,
} from "@/context/form-builder-context";
import { cn } from "@/lib/utils";
import { getUserSubscriptionStatus } from "@/services/user";

export const Route = createFileRoute("/dashboard/new")({
  component: FormBuilder,
  loader: async ({ context: { user } }) => ({
    subscription: await getUserSubscriptionStatus({
      data: {
        userId: user?.id,
      },
    }),
  }),
  pendingComponent: () => <div>Loading...</div>,
});

function FormBuilder() {
  const [selectedField, setSelectedField] = useState<BuilderFormField | null>(
    null,
  );
  const [answers] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("edit");

  const { subscription } = Route.useLoaderData();

  const fields = useFormBuilderFields();
  const { updateField, removeField } = useFormBuilderActions();

  const handleUpdateField = (updatedField: BuilderFormField) => {
    if (
      updatedField.type === "checkbox" &&
      updatedField.isMultiSelect &&
      !updatedField.options
    ) {
      updatedField.options = ["Option 1"];
    }
    updateField(updatedField);
    setSelectedField(updatedField);
  };

  const handleDeleteField = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field) {
      removeField(field);
      setSelectedField(null);
      // If this was the last field, switch to preview tab
      if (fields.length <= 1) {
        setActiveTab("preview");
      }
    }
  };

  // Create dynamic form schema based on fields
  const createFormSchema = () => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    for (const field of fields) {
      let fieldSchema: z.ZodTypeAny;

      switch (field.type) {
        case "checkbox":
          if (field.isMultiSelect) {
            fieldSchema = z.array(z.string()).transform((val) => val.join(","));
          } else {
            fieldSchema = z.boolean().transform((val) => val.toString());
          }
          break;
        case "image":
          fieldSchema = z
            .any()
            .refine((val) => val instanceof File || typeof val === "string", {
              message: "Must be a file or a string",
            });
          break;
        default:
          fieldSchema = z.string();
      }

      if (!field.required) {
        fieldSchema = fieldSchema.optional();
      }

      schemaFields[field.id] = fieldSchema;
    }

    return z.object(schemaFields);
  };

  const formSchema = createFormSchema();
  const formPreview = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: answers,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values);
    toast.success("Form submitted successfully", {
      description: "Thank you for submitting the form",
    });
  };

  const handleFieldClick = (field: BuilderFormField) => {
    setSelectedField(field);
    setActiveTab("edit");
  };

  return (
    <div>
      <header className="mb-4 flex items-center justify-between sm:mb-6">
        <div>
          <Heading as="h2">Form builder</Heading>
          <Paragraph muted>
            Create your custom form by adding and configuring fields
          </Paragraph>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BuilderTypes
          setActiveTab={setActiveTab}
          setSelectedField={setSelectedField}
          subscription={subscription}
        />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="md:col-span-2 lg:col-start-2"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit" disabled={fields.length === 0}>
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 xl:grid-cols-3">
              {fields.length === 0 ? (
                <div className="col-span-3 rounded-lg border border-dashed p-4 text-center">
                  <p className="text-muted-foreground text-sm">
                    Start by adding fields from the panel
                  </p>
                </div>
              ) : (
                fields.map((field) => (
                  <Card
                    key={field.id}
                    className={cn("cursor-pointer transition-all", {
                      "ring-2 ring-primary": selectedField?.id === field.id,
                    })}
                    onClick={() => handleFieldClick(field)}
                  >
                    <CardContent className="flex items-center justify-between p-3">
                      <div className="min-w-0 truncate">
                        <p className="truncate font-medium text-sm">
                          {field.label}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {field.type} {field.required && "• Required"}
                        </p>
                      </div>

                      <Button
                        size="icon"
                        variant="destructive"
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
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="pt-3">
            <Card>
              <CardContent className="p-4">
                <Form {...formPreview}>
                  <form
                    onSubmit={formPreview.handleSubmit(handleSubmit)}
                    className="space-y-4"
                  >
                    {fields.map((field) => (
                      <FormField
                        key={field.id}
                        control={formPreview.control}
                        name={field.id}
                        render={({ field: formField }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-sm">
                              {field.label}
                              {field.required && (
                                <span className="ml-1 text-red-500">*</span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <FormFieldPreview
                                field={field}
                                formField={{
                                  value: formField.value?.toString() || "",
                                  onChange: (value) => {
                                    if (field.type === "checkbox") {
                                      formField.onChange(value === "true");
                                    } else if (
                                      field.type === "image" &&
                                      value instanceof File
                                    ) {
                                      formField.onChange(value);
                                    } else {
                                      formField.onChange(value);
                                    }
                                  },
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    {fields.length > 0 && (
                      <Button type="submit" className="mt-4 w-full">
                        Submit Form
                      </Button>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Only show field settings if there are fields and one is selected */}
        {selectedField && activeTab === "edit" && fields.length > 0 && (
          <Card className="lg:col-span-3 lg:col-start-2">
            <CardHeader className="p-3 pb-0 sm:p-4">
              <CardTitle className="text-base sm:text-lg">
                Field Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <FieldEditor field={selectedField} onUpdate={handleUpdateField} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function FieldEditor({
  field,
  onUpdate,
}: { field: BuilderFormField; onUpdate: (field: BuilderFormField) => void }) {
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
}

function FormFieldPreview({
  field,
  formField,
}: {
  field: BuilderFormField;
  formField: {
    value: string;
    onChange: (value: string | boolean | File | string[]) => void;
  };
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
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
                    className="text-xs"
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
}
