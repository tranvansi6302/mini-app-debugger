import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const devToolConfig = {
  enableSocketLog: true, // Đổi thành false ở đây nếu muốn tắt log socket
};


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App devTool={devToolConfig} />
  </StrictMode>,
)

