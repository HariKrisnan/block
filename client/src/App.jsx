import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Navbar from "./components/OurComp/navbar";
import Post from "./components/OurComp/Post";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Navbar />
        </div>
        <div className="centre">
          <Post />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
