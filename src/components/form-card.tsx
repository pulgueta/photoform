import type { FC } from "react";

import type { Form } from "@prisma/client";

import { timeAgo } from "@/utils/format";
import { Link } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Paragraph } from "./ui/typography";

interface FormCardProps {
  form: Form;
}

export const FormCard: FC<FormCardProps> = ({ form }) => (
  <article className="rounded border p-4">
    <header className="flex items-start justify-between">
      <div>
        <Paragraph variant="body" weight="semibold">
          {form.name}
        </Paragraph>
        <p>{form.slug}</p>
      </div>
      <Button variant="destructive" size="icon">
        <XIcon className="size-4" />
        <span className="sr-only">Delete form</span>
      </Button>
    </header>
    <div className="mt-4 flex items-center justify-between">
      <Paragraph>{form.fields.length} fields</Paragraph>

      {!form.isAnswered && (
        <Button asChild variant="outline">
          <Link
            to="/dashboard/form/$formId"
            params={{
              formId: form.uuid,
            }}
          >
            Edit form
          </Link>
        </Button>
      )}
    </div>
    <footer className="mt-4 border-t pt-2">
      <Paragraph>Created: {timeAgo(form.createdAt)}</Paragraph>
    </footer>
  </article>
);
