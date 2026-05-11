/**
 * @file pages/UiUxScreen.tsx
 * @description Trang trải nghiệm UI/UX chuẩn Master Tokens.
 */
import React, { useState } from 'react';
import {
  Button,
  Sheet,
  SheetHeader,
  SheetBody,
  SheetFooter,
  Modal,
  toast,
  dialog,
  Calendar,
  DatePickerWheel,
  Text,
  Card,
  StandardPage,
  Input,
  Switch,
  Checkbox,
  Badge,
  Avatar,
  Tag,
  Accordion,
  Radio,
  Tabs
} from 'ejsc-ma-component';
import { useForm, Controller } from 'react-hook-form';
import { Settings, Trash2, Send, Plus, Sparkles, Calendar as CalendarIcon, Sliders, Layers, Image as ImageIcon, User, Bell, Mail, Search, CheckCircle2, Circle, LogIn } from 'lucide-react';
import CustomImagePicker from '../components/CustomImagePicker';

const UiUxScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputText, setInputText] = useState('');

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [isCustomPickerOpen, setIsCustomPickerOpen] = useState(false);

  // Interactive States
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('option1');

  const [draftDate, setDraftDate] = useState(new Date());

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Dữ liệu đã được cập nhật!');
  };

  const openWheel = () => {
    setDraftDate(new Date(selectedDate));
    setIsWheelOpen(true);
  };

  const applyWheelDate = () => {
    setSelectedDate(new Date(draftDate));
    setIsWheelOpen(false);
    toast.success(`Đã cập nhật: ${draftDate.toLocaleDateString('vi-VN')}`);
  };

  return (
    <StandardPage
      title="UI/UX Components"
      onRefresh={handleRefresh}
    >
      <div className="flex flex-col gap-6 p-6">
        {/* NÚT BẤM (BUTTONS) */}
        <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 mb-3">
            <Sliders size={16} className="text-indigo-600" />
            <Text variant="base" weight="bold">Buttons</Text>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" theme="brand">Brand</Button>
            <Button size="sm" theme="neutral">Neutral</Button>
            <Button size="sm" theme="danger">Danger</Button>
            <Button size="sm" theme="ghost">Ghost</Button>
          </div>
        </Card>

        {/* CHỌN NGÀY THÁNG */}
        <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 mb-3">
            <CalendarIcon size={16} className="text-indigo-600" />
            <Text variant="base" weight="bold">Date & Time Pickers</Text>
          </div>
          <div className="flex gap-2 mb-3">
            <Button size="sm" theme="brand" className="flex-1" onClick={() => setIsCalendarOpen(true)}>
              Calendar
            </Button>
            <Button size="sm" theme="neutral" className="flex-1" onClick={openWheel}>
              Wheel
            </Button>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-100">
            <Text variant="tiny" className="text-slate-400 block mb-1">Selected Date:</Text>
            <Text variant="caption" weight="bold" className="text-indigo-600">
              {selectedDate.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}
            </Text>
          </div>
        </Card>

        {/* NHẬP LIỆU (DATA ENTRY) */}
        <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <Mail size={16} className="text-indigo-600" />
            <Text variant="base" weight="bold">Data Entry</Text>
          </div>
          <div className="flex flex-col gap-5">
            <Input 
              label="Outlined (Default)" 
              placeholder="Họ và tên" 
              variant="outlined"
            />
            <Input 
              label="Filled Style" 
              placeholder="Nhập địa chỉ..." 
              variant="filled"
              prefix={<Search size={18} />}
            />
            <Input 
              label="Underlined" 
              placeholder="Số điện thoại" 
              variant="underlined"
            />
            <Input 
              label="Pill Shape" 
              placeholder="Tìm kiếm nhanh..." 
              shape="pill"
              variant="filled"
              suffix={<Search size={18} className="mr-2" />}
            />
            <Input 
              label="Multiline (TextArea)" 
              placeholder="Ghi chú thêm về đơn hàng của bạn..." 
              multiline 
              rows={3} 
            />
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex flex-col">
                <Text variant="base" weight="bold">Notifications</Text>
                <Text variant="tiny" color="sub">Enable push notifications</Text>
              </div>
              <Switch checked={isNotificationEnabled} onChange={setIsNotificationEnabled} />
            </div>
            
            <div className="flex flex-col gap-3 p-3 bg-slate-50 rounded-xl">
              <Text variant="tiny" color="sub" weight="bold" className="uppercase">Select Option</Text>
              <div className="flex gap-4">
                <Radio 
                  label="Option 1" 
                  checked={selectedRadio === 'option1'} 
                  onChange={() => setSelectedRadio('option1')} 
                />
                <Radio 
                  label="Option 2" 
                  checked={selectedRadio === 'option2'} 
                  onChange={() => setSelectedRadio('option2')} 
                />
              </div>
            </div>

            <div className="px-1">
              <Checkbox 
                label="I agree to the Terms and Conditions" 
                checked={isAgreed} 
                onChange={setIsAgreed} 
              />
            </div>
          </div>
        </Card>

        {/* HIỂN THỊ (DATA DISPLAY) */}
        <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <User size={16} className="text-indigo-600" />
            <Text variant="base" weight="bold">Data Display</Text>
          </div>
          
          <div className="flex flex-col gap-5">
            {/* Avatars & Badges */}
            <div className="flex items-center gap-6">
              <Badge count={5}>
                <Avatar name="Admin" size="md" />
              </Badge>
              <Badge dot>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="md" />
              </Badge>
              <Avatar name="User Test" size="md" className="bg-indigo-600 text-blue-600" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <Tag theme="brand" variant="solid">Brand</Tag>
              <Tag theme="success">Success</Tag>
              <Tag theme="warning" variant="outline">Warning</Tag>
              <Tag theme="danger" variant="subtle">Danger</Tag>
              <Tag theme="info">Info</Tag>
            </div>
          </div>
        </Card>

        {/* FORM VALIDATION (REACT HOOK FORM) */}
        <RegistrationForm />

        {/* ĐIỀU HƯỚNG TABS */}
        <Card className="p-0 overflow-hidden rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <Tabs 
            items={[
              { 
                key: 'profile', 
                label: 'Profile', 
                children: (
                  <div className="p-5 flex flex-col items-center">
                    <Avatar name="John Doe" size="lg" className="mb-3" />
                    <Text variant="h3" weight="bold">John Doe</Text>
                    <Text variant="sub" color="sub">UX Designer</Text>
                  </div>
                ) 
              },
              { 
                key: 'settings', 
                label: 'Settings', 
                children: (
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <Text variant="base">Dark Mode</Text>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Text variant="base">Public Profile</Text>
                      <Switch checked={true} />
                    </div>
                  </div>
                ) 
              },
              { 
                key: 'extra', 
                label: 'Disabled', 
                disabled: true,
                children: <div className="p-5">Hidden Content</div> 
              }
            ]} 
          />
        </Card>

        {/* LAYOUT (ACCORDION) */}
        <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 mb-4">
            <Layers size={16} className="text-indigo-600" />
            <Text variant="base" weight="bold">Layout & Disclosure</Text>
          </div>
          <div className="flex flex-col gap-2">
            <Accordion title="How to use Master Tokens?">
              Master Tokens là hệ thống biến CSS giúp bạn đồng bộ toàn bộ giao diện từ một nơi duy nhất.
            </Accordion>
            <Accordion title="Is it optimized for WebView?">
              Tất cả component được thiết kế với hiệu suất cao, sử dụng Framer Motion và CSS chuẩn để đảm bảo mượt mà trên 60fps.
            </Accordion>
          </div>
        </Card>

        {/* LỚP PHỦ & THÔNG BÁO */}
        <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)] mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} className="text-indigo-600" />
            <Text variant="base" weight="bold">Overlays & Notifications</Text>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" theme="brand" onClick={() => setIsModalOpen(true)}>Modal</Button>
            <Button size="sm" theme="neutral" onClick={() => setIsSheetOpen(true)}>Sheet</Button>
            <Button size="sm" theme="neutral" onClick={() => toast.success('Success!')}>Success</Button>
            <Button size="sm" theme="danger" onClick={() => dialog.confirm('Are you sure?', 'Confirm')}>Dialog</Button>
          </div>
        </Card>

        {/* CUSTOM UI DEMO */}
        <Card className="p-4 rounded-2xl border-2 border-dashed border-blue-100 bg-blue-50/30 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-blue-600" />
            <Text variant="base" weight="bold" className="text-blue-900">Custom Picker UI (Web)</Text>
          </div>
          <Text variant="caption" color="sub" block className="mb-4">
            Đây là giao diện hoàn toàn bằng React, gọi API Native "nguyên tử" để thực hiện.
          </Text>
          <Button 
            theme="brand" 
            block 
            className="shadow-lg shadow-blue-200"
            onClick={() => setIsCustomPickerOpen(true)}
          >
            Mở Custom Picker
          </Button>
        </Card>
      </div>

      {/* --- OVERLAY INSTANCES --- */}

      <Modal
        open={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        pure
      >
        <Calendar
          value={selectedDate}
          onChange={(d) => {
            setSelectedDate(d);
            setIsCalendarOpen(false);
            toast.success(`Đã chọn: ${d.toLocaleDateString('vi-VN')}`);
          }}
          onClose={() => setIsCalendarOpen(false)}
        />
      </Modal>

      <Sheet
        open={isWheelOpen}
        onClose={() => setIsWheelOpen(false)}
        layout="inset"
      >
        <SheetHeader className="px-6 py-4" title="Chọn ngày tháng" onClose={() => setIsWheelOpen(false)} />
        <SheetBody className="px-6 py-2">
          <div className="py-2">
            <DatePickerWheel
              value={draftDate}
              onChange={setDraftDate}
            />
          </div>
        </SheetBody>
        <SheetFooter className="px-6 py-4">
          <Button theme="brand" block onClick={applyWheelDate}>Áp dụng</Button>
        </SheetFooter>
      </Sheet>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <Text variant="h3" weight="bold" block className="mb-2">Native Modal</Text>
          <Text variant="sub" color="sub" block className="mb-6">Modal đã được cập nhật bo góc chuẩn Master Tokens.</Text>
          <Button theme="brand" block onClick={() => setIsModalOpen(false)}>Đóng</Button>
        </div>
      </Modal>

      <Sheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)} layout="inset">
        <SheetHeader className="px-6 py-4" title="Bottom Sheet" onClose={() => setIsSheetOpen(false)} />
        <SheetBody className="flex flex-col items-center py-10 px-6 gap-4">
          <div className="w-16 h-16 bg-ejsc-brand-light rounded-full flex items-center justify-center text-[28px]">✨</div>
          <Text variant="base" weight="bold" block>Master Tokens</Text>
          <Text variant="caption" color="sub" block className="text-center">Hệ thống bo góc và màu sắc đồng bộ.</Text>
        </SheetBody>
        <SheetFooter className="px-6 py-4">
          <Button theme="neutral" block onClick={() => setIsSheetOpen(false)}>Xong</Button>
        </SheetFooter>
      </Sheet>

      <CustomImagePicker 
        open={isCustomPickerOpen} 
        onClose={() => setIsCustomPickerOpen(false)}
        onSuccess={(data) => {
          console.log('Custom Picker Success:', data);
        }}
      />
    </StandardPage>
  );
};

