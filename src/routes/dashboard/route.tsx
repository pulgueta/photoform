import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Layout,
  beforeLoad: async ({ context }) => {
    console.log(context);

    // if (!context.user) {
    //   throw redirect({
    //     to: "/login",
    //   });
    // }
  },
});

function Layout() {
  return <div>Hello "/dashboard"!</div>;
}
