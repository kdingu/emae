import React, { useMemo, useRef, useState } from "react";
import HeadingText from "../heading-text";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

const SPARKPOST_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;

const generalFormClasses = `bg-black rounded-xl p-3`;
const inputClasses = `text-white border border-gray-400 col-span-2 sm:col-span-1`;
const textareaClasses = `text-white border border-gray-400 col-span-2`;

const AnimatedButtonContent = ({ loading }) => {
	return loading ? (
		<svg className="animate-spin h-8 w-8 mr-3 fill-current text-black" x="0px" y="0px" width="399.387px" height="399.387px" viewBox="0 0 399.387 399.387">
			<g>
				<path
					d="M340.896,58.488C303.18,20.771,253.033,0,199.694,0C146.353,0,96.207,20.771,58.491,58.488
   C20.772,96.206,0,146.354,0,199.693c0,53.342,20.772,103.489,58.491,141.206c37.716,37.717,87.863,58.488,141.203,58.488
   c53.337,0,103.486-20.771,141.203-58.488c37.719-37.718,58.49-87.865,58.49-141.206C399.387,146.355,378.615,96.207,340.896,58.488
   z M199.694,77.457c67.402,0,122.236,54.835,122.236,122.236s-54.834,122.236-122.236,122.236S77.457,267.094,77.457,199.693
   S132.292,77.457,199.694,77.457z M328.061,328.062c-34.289,34.287-79.877,53.17-128.367,53.17
   c-48.491,0-94.079-18.883-128.367-53.17c-34.289-34.287-53.173-79.877-53.173-128.37h41.148
   c0,77.411,62.979,140.391,140.392,140.391c77.412,0,140.39-62.979,140.39-140.391c0-77.412-62.979-140.391-140.39-140.391
   c-4.594,0-9.134,0.229-13.615,0.662v-41.31c4.508-0.332,9.049-0.5,13.615-0.5c48.49,0,94.078,18.883,128.367,53.171
   c34.289,34.289,53.172,79.878,53.172,128.368C381.232,248.186,362.35,293.775,328.061,328.062z"
				/>
			</g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
		</svg>
	) : (
		<span className="font-medium text-2xl uppercase">Submit</span>
	);
};

const SuccessOverlay = ({ mailSuccess, callback = () => {} }) => (
	<div
		className={`flex flex-col justify-center items-center backdrop-filter backdrop-blur absolute bg-black bg-opacity-50 h-full left-0 transition ease-out duration-100 ${
			mailSuccess ? "opacity-100" : "opacity-0 pointer-events-none"
		} success-overlay top-0 w-full`.trim()}>
		<div className="mb-8">
			<div className="mb-3">
				<svg className="fill-current h-32 m-auto text-green w-32" x="0px" y="0px" viewBox="0 0 40 40">
					<g>
						<path
							d="M20,0C8.974,0,0,8.973,0,20c0,11.027,8.974,20,20,20c11.029,0,20-8.973,20-20C40,8.973,31.029,0,20,0z M28.818,17.875
		l-8.562,8.564c-0.596,0.595-1.377,0.893-2.158,0.893c-0.779,0-1.561-0.298-2.156-0.893l-4.758-4.758
		c-1.191-1.191-1.191-3.124,0-4.313c1.191-1.192,3.121-1.192,4.314,0l2.6,2.6l6.408-6.407c1.188-1.189,3.123-1.189,4.312,0
		C30.01,14.752,30.01,16.684,28.818,17.875z"
						/>
					</g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
				</svg>
			</div>
			<p className="text-4xl font-bold">Thank You for contacting us!</p>
		</div>
		<p className="text-lg text-gray-300 text-center">
			Forgot something? Don't worry,{" "}
			<button
				className="font-bold rounded-xl px-2 py-1 hover:bg-white hover:bg-opacity-30  uppercase text-green"
				onClick={(e) => {
					e.preventDefault();
					callback();
				}}>
				Click Here
			</button>{" "}
			to send us another message!
		</p>
	</div>
);

