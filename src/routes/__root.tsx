import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { GridProvider, DragProvider } from "../contexts";

export const Route = createRootRoute({
  component: () => (
    <>
      <GridProvider>
        <DragProvider>
          <Outlet />
        </DragProvider>
      </GridProvider>
      <TanStackRouterDevtools />
    </>
  ),
});
