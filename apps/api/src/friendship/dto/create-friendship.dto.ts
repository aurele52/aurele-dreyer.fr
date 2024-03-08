export class CreateFriendshipDto {
  readonly id: number;
  readonly user1_id: number;
  readonly user2_id: number;
  readonly blocked_by: number;
  readonly created_at: Date;
  readonly updated_at: Date;
}
