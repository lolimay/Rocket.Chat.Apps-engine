import { IRoom } from '../../definition/rooms';
import { IUser } from '../../definition/users';

export interface IClientInternalBridge {
    /**
     * Get current user's opened room
     *
     * @returns a room object which represents the current user's opened room
     */
    getOpenedRoom(): IRoom;
    /**
     * Get the current user
     *
     * @returns a user object which represents the current user.
     */
    getCurrentUser(): IUser;
}
