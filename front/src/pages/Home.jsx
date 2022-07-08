//Home page, including the delete flight function and the flight list
import plane from '../pictures/planeLogo1.png';
import {Center} from "../components/style";
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/style/FlightList.css';
import { Background } from '../components/style';
import { useNavigate } from 'react-router-dom';
import planeLogo from '../pictures/planeLogo2.png';
import '../components/style/Logo.css'

//connection to the data base, and handles the delete command
export const Home = () => {

    const [flight, setFlightInfos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/flightinfos')
            .then(res => setFlightInfos(res.data));
    }, []);

    const deleteFlight = async(flightNumber)=>{
        try{
                
            await axios.delete(`http://localhost:8080/flightinfos/${flightNumber}`);
            navigate('./', {replace:true});
            
        }catch(err){
            console.log(err);
        }
    }


//form diaplay
    return (
        <Background>
            <div>
            <Center><img src={plane} height={100} width={100} alt = 'Big Logo' /></Center>
            <Center><h1>Flight List</h1></Center>           
    </div>
        <div className = "FlightList">           
            <table>
                <tr>
                    <th></th>
                    <th>Flight Number</th>
                    <th>Departure Date</th>
                    <th>Arrival Date</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Departure Airport</th>
                    <th>Arrival Airport</th>
                    <th>Current Passengers</th>
                    <th>Passenger Limit</th>
                    <th>Operations</th>
                    <th></th>
                </tr>
                {flight.map((flight,index)=>{
                    return(
                        <tr key = {flight._id}>
                            <td><img src={planeLogo} alt= 'flightLogo' width = '50' height = '50'/></td>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.departureDate}</td>
                            <td>{flight.arrivalDate}</td>
                            <td>{flight.departureTime}</td>
                            <td>{flight.arrivalTime}</td>
                            <td>{flight.departureAirport}</td>
                            <td>{flight.arrivalAirport}</td>
                            <td>{flight.currentPassengers}</td>
                            <td>{flight.passengerLimit}</td>
                            <td><button onClick = {(event) => { event.preventDefault(); deleteFlight(flight.flightNumber)}}>Delete</button></td>
                            <td><button onClick = {(event) => { event.preventDefault(); navigate('/UpdateFlight')}}>Update</button></td>
                        </tr>
                    )
                })}
            </table>
        </div>
        </Background>
    );
}