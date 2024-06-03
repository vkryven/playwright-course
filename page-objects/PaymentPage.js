import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
       this.page = page 

       this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
       this.discountInput = page.locator('[data-qa="discount-code-input"]')
       this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
       this.discountMessage = page.locator('[data-qa="discount-active-message"]')
       this.totalValue = page.locator('[data-qa="total-value"]')
       this.totalDiscount = page.locator('[data-qa="total-with-discount-value"]')
       this.creditCardOwner = page.locator('[data-qa="credit-card-owner"]')
       this.creditCardNumber = page.locator('[data-qa="credit-card-number"]')
       this.validUntil = page.locator('[data-qa="valid-until"]')
       this.creditCardCvc = page.locator('[data-qa="credit-card-cvc"]')
       this.payButton = page.locator('[data-qa="pay-button"]')

    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
        // option 1 for laggy inputs
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)
        //Option 2 - slow typing
        //await this.discountInput.focus()
        //await this.page.keyboard.type(code, {delay: 1000})
       // expect(await this.discountInput.inputValue()).toBe(code)

        await this.activateDiscountButton.waitFor()
        await expect(this.discountMessage).toHaveCount(0);
        expect (await this.totalDiscount.isVisible()).toBe(false)
        await this.activateDiscountButton.click()
        await this.discountMessage.waitFor()
        await this.totalDiscount.waitFor()
        const discountValueText = await this.totalDiscount.innerText()
        const discountValueOnlyStringNumber = discountValueText.replace("$","")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)

        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyStringNumber = totalValueText.replace("$","")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)
        expect(discountValueNumber).toBeLessThan(totalValueNumber)
                
    }


    fillPaymentDetails = async (paymentDetails) => {
        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(paymentDetails.creditCardOwner)
        await this.creditCardNumber.waitFor()
        await this.creditCardNumber.fill(paymentDetails.creditCardNumber)
        await this.validUntil.waitFor()
        await this.validUntil.fill(paymentDetails.validUntil)
        await this.creditCardCvc.waitFor()
        await this.creditCardCvc.fill(paymentDetails.creditCardCvc)
             
    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 })
        //await this.page.pause() 

    }


}