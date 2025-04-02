import type { FC } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BuilderFormField } from "@/context/form-builder-context";
import { FieldEditor } from "./field-editor";

interface FieldSettingsProps {
  selectedField: BuilderFormField | null;
  handleUpdateField: (field: BuilderFormField) => void;
}

export const FieldSettings: FC<FieldSettingsProps> = ({
  handleUpdateField,
  selectedField,
}) => {
  return (
    <Card className="md:col-span-2 lg:col-span-1 lg:col-start">
      <CardHeader className="p-3 pb-0 sm:p-4">
        <CardTitle className="text-base sm:text-lg">Field Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        {/* biome-ignore lint/style/noNonNullAssertion: Needed */}
        <FieldEditor field={selectedField!} onUpdate={handleUpdateField} />
      </CardContent>
    </Card>
  );
};
