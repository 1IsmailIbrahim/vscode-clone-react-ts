import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ReactNode } from "react";

interface IProps {
  defaultLayout?: number[] | undefined;
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}
const ResizablePanel = ({
  defaultLayout = [33, 67],
  leftPanel,
  rightPanel,
}: IProps) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };
  return (
    <PanelGroup direction="horizontal" onLayout={onLayout}>
      <Panel defaultSize={defaultLayout[0]} maxSize={60}>
        <div className="w-80 h-screen p-2">{leftPanel}</div>
      </Panel>
      <PanelResizeHandle className="bg-[#ffffff1f] w-[0.5px] cursor-col-resize active:bg-blue-500 hover:bg-blue-500 hover:w-2 duration-200" />
      <Panel defaultSize={defaultLayout[1]}>{rightPanel}</Panel>
    </PanelGroup>
  );
};

export default ResizablePanel;
