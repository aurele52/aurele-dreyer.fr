export interface Friendship {
    id: number,
    user1_id: number,
    user2_id: number,
    blocked_by: number,
    created_at: Date,
    updated_at: Date,
}