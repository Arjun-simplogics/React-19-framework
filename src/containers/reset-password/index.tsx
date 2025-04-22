import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIStatus } from "../../constants";
import { Locations } from "../../constants/locations";
import { useAppDispatch, useAppSelector } from "../../modal/hooks";
import I18 from "../../plugins/i18";
import "./reset-password.scss";
import { resetPassword, verifyToken } from "../../services/user/user.service";
import { clearResetPassword, clearVerifyToken } from "../../services/user/user.slice";

type InvalidProps = {
	newPassword: boolean;
	confirmPassword: boolean;
	confirmPasswordNotMatch: boolean;
};

export const ResetPassword: React.FunctionComponent = () => {
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [invalid, setInvalid] = useState<InvalidProps>({
		newPassword: false,
		confirmPassword: false,
		confirmPasswordNotMatch: false,
	});
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const user = useAppSelector((store) => store.user);
	const [loading, setLoading] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

	useEffect(() => {
		if (params.token) {
			setLoading(true);
			dispatch(verifyToken(params.token));
		} else {
			navigate(Locations.LOGIN);
		}
	}, [params.token]);

	useEffect(() => {
		if (user.verifyTokenComplete === APIStatus.FULFILLED) {
			setLoading(false);
			dispatch(clearVerifyToken());
		}
		if (user.verifyTokenComplete === APIStatus.REJECTED) {
			setLoading(false);
			navigate(Locations.LOGIN);
			dispatch(clearVerifyToken());
		}
	}, [user.verifyTokenComplete]);

	useEffect(() => {
		if (user.resetPasswordComplete === APIStatus.FULFILLED) {
			setLoading(false);
			navigate(Locations.LOGIN);
			dispatch(clearResetPassword());
		}
		if (user.resetPasswordComplete === APIStatus.REJECTED) {
			setLoading(false);
			dispatch(clearResetPassword());
		}
	}, [user.resetPasswordComplete]);

	const validate = (): boolean => {
		const prevState: InvalidProps = JSON.parse(JSON.stringify(invalid));
		if (!newPasswordRef.current?.value || !newPasswordRef.current?.value.trim()) {
			prevState.newPassword = true;
		}
		if (!confirmPasswordRef.current?.value || !confirmPasswordRef.current?.value.trim()) {
			prevState.confirmPassword = true;
		}
		if (newPasswordRef.current?.value.trim() && confirmPasswordRef.current?.value.trim()) {
			if (newPasswordRef.current?.value !== confirmPasswordRef.current?.value) {
				prevState.confirmPasswordNotMatch = true;
			}
		}
		setInvalid(prevState);
		return !(prevState.newPassword || prevState.confirmPassword || prevState.confirmPasswordNotMatch);
	};

	const onKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			resetClicked();
		}
	};

	const resetClicked = () => {
		if (validate()) {
			setLoading(true);
			dispatch(
				resetPassword({
					password: newPasswordRef.current?.value ?? "",
					token: params.token ?? "",
				})
			);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			if (validate()) {
				resetClicked();
			}
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	return (
		<div className="login_main_container reset_password_background_image" onKeyDown={onKeyPress}>
			<div className="login_field_card">
				<div className="w-100 h-100">
					<div className="login_credentials_container">
						<div className="logo_container">
							<img src="./images/logo.png" className="login_logo" />
						</div>
						<div className="login_heading_text_data">Reset Password</div>
						<div className="login_description">Enter a New Password</div>
						<div className="login_input_container mb-4">
							<div className="login_input_label">New Password</div>
							<div className="eye_icon_container position-relative">
								<input
									ref={newPasswordRef}
									type={showConfirmPassword ? "text" : "password"}
									maxLength={20}
									onChange={() => setInvalid((prevState) => ({ ...prevState, password: false }))}
								/>
								{showPassword ? (
									<a key="fa-eye-slash" className="eye" onClick={() => setShowPassword(false)}>
										<i className="fas fa-eye-slash"></i>
									</a>
								) : (
									<a key="fa-eye" className="eye" onClick={() => setShowPassword(true)}>
										<i className="fas fa-eye"></i>
									</a>
								)}
								{invalid.newPassword ? <span className="invalid_message">Enter a valid password</span> : ""}
							</div>
						</div>
						<div className="login_input_container">
							<div className="login_input_label">Confirm Password</div>
							<div className="eye_icon_container position-relative">
								<input
									ref={confirmPasswordRef}
									type={showConfirmPassword ? "text" : "password"}
									maxLength={20}
									onChange={() =>
										setInvalid((prevState) => ({
											...prevState,
											confirmPassword: false,
											confirmPasswordNotMatch: false,
										}))
									}
								/>
								{showConfirmPassword ? (
									<a key="fa-eye-slash" className="eye" onClick={() => setShowConfirmPassword(false)}>
										<i className="fas fa-eye-slash"></i>
									</a>
								) : (
									<a key="fa-eye" className="eye" onClick={() => setShowConfirmPassword(true)}>
										<i className="fas fa-eye"></i>
									</a>
								)}
								{invalid.confirmPassword ? (
									<span className="invalid_message error_text">
										<I18 tkey="ENTER_CONFIRM_PASSWORD" />
									</span>
								) : (
									""
								)}
								{!invalid.confirmPassword && invalid.confirmPasswordNotMatch ? (
									<span className="invalid_message">
										<I18 tkey="CONFIRM_PASSWORD_NOT_MATCH" />
									</span>
								) : (
									""
								)}
							</div>
						</div>
						<div className="text-center margin_top_43">
							<button className="primary_btn login_button" disabled={loading} onClick={resetClicked}>
								<I18 tkey="RESET" />
							</button>
						</div>
					</div>
					<div className="owner_info text-center">PM Tool Powered by Simplogics Solutions</div>
				</div>
			</div>
		</div>
	);
};
