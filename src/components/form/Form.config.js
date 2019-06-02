// this config is used for the form validation HOOK
export const formConfig = {
	firstName: {
		value: '',
		validations: {
			required: true,
		},
	},
	lastName: {
		value: '',
	},
	email: {
		value: '',
		validations: { required: true, email: true },
	},
	password: {
		value: '',
		validations: { required: true, minLength: 5, maxLength: 20 },
		triggerValidationsFor: ['confirmPassword'],
	},
	confirmPassword: {
		value: '',
		validations: {
			required: true,
			minLength: 5,
			maxLength: 20,
			customValidator: (value, currentState) => {
				// for this example I am making this required if firstName is completed
				return currentState.password.value !== value;
			},
		},
	},
};