// --- Sub-components to optimize performance ---

const RegistrationForm: React.FC = React.memo(() => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    }
  });

  const onFormSubmit = (data: any) => {
    console.log('Form Data:', data);
    toast.success(`Welcome, ${data.fullName}!`);
  };

  return (
    <Card className="p-5 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-2 mb-5">
        <LogIn size={16} className="text-indigo-600" />
        <Text variant="base" weight="bold">Form Validation (Hook Form)</Text>
      </div>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
        <Input 
          label="Full Name" 
          placeholder="Enter your name"
          {...register('fullName', { required: 'Họ tên là bắt buộc' })}
          error={errors.fullName?.message}
        />
        
        <Input 
          label="Email" 
          placeholder="example@mail.com"
          prefix={<Mail size={16} />}
          {...register('email', { 
            required: 'Email là bắt buộc',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ"
            }
          })}
          error={errors.email?.message}
        />

        <Input 
          label="Password" 
          type="password"
          placeholder="••••••••"
          {...register('password', { 
            required: 'Mật khẩu là bắt buộc',
            minLength: { value: 6, message: 'Tối thiểu 6 ký tự' }
          })}
          error={errors.password?.message}
        />

        <Button theme="brand" block type="submit" className="mt-2">
          Đăng ký ngay
        </Button>
      </form>
    </Card>
  );
});

export default UiUxScreen;
