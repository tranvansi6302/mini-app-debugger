/**
 * @file screens/LoginScreen.tsx
 * @description Màn hình đăng nhập Mini App.
 */
import React, { useState } from 'react';
import { Button, StandardPage, Text } from 'ejsc-ma-component';
import { ChevronDown, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { useNavigate, Link } from 'ejsc-ma-router';


const LoginScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-x-0 -inset-y-10 bg-white overflow-hidden select-none">
      <StandardPage hideAppBar contentClassName="px-0 pt-0 bg-white" className="bg-white px-0 pt-0">
        <div className="flex flex-col min-h-full bg-white relative">
          {/* Illustration - Không padding top để ảnh tràn sát mép trên */}
          <div className="flex items-center justify-center px-6 pt-0 pb-2 h-[260px] relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-8 z-20 flex items-center justify-center rounded-full backdrop-blur-xs select-none active:scale-95 transition-transform"
              style={{
                top: 'calc(3.5rem + env(safe-area-inset-top, 0px))',
                backgroundColor: 'rgba(0,0,0,0.04)',
                width: '4rem',
                height: '4rem'
              }}
            >
              <ChevronLeft size={24} className="text-ejsc-text-main" />
            </button>
            <img
              src={new URL('../assets/login-icon.png', import.meta.url).href}
              alt="Login illustration"
              className="h-[140px] object-contain"
              style={{ marginTop: '5rem' }}
            />
            {/* Lớp phủ chuyển sắc từ đen mờ ở status bar */}
            <div className="absolute inset-x-0 top-0 h-[70px] bg-linear-to-b from-black/25 to-transparent pointer-events-none" />
          </div>

          {/* Form panel */}
          <div className="relative z-10 bg-white px-8 pb-5 flex flex-col gap-5">
            {/* Tiêu đề */}
            <div className="pt-4">
              <Text variant="h2" weight="bold" block >
                Đăng nhập
              </Text>
              <Text variant="sub" block className="mt-1.5 text-[#8e8e93]">
                Vui lòng nhập thông tin để tiếp tục
              </Text>
            </div>

            {/* Form fields */}
            <div className="flex flex-col gap-4">

              {/* Số điện thoại */}
              <div>
                <Text variant="sub" className="mb-2">
                  Số điện thoại
                </Text>
                <div className="flex overflow-hidden bg-white h-[4.2rem] border border-[#dbe2ea] rounded-ejsc-main">
                  {/* Mã vùng */}
                  <div className="flex shrink-0 select-none items-center gap-1.5 bg-[#f7f7f7] px-4 border-r border-[#dbe2ea]">
                    <img
                      src={new URL('../assets/vietnam-icon.png', import.meta.url).href}
                      alt="VN"
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <span className="text-[#344054] text-ejsc-sub">
                      +84
                    </span>
                    <ChevronDown size={13} className="text-[#98a2b3]" />
                  </div>
                  {/* Input */}
                  <input
                    type="tel"
                    placeholder="365365365"
                    className="w-full h-full bg-transparent outline-none px-[1.4rem] text-ejsc-base  text-ejsc-text-main placeholder:text-[#c0c7d0]"
                  />
                </div>
              </div>

              {/* Mật khẩu */}
              <div>
                <div className="mb-2 flex items-center">
                  <Text variant="sub" >Mật khẩu</Text>
                </div>
                <div className="flex items-center bg-white px-[1.4rem] h-[4.2rem] border border-[#dbe2ea] rounded-ejsc-main">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    className="w-full h-full bg-transparent outline-none text-ejsc-base  text-ejsc-text-main placeholder:text-[#c0c7d0]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="shrink-0 pl-3 text-[#98a2b3]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quên mật khẩu */}
            <div className="-mt-1 flex justify-end">
              <Link to="/forgot-password">
                <Text variant="base" className="text-ejsc-brand font-medium">
                  Quên mật khẩu?
                </Text>
              </Link>
            </div>

            {/* Nút đăng nhập */}
            <Button theme="brand" block className="h-[4.6rem] rounded-full">
              Đăng nhập
            </Button>

            {/* Đăng ký */}
            <div className="text-center">
              <Text variant="base" className="text-[#8e8e93]">
                Chưa có tài khoản?{' '}
                <Link to="/register">
                  <Text variant="base" className="text-ejsc-brand font-medium">
                    Đăng ký ngay
                  </Text>
                </Link>
              </Text>
            </div>


          </div>
        </div>
      </StandardPage>
    </div>
  );
};

export default LoginScreen;
