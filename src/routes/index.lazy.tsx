import { createLazyFileRoute } from "@tanstack/react-router";
import CustomLayout from "../layouts/CustomLayout";

export const Route = createLazyFileRoute("/")({
  component: CustomLayout,
});
