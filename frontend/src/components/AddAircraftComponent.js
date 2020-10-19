import React from 'react';
import AircraftService from '../services/AircraftService';
import {Link} from "react-router-dom";

class AddAircraftComponent extends React.Component {

    constructor(props){
        super(props)
        if(!props.match.params.id) {
            this.state = {
                mode: "add",
                manufacturer: "",
                name: "",
                model: "",
                year: "",
                maintenanceDay: "",
                minimumTrainingDuration: ""};
        } else {
            this.state = {
                mode: "edit",
                aircraftId: props.match.params.id,
                manufacturer: "",
                name: "",
                model: "",
                year: "",
                maintenanceDay: "",
                minimumTrainingDuration: ""
            };
        }
    }

    componentDidMount(){
        if(this.state.mode === "edit") {
            AircraftService.getOneAircraft(this.props.match.params.id).then(res => {
                this.setState({
                    manufacturer: res.data.manufacturer,
                    name: res.data.name,
                    model: res.data.model,
                    year: res.data.year,
                    maintenanceDay: res.data.maintenanceDay,
                    minimumTrainingDuration: res.data.minimumTrainingDuration
                });
            })
        }
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]:value})
    }

    submitHandler = (event) => {
        event.preventDefault();
        let aircraft = {
            manufacturer: this.state.manufacturer,
            name: this.state.name,
            model: this.state.model,
            year: this.state.year,
            maintenanceDay: this.state.maintenanceDay,
            minimumTrainingDuration: this.state.minimumTrainingDuration
        };

        console.log(JSON.stringify(aircraft));
        if(this.state.mode === "add") {
            AircraftService.postAircraft(aircraft).then(res => {
                this.props.history.push('/aircraft')
            })
        } else {
            AircraftService.putAircraft(this.state.aircraftId, aircraft).then(res => {
                this.props.history.push('/aircraft')
            })
        }

    }

    render (){
        return (
            <div>
                <form>
                    <label For="manufacturer">Manufacturer:</label>
                    <input type="text" id="manufacturer" name="manufacturer"
                           value={this.state.manufacturer} onChange={this.changeHandler}/>
                    <br/>

                    <label For="name">Name:</label>
                    <input type="text" id="name" name="name"
                           value={this.state.name} onChange={this.changeHandler}/>
                    <br/>

                    <label For="model">Model:</label>
                    <input type="text" id="model" name="model"
                           value={this.state.model} onChange={this.changeHandler}/>
                    <br/>

                    <label For="year">Year:</label>
                    <input type="text" id="year" name="year"
                           value={this.state.year} onChange={this.changeHandler}/>
                    <br/>

                    <label For="maintenanceDay">Maintenance Day:</label>
                    <input type="text" id="maintenanceDay" name="maintenanceDay"
                           value={this.state.maintenanceDay} onChange={this.changeHandler}/>
                    <br/>

                    <label htmlFor="minimumTrainingDuration">Min. Training Duration:</label>
                    <input type="text" id="minimumTrainingDuration" name="minimumTrainingDuration"
                           value={this.state.minimumTrainingDuration} onChange={this.changeHandler}/>
                    <br/>

                    <input type="submit" value="Submit" onClick={this.submitHandler}/>
                </form>
            </div>

        )
    }
}

export default AddAircraftComponent