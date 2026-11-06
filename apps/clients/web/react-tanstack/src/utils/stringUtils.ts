export function camelToTitle(str: string) {
  return (
    str
      // 1. Thêm khoảng trống trước các chữ cái viết hoa
      .replace(/([A-Z])/g, " $1")
      // 2. Viết hoa chữ cái đầu tiên của toàn chuỗi
      .replace(/^./, (match) => match.toUpperCase())
      // 3. Xóa khoảng trắng thừa ở đầu nếu có
      .trim()
  );
}