const Contact = () => {
    const captchaRef = useRef()
	const [captcha, setCaptcha] = useState('');
	const [mailSuccess, setMailSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [captchaError, setCaptchaError] = useState(false);

	const buttonClasses = useMemo(() => `col-span-2 flex items-center justify-center mt-8 ${loading ? "bg-gray-400 text-gray-300 pointer-events-none" : "bg-green text-black"}`, [loading]);

	const {
		register,
		handleSubmit,
        reset,
		formState: { errors },
	} = useForm();

	const handleSuccess = (response) => {
		setLoading(false);
		setMailSuccess(true);
		console.log("Successfully sent mail -> ", response);
	};

	const handleError = (error) => {
		setLoading(false);
		console.error("Error sending mail -> ", error);
	};

	const onSubmit = (data) => {
		if (captcha) {
			const url = "/api/mail";
			const options = {
				method: "POST",
				body: JSON.stringify({ ...data, captcha }),
			};

			setLoading(true);
			fetch(url, options).then(handleSuccess).catch(handleError);
		} else {
			setCaptchaError(true);
		}
	};

	const handleResetForm = () => {
        captchaRef.current.reset()
        setCaptchaError(false);
		setCaptcha('');
        setMailSuccess(false)
        setLoading(false)
        reset()
    };

	const onChangeCaptcha = (value) => {
		setCaptchaError(false);
		setCaptcha(value);
	};

	return (
		<div className={`relative`}>
			<HeadingText text={"Discuss with us."} />
			<form className={`bg-white bg-opacity-10 grid grid-cols-2 p-4 sm:p-10 gap-3 rounded-xl relative overflow-hidden`} onSubmit={handleSubmit(onSubmit)}>
				<input
					className={`${generalFormClasses} ${inputClasses} ${errors["firstname"] ? "border-4 border-red-600" : ""}`}
					type="text"
					placeholder="First Name"
					{...register("firstname", { required: true })}
				/>
				<input
					className={`${generalFormClasses} ${inputClasses} ${errors["lastname"] ? "border-4 border-red-600" : ""}`}
					type="text"
					placeholder="Last Name"
					{...register("lastname", { required: true })}
				/>
				<input className={`${generalFormClasses} ${inputClasses} ${errors["email"] ? "border-4 border-red-600" : ""}`} type="email" placeholder="Email" {...register("email", { required: true })} />
				<input className={`${generalFormClasses} ${inputClasses} ${errors["mobile"] ? "border-4 border-red-600" : ""}`} type="tel" placeholder="Mobile" {...register("mobile", {})} />
				<input className={`${generalFormClasses} ${inputClasses} ${errors["company"] ? "border-4 border-red-600" : ""} sm:col-span-2`} type="text" placeholder="Company" {...register("company", {})} />
				<textarea
					rows={8}
					placeholder={"Message"}
					className={`${generalFormClasses} ${textareaClasses} ${errors["message"] ? "border-4 border-red-600" : ""}`}
					{...register("message", { required: true })}
				/>

				<button className={`${generalFormClasses} ${buttonClasses}`} type="submit" role={"button"}>
					<AnimatedButtonContent loading={loading} />
				</button>

				<div className="col-span-2 flex flex-col items-center justify-center mt-10">
					<ReCAPTCHA ref={captchaRef} theme="dark" sitekey={SPARKPOST_KEY} onChange={onChangeCaptcha} />
					{captchaError && "Please complete the captcha."}
				</div>

				<SuccessOverlay mailSuccess={mailSuccess} callback={handleResetForm} />
			</form>
			<img className={"hidden sm:block absolute -top-10 opacity-20 right-0"} alt={"logo"} src={"logo/apieda_mini_logo_mini.svg"} />
		</div>
	);
};

export default Contact;
