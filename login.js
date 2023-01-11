import React, { Component } from 'react';
import { Form, Input, Button } from 'antd'
import { AppleFilled, LockFilled } from '@ant-design/icons';
import { BrowserRouter as Link } from 'react-router-dom';
import "./login.css";
import * as actions from '../../../store/actions/authentication/authentication'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { globalVariable } from '../../../utils/config/config'
import GoogleLogin from 'react-google-login'
import AppleLogin from './apple'
import googleIcon from '../../../assets/images/google-icon.png'
//import  Apple from './Appleloginbutton'
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import * as routeName from '../../../components/route-names'
import * as servicesActions from '../../../store/actions/public/Services'
import axios from "../../../utils/axios";
import { withErrorHandler } from "../../../utils/handler";
import queryString from "query-string";
import * as SecureLS from "secure-ls";
const FormItem = Form.Item
let urlElements = window.location.href.split('/');
class OnboardingLogin extends Component {
	constructor(props) {
		super(props)
		this.loginContentPage = this.loginContentPage.bind(this);
	}
	state = {
		loginType: ''
	}
	async componentDidMount() {
		var ls = new SecureLS();
		let url = this.props.location.search;
		let params = queryString.parse(url);
		if (params && !params.type) {
			ls.removeAll();
		}

		// await this.props.onTutorSiderbar(false);
		// await this.props.onsiderbarLogo(false)
		// await this.props.onHeaderSearch(true)


		if (this.props.loginSignupTabValue) {
			await this.setState({
				loginType: this.props.loginSignupTabValue
			})
		}

	}
	tabChage = async (tabType) => {

		await this.props.loginSignupTab(tabType)
	}
	loginContentPage = async (loginType) => {
		if (loginType == 'student') {
			await this.setState({
				loginType: 'student'
			})
		} else if (loginType == 'tutor') {
			await this.setState({
				loginType: 'tutor'
			})
		} else if (loginType == 'StClose') {
			await this.setState({
				loginType: 'StClose',
			})
		}
		else {
			await this.setState({
				loginType: 'TuClose',
			})
		}
	}

	getFacebookToken = (response, signInType) => {
		let url = this.props.location.search;
		let params = queryString.parse(url);
		if (signInType == 'user') {

			if (response.accessToken) {
				let requestParams = {
					type: 'facebook',
					token: response.accessToken
				}
				this.props.onUserSocialSignup(requestParams)
				this.props.searchClassCampsRouteRedirect(params)
			}
		} else {
			if (response.accessToken) {
				let requestParams = {
					type: 'facebook',
					token: response.accessToken
				}
				this.props.onTutorSocialSignup(requestParams)
			}
		}
	}
	getGoogleToken = (response, signInType) => {
		let url = this.props.location.search;
		let params = queryString.parse(url);
		if (signInType == 'user') {
			if (response.tokenId || response.Zi) {
				console.log()
				let requestParams = {
					type: 'google',
					token: response.tokenId || response.Zi
					// token: response.tokenId || response.Zi.id_token
				}
				this.props.onUserSocialSignup(requestParams)
				this.props.searchClassCampsRouteRedirect(params)
			}
		} else {
			if (response.tokenId || response.Zi) {
				let requestParams = {
					type: 'google',
					token: response.tokenId || response.Zi
					// token: response.tokenId || response.Zi.id_token
				}
				this.props.onTutorSocialSignup(requestParams)
			}
		}

	}

