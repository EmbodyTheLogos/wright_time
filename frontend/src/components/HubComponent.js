import React from 'react';
import {Link} from "react-router-dom";
import {Nav, Navbar} from 'react-bootstrap'

class HubComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>

                <div className="container mt-4">
                    <Link to={"/admin/home"} className={"btn btn-secondary btn-block"}>Administrator</Link>
                    <br/>
                    <Link to={"/user/home"} className={"btn btn-info btn-block"}>User</Link>
                </div>


            </div>
        )
    }
}

export default HubComponent