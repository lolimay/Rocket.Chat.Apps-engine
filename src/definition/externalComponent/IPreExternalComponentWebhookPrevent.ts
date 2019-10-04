import { IExternalComponentWebhook } from './IExternalComponentWebhook';

/**
 * Handler which is called to determine whether an external component's
 * webhook is allowed to be triggered.
 */
export interface IPreExternalComponentWebhookPrevent {
    /**
     * Enables the handler to signal the apps engine whether this handler
     * should actually be executed for the webhook about to be triggered.
     *
     * @param webhook The webhook about to be triggered
     * @returns Whether to run the prevent or not
     */
    checkPreExternalComponentWebhookPrevent?(webhook: IExternalComponentWebhook): Promise<boolean>;

    /**
     * Method which is to be used to prevent a webhook about to be triggered.
     *
     * @param webhook The webhook about to be triggered
     * @returns Whether to prevent the webhook about to be triggered
     */
    executePreExternalComponentWebhookPrevent(webhook: IExternalComponentWebhook): Promise<boolean>;
}
