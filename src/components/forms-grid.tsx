import type { FC } from "react";

import type { Form } from "@prisma/client";
import { FormCard } from "./form-card";

interface FormsGridProps {
  forms: Form[];
}

export const FormsGrid: FC<FormsGridProps> = ({ forms }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {forms.map((form) => (
        <FormCard key={form.uuid} form={form} />
      ))}
    </div>
  );
};
