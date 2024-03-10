const SigninForm = () => {
    return (
        <div className="signin_form_wrap">
            <form className="signin_form" id="signin_form">
                <h2 className="form_header">Welcome, please sign in</h2>
                <div className="form_element">
                    <input className="input_field" id="username" name="name" type="text" placeholder="Enter Username"/>
                </div>
                <div className="form_element">
                    <input className="input_field" id="password" name="password" type="password" placeholder="Enter password" />
                </div>
                <div className="form_element">
                    <button className="btn signin_btn">Sign in</button>
                </div>
                <div className="form_footer">
                    <p className="signup_link">New here, <a>signup</a></p>
                    <p className="signup_link"><a>forgot password?</a></p>
                </div>
            </form>
        </div>
    )
}

export default SigninForm