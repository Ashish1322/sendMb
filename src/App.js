
import Home from "./components/Home/Home";
import "./App.css"
import FileContextProvider from "./Context";


function App() {
  return (
    <FileContextProvider>
    <div className="App">
      <Home />
    </div>
    </FileContextProvider>
  );
}

export default App;
