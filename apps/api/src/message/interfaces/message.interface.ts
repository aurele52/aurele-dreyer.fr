export interface Message {
  id: number;
  user_id: number;
  channel_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}
