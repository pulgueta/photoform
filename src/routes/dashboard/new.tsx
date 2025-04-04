import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { generateSlug } from "random-word-slugs";
import { useState } from "react";
import { toast } from "sonner";

import { BuilderTypes } from "@/components/builder/builder-types";
import { FieldCard } from "@/components/builder/field-card";
import { FieldEditor } from "@/components/builder/field-editor";
import { PreviewDialog } from "@/components/builder/preview-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading, Paragraph } from "@/components/ui/typography";
import type { BuilderFormField } from "@/context/form-builder-context";
import {
  useFormBuilderActions,
  useFormBuilderFields,
} from "@/context/form-builder-context";
import { createForm, createFormFn } from "@/services/form";
import { getUserSubscriptionStatus } from "@/services/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/new")({
  component: FormBuilder,
  loader: async ({ context: { user } }) => {
    const subscription = await getUserSubscriptionStatus({
      data: {
        userId: user?.id,
      },
    });

    return { subscription, userId: user?.id };
  },
  pendingComponent: () => (
    <div className="p-4">
      <Paragraph muted>Loading builder...</Paragraph>
    </div>
  ),
});

function FormBuilder() {
  const [selectedField, setSelectedField] = useState<BuilderFormField | null>(
    null,
  );

  const { subscription, userId } = Route.useLoaderData();
  const navigate = useNavigate();

  const fields = useFormBuilderFields();
  const { updateField, removeField } = useFormBuilderActions();

  const saveMutation = useMutation({
    mutationFn: async ({ isDraft }: { isDraft: boolean }) => {
      if (!userId) {
        throw new Error("You must be logged in to save a form");
      }

      if (fields.length === 0) {
        throw new Error("Please add at least one field to save the form");
      }

      const formData = {
        fields,
        isDraft,
        responses: [],
        name: generateSlug(),
        userId,
        isPublished: !isDraft,
        isAnswered: false,
      };

      const formId = await createFormFn({ data: formData });

      return formId;
    },
    onSuccess: (formId) => {
      toast.success("Form saved successfully");
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSaveForm = async (isDraft: boolean) => {
    saveMutation.mutate({ isDraft });
  };

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
    }
  };

  const handleFieldClick = (field: BuilderFormField) => {
    setSelectedField(field);
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
          fields={fields}
          subscription={subscription}
          setSelectedField={setSelectedField}
        />

        <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
          <div className="flex justify-between gap-2">
            <PreviewDialog fields={fields} />
            <Button
              variant="outline"
              onClick={() => handleSaveForm(true)}
              disabled={fields.length === 0 || saveMutation.isPending}
            >
              Save as draft
            </Button>
          </div>

          {fields.length === 0 ? (
            <div className="col-span-3 rounded-lg border border-dashed p-4 text-center">
              <p className="text-muted-foreground text-sm">
                Start by adding fields from the panel
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {fields.map((field) => (
                <FieldCard
                  key={field.id}
                  field={field}
                  handleDeleteField={handleDeleteField}
                  handleFieldClick={handleFieldClick}
                  selectedField={selectedField}
                />
              ))}
            </div>
          )}
        </div>

        <Card className="col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Field Settings</CardTitle>
            <CardDescription>Select a field to edit</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedField && fields.length > 0 && (
              <FieldEditor field={selectedField} onUpdate={handleUpdateField} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
