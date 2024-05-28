import RecursiveComponent from "./components/RecursiveComponent";
import { fileTree } from "./data/fileTree";
import ResizablePanel from "./components/ResizablePanel";
import Preview from "./components/Preview";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import WelcomeTab from "./components/WelcomeTab";

const App = () => {
  const { openedFiles } = useSelector((state: RootState) => state.fileTree);
  return (
    <div>
      <ResizablePanel
        leftPanel={
          <div>
            <RecursiveComponent fileTree={fileTree} />
          </div>
        }
        rightPanel={openedFiles.length ? <Preview /> : <WelcomeTab />}
      />
    </div>
  );
};

export default App;
