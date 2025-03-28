import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { Outlet } from 'react-router-dom';
import './App.css';
import {config} from './wagmi_config.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import {Container} from 'react-bootstrap';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

const queryClient= new QueryClient();

function App() {

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Header/>
          <main>
              <Outlet/>
          </main>
          <Footer/>
        </QueryClientProvider>
      </WagmiProvider>
      <ToastContainer/>
    </>
  )
}

export default App
