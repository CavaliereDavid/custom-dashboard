import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CustomLayout from "./layouts/CustomLayout";
import { GridProvider } from "./context/Contexts";

function App() {
  return (
    <GridProvider>
      <CustomLayout />
    </GridProvider>
  );
}

export default App;
