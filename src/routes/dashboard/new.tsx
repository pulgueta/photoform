import { useId, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

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

        <div className="flex flex-col gap-2">
          <PreviewDialog fields={fields} />

          {fields.length === 0 ? (
            <div className="col-span-3 rounded-lg border border-dashed p-4 text-center">
              <p className="text-muted-foreground text-sm">
                Start by adding fields from the panel
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
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
