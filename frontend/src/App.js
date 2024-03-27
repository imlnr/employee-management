import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './allroutes/MainRoutes';
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <div className="App">
            <MainRoutes />
          </div>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
