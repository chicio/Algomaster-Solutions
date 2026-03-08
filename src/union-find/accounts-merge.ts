/**
 * https://leetcode.com/problems/accounts-merge
 * 721. Accounts Merge
 **/ 

import { UnionFind } from "../union-find"

function accountsMerge(accounts: string[][]): string[][] {
    const emailToIndex = new Map<string, number>()
    const emailToName = new Map<string, string>()
    let index = 0

    for (const account of accounts) {
        const name = account[0]

        for (let i = 1; i < account.length; i++) {
            const email = account[i]
            if (!emailToIndex.has(email)) {
                emailToIndex.set(email, index++)
                emailToName.set(email, name)
            }
        }
    }

    const uf = new UnionFind(index)    

    for (const account of accounts) {
        const firstEmailIndex = emailToIndex.get(account[1])!
        
        for (let i = 2; i < account.length; i++) {
            const emailIndex = emailToIndex.get(account[i])!
            uf.union(firstEmailIndex, emailIndex)
        }
    }

    const rootToEmails = new Map<number, string[]>()

    for (const email of emailToIndex.keys()) {
        const root = uf.find(emailToIndex.get(email)!)
        if (!rootToEmails.has(root)) {
            rootToEmails.set(root, [])
        }
        rootToEmails.get(root)!.push(email)
    }

    const merged: string[][] = []

    for (const emails of rootToEmails.values()) {
        emails.sort()
        const name = emailToName.get(emails[0])!
        merged.push([name, ...emails])
    }

    return merged
}

console.log(accountsMerge([["John","johnsmith@mail.com","john00@mail.com"],["John","johnnybravo@mail.com"],["John","johnsmith@mail.com","john_newyork@mail.com"],["Mary","mary@mail.com"]]));
