// backend/src/db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Docker Compose 환경변수(DATABASE_URL)를 사용하여 연결 풀 생성
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 연결 테스트 및 에러 핸들링
pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

export default pool;