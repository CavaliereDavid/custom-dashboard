import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import CustomLayout from "../layouts/CustomLayout";
import { DragProvider, GridProvider } from "../contexts";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <GridProvider>
          <DragProvider>
            <CustomLayout>
              <Outlet />
            </CustomLayout>
          </DragProvider>
        </GridProvider>
        <TanStackRouterDevtools />
      </>
    );
  },
});
