import React, { useEffect, useState } from 'react'

const HomeTimer = (props) => {

    return (
        <div>
            {props.isSuccess ? 
                <h3>{props.dateTime}</h3>
                :
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only"></span>
                </div>
            }
            <div>
                <button onClick = {props.logout} className="btn btn-primary" type="submit">
                    Logout
                </button>
            </div>    
        </div>
    )
}
export default HomeTimer
