import React, {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import TooltipDataZoom from "../components/charts/TooltipDataZoom";
import BasicAreaChart from "../components/charts/BasicAreaChart";
import BasicBarChart from "../components/charts/BasicBarChart";
import { Button } from "antd";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridDashboard = forwardRef<{ addChart: (type: string) => void }, object>(
  (props, ref) => {
    const [layout, setLayout] = useState<Layout[]>([]);
    const [children, setChildren] = useState<React.ReactNode[]>([]);

    const removeChart = useCallback((key: string) => {
      setLayout((prevLayout) => prevLayout.filter((item) => item.i !== key));
      setChildren((prevChildren) =>
        prevChildren.filter(
          (child) => (child as React.ReactElement).key !== key,
        ),
      );
    }, []);

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
        setChildren((prevChildren) => [...prevChildren, newChart]);
      },
      [layout, removeChart],
    );

    useImperativeHandle(ref, () => ({
      addChart,
    }));

    useEffect(() => {
      const savedLayouts = getFromLS("layouts");
      if (savedLayouts) {
        setLayout(savedLayouts);
      }
    }, []);

    const onLayoutChange = (layout: Layout[]) => {
      setLayout(layout);
      saveToLS("layouts", layout);
    };

    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        width={1200}
        resizeHandles={["se"]}
        useCSSTransforms={false}
        onLayoutChange={onLayoutChange}
      >
        {children}
      </ResponsiveGridLayout>
    );
  },
);

function getFromLS(key: string) {
  let ls: { [key: string]: Layout[] } = {};
  if (window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem("rgl-8") || "{}");
    } catch {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key: string, value: Layout[]) {
  if (window.localStorage) {
    window.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      }),
    );
  }
}

export default GridDashboard;
