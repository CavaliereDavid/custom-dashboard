import { routeTree } from "./routeTree.gen";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
const router = createRouter({ routeTree });
function App() {
  return <RouterProvider router={router} />;
}

export default App;
