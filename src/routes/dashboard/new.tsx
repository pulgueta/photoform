import type { HTMLInputTypeAttribute } from "react";
import { useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, ChevronDown, Image, Radio, Type } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { getUserSubscriptionStatus } from "@/services/user";

type FormFieldType = {
  id: string;
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
  };
};

type FormBuilderConfig = {
  id?: string;
  title: string;
  description: string;
  fields: FormFieldType[];
};

// Schema for saving the form
const formBuilderSchema = z.object({
  title: z.string().min(1, { message: "Form title is required" }),
  description: z.string().optional(),
});

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
  ssr: false,
});

function FormBuilder() {
  const { subscription } = Route.useLoaderData();

  const [fields, setFields] = useState<FormFieldType[]>([]);
  const [selectedField, setSelectedField] = useState<FormFieldType | null>(
    null,
  );
  const [answers, setAnswers] = useState<Record<string, string | File>>({});
  const [activeTab, setActiveTab] = useState("edit");

  // Form for saving the form configuration
  const saveForm = useForm<z.infer<typeof formBuilderSchema>>({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: {
      title: crypto.randomUUID().replaceAll("-", ""),
      description: crypto.randomUUID().replaceAll("-", ""),
    },
  });

  const { watch } = saveForm;
  const formTitle = watch("title");
  const formDescription = watch("description");

  const fieldIcons = {
    text: <Type />,
    textarea: <Type />,
    dropdown: <ChevronDown />,
    radio: <Radio />,
    checkbox: <BadgeCheck />,
    image: <Image />,
  };

  const freeUserFields: HTMLInputTypeAttribute[] = [
    "text",
    "textarea",
    "radio",
    "checkbox",
  ] as const;

  const proUserFields: HTMLInputTypeAttribute[] = [
    ...freeUserFields,
    "image",
  ] as const;

  // Function to save the form to database (mocked)
  const handleSaveForm = (values: z.infer<typeof formBuilderSchema>) => {
    const formConfig: FormBuilderConfig = {
      title: values.title,
      description: values.description || "",
      fields,
    };

    // Mock DB call
    console.log("Saving form to database:", formConfig);

    toast.success("Form saved", {
      description: `Form "${values.title}" has been saved successfully.`,
    });
  };

  const addField = (type: FormFieldType["type"]) => {
    const newField: FormFieldType = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} Field`,
      ...(type === "dropdown" || type === "radio"
        ? { options: ["Option 1"] }
        : {}),
      ...(type === "image"
        ? {
            acceptedFileTypes: "image/*",
            maxFileSizeMB: 5,
          }
        : {}),
      validation: {
        message: "This field is required",
      },
    };
    setFields([...fields, newField]);
    setSelectedField(newField);
    setActiveTab("edit");
  };

  const updateField = (updatedField: FormFieldType) => {
    setFields(fields.map((f) => (f.id === updatedField.id ? updatedField : f)));
    setSelectedField(updatedField);
  };

  const deleteField = (fieldId: string) => {
    setFields(fields.filter((f) => f.id !== fieldId));
    if (selectedField?.id === fieldId) {
      setSelectedField(null);
    }
  };

  // Create dynamic form schema based on fields
  const createFormSchema = () => {
    const schemaFields: Record<
      string,
      z.ZodString | z.ZodOptional<z.ZodString>
    > = {};

    for (const field of fields) {
      let fieldSchema = z.string();

      if (!field.required) {
        fieldSchema = fieldSchema.optional();
      }

      schemaFields[field.id] = fieldSchema;
    }

    return z.object(schemaFields);
  };

  // Form for the form preview/submission
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

  return (
    <div>
      <header className="mb-4 sm:mb-6">
        <Heading as="h2">Form builder</Heading>
        <Paragraph muted>
          Create your custom form by adding and configuring fields
        </Paragraph>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="w-full flex-shrink-0 md:row-span-1 lg:col-span-1 lg:w-full">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Field Types</CardTitle>
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
                  disabled={
                    subscription === "FREE" && !freeUserFields.includes(type)
                  }
                  onClick={() => addField(type)}
                >
                  {fieldIcons[type]}
                  <span className="text-base xl:text-xs">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>

                  {subscription === "FREE" &&
                    !freeUserFields.includes(type) && (
                      <Badge className="-left-2 absolute top-0">Pro</Badge>
                    )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="rounded-lg border bg-background p-4 lg:row-start-2">
          <Form {...saveForm}>
            <form
              className="space-y-3"
              onSubmit={saveForm.handleSubmit(handleSaveForm)}
            >
              <FormField
                control={saveForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Form Title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={saveForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} placeholder="Form Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button fullWidth disabled={fields.length === 0}>
                Save
              </Button>
            </form>
          </Form>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="md:col-span-2 lg:col-start-2"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Editor</TabsTrigger>
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
                    className={`cursor-pointer transition-all ${
                      selectedField?.id === field.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => setSelectedField(field)}
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
                      <div className="ml-2 flex flex-shrink-0 gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedField(field);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-7 px-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteField(field.id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="pt-3">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-xl">{formTitle}</CardTitle>
                {formDescription && (
                  <p className="mt-1 text-sm">{formDescription}</p>
                )}
              </CardHeader>
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
                                formField={formField}
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

        {/* Field Settings */}
        {selectedField && activeTab === "edit" && (
          <Card className="lg:col-span-2">
            <CardHeader className="p-3 pb-0 sm:p-4">
              <CardTitle className="text-base sm:text-lg">
                Field Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <FieldEditor field={selectedField} onUpdate={updateField} />
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
}: { field: FormFieldType; onUpdate: (field: FormFieldType) => void }) {
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
      updated[prop] = value;
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

      {(field.type === "dropdown" || field.type === "radio") && (
        <div className="space-y-3">
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
                      localField.options?.filter((_, i) => i !== index) || [],
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
  field: FormFieldType;
  formField: { value: string; onChange: (value: string) => void };
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
      alert(`Please select a valid file type (${field.acceptedFileTypes})`);
      return;
    }

    // Check file size
    if (field.maxFileSizeMB && file.size > field.maxFileSizeMB * 1024 * 1024) {
      alert(`File size exceeds the maximum limit of ${field.maxFileSizeMB}MB`);
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    formField.onChange(file.name);
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
