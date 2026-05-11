# Hướng dẫn Kiểm tra & Kết nối API (Native Bridge)

Tài liệu này hướng dẫn cách kiểm tra, kết nối và thêm mới các đầu API trong project **my-app-host** 

---

## 1. Cách kiểm tra API hiện có

Giao diện kiểm tra API nằm tại màn hình **Native Bridge APIs** (`ApiScreen`).

1. Chạy ứng dụng: `pnpm dev`.
2. Mở menu và chọn tab **API** (hoặc truy cập màn hình `ApiScreen`).
3. Tại đây, các API được chia theo nhóm (System, Media, Storage, Device...).
4. Nhấn nút **"Called"** để thực thi API.
5. Xem kết quả trả về ngay bên dưới nút bấm (định dạng JSON).
   * **Màu xanh:** Thành công (Success).
   * **Màu đỏ:** Thất bại (Error).

---

## 2. Cách kết nối và sử dụng API trong Code

Tất cả các API Native Bridge được xuất bản thông qua thư viện nội bộ `ejsc-ma-api`.

### Sử dụng Promise (apisAsync)

Đây là cách khuyên dùng để xử lý bất đồng bộ.

```tsx
import { apisAsync } from 'ejsc-ma-api';

const handleGetLocation = async () => {
  const res = await apisAsync.getLocation({ type: 1 });
  if (res.success) {
    console.log("Tọa độ:", res.data.latitude, res.data.longitude);
  } else {
    console.error("Lỗi:", res.data.error);
  }
};
```

### Cấu trúc phản hồi chuẩn (Standard Response)

Mọi API trong `apisAsync` đều trả về một object có cấu trúc:

```json
{
  "success": true | false,
  "data": { ... } // Chứa kết quả hoặc thông tin lỗi
}
```

---

## 3. Cách thêm mới đầu API để Test

Để thêm một API mới vào danh sách kiểm tra trên giao diện:

1. Mở file: `src/constants/apiGroups.ts`.
2. Tìm nhóm phù hợp hoặc tạo nhóm mới trong mảng `API_GROUPS`.
3. Thêm một entry mới với cấu trúc sau:

```tsx
{
  id: 'unique_id',      // ID duy nhất để quản lý log
  name: 'tên_api',      // Tên hiển thị trên nút bấm
  desc: 'mô tả ngắn',    // Mô tả chức năng của API
  fn: () => apisAsync.tên_api({ ...params }), // Hàm thực thi API
}
```

**Ví dụ:** Muốn thêm test cho API quét mã vạch mới:

```tsx
{
  id: 'scanBarcode',
  name: 'scanBarcode',
  desc: 'Quét mã vạch sản phẩm',
  fn: () => apisAsync.scan({ title: 'Quét mã vạch' }),
}
```

---

## 4. Debugging & Logs

* **Console Log:** Kết quả API cũng được log ra console của Browser để kiểm tra chi tiết object.
* **Log Relay:** Nếu app đang chạy trong môi trường Native, các log từ Flutter sẽ được đẩy lên thông qua `useLogRelay.ts`.
* **Truncate:** Các chuỗi Base64 dài (như ảnh) sẽ được tự động rút gọn trên giao diện để tránh làm rối màn hình.

---

## 5. Môi trường (Environment)

Kiểm tra file `.env.development` để đảm bảo các cổng kết nối API đang trỏ đúng:

* `MINIAPP_API_URL`: Cổng của API Server (mặc định `5049`).
* `MINIAPP_LOG_RELAY_PORT`: Cổng nhận log từ thiết bị (mặc định `8085`).
