//react feedback form
//NOTE: DID NOT use any css as it was done in Tailwind
'use client'; // added since it is a client side interactive page

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

//FormEvent: Event that occurs whenever a form or form element gets/loses focus, a form element value is changed or the form is submitted.
//ChangeEvent: Changing the value of <input>, <select> and <textarea> element.
const initialState = {
	name: '',
	email: '',
	message: '',
};

export default function Feedback() {
	const [data, setData] = useState(initialState);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(JSON.stringify(data));
		const { name, email, message } = data;

		//send data to API route - need to send obj as a string to server
		const res = await fetch('http://localhost:3000/api/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				message,
			}),
		});
		const result = await res.json();
		console.log(result);

		//navigate to 'thank-you' page
		router.push('/thank-you/');
	};
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const name = e.target.name;

		setData((prevData) => ({
			...prevData,
			[name]: e.target.value,
		}));
	};
	//return array of data objects prop values --> create new array with ... -->check if all fields are filled/all values are truthy --> .every(Boolean)
	const canSave = [...Object.values(data)].every(Boolean);

	const content = (
		<form onSubmit={handleSubmit}>
			<h1>Contact Us</h1>
			<label htmlFor="name">Name:</label>
			<input
				type="text"
				id="name"
				name="name"
				placeholder="Susan"
				pattern="([A-Z][\w+.]{1,})"
				value={data.name}
				onChange={handleChange}
				autoFocus
			/>

			<label htmlFor="email"></label>
			<input
				type="email"
				id="email"
				name="email"
				placeholder="Jane@yoursite.com"
				pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
				value={data.email}
				onChange={handleChange}
			/>
			<label className="text-2xl mb-1" htmlFor="message">
				Message:
			</label>
			<textarea
				id="message"
				name="message"
				placeholder="Your message here..."
				rows={5}
				cols={33}
				value={data.message}
				onChange={handleChange}
			/>

			<button disabled={!canSave}>Submit</button>
		</form>
	);

	return content;
}
