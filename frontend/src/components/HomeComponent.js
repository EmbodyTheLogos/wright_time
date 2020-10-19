import React from 'react';
import {Link} from "react-router-dom";

class HomeComponent extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render (){
        return (
            <Link to="/aircraft">
                <button type="button">
                    Aircraft
                </button>
            </Link>
        )
    }
}

export default HomeComponent