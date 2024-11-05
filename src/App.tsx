import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CustomLayout from "./layouts/CustomLayout";
import { DragProvider, GridProvider } from "./contexts";

function App() {
  return (
    <GridProvider>
      <DragProvider>
        <CustomLayout />
      </DragProvider>
    </GridProvider>
  );
}

export default App;
