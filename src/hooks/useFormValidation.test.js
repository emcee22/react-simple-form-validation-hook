import { testHook } from '../utils/testUtils';
import useFormValidation from './useFormValidation';

const formConfigMock = {
	firstName: {
		value: '',
		validations: { required: true, minLength: 5, maxLength: 10 },
	},
	lastName: {
		value: '',
		validations: { minLength: 5, maxLength: 10 },
	},
	email: {
		value: '',
		validations: { required: true, email: true },
	},
	password: {
		value: '',
		validations: { minLength: 7, maxLength: 10 },
	},
};
let formValidation;
beforeEach(() => {
	testHook(() => {
		formValidation = useFormValidation(formConfigMock, () => {});
	});
});

it('should have an handleInputChange function', () => {
	expect(formValidation.handleInputChange).toBeInstanceOf(Function);
});

it('should have correct handleSubmit function', () => {
	expect(formValidation.handleSubmit).toBeInstanceOf(Function);
});

it('should have a invalid boolean', () => {
	expect(formValidation.invalid).toBe(false);
});

it('should have all the fields that were send to the hook returned', () => {
	expect(formValidation.lastName).toBeTruthy();
	expect(formValidation.email).toBeTruthy();
	expect(formValidation.password).toBeTruthy();

	expect(formValidation.someOtherStuff).toBeFalsy();
});
