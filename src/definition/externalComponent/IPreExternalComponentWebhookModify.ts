import { IExternalComponentWebhook } from './IExternalComponentWebhook';

/**
 * Handler called when an app wants to modify a external component's
 * webhook in a destructive way.
 */
export interface IPreExternalComponentWebhookModify {
    /**
     * Enables the handler to signal the apps engine whether this handler
     * should actually be executed for the webhook about to be triggered.
     *
     * @param webhook The webhook about to be triggered
     * @returns Whether to run the execute or not
     */
    checkPreExternalComponentWebhookModify?(webhook: IExternalComponentWebhook): Promise<boolean>;

    /**
     * Method which is to destructively modify a webhook about to be triggered.
     *
     * @param webhook The webhook about to be triggered
     * @returns the resulting webhook
     */
    executePreExternalComponentWebhookModify(webhook: IExternalComponentWebhook): Promise<IExternalComponentWebhook>;
}
