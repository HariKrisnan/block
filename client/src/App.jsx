import { EthProvider } from "./contexts/EthContext";
import Navbar from "./components/OurComp/navbar";
import Post from "./components/OurComp/Post";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div>
          <Navbar />
        </div>
        <div>
          <Post />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
