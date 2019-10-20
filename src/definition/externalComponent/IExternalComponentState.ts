import { IClientRoomInfo, IClientUserInfo } from '../../client/interfaces';

/**
 * The state of an external component, which contains the
 * current user's information and the current room's information.
 */
export interface IExternalComponentState {
    /**
     * The user who opened this external component
     */
    currentUser: IClientUserInfo;
    /**
     * The room where the external component belongs to
     */
    currentRoom: IClientRoomInfo;
}