import React from 'react';
import {
  Sheet,
  SheetHeader,
  SheetBody,
  Button,
  Text,
  toast
} from 'ejsc-ma-component';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { apisAsync } from 'ejsc-ma-api';

interface CustomImagePickerProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: any) => void;
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({ open, onClose, onSuccess }) => {

  const handleCapture = async () => {
    onClose();
    const res = await apisAsync.captureImage({
      quality: 80
    });

    if (res.success) {
      toast.success('Đã chụp ảnh thành công!');
      if (onSuccess) onSuccess(res.data);
    }
  };

  const handleChooseFromAlbum = async () => {
    onClose();
    const res = await apisAsync.chooseImage({
      sourceType: ['album'],
      count: 1
    });

    if (res.success) {
      toast.success(`Đã chọn ${res.data.tempFilePaths.length} ảnh!`);
      if (onSuccess) onSuccess(res.data);
    }
  };

  return (
    <Sheet open={open} onClose={onClose} layout="inset">
      <SheetHeader className="px-6 py-4" title="Thay đổi ảnh đại diện" onClose={onClose} />
      <SheetBody className="px-6 py-6">
        <div className="flex flex-col gap-3">
          <button
            onClick={handleCapture}
            className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 active:bg-slate-100 transition-colors border border-slate-100 w-full text-left"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Camera size={20} />
            </div>
            <div className="flex flex-col">
              <Text variant="base" weight="bold">Chụp ảnh mới</Text>
              <Text variant="tiny" color="sub">Sử dụng camera của thiết bị</Text>
            </div>
          </button>

          <button
            onClick={handleChooseFromAlbum}
            className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 active:bg-slate-100 transition-colors border border-slate-100 w-full text-left"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <ImageIcon size={20} />
            </div>
            <div className="flex flex-col">
              <Text variant="base" weight="bold">Chọn từ thư viện</Text>
              <Text variant="tiny" color="sub">Chọn ảnh đã có sẵn trong máy</Text>
            </div>
          </button>
        </div>
      </SheetBody>
      <div className="px-6 pb-6">
        <Button theme="neutral" block onClick={onClose} className="rounded-xl">Hủy bỏ</Button>
      </div>
    </Sheet>
  );
};

export default CustomImagePicker;
