import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './allroutes/MainRoutes';
import { ChakraProvider } from "@chakra-ui/react"
function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <div className="App">
          <MainRoutes />
        </div>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
