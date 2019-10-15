import {
    EClientEmbeddedSDKActions,
    IClientEmbeddedSDKResonse,
    IClientRoomInfo,
    IClientUserInfo,
} from './definition';

/**
 * Represents the host which handlers API calls from external components.
 */
export abstract class AppClientUIHost {
    /**
     * The message emitter who calling the API.
     */
    private emitter!: MessageEventSource;
    constructor() {
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
                    this.handleAction(action, id, this.getClientUserInfo());
                case EClientEmbeddedSDKActions.GET_ROOM_INFO:
                    this.handleAction(action, id, this.getClientRoomInfo());
            }

            this.emitter = source;
        });
    }
    /**
     * Get the current user's information.
     */
    public abstract getClientUserInfo(): IClientUserInfo;
    /**
     * Get the opened room's information.
     */
    public abstract getClientRoomInfo(): IClientRoomInfo;
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
}
