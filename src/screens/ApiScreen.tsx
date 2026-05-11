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

  // State quản lý input parameter cho từng API
  const [apiParams, setApiParams] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    API_GROUPS.forEach(group => {
      group.apis.forEach(api => {
        if (api.params) initial[api.id] = "";
      });
    });
    return initial;
  });

  const runApi = async (id: string, name: string, fn: (p?: any) => Promise<any>) => {
    if (id === 'chooseImage' && !apiParams[id]) {
      setCurrentApiId(id);
      setIsCustomPickerOpen(true);
      return;
    }

    setLoading(id);

    // Parse params từ input nếu có
    let paramsObj = undefined;
    if (apiParams[id]) {
      try {
        paramsObj = JSON.parse(apiParams[id]);
      } catch (e) {
        toast.error("JSON không hợp lệ!");
        setLoading(null);
        return;
      }
    }

    const res = await fn(paramsObj);
    console.log(`[API ${name}] Result:`, res);
    setResults(prev => ({ ...prev, [id]: res }));

    if (res.success) {
      toast.success(`API ${name} thành công!`);
    } else {
      toast.error(`Lỗi API ${name}: ${res.data?.error || res.data?.message || res.data || 'Không rõ lỗi'}`);
    }
    setLoading(null);
  };

  const handleParamChange = (id: string, value: string) => {
    setApiParams(prev => ({ ...prev, [id]: value }));
  };

  const fillSuggestion = (id: string, suggestion: string) => {
    handleParamChange(id, suggestion);
    toast.success("Đã nạp giá trị gợi ý");
  };

  const JsonView = ({ data }: { data: any }) => {
    if (data === undefined || data === null) return null;

    const renderValue = (val: any, level = 0, suffix = ''): React.ReactNode => {
      const indent = level * 16;

      if (val === null) return <span><span className="text-gray-400">null</span>{suffix}</span>;

      if (typeof val === 'string') {
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
    const n = name.toLowerCase();
    if (n.includes('system')) return <Smartphone size={16} />;
    if (n.includes('navigation')) return <Share2 size={16} />;
    if (n.includes('storage')) return <Database size={16} />;
    if (n.includes('media')) return <ImageIcon size={16} />;
    if (n.includes('location')) return <Navigation size={16} />;
    return <Box size={16} />;
  };

  return (
    <StandardPage
      title="Bridge Debugger Pro"
      onRefresh={handleRefresh}
    >
      <div className="flex flex-col gap-6 p-6">
        {API_GROUPS.map((group, gIdx) => (
          <Card key={gIdx} className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)] mb-4">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-2">
              <div className="text-indigo-600">{getGroupIcon(group.name)}</div>
              <Text variant="base" weight="bold" className="uppercase tracking-wider text-slate-700">{group.name}</Text>
            </div>
            <div className="flex flex-col gap-4">
              {group.apis.map((api, iIdx) => (
                <div
                  key={api.id}
                  className={`flex flex-col pb-4 ${iIdx !== group.apis.length - 1 ? 'border-b border-slate-50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-col gap-0.5 flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <Text variant="base" weight="semibold" className="text-slate-800">{api.name}</Text>
                        {api.params && (
                          <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full font-bold uppercase">Params</span>
                        )}
                      </div>
                      <Text variant="sub" color="sub" className="text-[11px]">{api.desc}</Text>
                    </div>
                    <Button
                      size="sm"

                      className="rounded-xl px-4 shadow-sm"
                      loading={loading === api.id}
                      onClick={() => runApi(api.id, api.name, api.fn)}
                    >
                      Called
                    </Button>
                  </div>

                  {api.params && (
                    <div className="mt-2 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Input Parameters (JSON)</span>
                        <button
                          onClick={() => fillSuggestion(api.id, api.params!)}
                          className="text-[10px] text-indigo-500 font-bold hover:underline"
                        >
                          Use Suggestion
                        </button>
                      </div>
                      <textarea
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px] text-slate-700 focus:outline-none focus:border-indigo-300 min-h-[60px]"
                        value={apiParams[api.id] || ""}
                        onChange={(e) => handleParamChange(api.id, e.target.value)}
                        placeholder='{"key": "value"}'
                      />
                    </div>
                  )}

                  {results[api.id] && (
                    <div className="mt-3">
                      <div className={`text-[10px] font-bold uppercase mb-1 flex items-center gap-1 ${results[api.id].success ? 'text-green-500' : 'text-red-500'}`}>
                        <Zap size={10} />
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

        <div className="h-20" />
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
