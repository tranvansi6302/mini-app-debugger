
import { defineConfig } from 'vite';
import baseConfig from 'file:///D:/playgrounds/365ejsc-build-miniapp/@ejsc-miniapp/my-app/vite.config.ts';

export default defineConfig((env) => {
  const config = typeof baseConfig === 'function' ? baseConfig(env) : baseConfig;
  
  // Force root to the original project directory for HMR to work
  config.root = 'D:/playgrounds/365ejsc-build-miniapp/@ejsc-miniapp/my-app';
  
  // Apply overrides
  if (true) {
    config.server = { ...config.server, ...{"cors":true,"proxy":{"/appConfig.json":"http://0.0.0.0:3000","/miniappConfig.json":"http://0.0.0.0:3000","/tabBar.json":"http://0.0.0.0:3000","/getAppInfo":"http://0.0.0.0:3000","/http":"http://0.0.0.0:3000"}} };
  }
  
  return config;
});
  