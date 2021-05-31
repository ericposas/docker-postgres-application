export const takesAMethod = (callback: <T, S>(arg?: T) => S) => {
	if (typeof callback === 'function') {
		return callback();
	} else {
		return callback;
	}
};

export const addIt = (n1: number, n2: number): number => n1 + n2;

export const arrOfNums = (...args): number[] => [...args]

export interface SpecialObject {
	type: 'specialobject';
	specialProp: string;
	name: string;
	age: number;
	email: string;
};
