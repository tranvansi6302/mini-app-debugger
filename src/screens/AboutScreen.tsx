/**
 * @file screens/AboutScreen.tsx
 * @description Thông tin ứng dụng — Mini App 01.
 */
import React from 'react';
import { StandardPage, Text, Card } from 'ejsc-ma-component';
import { Info, Cpu, Globe } from 'lucide-react';

const AboutScreen: React.FC = () => {
  return (
    <StandardPage title="Về ứng dụng">
      <div className="flex flex-col gap-4 p-4">
        {/* App Identity */}
        <Card className="rounded-3xl border-none shadow-xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mb-4 text-white font-black text-2xl">
            01
          </div>
          <Text variant="h2" weight="bold" color="white" className="block mb-1">Mini App 01</Text>
          <Text variant="sub" color="white" className="opacity-75 block">my-app-host</Text>
          <div className="mt-3 px-3 py-1 bg-white/20 rounded-lg border border-white/20 inline-flex">
            <Text variant="tiny" color="white" weight="bold">v1.0.0</Text>
          </div>
        </Card>

        {/* Info */}
        <Card className="rounded-2xl border border-slate-100 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <Info size={16} className="text-emerald-600 shrink-0" />
            <div>
              <Text variant="tiny" className="text-slate-400 block">Mô tả</Text>
              <Text variant="sub" className="text-slate-700">Ứng dụng Host Debugger & Bridge API Testing.</Text>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <Cpu size={16} className="text-emerald-600 shrink-0" />
            <div>
              <Text variant="tiny" className="text-slate-400 block">Port dev</Text>
              <Text variant="base" weight="bold" className="text-slate-800">6060</Text>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <Globe size={16} className="text-emerald-600 shrink-0" />
            <div>
              <Text variant="tiny" className="text-slate-400 block">DeepLink ID</Text>
              <Text variant="base" weight="bold" className="text-slate-800 font-mono">mini-app-1</Text>
            </div>
          </div>
        </Card>
      </div>
    </StandardPage>
  );
};

export default AboutScreen;
