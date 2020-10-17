import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../../common/FormsControl/FormControl';
import { requiredField } from '../../utils/validators/validators'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group row" >
                <label for="inputUsername" className="col-sm-2 col-form-label">
                    Username
                </label>
                <div className="col-sm-12">
                    <Field
                        placeholder={'Username'}
                        name={'username'}
                        component={InputField}
                        validate={requiredField}
                    />
                </div>
            </div>

            <div className="form-group row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                    Password
                </label>
                <div className="col-sm-12">
                    <Field
                        placeholder={'Password'}
                        name={'password'}
                        component={InputField}
                        validate={requiredField}
                        type={'password'}
                    />
                    <span className="text-danger">
                        {props.error}
                    </span>
                </div>
            </div>

            {props.isLoadingStatus ?
                <button className="btn btn-primary" type="submit" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading
            </button>
                :
                <button className="btn btn-primary" type="submit" disabled={!props.valid}>
                    Login
            </button>}
        </form>
    )
}
const LoginReduxForm = reduxForm({
    form: 'login',
})(LoginForm);

export default LoginReduxForm