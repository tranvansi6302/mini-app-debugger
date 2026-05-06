/**
 * @file screens/ApiScreen.tsx
 * @description Trang kiểm tra các API Native tích hợp.
 */
import React, { useState } from 'react';
import {
  Button,
  Card,
  Text,
  toast,
  StandardPage
} from 'ejsc-ma-component';
import { apisAsync } from 'ejsc-ma-api';
import CustomImagePicker from '../components/CustomImagePicker';
import {
  Zap,
  Bell,
  Share2,
  Box,
  Layout,
  Database,
  Clipboard,
  Image as ImageIcon,
  Globe as GlobeIcon,
  Lock,
  MessageSquare,
  Smartphone,
  Navigation
} from 'lucide-react';
import { API_GROUPS } from '../constants/apiGroups';

const ApiScreen: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, any>>({});
  const [isCustomPickerOpen, setIsCustomPickerOpen] = useState(false);
  const [currentApiId, setCurrentApiId] = useState<string | null>(null);

  const runApi = async (id: string, name: string, fn: () => Promise<any>) => {
    if (id === 'chooseImage') {
      setCurrentApiId(id);
      setIsCustomPickerOpen(true);
      return;
    }

    setLoading(id);
    // Lưu ý: apisAsync giờ đây luôn trả về { success, data } và không bao giờ throw
    const res = await fn();
    console.log(`[API ${name}] Result:`, res);
    setResults(prev => ({ ...prev, [id]: res }));
    
    if (res.success) {
      toast.success(`API ${name} thành công!`);
    } else {
      toast.error(`Lỗi API ${name}: ${res.data?.error || res.data || 'Không rõ lỗi'}`);
    }
    setLoading(null);
  };

  const JsonView = ({ data }: { data: any }) => {
    if (data === undefined || data === null) return null;

    const renderValue = (val: any, level = 0, suffix = ''): React.ReactNode => {
      const indent = level * 16;

      if (val === null) return <span><span className="text-gray-400">null</span>{suffix}</span>;
      
      if (typeof val === 'string') {
        // Phát hiện chuỗi dài hoặc Base64 (thường không có khoảng trắng)
        const isBase64 = val.startsWith('data:') || (val.length > 60 && !val.includes(' '));
        const isLong = val.length > 80;
        
        if (isBase64 || isLong) {
          const displayVal = `${val.substring(0, 30)}...${val.substring(val.length - 10)}`;
          return (
            <span className="text-green-600 italic break-all">
              "{displayVal}" 
              <span className="text-[9px] bg-green-50 px-1 ml-1 rounded text-green-700 not-italic">
                {val.length} chars
              </span>
              <span className="text-slate-500 not-italic">{suffix}</span>
            </span>
          );
        }
        return <span className="text-green-600 break-all">"{val}"<span className="text-slate-500">{suffix}</span></span>;
      }

      if (typeof val === 'number') return <span><span className="text-blue-600">{val}</span><span className="text-slate-500">{suffix}</span></span>;
      if (typeof val === 'boolean') return <span><span className="text-purple-600">{val.toString()}</span><span className="text-slate-500">{suffix}</span></span>;

      if (Array.isArray(val)) {
        if (val.length === 0) return <span>[]{suffix}</span>;
        return (
          <div className="flex flex-col">
            <span>[</span>
            <div style={{ paddingLeft: 10 }}>
              {val.map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-1 min-w-0">{renderValue(item, level + 1, i < val.length - 1 ? ',' : '')}</div>
                </div>
              ))}
            </div>
            <span>]{suffix}</span>
          </div>
        );
      }

      if (typeof val === 'object') {
        const entries = Object.entries(val);
        if (entries.length === 0) return <span>{"{}"}{suffix}</span>;
        return (
          <div className="flex flex-col">
            <span>{"{"}</span>
            <div style={{ paddingLeft: 10 }}>
              {entries.map(([k, v], i) => (
                <div key={k} className="flex items-start">
                  <span className="text-orange-400 shrink-0">"{k}":&nbsp;</span>
                  <div className="flex-1 min-w-0">{renderValue(v, level + 1, i < entries.length - 1 ? ',' : '')}</div>
                </div>
              ))}
            </div>
            <span>{"}"}{suffix}</span>
          </div>
        );
      }

      return <span>{JSON.stringify(val)}{suffix}</span>;
    };

    return (
      <div className="mt-2 p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-300 leading-normal overflow-hidden">
        {renderValue(data)}
      </div>
    );
  };

  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());

  const handleRefresh = async () => {
    await new Promise(r => setTimeout(r, 800));
    setResults({});
    const time = new Date().toLocaleTimeString();
    setLastUpdated(time);
    toast.success(`Đã làm mới dữ liệu lúc ${time}`);
  };

  const getGroupIcon = (name: string) => {
    switch (name) {
      case 'System': return <Smartphone size={16} />;
      case 'Navigation Bar': return <Layout size={16} />;
      case 'Navigation / DeepLink': return <Share2 size={16} />;
      case 'Storage': return <Database size={16} />;
      case 'Clipboard': return <Clipboard size={16} />;
      case 'UI Dialogs': return <Bell size={16} />;
      case 'Media': return <ImageIcon size={16} />;
      case 'Network': return <GlobeIcon size={16} />;
      case 'Auth & User': return <Lock size={16} />;
      case 'Device': return <Navigation size={16} />;
      default: return <Box size={16} />;
    }
  };

  return (
    <StandardPage
      title="Native Bridge APIs"
      onRefresh={handleRefresh}
    >
      <div className="flex flex-col gap-6 p-6">
        {API_GROUPS.map((group, gIdx) => (
          <Card key={gIdx} className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)] mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-red-600">{getGroupIcon(group.name)}</div>
              <Text variant="base" weight="bold">{group.name}</Text>
            </div>
            <div className="flex flex-col">
              {group.apis.map((api, iIdx) => (
                <div
                  key={api.id}
                  className={`flex flex-col py-3 ${iIdx !== group.apis.length - 1 ? 'border-b border-slate-100' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1 flex-1 pr-4">
                      <Text variant="base" weight="semibold">{api.name}</Text>
                      <Text variant="sub" color="sub">{api.desc}</Text>
                    </div>
                    <Button
                      size="sm"
                      theme="neutral"
                      loading={loading === api.id}
                      onClick={() => runApi(api.id, api.name, api.fn)}
                    >
                      Called
                    </Button>
                  </div>
                  {results[api.id] && (
                    <div className="mt-2">
                      <div className={`text-[10px] font-bold uppercase mb-1 ${results[api.id].success ? 'text-green-500' : 'text-red-500'}`}>
                        {results[api.id].success ? 'Standard Response:' : 'Error Response:'}
                      </div>
                      <JsonView data={results[api.id]} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        <div className="h-10" />
      </div>

      <CustomImagePicker 
        open={isCustomPickerOpen}
        onClose={() => setIsCustomPickerOpen(false)}
        onSuccess={(data) => {
          if (currentApiId) {
            setResults(prev => ({ 
              ...prev, 
              [currentApiId]: { success: true, data } 
            }));
          }
        }}
      />
    </StandardPage>
  );
};

export default ApiScreen;
