import React from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import './Form.css';

// configuration for useFormValidation HOOK
import { formConfig } from './Form.config';

function Form() {
	const formSubmit = formData => {
		// formData will have the same format as the config object
		// this data is validated and ready to use
		console.log({ formData });
	};

	// all data that we recieve from the hook
	// individual input elements, handleInputChange, handleSubmit and general 'invalid' boolean
	const {
		firstName,
		lastName,
		email,
		password,
		confirmPassword,
		handleInputChange,
		handleSubmit,
		invalid,
	} = useFormValidation(formConfig, formSubmit);

	return (
		<form className="Form" onSubmit={handleSubmit} noValidate>
			<div
				className={
					'Form__group ' +
					(firstName.invalid ? 'Form__group--error' : '')
				}
			>
				<input
					value={firstName.value}
					onChange={handleInputChange}
					placeholder="First name"
					type="text"
					name="firstName"
					required
				/>
			</div>
			<div
				className={
					'Form__group ' +
					(lastName.invalid ? 'Form__group--error' : '')
				}
			>
				<input
					value={lastName.value}
					onChange={handleInputChange}
					placeholder="Last name"
					type="text"
					name="lastName"
				/>
			</div>
			<div
				className={
					'Form__group ' +
					(email.invalid ? 'Form__group--error' : '')
				}
			>
				<input
					value={email.value}
					onChange={handleInputChange}
					placeholder="Email address"
					type="email"
					name="email"
				/>
			</div>

			<div
				className={
					'Form__group ' +
					(password.invalid ? 'Form__group--error' : '')
				}
			>
				<input
					value={password.value}
					onChange={handleInputChange}
					placeholder="Password"
					type="password"
					name="password"
				/>
			</div>

			<div
				className={
					'Form__group ' +
					(confirmPassword.invalid
						? 'Form__group--error'
						: '')
				}
			>
				<input
					value={confirmPassword.value}
					onChange={handleInputChange}
					placeholder="Confirm Password"
					type="password"
					name="confirmPassword"
				/>
			</div>

			<div className="Form__group">
				<button type="submit" className="Form__group__button">
					Submit
				</button>
				{invalid && <p>From is invalid</p>}
			</div>
		</form>
	);
}
export default Form;
