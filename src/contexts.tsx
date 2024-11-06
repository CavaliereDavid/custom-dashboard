import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Layout } from "react-grid-layout";
import TooltipDataZoom from "./components/charts/TooltipDataZoom";
import BasicAreaChart from "./components/charts/BasicAreaChart";
import BasicBarChart from "./components/charts/BasicBarChart";

interface GridContextType {
  layout: Layout[];
  children: ReactNode[];
  addChart: (type: string) => void;
  removeChart: (key: string) => void;
}

const GridContext = createContext<GridContextType | undefined>(undefined);

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGridContext must be used within a GridProvider");
  }
  return context;
};

export const GridProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [layout, setLayout] = useState<Layout[]>([]);
  const [childrenState, setChildrenState] = useState<ReactNode[]>([]);

  const addChart = useCallback(
    (type: string) => {
      const newKey = `${type}-${layout.length}`;
      const newItem = { i: newKey, x: 0, y: Infinity, w: 6, h: 8 };

      let newChart;
      switch (type) {
        case "line":
          newChart = (
            <div key={newKey}>
              <TooltipDataZoom />
            </div>
          );
          break;
        case "area":
          newChart = (
            <div key={newKey}>
              <BasicAreaChart />
            </div>
          );
          break;
        case "bar":
          newChart = (
            <div key={newKey}>
              <BasicBarChart />
            </div>
          );
          break;
        default:
          return;
      }

      setLayout((prevLayout) => [...prevLayout, newItem]);
      setChildrenState((prevChildren) => [...prevChildren, newChart]);
    },
    [layout],
  );

  const removeChart = useCallback((key: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== key));
    setChildrenState((prevChildren) =>
      prevChildren.filter((child) => (child as React.ReactElement).key !== key),
    );
  }, []);

  return (
    <GridContext.Provider
      value={{ layout, children: childrenState, addChart, removeChart }}
    >
      {children}
    </GridContext.Provider>
  );
};

/** DragContext */
interface DragContextType {
  isDraggable: boolean;
  toggleDraggable: () => void;
}

const DragContext = createContext<DragContextType | undefined>(undefined);

export const useDragContext = () => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error("useDragContext must be used within a DragProvider");
  }
  return context;
};

export const DragProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDraggable, setIsDraggable] = useState(false);

  const toggleDraggable = () => {
    setIsDraggable((prev) => !prev);
  };

  return (
    <DragContext.Provider value={{ isDraggable, toggleDraggable }}>
      {children}
    </DragContext.Provider>
  );
};
