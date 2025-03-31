import type { FC } from "react";

import type { Form } from "@prisma/client";
import { Link } from "@tanstack/react-router";

import { timeAgo } from "@/utils/format";
import { XIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Paragraph } from "./ui/typography";

interface FormCardProps {
  form: Form;
}

export const FormCard: FC<FormCardProps> = ({ form }) => (
  <Card>
    <CardHeader className="flex flex-row items-start justify-between">
      <div>
        <CardTitle>{form.name}</CardTitle>
        <CardDescription>{form.slug}</CardDescription>
      </div>
      <Button variant="destructive" size="icon">
        <XIcon className="size-4" />
        <span className="sr-only">Delete form</span>
      </Button>
    </CardHeader>
    <CardContent className="flex items-center justify-between">
      <Paragraph>{form.fields.length} fields</Paragraph>

      {!form.isAnswered && (
        <Button asChild variant="outline" size="sm">
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
    </CardContent>

    <CardFooter className="justify-between">
      <Paragraph>Created: {timeAgo(form.createdAt)}</Paragraph>
      <Badge variant={form.isAnswered ? "default" : "warning"}>
        {form.isAnswered ? "Published" : "Draft"}
      </Badge>
    </CardFooter>
  </Card>
);
