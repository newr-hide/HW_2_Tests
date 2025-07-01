import { validateCardNumber, determineCardType } from './app.js';

describe('Test Card Validator Functions', () => {
    describe('validateCardNumber Function', () => {
      test('Validates a valid Visa card number', () => {
        expect(validateCardNumber('4532015112830366')).toBeTruthy();
      });
  
      test('Rejects an invalid Visa card number', () => {
        expect(validateCardNumber('4532015112830367')).toBeFalsy();
      });
  
      test('Validates a valid Mastercard number', () => {
        expect(validateCardNumber('5555555555554444')).toBeTruthy();
      });
  
      test('Rejects an invalid Mastercard number', () => {
        expect(validateCardNumber('5555555555554445')).toBeFalsy();
      });
  
      test('Validates a valid American Express number', () => {
        expect(validateCardNumber('378282246310005')).toBeTruthy();
      });
  
      test('Rejects an invalid American Express number', () => {
        expect(validateCardNumber('378282246310006')).toBeFalsy();
      });
  
      test('Validates a valid MIR number', () => {
        expect(validateCardNumber('2202205037967517')).toBeTruthy();
      });
  
      test('Rejects an invalid MIR number', () => {
        expect(validateCardNumber('2200200000000002')).toBeFalsy();
      });})
  
    describe('determineCardType Function', () => {
      test('Identifies a Visa card', () => {
        expect(determineCardType('4532015112830366')).toEqual('Visa');
      });
  
      test('Identifies a Mastercard', () => {
        expect(determineCardType('5555555555554444')).toEqual('Mastercard');
      });
  
      test('Identifies an American Express card', () => {
        expect(determineCardType('378282246310005')).toEqual('American Express');
      });
  
      test('Identifies a MIR card', () => {
        expect(determineCardType('2202205037967517')).toEqual('Мир');
      });
  
      test('Identifies a Discover card', () => {
        expect(determineCardType('6011111111111117')).toEqual('Discover');
      });
  
      test('Identifies a JCB card', () => {
        expect(determineCardType('3566002020360505')).toEqual('JCB');
      });
    })
})