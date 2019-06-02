import { useState, useEffect } from 'react';
import { handleIndividualValidations } from '../utils/input-type-validators/input-type-validators';

function useFormValidation(formConfig, callback) {
	// holds the state of the form with all the inputs
	// the formConfig should be an object like: components/form/Form.config.js
	const [formState, setState] = useState(formConfig);

	// general form boolean
	const [invalid, setInvalidForm] = useState(false);

	// activated when form is submited and set to false when you make changes to the form
	const [isSubmitting, setIsSubmitting] = useState(false);

	// boolean activated when you submit the form, in this way we can start validating the fields
	const [triedToSubmit, setTriedToSubmit] = useState(false);

	// callback is called when all data is valid (usualy this is the formSubmit that you can later use to manage the data)
	useEffect(() => {
		if (isSubmitting && !invalid) {
			callback(formState);
		}
	});

	// return true if one of the inputs in the form are invalid
	const checkIfFormIsInvalid = state => {
		const firstInvalidField = Object.keys(state).filter(
			fieldName => state[fieldName].invalid,
		);
		return firstInvalidField && firstInvalidField.length;
	};

	const handleInputValidation = (state, fieldName) => {
		// cache field
		const field = state[fieldName];

		// validate input
		if (field.validations) {
			field.invalid = handleIndividualValidations(field, state);
		}

		// trigger other input validations if other inputs are dependent on this field
		if (
			field.triggerValidationsFor &&
			field.triggerValidationsFor.length
		) {
			field.triggerValidationsFor.forEach(triggerFieldName => {
				const triggerField = state[triggerFieldName];
				triggerField.invalid = handleIndividualValidations(
					triggerField,
					state,
				);
			});
		}

		return state;
	};

	const handleInputChange = event => {
		// reset isSubmitting
		setIsSubmitting(false);

		// create new formState with the new value
		const newState = {
			...formState,
			[event.target.name]: {
				...formState[event.target.name],
				value: event.target.hasOwnProperty('checked')
					? event.target.checked
					: event.target.value,
			},
		};

		// skip validations if user did not submit the form
		if (!triedToSubmit) {
			setState(newState);
			return;
		}

		// validate the field
		const validatedState = handleInputValidation(newState, [
			event.target.name,
		]);

		// check if form is invalid
		setInvalidForm(checkIfFormIsInvalid(validatedState));

		// set the new state
		setState(validatedState);
	};

	// validates all inputs and set the state of the form
	const validate = () => {
		let newState = formState;
		Object.keys(newState).forEach(fieldName => {
			newState = handleInputValidation(newState, fieldName);
		});
		setInvalidForm(checkIfFormIsInvalid(newState));
	};

	// handles submit of the form
	const handleSubmit = event => {
		if (event) event.preventDefault();
		validate();
		setIsSubmitting(true);
		setTriedToSubmit(true);
	};

	return { ...formState, handleInputChange, handleSubmit, invalid };
}

export default useFormValidation;
