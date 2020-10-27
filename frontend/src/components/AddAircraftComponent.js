import React from 'react';
import AircraftService from '../services/AircraftService';

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
                minimumTrainingDuration: "",
                errorMessage: ""
            };
        } else {
            this.state = {
                mode: "edit",
                aircraftId: props.match.params.id,
                manufacturer: "",
                name: "",
                model: "",
                year: "",
                maintenanceDay: "",
                minimumTrainingDuration: "",
                errorMessage: ""
            };
        }
    }

    componentDidMount(){
        if(this.state.mode === "edit") {
            AircraftService.getOne(this.props.match.params.id).then(res => {
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
            AircraftService.post(aircraft).then(res => {
                this.props.history.push('/aircraft')
            }).catch(res => {
                if(res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        } else {
            AircraftService.put(this.state.aircraftId, aircraft).then(res => {
                this.props.history.push('/aircraft')
            }).catch(res => {
                if(res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        }

    }

    render (){
        return (
            <div>

                <br/>

                <form className={"form-horizontal"}>
                    <div className={"form-group"}>
                        <label>Manufacturer: <input type="text" name="manufacturer" value={this.state.manufacturer}
                                                    className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Name: <input type="text" name="name" value={this.state.name}
                                            className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Model: <input type="text" name="model" value={this.state.model}
                                             className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Year: <input type="text" name="year" value={this.state.year}
                                            className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Maintenance Day: <input type="text" name="maintenanceDay"
                                                       value={this.state.maintenanceDay} className={"from-control"}
                                                       onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Min. Training Duration: <input type="text" name="minimumTrainingDuration"
                                                              value={this.state.minimumTrainingDuration}
                                                              className={"from-control"}
                                                              onChange={this.changeHandler}/></label>
                    </div>


                    {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}

                    <button type="submit" className={"btn btn-dark"} onClick={this.submitHandler}>Submit</button>
                </form>
            </div>

        )
    }
}

export default AddAircraftComponent