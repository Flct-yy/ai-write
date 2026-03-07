import { StreamChat } from "stream-chat";

export const apiKey = process.env.STREAM_API_KEY as string;
export const apiSecret = process.env.STREAM_API_SECRET as string;

if (!apiKey || !apiSecret) {
  throw new Error(
    "Missing required environment variables STREAM_API_KEY or STREAM_API_SECRET"
  );
}

// 创建 Stream Chat 服务器端客户端
export const serverClient = new StreamChat(apiKey, apiSecret);
