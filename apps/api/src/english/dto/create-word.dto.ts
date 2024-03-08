export class CreateWordDto {
  readonly id: number;
  readonly user_id: number;
  readonly eng: string;
  readonly fr: string;
  readonly hint: string;
  readonly level: number;
  readonly created_at: Date;
  readonly updated_at: Date;
}
