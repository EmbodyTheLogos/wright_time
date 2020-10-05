import React from 'react';
import AircraftService from '../services/AircraftService';
import {Link} from "react-router-dom";

class AddAircraftComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {manufacturer: "", name: "", model: "", year: "",
            maintenance: "", min_training: ""}
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]:value})
    }

    submitHandler = (event) => {
        event.preventDefault();
        let aircraft = {manufacturer: this.state.manufacturer, name: this.state.name, model: this.state.model,
            year: this.state.year, maintenance: this.state.maintenance, min_training: this.state.min_training};
        console.log(JSON.stringify(aircraft));
        AircraftService.postAircraft(aircraft).then(res => {
            this.props.history.push('/aircraft')
        })
    }

    render (){
        return (
            <div>
                <form>
                    <label for="manufacturer">Manufacturer:</label>
                    <input type="text" id="manufacturer" name="manufacturer" onChange={this.changeHandler}/>
                    <br/>

                    <label For="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={this.changeHandler}/>
                    <br/>

                    <label for="model">Model:</label>
                    <input type="text" id="model" name="model" onChange={this.changeHandler}/>
                    <br/>

                    <label for="year">Year:</label>
                    <input type="text" id="year" name="year" onChange={this.changeHandler}/>
                    <br/>

                    <label for="maintenance">Maintenance Day:</label>
                    <input type="text" id="maintenance" name="maintenance" onChange={this.changeHandler}/>
                    <br/>

                    <label htmlFor="min_training">Min. Training Duration:</label>
                    <input type="text" id="min_training" name="min_training" onChange={this.changeHandler}/>
                    <br/>

                    <input type="submit" value="Submit" onClick={this.submitHandler}/>
                </form>
            </div>

        )
    }
}

export default AddAircraftComponent