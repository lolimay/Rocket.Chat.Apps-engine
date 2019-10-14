import { ISetting } from '../../definition/settings';

export interface IInternalBridge {
    getUsernamesOfRoomById(roomId: string): Array<string>;
    getWorkspacePublicKey(): Promise<ISetting>;
    /**
     * Get user's avatar URL by providing his username
     *
     * @param username The user's username corresponding to the avatar
     */
    getUserAvatarURLByUsername(username: string): string;
}
