import React, { useRef, useState } from "react";
import I18 from "../../plugins/i18";
import "./login.scss";

type InvalidProps = {
	email: boolean;
	password: boolean;
};

export const Login: React.FunctionComponent = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [invalid, setInvalid] = useState<InvalidProps>({ email: false, password: false });
	const [loading, setLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const onKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			if (document.activeElement === emailRef.current) {
				passwordRef.current?.focus();
			} else {
				loginClicked();
			}
		}
	};

	const validate = (): boolean => {
		const prevState: InvalidProps = JSON.parse(JSON.stringify(invalid));
		if (!emailRef.current?.value || !emailRef.current?.value.trim()) {
			prevState.email = true;
		}
		if (!passwordRef.current?.value || !passwordRef.current?.value.trim()) {
			prevState.password = true;
		}
		setInvalid(prevState);
		return !(prevState.email || prevState.password);
	};

	const loginClicked = () => {
		if (validate()) {
			setLoading(true);
		}
	};
	return (
		<div className="auth_container" onKeyDown={onKeyPress}>
			<div className="d-flex align-items-center justify-content-end h-100">
				<div className="auth_card">
					<div className="auth_card_content">
						<div className="text-center">
							<img className="auth_logo" src="/images/logo.png" />
						</div>
						<div className="auth_help_text pt-2 pb-5">
							<I18 tkey="LOGIN_WELCOME" />
						</div>
						<div className="auth_tools_container">
							<div className="auth_form_container mb-3">
								<div className="auth_form_label mb-1 font_13">
									<I18 tkey="USER_CODE" />
								</div>
								<input
									id="text"
									ref={emailRef}
									type="text"
									maxLength={100}
									onChange={() => setInvalid((prevState) => ({ ...prevState, email: false }))}
								/>
								{invalid.email ? (
									<span className="invalid login_invalid">
										<I18 tkey="ENTER_VALID_USER_CODE" />
									</span>
								) : (
									""
								)}
							</div>
							<div className="auth_tools_container pb-3">
								<div className="auth_form_label mb-1 font_13">
									<I18 tkey="PASSWORD" />
								</div>
								<div className="auth_form_container password_auth">
									<input
										id="password"
										ref={passwordRef}
										type={showPassword ? "text" : "password"}
										maxLength={100}
										onChange={() =>
											setInvalid((prevState) => ({ ...prevState, password: false, notValidPassword: false }))
										}
									/>
									{showPassword ? (
										<a className="auth_eye" key="fa-eye-slash" onClick={() => setShowPassword(false)}>
											<svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 24 18" fill="none">
												<path
													d="M0 8.45391C2.05871 5.05497 4.89777 2.66165 8.82596 1.74073C11.4037 1.13639 13.9304 1.39951 16.3663 2.44719C16.543 2.52288 16.6391 2.49765 16.767 2.36789C17.4711 1.65182 18.1842 0.944758 18.8942 0.234693C19.1021 0.0268399 19.3472 -0.0518561 19.6331 0.0346493C19.9005 0.115147 20.0663 0.299572 20.1263 0.568099C20.1912 0.858854 20.0759 1.08953 19.8704 1.29438C18.8978 2.26156 17.9294 3.23235 16.9599 4.20253C12.7103 8.45211 8.45951 12.7017 4.21173 16.9537C4.00448 17.1609 3.78221 17.3111 3.47824 17.2558C3.1989 17.2048 3.00366 17.0408 2.91595 16.7656C2.82524 16.4809 2.89793 16.2334 3.10578 16.0243C3.70351 15.4242 4.30244 14.8259 4.90197 14.2281C4.96024 14.1699 5.02873 14.1224 5.11884 14.0485C2.98083 12.6885 1.25253 10.9818 0 8.81375C0 8.6936 0 8.57345 0 8.45391ZM15.4424 3.64325C15.4214 3.63183 15.3908 3.61141 15.3565 3.59879C12.9007 2.66886 10.4239 2.6178 7.95069 3.49246C5.28464 4.43561 3.26258 6.21077 1.65321 8.49716C1.56731 8.61971 1.60456 8.6924 1.67244 8.79032C2.35907 9.78093 3.16165 10.6676 4.07116 11.457C4.72235 12.0223 5.418 12.5257 6.13948 12.9264C6.75763 12.3082 7.36017 11.7063 7.96511 11.1019C6.65491 9.16337 7.16613 6.94547 8.38322 5.6569C9.58648 4.38335 11.9209 3.6871 13.9977 5.09401C14.4794 4.61043 14.9588 4.12864 15.4424 3.64325ZM9.0284 10.0362C10.326 8.73926 11.62 7.44528 12.9115 6.15431C12.0405 5.56319 10.5471 5.56499 9.50598 6.57302C8.55863 7.48973 8.34957 9.02521 9.0284 10.0362Z"
													fill="#676767"
												/>
												<path
													d="M7.91587 15.2715C8.29853 14.8925 8.66198 14.5266 9.03443 14.1704C9.07648 14.1301 9.1744 14.1205 9.23808 14.1337C12.8467 14.8853 16.0041 13.9271 18.7987 11.6083C19.7725 10.8003 20.6045 9.85953 21.3332 8.82507C21.4401 8.67368 21.4263 8.57997 21.326 8.4382C20.4718 7.23073 19.4685 6.16803 18.2953 5.26633C18.231 5.21707 18.1686 5.16601 18.1133 5.12216C18.4617 4.77193 18.7993 4.43372 19.1628 4.06787C19.5088 4.36463 19.874 4.66079 20.2195 4.97798C21.2245 5.8989 22.0871 6.93817 22.8206 8.08857C23.0591 8.46283 23.0681 8.79503 22.8254 9.16929C20.989 12.0023 18.5777 14.1319 15.3403 15.2157C12.9452 16.017 10.5188 16.0333 8.09008 15.3352C8.04202 15.3208 7.99456 15.3004 7.91587 15.2715Z"
													fill="#676767"
												/>
												<path
													d="M15.6875 7.50842C16.0552 9.23252 15.6581 10.6791 14.3953 11.8307C13.2678 12.8591 11.9287 13.1553 10.3879 12.8021C10.8366 12.3557 11.2469 11.943 11.665 11.5387C11.7119 11.4931 11.8008 11.4805 11.8723 11.4721C13.1536 11.3201 14.2001 10.276 14.3497 8.99944C14.3581 8.92735 14.3683 8.83784 14.414 8.79159C14.8189 8.37408 15.2328 7.96438 15.6875 7.50842Z"
													fill="#676767"
												/>
											</svg>
										</a>
									) : (
										<a className="auth_eye" key="fa-eye" onClick={() => setShowPassword(true)}>
											<svg xmlns="http://www.w3.org/2000/svg" width="21" height="13" viewBox="0 0 24 16" fill="none">
												<path
													d="M11.3512 0C8.42552 0.0325547 5.73197 1.12243 3.35548 3.05589C2.29533 3.91859 1.37602 4.91575 0.569226 6.01837C-0.191563 7.05799 -0.190147 8.2151 0.576303 9.25331C2.2741 11.552 4.37246 13.3651 7.06105 14.3969C11.1502 15.9659 15.0079 15.3892 18.6222 12.9893C20.1678 11.9631 21.4467 10.6517 22.5281 9.14786C23.1799 8.24058 23.2068 7.06932 22.5656 6.17406C20.8409 3.76785 18.6654 1.91648 15.8827 0.830144C14.4786 0.281668 13.0214 0.0106157 11.3512 0ZM11.0561 1.69921C12.7921 1.69709 14.1417 1.94974 15.303 2.40338C17.7404 3.35525 19.6201 5.00209 21.1445 7.09055C21.407 7.45006 21.3964 7.82798 21.1289 8.19528C20.1763 9.50384 19.0709 10.6652 17.7234 11.5704C14.5267 13.719 11.1134 14.1889 7.50691 12.7643C5.1467 11.8315 3.34274 10.1825 1.87071 8.14928C1.61522 7.79613 1.6407 7.42034 1.91458 7.04525C2.57275 6.14434 3.31019 5.31419 4.15449 4.58242C6.26346 2.75582 8.68525 1.72469 11.0561 1.69921Z"
													fill="#676767"
												/>
												<path
													d="M11.4984 3.39357C9.03982 3.39923 7.26984 5.21238 7.27692 7.7198C7.28399 10.1706 9.02567 11.8726 11.5239 11.8691C13.9818 11.8656 15.71 10.109 15.7057 7.61859C15.7008 5.13453 13.9627 3.38861 11.4984 3.39357ZM11.497 5.08924C12.9804 5.08216 14.0447 6.12674 14.0561 7.6009C14.0681 9.097 13.0186 10.1663 11.531 10.1734C10.0476 10.1805 8.98391 9.13663 8.97188 7.66176C8.95985 6.16567 10.0087 5.09702 11.497 5.08924Z"
													fill="#676767"
												/>
											</svg>
										</a>
									)}
									{invalid.password ? (
										<span className="invalid password_invalid">
											<I18 tkey="ENTER_PASSWORD" />
										</span>
									) : (
										""
									)}
								</div>
							</div>
							<div className="px-3 mt-4">
								<button className="primary_btn w-100 height_40" disabled={loading} onClick={loginClicked}>
									<I18 tkey="LOGIN" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
