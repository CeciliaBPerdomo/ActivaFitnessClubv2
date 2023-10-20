import React, { Component } from "react";
import wa from "../../img/whatsapp.png"

export const PreFooter = () => {
    return (
    <>
        <div className="container bg-opacity-10 border border-danger rounded border-2">
                <div className="row">

                    <div className="col" style={{margin: "25px"}}>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.351810490404!2d-57.842770425090066!3d-34.468598450373406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a313f2236d1c15%3A0x6c5d7dcbab5d10d6!2sActiva%20Fitness%20Club!5e0!3m2!1ses-419!2suy!4v1687292770584!5m2!1ses-419!2suy" 
                            width="400px" 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>

                    <div className="col text-start" style={{color: "white", margin: "25px"}}>
                        <br /><br />
                        <h5>Fosalba 674, Colonia del Sacramento</h5>
                        <h5>
                            <img src={wa} 
                            onClick={() =>
                                (window.location.href =
                                  "https://api.whatsapp.com/send?phone=59899626792")
                              }
                            style={{width: "220px"}}
                            /> 
                        </h5>
                    </div>
                </div>
        </div>
    </>
    )
};

