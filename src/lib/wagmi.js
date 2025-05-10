// lib/wagmi.ts
import { etherlinkTestnet } from 'wagmi/chains';
import { createConfig, http } from 'wagmi';

export const config = createConfig({
  chains: [etherlinkTestnet],
  transports: {
    [etherlinkTestnet.id]: http(),
  },
  ssr: true,
});