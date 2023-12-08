export class CreateMessageDto {
    readonly id: number;
    readonly user_id: number;
    readonly channel_id: number;
    readonly content: string;
    readonly created_at: Date;
    readonly updated_at: Date;
}