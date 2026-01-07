// frontend/src/app/page.tsx
"use client"; // React Hooks(useState, useEffect)를 쓰기 위해 필수

import { useState, useEffect } from "react";

// 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // API 주소 (환경변수로 빼는 게 좋지만 지금은 하드코딩)
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;

  // 1. 데이터 가져오기 (Read)
  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    }
  };

  // 페이지 로드 시 실행
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };
    void fetchUsers();
  }, []);

  // 2. 데이터 저장하기 (Create)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    if (!name || !email) return alert("빈칸을 채워주세요!");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        fetchUsers(); // 목록 새로고침
      }
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          유저 관리 시스템
        </h1>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="홍길동"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="hello@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            등록하기
          </button>
        </form>

        {/* 유저 리스트 */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">등록된 유저</h2>
          {users.length === 0 ? (
            <p className="text-gray-500 text-center">등록된 유저가 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded border"
                >
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}