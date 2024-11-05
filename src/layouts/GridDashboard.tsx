import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useDragContext, useGridContext } from "../contexts";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridDashboard: React.FC = () => {
  const { layout, children } = useGridContext();
  const { isDraggable } = useDragContext();

  return (
    <ResponsiveGridLayout
      key={isDraggable ? "draggable" : "non-draggable"} // Force re-render when isDraggable changes
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={30}
      width={1200}
      resizeHandles={["se"]}
      useCSSTransforms={false}
      isDraggable={isDraggable}
      isResizable={isDraggable}
    >
      {children}
    </ResponsiveGridLayout>
  );
};

export default GridDashboard;
