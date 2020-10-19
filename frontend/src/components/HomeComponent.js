import React from 'react';
import {Link} from "react-router-dom";

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Link to="/aircraft">
                    <button type="button">
                        Aircraft
                    </button>
                </Link>

                <Link to="/users">
                    <button type="button">
                        Users
                    </button>
                </Link>
            </div>
        )
    }
}

export default HomeComponent