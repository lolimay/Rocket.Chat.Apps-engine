import { IExternalComponentWebhook } from './IExternalComponentWebhook';

/**
 * Handler called when an app wants to enrich a webhook.
 */
export interface IPreExternalComponentWebhookExtend {
    /**
     * Enables the handler to signal the apps engine whether this handler
     * should actually be executed for the webhook about to be triggered.
     *
     * @param webhook The webhook about to be triggered
     * @returns Whether to run the execute function or not
     */
    checkPreExternalComponentWebhookExtend?(webhook: IExternalComponentWebhook): Promise<boolean>;

    /**
     * Method which is to be used to non-destructively enrich a webhook about
     * to be triggered.
     *
     * @param webhook The webhook about to be triggered
     * @returns the resulting webhook
     */
    executePreExternalComponentWebhookExtend(webhook: IExternalComponentWebhook): Promise<IExternalComponentWebhook>;
}
