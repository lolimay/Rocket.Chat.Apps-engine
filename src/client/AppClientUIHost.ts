import { IRoom } from '../definition/rooms';
import { IUser } from '../definition/users';
import { IInternalBridge, IUserBridge } from '../server/bridges';
import { ProxiedApp } from '../server/ProxiedApp';
import { IClientInternalBridge } from './bridges';
import { EClientEmbeddedSDKActions, IClientEmbeddedSDKResonse, IClientRoomInfo, IClientUserInfo } from './definition';

/**
 * Represents the host which handlers API calls from external components.
 */
export class AppClientUIHost {
    /**
     * The message emitter who calling the API.
     */
    private emitter!: MessageEventSource;
    constructor(
        private readonly clientInternalBridge: IClientInternalBridge,
        private readonly serverInternalBridge: IInternalBridge,
        private readonly serverUserBridge: IUserBridge,
        private readonly app: ProxiedApp,
    ) {
        this.initialize();
    }
    /**
     * initialize the AppClientUIHost by registering window `message` listener
     */
    public initialize() {
        window.addEventListener('message', async ({ data, source }) => {
            if (!data.hasOwnProperty('rcEmbeddedSDK')) {
                return;
            }
            const { action, id } = data;

            switch (action) {
                case EClientEmbeddedSDKActions.GET_USER_INFO:
                    this.handleAction(action, id, await this.getClientUserInfo());
                case EClientEmbeddedSDKActions.GET_ROOM_INFO:
                    this.handleAction(action, id, await this.getClientRoomInfo());
            }

            this.emitter = source;
        });
    }
    /**
     * Handle the action sent from the external component.
     * @param action the name of the action
     * @param id the unique id of the  API call
     * @param data The data that will return to the caller
     */
    private async handleAction(
        action: EClientEmbeddedSDKActions, id: string, data: IClientUserInfo | IClientRoomInfo,
    ): Promise<void> {
        if ((this.emitter instanceof MessagePort) || (this.emitter instanceof ServiceWorker)) {
            return;
        }

        this.emitter.postMessage({
            rcEmbeddedSDK: {
                id,
                action,
                payload: data,
            } as IClientEmbeddedSDKResonse,
        }, '*');
    }
    /**
     * Get the current user's information. Will return `null` if there's
     * something went wrong.
     */
    private getClientUserInfo(): IClientUserInfo | null {
        const user: IUser = this.clientInternalBridge.getCurrentUser();

        if (!user) {
            return null;
        }
        const { id, username } = user;
        const avatarUrl = this.serverInternalBridge.getUserAvatarURLByUsername(username);

        return { userId: id, username, avatarUrl } as IClientUserInfo;
    }
    /**
     * Get the current user's information. This metohd will return a promise.
     */
    private async getClientRoomInfo(): Promise<IClientRoomInfo | null> {
        const room: IRoom = this.clientInternalBridge.getOpenedRoom();

        if (!room) {
            return null;
        }
        const { slugifiedName: roomName, id: roomId, usernames } = room;
        const members: Array<IClientUserInfo> =  await Promise.all(usernames.map(async (username) => {
            const user: IUser = await this.serverUserBridge.getByUsername(username, this.app.getID());
            return {
                userId: user.id,
                username,
                avatarUrl: this.serverInternalBridge.getUserAvatarURLByUsername(username),
            } as IClientUserInfo;
        }));

        return {
            roomId,
            roomName,
            members,
        } as IClientRoomInfo;
    }
}
