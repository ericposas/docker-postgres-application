import { takesAMethod } from './testMethod';

describe('Tests', () => {

	test('should call method', () => {
		const testMethod = jest.fn();
		takesAMethod( testMethod );
		expect(testMethod).toHaveBeenCalled();
	});

});