	getAppleToken = (response, signInType) => {
		let url = this.props.location.search;
		let params = queryString.parse(url);
		let requestParams
		if (signInType === 'user') {
			if (response.authorization) {
				requestParams = {
					type: 'apple',
					url: 'sign-in',
					domain: urlElements[2],
					token: response
				}
				console.log('requestparams', requestParams)
				this.props.onSocialUserSignup(requestParams)
				this.props.searchClassCampsRouteRedirect(params)
			}
		} else {

			if (response.authorization) {
				let requestParams = {
					type: 'apple',
					url: 'sign-in',
					domain: urlElements[2],
					token: response
				}
				console.log('requestparams---', requestParams)
				this.props.onTutorSocialSignup(requestParams)
			}
		}

	}
	onFinish = (credentials, signInType) => {
		let url = this.props.location.search;
		let params = queryString.parse(url);
		let login = { ...credentials }
		if (signInType == 'user') {
			login.login_type = 'user'
			this.props.onSignIn(login)
			this.props.searchClassCampsRouteRedirect(params)
		} else {
			login.login_type = 'provider'
			this.props.onSignIn(login)
		}



	};
	componentDidUpdate(preProps) {

	}
	render() {
		let url = this.props.location.search;
		let params = queryString.parse(url);
		return (
			<div className={this.state.loginType == 'student' ? 'login-page-container student-login-open modalFunction' : this.state.loginType == 'tutor' ? 'login-page-container tutor-login-open modalFunction' : this.state.loginType == 'StClose' ? 'login-page-container StudentClose modalFunction' : this.state.loginType == 'TuClose' ? 'login-page-container TutorClose modalFunction' : 'login-page-container'}>
				<div className="row login-height align-items-center justify-content-around">
					<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
						<div className="student-login">
							<div className="login-image-scetion" onClick={() => this.loginContentPage('student')} >
								<img className="img-mt" src={require("../../../assets/images/student-login-image.png")} alt="img" />
								<span className="shadow"></span>
							</div>
							<div className="login-text" onClick={() => this.loginContentPage('student')} >
								Student Login <i className="ntm-right-arrow login-icon"></i>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
						<div className="tutor-login">
							<div className="login-image-scetion" onClick={() => this.loginContentPage('tutor')} >
								<img className="img-mt-0" src={require("../../../assets/images/tutor-login-image.png")} alt="img" />
								<span className="shadow"></span>
							</div>
							<div className="login-text" onClick={() => this.loginContentPage('tutor')}>
								Tutor Login <i className="ntm-right-arrow login-icon"></i>
							</div>
						</div>
					</div>
					{/*Student Login modal*/}

					<div className={this.state.loginType == 'student' ? 'student-login-modal open' : 'student-login-modal'}>
						<div className="row student-login-modal-inner align-items-center justify-content-around">
							<button disabled={this.props.loading} className="btn login-close" onClick={() => this.loginContentPage('TuClose')}><i className="ntm-cancel"></i></button>
							<div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-8">
								<div className="row">
									<div className="col-12 mb-4">
										<div className="login-title">Login using your email ID</div>
									</div>
									<div className="col-12">
										<Form scrollToFirstError={true} onFinish={(e) => this.onFinish(e, 'user')} className='login-form'>
											<FormItem name="username" rules={[{
												required: true, message: this.props.t(
													"authentication required email validation message"
												)
											}, {
												type: 'email',
												message: this.props.t(
													"authentication email validation message"
												)
											}]}>
												<Input

													prefix={<i className="ntm-envelope"></i>}
													size="large" placeholder="Your Email ID"
												/>

											</FormItem>
											<FormItem name="password" rules={[{
												required: true, message: this.props.t(
													"authentication required password validation message"
												)
											}]}>
												<Input
													size="large"
													prefix={<LockFilled />}
													type='password'
													placeholder="Password"
												/>

											</FormItem>
											<div className="full-width mb-3 mt-2">
												<div className="row login-input">
													<div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
														<Button type='primary'
															htmlType='submit' className="btn btn-sm btn-login"
															loading={this.props.loading}>Login</Button>
													</div>
													<div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
														<div className="new-account">
															Don’t have an account? <Link
																to={params && (params.classId || params.campId) ? params.campId ? `${routeName.userSignUp}?campId=${params.campId}` : `${routeName.userSignUp}?classId=${params.classId}` : routeName.userSignUp}
																onClick={() => this.tabChage('student')}
																className='text-primary utils__link--underlined'
																style={{ margin: '0 5px' }}
															>
																Signup here</Link>
														</div>
													</div>
												</div>
											</div>
										</Form>
									</div>
									<div className="col-12 mb-3 mt-3">
										<div className="login-with-text">
											<span >Or Login with</span>
										</div>
										<div className="login-with-line"></div>
									</div>
									<div className="col-12">
										<div className="row login-input">
											{/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 pr-lg-0">
												<FacebookLogin
													appId={globalVariable.FACEBOOK_ID}
													autoLoad={false}
													fields='name,email,picture'
													callback={(e) => this.getFacebookToken(e, 'user')}
													redirectUri={window.location.href}
													render={renderProps => (
														<div
															className='btn btn-facebook'
															onClick={renderProps.onClick}
														>
															<i className="ntm-facebook-logo"></i>
																Login with Facebook

														</div>
													)}
												/>
											</div> */}
											<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-3">

												<GoogleLogin
													clientId={globalVariable.GOOGLE_ID}
													render={renderProps => (
														<div
															className='google-btn'
															onClick={renderProps.onClick}
															disabled={renderProps.disabled}
														>
															<div class="google-icon-wrapper">
																<img
																	src={googleIcon}
																	className='google-icon'
																	alt='img'
																/>
															</div>
															<div className='btn-text'>
																Login with Google
															</div></div>
													)}
													onSuccess={(e) => this.getGoogleToken(e, 'user')}
													onFailure={this.getGoogleToken}
													cookiePolicy={'single_host_origin'}
												/>
											</div>
											{/* {Apple('student')} */}
											<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-3">
												<AppleLogin
													id="apple_user"
													clientId={globalVariable.APPLE_ID}
													redirectURI={globalVariable.REDIRECT_URL_SIGNIN}
													usePopup={true}
													callback={(e) => this.getAppleToken(e, 'user')} // Catch the response
													scope="email name"
													responseMode="query"
													render={renderProps => (
														<div
															className='btn btn-google'
															onClick={renderProps.onClick}
															disabled={renderProps.disabled}
														>
															<AppleFilled className='btn-apple' />
															<div className='btn-text-apple'>
																Login with Apple
															</div>
														</div>
													)}
													cookiePolicy={'single_host_origin'}
												/>
											</div>

										</div>
									</div>
									<div className="col-12 mt-3 ">
										<div className="forgot-password-account">
											<Link
												to={routeName.resetPassword}
												// onClick={() => this.tabChage('student')}
												className='text-primary utils__link--underlined'
												style={{ margin: '0 5px' }}
											>
												Forgot Password? </Link>
										</div>
									</div>


								</div>
							</div>
						</div>
					</div>
					{/*Tutor Login modal*/}
					<div className={this.state.loginType == 'tutor' ? 'tutor-login-modal open' : 'tutor-login-modal'}>
						<div className="row student-login-modal-inner align-items-center justify-content-around">
							<button disabled={this.props.loading} className="btn login-close" onClick={() => this.loginContentPage('StClose')}><i className="ntm-cancel"></i></button>
							<div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-8">
								<div className="row">
									<div className="col-12 mb-4">
										<div className="login-title">Login using your email ID</div>
									</div>
									<div className="col-12">
										<Form scrollToFirstError={true} onFinish={(e) => this.onFinish(e, 'provider')} className='login-form'>
											<FormItem name="username" rules={[{
												required: true, message: this.props.t(
													"authentication required email validation message"
												)
											}, {
												type: 'email',
												message: this.props.t(
													"authentication email validation message"
												)
											},]}>
												<Input

													prefix={<i className="ntm-envelope"></i>}
													size="large" placeholder="Your Email ID"
												/>

											</FormItem>
											<FormItem name="password" rules={[{
												required: true, message: this.props.t(
													"authentication required password validation message"
												)
											}]}>
												<Input
													size="large"
													prefix={<LockFilled />}
													type='password'
													placeholder="Password"
												/>

											</FormItem>
											<div className="full-width mb-3 mt-2">
												<div className="row login-input">
													<div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
														<Button type='primary'
															htmlType='submit' className="btn btn-sm btn-login"
															loading={this.props.loading}>Login</Button>
													</div>
													<div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
														<div className="new-account">
															Don’t have an account? <Link
																to={routeName.userSignUp}
																onClick={() => this.tabChage('tutor')}
																className='text-primary utils__link--underlined'
																style={{ margin: '0 5px' }}
															>
																Signup here</Link>

														</div>
													</div>
												</div>
											</div>
										</Form>
									</div>
									<div className="col-12 mb-3 mt-3">
										<div className="login-with-text">
											<span >Or Login with</span>
										</div>
										<div className="login-with-line"></div>
									</div>
									<div className="col-12 mb-3 mt-3">
										<div className="row login-input">
											{/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 pr-0">
												<FacebookLogin
													appId={globalVariable.FACEBOOK_ID}
													autoLoad={false}
													fields='name,email,picture'
													callback={(e) => this.getFacebookToken(e, 'provider')}
													redirectUri={window.location.href}
													render={renderProps => (
														<div
															className='btn btn-facebook'
															onClick={renderProps.onClick}
														>
															<i className="ntm-facebook-logo"></i>
													Login with Facebook
														</div>
													)}
												/>
											</div> */}
											<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-3">

												<GoogleLogin
													clientId={globalVariable.GOOGLE_ID}
													render={renderProps => (
														<div
															className='google-btn'
															onClick={renderProps.onClick}
															disabled={renderProps.disabled}
														>
															<div class="google-icon-wrapper">
																<img
																	src={googleIcon}
																	className='google-icon'
																	alt='img'
																/>
															</div>
															<div className='btn-text'>
																Login with Google
															</div></div>
													)}
													onSuccess={(e) => this.getGoogleToken(e, 'provider')}
													onFailure={this.getGoogleToken}
													cookiePolicy={'single_host_origin'}
												/>
											</div>

											<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-3">
												<AppleLogin
													id="apple_user"
													clientId={globalVariable.APPLE_ID}
													redirectURI={globalVariable.REDIRECT_URL_SIGNIN}
													usePopup={true}
													callback={(e) => this.getAppleToken(e, 'provider')} // Catch the response
													scope="email name"
													responseMode="query"
													render={renderProps => (
														<div
															className='btn btn-google'
															onClick={renderProps.onClick}
															disabled={renderProps.disabled}
														>
															<AppleFilled className='btn-apple' />
															<div className='btn-text-apple'>
																Login with Apple
															</div>
														</div>
													)}
													cookiePolicy={'single_host_origin'}
												/>
											</div>
										</div>
									</div>
									<div className="col-12 mt-3 ">
										<div className="forgot-password-account">
											<Link
												to={routeName.resetPassword}
												// onClick={() => this.tabChage('student')}
												className='text-primary utils__link--underlined'
												style={{ margin: '0 5px' }}
											>
												Forgot Password? </Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.authentication.loading,
		loginSignupTabValue: state.authentication.loginSignupTab
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loginSignupTab: credentials => dispatch(actions.loginSignupTab(credentials)),
		onSignIn: credentials => dispatch(actions.signIn(credentials)),
		disableLoading: () => dispatch(actions.disableLoading()),
		onTutorSocialSignup: credentials =>
			dispatch(actions.socialSignupProvider(credentials)),
		onUserSocialSignup: credentials =>
			dispatch(actions.userSocialSignupProvider(credentials)),
		onSocialUserSignup: (credentials) =>
			dispatch(actions.userSocialSignupProvider(credentials)),
		onsiderbarLogo: requestParams =>
			dispatch(servicesActions.sidebarLogo(requestParams)),
		onHeaderSearch: requestParams =>
			dispatch(servicesActions.onHeaderSearch(requestParams)),
		searchClassCampsRouteRedirect: requestParams =>
			dispatch(servicesActions.searchClassCampsRouteRedirect(requestParams)),
		onTutorSiderbarLogo: requestParams =>
			dispatch(servicesActions.sidebarLogo(requestParams)),

		onTutorSiderbar: requestParams =>
			dispatch(servicesActions.onTutorPublicsiderbar(requestParams)),
		onLogin: () => dispatch(actions.onCheckLogin()),
		signInSuccess: () => dispatch(actions.signInSuccess()),
	};
};



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(withNamespaces()(OnboardingLogin), axios));
