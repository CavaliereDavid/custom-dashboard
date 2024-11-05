import { Space, Switch } from "antd";
import { useDragContext } from "../../contexts";

const SwitchComponent = () => {
  const { isDraggable, toggleDraggable } = useDragContext();
  return (
    <Space direction="vertical">
      <Switch
        checkedChildren="Editor"
        unCheckedChildren="Viewer"
        checked={isDraggable}
        onChange={toggleDraggable}
      />
    </Space>
  );
};

export default SwitchComponent;
