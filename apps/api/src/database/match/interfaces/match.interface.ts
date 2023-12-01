export interface Match {
    id: number,
    player1_id: number,
    player2_id: number,
    player1_score: number,
    player2_score: number,
    on_going: boolean,
    created_at: Date,
    updated_at: Date,
}