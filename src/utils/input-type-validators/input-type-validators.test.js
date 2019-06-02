import { emailPattern } from '../../constants/input-type-patterns';
import {
	handleRequiredValidation,
	handlePatternValidation,
	handleMinLengthValidation,
	handleMaxLengthValidation,
	handleEmailValidation,
	handleIndividualValidations,
} from './input-type-validators';

it('#handleRequiredValidation should return true or false based on input value', () => {
	expect(handleRequiredValidation('')).toBe(true);
	expect(handleRequiredValidation('some value')).toBe(false);
});

it('#handlePatternValidation should do a check if value is according to pattern', () => {
	const pattern = /^[0-9]{5}$/;
	expect(handlePatternValidation('12345', pattern)).toBe(false);
	expect(handlePatternValidation('123456', pattern)).toBe(true);
	expect(handlePatternValidation('', pattern)).toBe(false);
});

it('#handleMinLengthValidation check if provided value is correct', () => {
	const minLength = 5;
	expect(handleMinLengthValidation('1234', minLength)).toBe(true);
	expect(handleMinLengthValidation('12345', minLength)).toBe(false);
	expect(handleMinLengthValidation('', minLength)).toBe(false);
});

it('#handleMaxLengthValidation check if provided value is correct', () => {
	const maxLength = 5;
	expect(handleMaxLengthValidation('123456', maxLength)).toBe(true);
	expect(handleMaxLengthValidation('12345', maxLength)).toBe(false);
	expect(handleMaxLengthValidation('', maxLength)).toBe(false);
});

it('#handleEmailValidation check if provided value is correct', () => {
	const validEmail = 'test@test.test';
	const invalidEmail1 = 'test@test';
	const invalidEmail2 = '@test.test';
	expect(handleEmailValidation(validEmail)).toBe(false);
	expect(handleEmailValidation(invalidEmail1)).toBe(true);
	expect(handleEmailValidation(invalidEmail2)).toBe(true);
	expect(handleEmailValidation('')).toBe(false);
});

it('#handleIndividualValidations should return false if data provided is correct', () => {
	const pattern = emailPattern;
	const field = {
		value: 'test@test.test',
		validations: {
			required: true,
			minLength: 14,
			maxLength: 14,
			email: true,
			pattern,
		},
	};

	const response = handleIndividualValidations(field);

	expect(response).toBe(false);
});
