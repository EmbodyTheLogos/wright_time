import React from 'react';
import AircraftService from '../services/AircraftService';

class AircraftComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            aircrafts:[]
        }
    }

    componentDidMount(){
        AircraftService.getAircrafts().then((response) => {
            this.setState({ aircrafts: response.data})
        });
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Aircraft List</h1>
                <table className = "table table-striped">
                    <thead>

                    <tr>
                        <td> Aircraft Id</td>
                        <td> Aircraft Manufacturer</td>
                        <td> Aircraft Model</td>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        this.state.aircrafts.map(
                            aircraft =>
                                <tr key = {aircraft.aircraftId}>
                                    <td> {aircraft.aircraftId}</td>
                                    <td> {aircraft.manufacturer}</td>
                                    <td> {aircraft.model}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>

            </div>

        )
    }
}

export default AircraftComponent