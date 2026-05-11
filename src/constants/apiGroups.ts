/**
 * @file constants/apiGroups.ts
 * @description Định nghĩa tất cả các nhóm API cho Bridge API Debugger.
 */

import { apisAsync } from 'ejsc-ma-api';
import type { ApiGroup } from '../types';

export const API_GROUPS: ApiGroup[] = [
  // ── Hệ Thống (System) ──────────────────────────────────────────────────
  {
    name: 'System',
    apis: [
      {
        id: 'getSystemInfo',
        name: 'getSystemInfo',
        desc: 'Thông tin thiết thiết bị & hệ điều hành.',
        fn: () => apisAsync.getSystemInfo(),
      },
      {
        id: 'getAppLanguage',
        name: 'getAppLanguage',
        desc: 'Lấy ngôn ngữ hiện tại của ứng dụng.',
        fn: (p: any) => (window as any).ejsc.getAppLanguage(p),
      },
      {
        id: 'exitMiniApp',
        name: 'exitMiniApp',
        desc: 'Thoát Mini App.',
        fn: () => apisAsync.exitMiniApp(),
      },
      {
        id: 'confirmBeforeExit',
        name: 'confirmBeforeExit',
        desc: 'Xác nhận trước khi thoát.',
        params: JSON.stringify({ enable: true, message: 'Lưu thay đổi trước khi thoát?' }, null, 2),
        fn: (p) => apisAsync.confirmBeforeExit(p),
      },
      {
        id: 'triggerHapticFeedback',
        name: 'hapticFeedback',
        desc: 'Rung phản hồi (success/error/heavy).',
        params: JSON.stringify({ style: 'success' }, null, 2),
        fn: (p) => apisAsync.triggerHapticFeedback(p),
      },
    ],
  },

  // ── Giao Diện & Thông Báo (UI & Dialogs) ────────────────────────────────
  {
    name: 'UI & Dialogs',
    apis: [
      {
        id: 'setNavigationBar',
        name: 'setNavigationBar',
        desc: 'Tùy chỉnh thanh điều hướng.',
        params: JSON.stringify({ title: 'Mini App Pro', backgroundColor: '#5856d6', frontColor: '#ffffff' }, null, 2),
        fn: (p) => apisAsync.setNavigationBar(p),
      },
      {
        id: 'showToast',
        name: 'showToast',
        desc: 'Thông báo Toast.',
        params: JSON.stringify({ content: 'Thành công!', type: 'success', duration: 3000 }, null, 2),
        fn: (p) => apisAsync.showToast(p),
      },
      {
        id: 'alert',
        name: 'alert',
        desc: 'Hộp thoại thông báo.',
        params: JSON.stringify({ title: 'Bridge Test', content: 'Nội dung thông báo' }, null, 2),
        fn: (p) => apisAsync.alert(p),
      },
      {
        id: 'confirm',
        name: 'confirm',
        desc: 'Hộp thoại xác nhận.',
        params: JSON.stringify({ title: 'Xác nhận', content: 'Bạn có chắc chắn?', confirmButtonText: 'Có', cancelButtonText: 'Không' }, null, 2),
        fn: (p) => apisAsync.confirm(p),
      },
      {
        id: 'prompt',
        name: 'prompt',
        desc: 'Hộp thoại nhập liệu.',
        params: JSON.stringify({ title: 'Nhập tên', placeholder: 'Họ và tên...', okButtonText: 'Gửi' }, null, 2),
        fn: (p) => apisAsync.prompt(p),
      },
      {
        id: 'showActionSheet',
        name: 'showActionSheet',
        desc: 'Menu lựa chọn.',
        params: JSON.stringify({ title: 'Chọn ảnh', items: ['Máy ảnh', 'Thư viện'], destructiveBtnIndex: 1 }, null, 2),
        fn: (p) => apisAsync.showActionSheet(p),
      },
      {
        id: 'showLoading',
        name: 'showLoading / hideLoading',
        desc: 'Hiện spinner trong 2 giây.',
        fn: async () => {
          await apisAsync.showLoading({ content: 'Đang tải...' });
          await new Promise(r => setTimeout(r, 2000));
          return apisAsync.hideLoading();
        },
      },
    ],
  },

  // ── Điều Hướng & Liên Kết (Navigation) ──────────────────────────────────
  {
    name: 'Navigation & Links',
    apis: [
      {
        id: 'openDeeplink',
        name: 'openDeeplink',
        desc: 'Mở link nội bộ Super App.',
        params: JSON.stringify({ url: 'ejsc://home', title: 'Trang chủ' }, null, 2),
        fn: (p) => apisAsync.openDeeplink(p),
      },
      {
        id: 'openPublicDeepLink',
        name: 'openPublicDeepLink',
        desc: 'Mở URL bằng browser máy.',
        params: JSON.stringify({ url: 'https://google.com' }, null, 2),
        fn: (p) => apisAsync.openPublicDeepLink(p),
      },
      {
        id: 'shareApp',
        name: 'shareApp',
        desc: 'Chia sẻ Mini App.',
        params: JSON.stringify({ title: 'EJSC App', desc: 'Thử ngay!', url: 'https://ejsc.vn' }, null, 2),
        fn: (p) => apisAsync.shareApp(p),
      },
      {
        id: 'openNativeStore',
        name: 'openNativeStore',
        desc: 'Mở App Store / Play Store.',
        params: JSON.stringify({ appleStoreId: '123', googlePlayId: 'com.ejsc' }, null, 2),
        fn: (p) => apisAsync.openNativeStore(p),
      },
      {
        id: 'openInAppBrowser',
        name: 'openInAppBrowser',
        desc: 'Mở trình duyệt trong app.',
        params: JSON.stringify({ url: 'https://365teams.vn' }, null, 2),
        fn: (p) => apisAsync.openInAppBrowser(p),
      },
    ],
  },

  // ── Dữ Liệu & Bộ Nhớ (Storage) ─────────────────────────────────────────
  {
    name: 'Storage & Data',
    apis: [
      {
        id: 'setStorage',
        name: 'setStorage',
        desc: 'Lưu dữ liệu thường.',
        params: JSON.stringify({ key: 'test', data: 'Hello' }, null, 2),
        fn: (p) => apisAsync.setStorage(p),
      },
      {
        id: 'getStorage',
        name: 'getStorage',
        desc: 'Đọc dữ liệu thường.',
        params: JSON.stringify({ key: 'test' }, null, 2),
        fn: (p) => apisAsync.getStorage(p),
      },
      {
        id: 'removeStorage',
        name: 'removeStorage',
        desc: 'Xóa một key.',
        params: JSON.stringify({ key: 'test' }, null, 2),
        fn: (p) => apisAsync.removeStorage(p),
      },
      {
        id: 'clearStorage',
        name: 'clearStorage',
        desc: 'Xóa toàn bộ storage.',
        fn: () => apisAsync.clearStorage(),
      },
      {
        id: 'setSecureStorage',
        name: 'setSecureStorage',
        desc: 'Lưu vào vùng bảo mật.',
        params: JSON.stringify({ key: 'token', data: 'secret_123' }, null, 2),
        fn: (p) => apisAsync.setSecureStorage(p),
      },
      {
        id: 'getSecureStorage',
        name: 'getSecureStorage',
        desc: 'Đọc từ vùng bảo mật.',
        params: JSON.stringify({ key: 'token' }, null, 2),
        fn: (p) => apisAsync.getSecureStorage(p),
      },
      {
        id: 'getStorageInfo',
        name: 'getStorageInfo',
        desc: 'Thống kê bộ nhớ.',
        fn: () => apisAsync.getStorageInfo(),
      },
    ],
  },

  // ── Đa Phương Tiện & Mạng (Media) ──────────────────────────────────────
  {
    name: 'Media & Network',
    apis: [
      {
        id: 'chooseImage',
        name: 'chooseImage',
        desc: 'Chọn ảnh từ máy.',
        params: JSON.stringify({ count: 1, sourceType: ['album', 'camera'] }, null, 2),
        fn: (p) => apisAsync.chooseImage(p),
      },
      {
        id: 'chooseMedia',
        name: 'chooseMedia',
        desc: 'Chọn ảnh hoặc video.',
        params: JSON.stringify({ count: 1, mediaType: ['image', 'video'] }, null, 2),
        fn: (p) => apisAsync.chooseMedia(p),
      },
      {
        id: 'captureImage',
        name: 'captureImage',
        desc: 'Chụp ảnh trực tiếp.',
        fn: () => apisAsync.captureImage(),
      },
      {
        id: 'previewImage',
        name: 'previewImage',
        desc: 'Xem ảnh full screen.',
        params: JSON.stringify({ urls: ['https://picsum.photos/800/1200'], current: 0 }, null, 2),
        fn: (p) => apisAsync.previewImage(p),
      },
      {
        id: 'saveImage',
        name: 'saveImage',
        desc: 'Lưu ảnh vào máy.',
        params: JSON.stringify({ url: 'https://picsum.photos/400' }, null, 2),
        fn: (p) => apisAsync.saveImage(p),
      },
      {
        id: 'request',
        name: 'request',
        desc: 'Gọi HTTP GET.',
        params: JSON.stringify({ url: 'https://jsonplaceholder.typicode.com/todos/1', method: 'GET' }, null, 2),
        fn: (p) => apisAsync.request(p),
      },
      {
        id: 'downloadFile',
        name: 'downloadFile',
        desc: 'Tải file về máy.',
        params: JSON.stringify({ url: 'https://picsum.photos/400' }, null, 2),
        fn: (p) => apisAsync.downloadFile(p),
      },
    ],
  },

  // ── Định Vị & Thiết Bị (Location) ──────────────────────────────────────
  {
    name: 'Location & Device',
    apis: [
      {
        id: 'getLocation',
        name: 'getLocation',
        desc: 'Tọa độ GPS hiện tại.',
        params: JSON.stringify({ type: 1 }, null, 2),
        fn: (p) => apisAsync.getLocation(p),
      },
      {
        id: 'getUserLocation',
        name: 'getUserLocation',
        desc: 'Tọa độ & Địa chỉ chi tiết.',
        params: JSON.stringify({ enableHighAccuracy: true }, null, 2),
        fn: (p) => apisAsync.getUserLocation(p),
      },
      {
        id: 'openNativeMap',
        name: 'openNativeMap',
        desc: 'Mở Google/Apple Maps.',
        params: JSON.stringify({ lat: 21.0285, lng: 105.8542, label: 'Hà Nội' }, null, 2),
        fn: (p) => apisAsync.openNativeMap(p),
      },
      {
        id: 'scan',
        name: 'scanQR',
        desc: 'Quét mã QR.',
        fn: () => apisAsync.scan(),
      },
      {
        id: 'bioMetrics',
        name: 'bioMetrics',
        desc: 'Vân tay / FaceID.',
        params: JSON.stringify({ content: 'Xác thực' }, null, 2),
        fn: (p) => apisAsync.bioMetrics.localAuth(p),
      },
      {
        id: 'makePhoneCall',
        name: 'makePhoneCall',
        desc: 'Gọi điện thoại.',
        params: JSON.stringify({ number: '19001234' }, null, 2),
        fn: (p) => apisAsync.makePhoneCall(p),
      },
      {
        id: 'setClipboard',
        name: 'setClipboard',
        desc: 'Copy văn bản.',
        params: JSON.stringify({ text: 'Hello EJSC' }, null, 2),
        fn: (p) => apisAsync.setClipboard(p),
      },
      {
        id: 'getClipboard',
        name: 'getClipboard',
        desc: 'Dán văn bản.',
        fn: () => apisAsync.getClipboard(),
      },
    ],
  },

  // ── Tài Khoản & Quyền (Auth) ──────────────────────────────────────────
  {
    name: 'Auth & Permissions',
    apis: [
      {
        id: 'getUserInfo',
        name: 'getUserInfo',
        desc: 'Thông tin người dùng.',
        fn: () => apisAsync.getUserInfo(),
      },
      {
        id: 'getSetting',
        name: 'getSetting',
        desc: 'Kiểm tra các quyền đã cấp.',
        fn: () => apisAsync.getSetting(),
      },
      {
        id: 'authorize',
        name: 'authorize',
        desc: 'Yêu cầu cấp quyền.',
        params: JSON.stringify({ scope: 'scope.camera' }, null, 2),
        fn: (p) => apisAsync.authorize(p),
      },
      {
        id: 'openSetting',
        name: 'openSetting',
        desc: 'Mở trang cài đặt quyền.',
        fn: () => apisAsync.openSetting(),
      },
      {
        id: 'openAppSetting',
        name: 'openAppSetting',
        desc: 'Mở cài đặt hệ thống.',
        fn: () => apisAsync.openAppSetting(),
      },
    ],
  },
];
