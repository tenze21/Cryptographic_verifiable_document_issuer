import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { Outlet } from 'react-router-dom';
import './App.css';
import {config} from './wagmi_config.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Account from './components/Account.jsx';
import WalletOptions from './components/wallet-options.jsx';
import WalletConnectPage from './pages/WalletConnectPage.jsx';


const queryClient= new QueryClient();

function App() {

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <main>
            <Outlet/>
          </main>
        </QueryClientProvider>
      </WagmiProvider>
      <ToastContainer/>
    </>
  )
}

export default App
