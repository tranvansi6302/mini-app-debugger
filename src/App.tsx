import { Router } from 'ejsc-ma-router';
import { NavBarProvider, ToastContainer, GlobalDialog } from 'ejsc-ma-component';
import { useLogRelay } from '~/hooks/useLogRelay';
import { appRouterConfig } from '~/navigation/app-router-config';

import './bridge/mockBridge';
import 'ejsc-ma-component/dist/styles.css';

export interface AppProps {
  devTool?: {
    enableSocketLog?: boolean;
  };
}

export default function App({ devTool }: AppProps = {}) {
  useLogRelay(devTool);

  return (
    <NavBarProvider>
      <Router config={appRouterConfig} />
      <ToastContainer />
      <GlobalDialog />
    </NavBarProvider>
  );
}
