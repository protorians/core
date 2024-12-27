import {TokenList} from "../source/supports/token-list"

describe('Token List Manager', () => {

    const tokenList = TokenList<string>();
    const className = 'dialog-message';
    const newClassName = 'dialog-alert';

    tokenList.add(className)

    test('add method', () => {
        expect(tokenList.toString()).toContain(className);
    });

    test('contains method', () => {
        expect(tokenList.contains(className)).toBe(true);
    });

    test('item method', () => {
        expect(tokenList.item(0)).toBe(className);
    });

    test('replace method', () => {
        tokenList.replace(className, newClassName)
        expect(tokenList.contains(newClassName)).toBe(true);
    });

    test('toggle method', () => {
        expect(tokenList.toggle(newClassName)).toBe(true);
    });
})

