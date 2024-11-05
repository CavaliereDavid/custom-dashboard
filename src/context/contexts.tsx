import { createContext, useContext, useState, ReactNode } from "react";
import { Layout } from "react-grid-layout";
import TooltipDataZoom from "../components/charts/TooltipDataZoom";
import { Button } from "antd";
import BasicAreaChart from "../components/charts/BasicAreaChart";
import BasicBarChart from "../components/charts/BasicBarChart";

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

  const addChart = (type: string) => {
    const newKey = `${type}-${layout.length}`;
    const newItem = { i: newKey, x: 0, y: Infinity, w: 6, h: 8 };

    let newChart;
    switch (type) {
      case "line":
        newChart = (
          <div key={newKey}>
            <TooltipDataZoom />
            <Button onClick={() => removeChart(newKey)}>Delete</Button>
          </div>
        );
        break;
      case "area":
        newChart = (
          <div key={newKey}>
            <BasicAreaChart />
            <Button onClick={() => removeChart(newKey)}>Delete</Button>
          </div>
        );
        break;
      case "bar":
        newChart = (
          <div key={newKey}>
            <BasicBarChart />
            <Button onClick={() => removeChart(newKey)}>Delete</Button>
          </div>
        );
        break;
      default:
        return;
    }

    setLayout((prevLayout) => [...prevLayout, newItem]);
    setChildrenState((prevChildren) => [...prevChildren, newChart]);
  };

  const removeChart = (key: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== key));
    setChildrenState((prevChildren) =>
      prevChildren.filter((child) => (child as React.ReactElement).key !== key),
    );
  };

  return (
    <GridContext.Provider
      value={{ layout, children: childrenState, addChart, removeChart }}
    >
      {children}
    </GridContext.Provider>
  );
};
