import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.completeHeader = page.locator('.complete-header');
    }

    // Fills in the shipping information.
    async fillShippingDetails(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    // Clicks the continue button.
    async continueCheckout() {
        await this.continueButton.click();
    }

    // Clicks the finish button to complete the order.
    async finishOrder() {
        await this.finishButton.click();
    }

    // Gets the order confirmation message.
    async getConfirmationMessage() {
        return this.completeHeader.textContent();
    }
}