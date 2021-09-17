import React from 'react'
import './formStyle.css'

const form = (props) => {
    
    return (
        //
        <div className="container" >
            <div>{props.error?error():null}</div>
           <form onSubmit={props.loadweather} >
           <div className="row">
                <div className="col-md-3 offset-md-3">
                    <input type="text" name="city" autoComplete="off" className="form-control" placeholder="City"
                    
                    ></input>
                </div>
                <div className="col-md-3">
                <input type="text" name="country" autoComplete="off" className="form-control" placeholder="Country"
                
                ></input>
                </div>
                <div className="col-md-3 mt-md-0 py-2 text-md-center">
                    <button className="btn btn-warning">Get Weather</button>
                </div>
            </div>
           </form>
            
        </div>
    )
}
function error(){
    return(
        <div className="alert alert-danger mx-5" role="alert">Please Enter City And Country</div>
    )
};

export default form
