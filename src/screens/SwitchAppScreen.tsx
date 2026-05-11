import React from 'react';
import {
  Button,
  Card,
  StandardPage,
  Text,
  Avatar,
  Badge,
} from 'ejsc-ma-component';
import { ChevronRight, Rocket, ArrowRightLeft } from 'lucide-react';
import { apisAsync } from 'ejsc-ma-api';

const SwitchAppScreen: React.FC = () => {
  const targetApp = {
    id: 'mini-app-2',
    name: 'Mini App 2',
    description: 'Ứng dụng demo số 2 - Trang chủ',
    iconUrl: 'https://via.placeholder.com/64/1A73E8/FFFFFF?text=M1',
    version: '1.0.0',
    permissions: ['location', 'camera']
  };

  const handleOpenApp = async () => {
    try {
      if ((window as any).ejsc?.openDeeplink) {
        await (window as any).ejsc.openDeeplink({
          url: `ejsc://mini-apps/${targetApp.id}`,
          title: targetApp.name
        });
      } else {
        console.warn('Bridge openDeeplink not found');
      }
    } catch (e) {
      console.error('Failed to open app:', e);
    }
  };

  return (
    <StandardPage title="Chuyển đổi App" hideAppBar className="bg-slate-50">
      <div className="flex flex-col gap-6 p-6">
        <header className="flex flex-col items-center py-8">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-[2rem] bg-white shadow-xl flex items-center justify-center p-1 overflow-hidden border-4 border-white">
              <img src={targetApp.iconUrl} alt={targetApp.name} className="w-full h-full rounded-[1.8rem] object-cover" />
            </div>
            <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white border-4 border-slate-50 shadow-lg">
              <ArrowRightLeft size={18} />
            </div>
          </div>
          <Text variant="h2" weight="bold" className="mb-1 text-slate-900">{targetApp.name}</Text>
          <Badge theme="brand" variant="subtle" className="px-3 py-1">Version {targetApp.version}</Badge>
        </header>

        <Card className="p-6 rounded-[2.5rem] border-none shadow-[0_20px_50px_rgba(15,23,42,0.08)] bg-white">
          <Text variant="base" weight="bold" className="mb-4 block text-slate-800">Thông tin ứng dụng đích</Text>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <Text variant="sub" color="sub" block className="mb-1">Mô tả</Text>
              <Text variant="base" className="text-slate-700 leading-relaxed">
                {targetApp.description}
              </Text>
            </div>
            
            <div>
              <Text variant="sub" color="sub" block className="mb-2 px-1">Quyền hạn yêu cầu</Text>
              <div className="flex flex-wrap gap-2">
                {targetApp.permissions.map(p => (
                  <div key={p} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-[12px] font-bold border border-blue-100 uppercase tracking-wider">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button 
            theme="brand" 
            block 
            size="lg" 
            className="mt-8 h-16 rounded-2xl shadow-lg shadow-blue-200 font-bold text-lg"
            onClick={handleOpenApp}
            endIcon={<ChevronRight size={20} />}
          >
            Mở Mini App 2
          </Button>
        </Card>

        <section className="mt-4 px-2">
          <div className="flex items-center gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <Rocket size={20} />
            </div>
            <div className="flex-1">
              <Text variant="caption" weight="bold" className="text-indigo-900 block">DeepLink Navigation</Text>
              <Text variant="tiny" className="text-indigo-700/70">Tự động chuyển đổi giữa các module Mini App trong hệ thống.</Text>
            </div>
          </div>
        </section>
      </div>
    </StandardPage>
  );
};

export default SwitchAppScreen;
