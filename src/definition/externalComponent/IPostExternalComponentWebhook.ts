import { IExternalComponentWebhook } from './IExternalComponentWebhook';

/**
 * Handler called after an external component's webhook is triggered.
 */
export interface IPostExternalComponentWebhook {
    /**
     * Enables the handler to signal the apps engine whether this handler
     * should actually be executed after the webhook has been triggered.
     *
     * @param webhook The webhook which has been triggered
     * @returns Whether to run the execute function or not
     */
    checkPostExternalComponentWebhook?(webhook: IExternalComponentWebhook): Promise<boolean>;

    /**
     * Method called after the webhook was triggered.
     *
     * @param webhook The webhook which has been triggered
     */
    executePostExternalComponentWebhook(webhook: IExternalComponentWebhook): Promise<void>;
}
