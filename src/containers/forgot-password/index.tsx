import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIStatus } from "../../constants";
import { Locations } from "../../constants/locations";
import { useAppDispatch, useAppSelector } from "../../modal/hooks";
import I18 from "../../plugins/i18";
import { forgotPassword } from "../../services/user/user.service";
import "./forgot-password.scss";
import { clearForgotPassword } from "../../services/user/user.slice";

type InvalidProps = {
	email: boolean;
};

export const ForgotPassword: React.FunctionComponent = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const [invalid, setInvalid] = useState<InvalidProps>({ email: false });
	const [loading, setLoading] = useState<boolean>(false);
	const user = useAppSelector((store) => store.user);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user.forgotPasswordComplete === APIStatus.FULFILLED) {
			setLoading(false);
			navigate(Locations.LOGIN);
			dispatch(clearForgotPassword());
		}
		if (user.forgotPasswordComplete === APIStatus.REJECTED) {
			setLoading(false);
			dispatch(clearForgotPassword());
		}
	}, [user.forgotPasswordComplete]);

	const validate = (): boolean => {
		const prevState: InvalidProps = JSON.parse(JSON.stringify(invalid));
		if (!emailRef.current?.value || !emailRef.current?.value.trim()) {
			prevState.email = true;
		}
		setInvalid(prevState);
		return !prevState.email;
	};

	const forgotPasswordClicked = () => {
		if (validate()) {
			setLoading(true);
			dispatch(forgotPassword({ email: emailRef.current?.value ?? "" }));
		}
	};

	const onKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			forgotPasswordClicked();
		}
	};

	return (
		<div className="login_main_container" onKeyDown={onKeyPress}>
			<div className="login_field_card">
				<div className="w-100 h-100">
					<div className="login_credentials_container">
						<div className="login_heading_text_data mb-2">Forgot Password</div>
						<div className="forgot_description">Seamless management solutions for projects and employees !</div>
						<div className="login_input_container">
							<div className="login_input_label">Email Id</div>
							<div className="position-relative">
								<input
									ref={emailRef}
									type="text"
									maxLength={100}
									onChange={() => setInvalid((prevState) => ({ ...prevState, email: false }))}
								/>
								{invalid.email ? (
									<span className="invalid_message">
										<I18 tkey="ENTER_EMAIL" />
									</span>
								) : (
									""
								)}
							</div>
						</div>
						<div className="text-center margin_top_43 mb-1">
							<button className="primary_btn login_button" disabled={loading} onClick={forgotPasswordClicked}>
								<I18 tkey="SUBMIT" />
							</button>
						</div>
						<div className="back_login_label mt-2">
							<span className="cursor-pointer" onClick={() => navigate(Locations.LOGIN)}>
								<I18 tkey="BACK_TO_LOGIN" />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
