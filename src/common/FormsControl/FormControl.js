import React from 'react'

export const InputField = ({input, meta, ...props}) => {
    const requiredError = meta.error && meta.touched
    return(
        <>
            <input className={requiredError ? "form-control is-invalid" : "form-control"}
                {...input}
                {...props}  
            />
            {requiredError &&
                <span className="text-danger">
                    {meta.error}
                </span> }
        </>   
    )
}