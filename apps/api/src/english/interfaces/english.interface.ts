export interface Word {
  id: number;
  user_id: number;
  eng: string;
  fr: string;
  hint: string;
  level: number;
  created_at: Date;
  updated_at: Date;
}
