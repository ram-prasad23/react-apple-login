//You have a page where both the student and tutor logins under the same url but have two buttons seperate for the student and tutor.


<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
	<AppleLogin
		id="apple_user" // this is a id that we pass so that we can use the button twice on the same url or on the same page.
		clientId=//Your Client id
		redirectURI=// Your redirect url
		usePopup={true}
		callback={} // Catch the response 
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
		/>
</div>

<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
	<AppleLogin
		id="apple_tutor" // this is a id that we pass so that we can use the button twice on the same url or on the same page.
		clientId=//Your Client id
		redirectURI=// Your redirect url
		usePopup={true}
		callback={} // Catch the response 
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
		/>
</div>
