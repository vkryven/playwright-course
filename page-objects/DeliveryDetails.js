import { expect } from "@playwright/test"

export class DeliveryDetails{
    constructor(page){
        this.page = page
        this.firstName = page.getByPlaceholder('First name')
        this.lastName = page.getByPlaceholder('Last name')
        this.street = page.getByPlaceholder('Street')
        this.postcode = page.getByPlaceholder('Post code')
        this.city = page.getByPlaceholder('City')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
    }

    fillDetails = async (userAddress) => {
        await this.firstName.waitFor()
        await this.firstName.fill(userAddress.firstName)
        await this.lastName.fill(userAddress.lastName)
        await this.street.fill(userAddress.street)
        await this.postcode.fill(userAddress.postcode)
        await this.city.fill(userAddress.city)
        await this.countryDropdown.selectOption(userAddress.country)
    }

    saveDetails = async () => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstName.inputValue())
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastName.inputValue())
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.street.inputValue())
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postcode.inputValue())
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.city.inputValue())
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
               
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })
          
    }

}