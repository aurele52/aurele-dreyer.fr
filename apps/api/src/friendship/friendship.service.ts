import { Injectable } from '@nestjs/common';
import { Friendship } from './interfaces/friendship.interface';

@Injectable()
export class FriendshipService {
    private readonly friendships: Friendship[] = [];

    create(friendship: Friendship) {
        this.friendships.push(friendship);
    }

    findAll(): Friendship[] {
        return this.friendships;
    }
}
