import { createAPIFileRoute } from "@tanstack/react-start/api";

import { handler } from "@/lib/auth";

export const APIRoute = createAPIFileRoute("/api/auth/$")({
  GET: ({ request }) => {
    return handler(request);
  },
  POST: ({ request }) => {
    return handler(request);
  },
});
