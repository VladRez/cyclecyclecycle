import React from "react";
import "./loader.css";

function Loader() {
    return (
        <div className="SuperLoader">
            <div className="loader center">
                <i className="fa fa-cog fa-spin fa-10x" />
            </div>
        </div>
    );
}

export default Loader;
