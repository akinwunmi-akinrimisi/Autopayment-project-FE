// ROUTER
import Router from "../router/Router";
import Auth from "../app/authentication";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  liskSepolia,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: import.meta.env.VITE_APPKIT_PROJECT_ID,
    chains: [liskSepolia, polygon, optimism, arbitrum, base],
    ssr: true, 
  });

const queryClient = new QueryClient();
  


function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
    <div>
      <Router />
      <ToastContainer />
      <Auth />
    </div>
    </RainbowKitProvider>
    </QueryClientProvider>
    </WagmiProvider>
      
     
  );
}

export default App;
