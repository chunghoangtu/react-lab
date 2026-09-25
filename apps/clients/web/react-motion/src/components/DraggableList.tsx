import { useState, useRef } from "react";
import { motion } from "motion/react";

type Item = {
  id: string;
  text: string;
}

export default function DragDropLists() {
  // 1. Khởi tạo dữ liệu cho 2 danh sách
  const [todoList, setTodoList] = useState<Item[]>([
    { id: "todo-1", text: "📚 Học nâng cao TypeScript" },
    { id: "todo-2", text: "🎬 Cấu hình Framer Motion" },
    { id: "todo-3", text: "🐛 Fix bug layout UI dự án" },
  ]);
  const [doneList, setDoneList] = useState<Item[]>([{ id: "done-1", text: "☕ Uống nước đầy đủ" }]);

  // 2. Tạo ref để xác định tọa độ/vị trí của cột "Đã xong" trên màn hình
  const doneColumnRef = useRef<HTMLDivElement>(null);
  const todoColumnRef = useRef<HTMLDivElement>(null);

  // 3. Xử lý logic khi người dùng buông chuột (Thả item)
  const handleDragEnd = (item: Item, currentList: "todo" | "done", event: any, info: any) => {
    // Lấy tọa độ X tại vị trí buông chuột
    const dropX = info.point.x;

    if (currentList === "todo" && doneColumnRef.current) {
      // Lấy ranh giới (vị trí trái/phải) của cột Done
      const rect = doneColumnRef.current.getBoundingClientRect();

      // Nếu thả chuột bên trong phạm vi cột Done -> Chuyển cột
      if (dropX >= rect.left && dropX <= rect.right) {
        setTodoList((prev) => prev.filter((i) => i.id !== item.id));
        setDoneList((prev) => [...prev, item]);
      }
    } else if (currentList === "done" && todoColumnRef.current) {
      // Lấy ranh giới của cột Todo
      const rect = todoColumnRef.current.getBoundingClientRect();

      // Nếu thả chuột bên trong phạm vi cột Todo -> Chuyển cột ngược lại
      if (dropX >= rect.left && dropX <= rect.right) {
        setDoneList((prev) => prev.filter((i) => i.id !== item.id));
        setTodoList((prev) => [...prev, item]);
      }
    }
  };

  return (
    <div
      className='flex w-full max-w-4xl gap-6 p-6 mx-auto bg-slate-700 rounded-2xl shadow-sm border
        border-slate-700'
    >
      {/* 📌 CỘT 1: CẦN LÀM */}
      <div
        ref={todoColumnRef}
        className='flex-1 bg-slate-800 p-5 rounded-xl border border-slate-700 min-h-[300px] flex
          flex-col'
      >
        <h3 className='text-lg font-bold text-slate-200 flex items-center gap-2 mb-4'>
          <span>📌</span> Cần làm
          <span
            className='text-lg bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-semibold'
          >
            {todoList.length}
          </span>
        </h3>

        <div className='flex flex-col gap-3 flex-grow relative'>
          {todoList.map((item) => (
            <motion.div
              key={item.id}
              layoutId={item.id} // Giúp chuyển đổi mượt mà giữa các danh sách
              drag // Kích hoạt tính năng kéo thả
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Giới hạn tự động bật về vị trí cũ nếu thả hụt
              dragElastic={1} // Độ đàn hồi lớn để kéo đi xa được
              onDragEnd={(e, info) => handleDragEnd(item, "todo", e, info)}
              whileDrag={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)", zIndex: 50 }}
              whileHover={{ scale: 1.02 }}
              className='p-4 bg-slate-500 border border-slate-700 text-slate-200 font-medium
                rounded-lg cursor-grab active:cursor-grabbing select-none'
            >
              {item.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ✅ CỘT 2: ĐÃ XONG */}
      <div
        ref={doneColumnRef}
        className='flex-1 bg-slate-800 p-5 rounded-xl border border-slate-700 min-h-[300px] flex
          flex-col'
      >
        <h3 className='text-lg font-bold text-slate-200 flex items-center gap-2 mb-4'>
          <span>✅</span> Đã xong
          <span
            className='text-lg bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-semibold'
          >
            {doneList.length}
          </span>
        </h3>

        <div className='flex flex-col gap-3 flex-grow relative'>
          {doneList.map((item) => (
            <motion.div
              key={item.id}
              layoutId={item.id}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={1}
              onDragEnd={(e, info) => handleDragEnd(item, "done", e, info)}
              whileDrag={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)", zIndex: 50 }}
              whileHover={{ scale: 1.02 }}
              className='p-4 bg-slate-500 border border-slate-700 text-slate-200 font-medium
                rounded-lg cursor-grab active:cursor-grabbing select-none'
            >
              {item.text}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
