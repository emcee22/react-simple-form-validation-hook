import { emailPattern } from '../../constants/input-type-patterns';

export const handleRequiredValidation = value => {
	return !value;
};

export const handlePatternValidation = (value, pattern) => {
	const regex = RegExp(pattern);
	if (!value) return false;
	return value && !regex.test(value);
};

export const handleMinLengthValidation = (value, length) => {
	if (!value) return false;
	return value.length < length;
};

export const handleMaxLengthValidation = (value, length) => {
	if (!value) return false;
	return value.length > length;
};

export const handleEmailValidation = value => {
	const regex = RegExp(emailPattern);
	if (!value) return false;
	return !regex.test(value);
};

export const handleIndividualValidations = (field, state) => {
	let invalid = false;
	Object.keys(field.validations).forEach(validatorName => {
		switch (validatorName) {
			case 'required':
				invalid =
					handleRequiredValidation(field.value) || invalid;
				return;
			case 'pattern':
				invalid =
					handlePatternValidation(
						field.value,
						field.validations[validatorName],
					) || invalid;
				return;
			case 'email':
				invalid =
					handleEmailValidation(field.value) || invalid;
				return;
			case 'minLength':
				invalid =
					handleMinLengthValidation(
						field.value,
						field.validations[validatorName],
					) || invalid;
				return;
			case 'maxLength':
				invalid =
					handleMaxLengthValidation(
						field.value,
						field.validations[validatorName],
					) || invalid;
				return;
			case 'customValidator':
				invalid =
					field.validations[validatorName](
						field.value,
						state,
					) || invalid;
				return;
			default:
				return;
		}
	});
	return invalid;
};
