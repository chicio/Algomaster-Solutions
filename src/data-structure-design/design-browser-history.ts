/**
 * https://leetcode.com/problems/design-browser-history/description/
 * 1472. Design Browser History
 */


class BrowserHistory {
    constructor(
        homepage: string,
        private currentUrl: string = homepage,
        private backStack: string[] = [], 
        private forwardStack: string[] = []
    ) { }

    visit(url: string): void {
        this.backStack.push(this.currentUrl)
        this.currentUrl = url
        this.forwardStack = []
    }

    back(steps: number): string {
        let currentStep = steps

        while (this.backStack.length > 0 && currentStep > 0) {
            this.forwardStack.push(this.currentUrl)
            this.currentUrl = this.backStack.pop()!
            currentStep--
        }
        
        return this.currentUrl
    }

    forward(steps: number): string {
        let currentStep = steps

        while (this.forwardStack.length > 0 && currentStep > 0) {
            this.backStack.push(this.currentUrl)
            this.currentUrl = this.forwardStack.pop()!
            currentStep--
        }
        
        return this.currentUrl
    }
}