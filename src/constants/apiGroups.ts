/**
 * @file constants/apiGroups.ts
 * @description Định nghĩa tất cả các nhóm API và entries cho Bridge API Debugger.
 * Tách dữ liệu ra khỏi UI component để dễ bảo trì và mở rộng.
 *
 * Để thêm API mới:
 *   1. Chọn nhóm phù hợp hoặc tạo nhóm mới.
 *   2. Thêm một object `ApiEntry` vào mảng `apis` của nhóm.
 */

import { apisAsync } from 'ejsc-ma-api';
import type { ApiGroup } from '../types';

/** Tất cả nhóm API hiển thị trong Bridge API Debugger */
export const API_GROUPS: ApiGroup[] = [
  // ── System ────────────────────────────────────────────────────────────
  {
    name: 'System',
    apis: [
      {
        id: 'getSystemInfo',
        name: 'getSystemInfo',
        desc: 'Thông tin phần cứng & hệ điều hành.',
        fn: () => apisAsync.getSystemInfo(),
      },
      {
        id: 'exitMiniApp',
        name: 'exitMiniApp',
        desc: 'Thoát Mini App về Super App.',
        fn: () => apisAsync.exitMiniApp(),
      },
      {
        id: 'confirmBeforeExit',
        name: 'confirmBeforeExit',
        desc: 'Hiển thị xác nhận trước khi thoát.',
        fn: () => apisAsync.confirmBeforeExit({ enable: true, message: 'Lưu thay đổi trước khi thoát?' }),
      },
    ],
  },

  // ── Navigation Bar ───────────────────────────────────────────────────────
  {
    name: 'Navigation Bar',
    apis: [
      {
        id: 'setNavigationBar',
        name: 'setNavigationBar',
        desc: 'Tùy chỉnh tiêu đề & màu sắc thanh điều hướng.',
        fn: () => apisAsync.setNavigationBar({ title: 'Mini App Pro', titleBarColor: '#5856d6' }),
      },
    ],
  },

  // ── Navigation / DeepLink ────────────────────────────────────────────────
  {
    name: 'Navigation / DeepLink',
    apis: [
      {
        id: 'openDeeplink',
        name: 'openDeeplink',
        desc: 'Mở màn hình nội bộ của Super App.',
        fn: () => apisAsync.openDeeplink({
          url: 'ejsc://home',
          title: '[WebView] Trang Chủ Hệ Thống',
          description: '[WebView] Chào mừng bạn quay lại màn hình điều khiển trung tâm.'
        }),
      },
      {
        id: 'openPublicDeepLink',
        name: 'openPublicDeepLink',
        desc: 'Mở URL công khai trong browser hoặc app.',
        fn: () => apisAsync.openPublicDeepLink({ url: 'https://www.google.com' }),
      },
      {
        id: 'shareApp',
        name: 'shareApp',
        desc: 'Chia sẻ ứng dụng qua hệ thống share sheet.',
        fn: () =>
          apisAsync.shareApp({
            title: '[WebView] EJSC App',
            desc: '[WebView] Thử Mini App xịn này đi!',
            url: 'https://picsum.photos/200',
            path: 'https://picsum.photos/200'
          }),
      },
      {
        id: 'openNativeStore',
        name: 'openNativeStore',
        desc: 'Mở trang ứng dụng trên App Store / Play Store.',
        fn: () =>
          apisAsync.openNativeStore({
            appleStoreId: '123456789',
            googlePlayId: 'com.ejsc.app',
          }),
      },
    ],
  },

  // ── Storage ──────────────────────────────────────────────────────────────
  {
    name: 'Storage',
    apis: [
      {
        id: 'setStorage',
        name: 'setStorage',
        desc: 'Lưu dữ liệu mẫu với key "test_key".',
        fn: () => apisAsync.setStorage({ key: 'test_key', data: 'Dữ liệu mẫu từ Mini App' }),
      },
      {
        id: 'getStorage',
        name: 'getStorage',
        desc: 'Đọc dữ liệu với key "test_key".',
        fn: () => apisAsync.getStorage({ key: 'test_key' }),
      },
      {
        id: 'removeStorage',
        name: 'removeStorage',
        desc: 'Xóa key "test_key" khỏi storage.',
        fn: () => apisAsync.removeStorage({ key: 'test_key' }),
      },
      {
        id: 'clearStorage',
        name: 'clearStorage',
        desc: 'Xóa toàn bộ dữ liệu storage của Mini App.',
        fn: () => apisAsync.clearStorage(),
      },
      {
        id: 'getStorageInfo',
        name: 'getStorageInfo',
        desc: 'Xem danh sách keys & dung lượng đã dùng.',
        fn: () => apisAsync.getStorageInfo(),
      },
    ],
  },

  // ── Clipboard ────────────────────────────────────────────────────────────
  {
    name: 'Clipboard',
    apis: [
      {
        id: 'setClipboard',
        name: 'setClipboard',
        desc: 'Copy văn bản vào clipboard của hệ thống.',
        fn: () => apisAsync.setClipboard({ text: 'Hello from EJSC Mini App!' }),
      },
      {
        id: 'getClipboard',
        name: 'getClipboard',
        desc: 'Đọc nội dung hiện tại từ clipboard.',
        fn: () => apisAsync.getClipboard(),
      },
    ],
  },

  // ── UI Dialogs ───────────────────────────────────────────────────────────
  {
    name: 'UI Dialogs',
    apis: [
      {
        id: 'showToast',
        name: '[WebView] showToast',
        desc: 'Hiển thị thông báo Toast.',
        fn: () => apisAsync.showToast({
          content: '[WebView] Thông báo quan trọng!',
          type: 'success',
          position: 'top',
          duration: 3000
        }),
      },
      {
        id: 'alert',
        name: 'alert',
        desc: 'Hộp thoại thông báo với một nút OK.',
        fn: () =>
          apisAsync.alert({ title: '[WebView] Bridge Debugger', content: '[WebView] Đây là thông báo từ Native Bridge!' }),
      },
      {
        id: 'confirm',
        name: 'confirm',
        desc: 'Hộp thoại xác nhận với hai nút Có/Không.',
        fn: () =>
          apisAsync.confirm({ content: '[WebView] Bạn có chắc chắn muốn thực hiện hành động này?', title: '[WebView] Xác nhận', confirmButtonText: '[WebView] Có', cancelButtonText: '[WebView] Không' }),
      },
      {
        id: 'prompt',
        name: 'prompt',
        desc: 'Hộp thoại nhập liệu văn bản từ người dùng.',
        fn: () => apisAsync.prompt({ title: '[WebView] Nhập tên của bạn', placeholder: 'Tên...', okButtonText: '[WebView] Có', cancelButtonText: '[WebView] Không' }),
      },
      {
        id: 'showActionSheet',
        name: 'showActionSheet',
        desc: 'Menu lựa chọn trượt lên từ dưới màn hình.',
        fn: () =>
          apisAsync.showActionSheet({
            title: '[WebView] Chọn hành động',
            items: ['[WebView] Chụp ảnh', '[WebView] Chọn từ thư viện', '[WebView] Xóa ảnh'],
            destructiveBtnIndex: 2,
          }),
      },
      {
        id: 'showLoading',
        name: 'showLoading / hideLoading',
        desc: 'Hiện loading spinner trong 2 giây rồi tự đóng.',
        fn: async () => {
          await apisAsync.showLoading({ content: 'Đang xử lý...' });
          await new Promise((r) => setTimeout(r, 2000));
          return apisAsync.hideLoading();
        },
      },
      {
        id: 'callbackTest',
        name: 'Callback Pattern Test',
        desc: 'Test gọi API với success, fail và complete callbacks.',
        fn: () => {
          return new Promise((resolve) => {
            apisAsync.alert({
              title: 'Callback Test',
              content: 'Vui lòng nhấn OK để test callback.',
              success: (data) => console.log('✅ Success callback triggered with:', data),
              fail: (err) => console.log('❌ Fail callback triggered with:', err),
              complete: (res) => {
                console.log('🏁 Complete callback triggered with:', res);
                resolve({ success: true, data: { info: 'Check console for callback logs', ...res } });
              }
            });
          });
        },
      },
    ],
  },

  // ── Media ────────────────────────────────────────────────────────────────
  {
    name: 'Media',
    apis: [
      {
        id: 'chooseImage',
        name: '[WebView] chooseImage',
        desc: 'Chọn hoặc chụp ảnh từ điện thoại.',
        fn: () => apisAsync.chooseImage({
          count: 1,
          sourceType: ['camera', 'album'],
          title: '[WebView] Cập nhật ảnh đại diện',
          fontSize: 13,
          cancelText: '[WebView] Đóng'
        }),
      },
      {
        id: 'chooseMedia',
        name: 'chooseMedia',
        desc: 'Chọn ảnh hoặc video từ bộ nhớ thiết bị.',
        fn: () => apisAsync.chooseMedia({ count: 9, mediaType: ['image', 'video'], albumText: "[WebView] Chọn từ thư viện", cameraText: "[WebView] Chụp ảnh" }),
      },
      {
        id: 'previewImage',
        name: '[WebView] previewImage',
        desc: 'Xem ảnh toàn màn hình.',
        fn: () => apisAsync.previewImage({
          urls: [
            'https://picsum.photos/800/1200',
            'https://picsum.photos/1200/800'
          ],
          current: 0,
          title: '[WebView] Album Ảnh Sự Kiện'
        }),
      },
      {
        id: 'saveImage',
        name: 'saveImage',
        desc: 'Tải và lưu ảnh mẫu vào thư viện thiết bị.',
        fn: () => apisAsync.saveImage({ url: 'https://picsum.photos/800/600' }),
      },
      {
        id: 'compressImage',
        name: 'compressImage',
        desc: 'Nén ảnh với chất lượng 50% (test với path giả lập).',
        fn: () =>
          apisAsync.compressImage({
            filePaths: ['/test/path.jpg'],
            options: { quality: 50 },
          }),
      },
    ],
  },

  // ── Network ──────────────────────────────────────────────────────────────
  {
    name: 'Network',
    apis: [
      {
        id: 'request',
        name: 'request',
        desc: 'Gọi HTTP GET API mẫu từ JSONPlaceholder.',
        fn: () =>
          apisAsync.request({
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            method: 'GET',
          }),
      },
      {
        id: 'downloadFile',
        name: 'downloadFile',
        desc: 'Tải file từ internet về bộ nhớ thiết bị.',
        fn: () =>
          apisAsync.downloadFile({
            url: 'https://raw.githubusercontent.com/flutter/website/master/src/images/flutter-logo-sharing.png',
          }),
      },
    ],
  },

  // ── Auth & User ──────────────────────────────────────────────────────────
  {
    name: 'Auth & User',
    apis: [
      {
        id: 'getSetting',
        name: 'getSetting',
        desc: 'Kiểm tra trạng thái các quyền hiện tại.',
        fn: () => apisAsync.getSetting(),
      },
      {
        id: 'authorize',
        name: 'authorize',
        desc: 'Hiện popup yêu cầu cấp quyền camera.',
        fn: () => apisAsync.authorize({ scope: 'scope.camera' }),
      },
      {
        id: 'openSetting',
        name: 'openSetting',
        desc: 'Mở trang cài đặt quyền của Mini App.',
        fn: () => apisAsync.openSetting(),
      },
      {
        id: 'openAppSetting',
        name: 'openAppSetting',
        desc: 'Mở cài đặt ứng dụng trong hệ thống (Android/iOS).',
        fn: () => apisAsync.openAppSetting(),
      },
      {
        id: 'getUserInfo',
        name: 'getUserInfo',
        desc: 'Lấy thông tin hồ sơ người dùng đăng nhập.',
        fn: () => apisAsync.getUserInfo(),
      },
      {
        id: 'getAuthCode',
        name: 'getAuthCode',
        desc: 'Lấy mã xác thực OAuth từ Super App.',
        fn: () => apisAsync.getAuthCode(),
      },
      {
        id: 'bioMetrics',
        name: 'bioMetrics.localAuth',
        desc: 'Xác thực vân tay hoặc khuôn mặt (Face ID).',
        fn: () => apisAsync.bioMetrics.localAuth({
          content: '[WebView] Xác thực để tiếp tục',
          title: '[WebView] Xác nhận Vân tay',
          hint: '[WebView] Vui lòng quét vân tay của bạn',
          cancelText: '[WebView] Để sau'
        }),
      },
    ],
  },

  // ── Device ───────────────────────────────────────────────────────────────
  {
    name: 'Device',
    apis: [
      {
        id: 'getLocation',
        name: '[WebView] getLocation',
        desc: 'Lấy tọa độ GPS (latitude, longitude) hiện tại.',
        fn: () => apisAsync.getLocation({ type: 1 }),
      },
      {
        id: 'scan',
        name: 'scanQR',
        desc: 'Mở camera để quét mã QR hoặc barcode.',
        fn: () => apisAsync.scan({ title: '[WebView] Quét mã QR của bạn' }),
      },
      {
        id: 'makePhoneCall',
        name: '[WebView] makePhoneCall',
        desc: 'Mở ứng dụng gọi điện với số hotline 19001234.',
        fn: () => apisAsync.makePhoneCall({ number: '19001234' }),
      },
      {
        id: 'choosePhoneContact',
        name: 'choosePhoneContact',
        desc: 'Mở danh bạ để người dùng chọn một liên hệ.',
        fn: () => apisAsync.choosePhoneContact(),
      },
      {
        id: 'addCalendarEvent',
        name: '[WebView] addCalendarEvent',
        desc: 'Thêm sự kiện vào lịch điện thoại.',
        fn: () => {
          const now = new Date();
          const later = new Date(now.getTime() + 60 * 60 * 1000);
          return apisAsync.addCalendarEvent({
            title: '[WebView] Họp dự án EJSC',
            description: '[WebView] Thảo luận về lộ trình phát triển quý 2.',
            location: '[WebView] Văn phòng 365Teams',
            startDate: now.toISOString(),
            endDate: later.toISOString(),
            allDay: false
          });
        },
      },
    ],
  },
  // ── Navigation & UI ──────────────────────────────────────────────────────
  {
    name: 'Navigation & UI',
    apis: [
      {
        id: 'setNavTitle',
        name: 'setNavigationBar (Title)',
        desc: 'Đổi tiêu đề thanh điều hướng.',
        fn: () => apisAsync.setNavigationBar({ title: 'Mini App New Title' }),
      },
      {
        id: 'setNavColor',
        name: 'setNavigationBar (Color)',
        desc: 'Đổi màu nền và màu chữ.',
        fn: () => apisAsync.setNavigationBar({
          backgroundColor: '#F4A261',
          frontColor: '#ffffff'
        }),
      },
      {
        id: 'hideNav',
        name: 'setNavigationBar (Hide)',
        desc: 'Ẩn thanh tiêu đề (Full screen).',
        fn: () => apisAsync.setNavigationBar({ visible: false, immersive: true }),
      },
      {
        id: 'showNav',
        name: 'setNavigationBar (Show)',
        desc: 'Hiện lại thanh tiêu đề chuẩn.',
        fn: () => apisAsync.setNavigationBar({
          visible: true,
          immersive: false,
          title: '365 Mini App Debugger',
          backgroundColor: '#5856d6',
          frontColor: '#ffffff'
        }),
      },
      {
        id: 'openDeeplink',
        name: 'openDeeplink',
        desc: 'Mở một liên kết nội bộ hoặc deeplink.',
        fn: () => apisAsync.openDeeplink({
          url: 'ejsc://native/page',
          title: '[WebView] Màn hình Chi tiết',
          description: '[WebView] Nội dung này được gửi từ WebView qua Bridge.'
        }),
      },
      {
        id: 'shareApp',
        name: '[WebView] shareApp',
        desc: 'Chia sẻ Mini App với người khác.',
        fn: () => apisAsync.shareApp({
          title: '[WebView] Ứng dụng Quản lý EJSC',
          desc: '[WebView] Hệ thống điều hành doanh nghiệp thông minh.',
          url: 'https://ejsc.365teams.vn'
        }),
      },
    ],
  },
  // ── HomeBooking (Bổ sung) ────────────────────────────────────────────────
  {
    name: 'HomeBooking (Bổ sung)',
    apis: [
      {
        id: 'getUserLocation',
        name: 'getUserLocation',
        desc: 'Lấy tọa độ kèm địa chỉ thô (Reverse Geocoding).',
        fn: () => apisAsync.getUserLocation({ enableHighAccuracy: true }),
      },
      {
        id: 'openNativeMap',
        name: '[WebView] openNativeMap',
        desc: 'Mở ứng dụng bản đồ gốc (Google/Apple Maps).',
        fn: () => apisAsync.openNativeMap({ lat: 21.0285, lng: 105.8542, label: 'Hồ Hoàn Kiếm' }),
      },
      {
        id: 'captureImage',
        name: 'captureImage',
        desc: 'Chụp ảnh trực tiếp từ Camera native.',
        fn: () => apisAsync.captureImage({ quality: 80 }),
      },
      {
        id: 'setSecureStorage',
        name: 'setSecureStorage',
        desc: 'Lưu Token bí mật vào Keychain/Keystore.',
        fn: () => apisAsync.setSecureStorage({ key: 'secret_token', data: 'TOKEN_123456_ABC' }),
      },
      {
        id: 'getSecureStorage',
        name: 'getSecureStorage',
        desc: 'Đọc Token từ vùng lưu trữ bảo mật.',
        fn: () => apisAsync.getSecureStorage({ key: 'secret_token' }),
      },
      {
        id: 'triggerHapticFeedback',
        name: 'triggerHapticFeedback',
        desc: 'Tạo rung phản hồi (Success / Error / Heavy).',
        fn: async () => {
          await apisAsync.triggerHapticFeedback({ style: 'success' });
          await new Promise(r => setTimeout(r, 1000));
          return apisAsync.triggerHapticFeedback({ style: 'error' });
        },
      },
      {
        id: 'openInAppBrowser',
        name: '[WebView] openInAppBrowser',
        desc: 'Mở trình duyệt web bên trong app.',
        fn: () => apisAsync.openInAppBrowser({
          url: 'https://365teams.vn',
          errorMessage: '[WebView] Không thể kết nối tới máy chủ 365Teams.'
        }),
      },
    ],
  },
  {
    name: 'Custom UI Demos',
    apis: [
      {
        id: 'customPickerDemo',
        name: '[Web Custom] Chọn ảnh theo phong cách riêng',
        desc: 'Sử dụng giao diện Web/ActionSheet để gọi trực tiếp chức năng Native.',
        fn: () => {
          return new Promise((resolve) => {
            apisAsync.showActionSheet({
              title: 'Chọn ảnh đại diện của bạn',
              items: ['Chụp ảnh mới', 'Chọn từ thư viện'],
              success: (res) => {
                if (res.index === 0) {
                  // Gọi thẳng Camera
                  apisAsync.captureImage({
                    success: (data) => apisAsync.showToast({ content: 'Đã chụp: ' + data.path, type: 'success' })
                  });
                } else if (res.index === 1) {
                  // Gọi thẳng Album
                  apisAsync.chooseImage({
                    sourceType: ['album'],
                    success: (data) => apisAsync.showToast({ content: 'Đã chọn: ' + data.tempFilePaths.length + ' ảnh', type: 'success' })
                  });
                }
              },
              complete: (res) => resolve(res)
            });
          });
        }
      },
    ]
  }
];
