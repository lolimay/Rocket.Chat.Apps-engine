import { IClientInternalBridge } from './IClientInternalBridge';

export abstract class AppClientBridges {
    public abstract getClientInternalBridge(): IClientInternalBridge;
}
