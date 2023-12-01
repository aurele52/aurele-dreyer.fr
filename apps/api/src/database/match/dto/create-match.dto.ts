export class CreateMatchDto {
    readonly id: number;
    readonly player1_id: number;
    readonly player2_id: number;
    readonly player1_score: number;
    readonly player2_score: number;
    readonly on_going: boolean;
    readonly created_at: Date;
    readonly updated_at: Date;
}