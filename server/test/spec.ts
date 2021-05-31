/**
* jest-environment node
*/

import { takesAMethod, addIt, arrOfNums, SpecialObject } from './testMethod';
import random from 'random';

describe('Tests', () => {

	test('should call method', () => {
		const testMethod = jest.fn();
		takesAMethod( testMethod );
		expect(testMethod).toHaveBeenCalled();
	});

	test('should add two numbers', () => {
		expect(addIt(1, 4)).toEqual(5);
	});

	test('should return an array of numbers', () => {
		arrOfNums(1, 3, 5, 6).forEach(item => {
			expect(typeof item === 'number').toBe(true);
		});
	});

	test('should return the correct type', () => {
		const method = <number, string>(arg: number) => string => arg + 'mileena' as string;
		const value = takesAMethod( method(2) );
		expect(typeof value === 'string').toBe(true);
	});

	test('should be an instance of SpecialObject', () => {
		const myObj: SpecialObject = { specialProp: 'Street Fighter', name: 'Cammy', age: 22, email: 'cammy@sf.com' };
		function isSpecialObject(object: any): object is SpecialObject {
			return 'specialProp' in object;
		};
		expect( isSpecialObject( myObj ) ).toBe( true );
	});

});
