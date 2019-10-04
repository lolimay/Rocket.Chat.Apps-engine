/**
 * Represnts an external component's webhook.
 */
export interface IExternalComponentWebhook {
    /**
     * The id of the webhook.
     */
    readonly id: string;
    /**
     * The event of the external component.
     */
    event: ExternalComponentEvent;
    /**
     * The target URL of the webhook.
     */
    url: string;
    /**
     * The payload that needs to be sent.
     */
    payload?: any;
}

/**
 * Represents the event type of an external component.
 */
export enum ExternalComponentEvent {
    /**
     * When a user opens an external component,
     * this event will be triggered.
     */
    OPEN = 'OPEN',
    /**
     * When a user closes an external component,
     * this event will be triggered.
     */
    CLOSE = 'CLOSE',
}
