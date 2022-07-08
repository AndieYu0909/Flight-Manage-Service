//This file handles creating a new flight to the data base
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Background, Center} from "../components/style";

//declare the referrence for the required field
export const AddFlightInfo = () => {

    const flightNumberRef = useRef();
    const departureDateRef = useRef();
    const arrivalDateRef = useRef();
    const departureTimeRef = useRef();
    const arrivalTimeRef = useRef();
    const departureAirportRef = useRef();
    const arrivalAirportRef = useRef();
    const currentPassengerRef = useRef();
    const passengerLimitRef = useRef();
    const navigate = useNavigate();

// clear the the form after error or completion of the form
    const clearForm = () => {
        flightNumberRef.current.value=null; 
        departureDateRef.current.value=null;
        arrivalDateRef.current.value=null;
        departureTimeRef.current.value=null;
        arrivalTimeRef.current.value=null;
        departureAirportRef.current.value=null;
        arrivalAirportRef.current.value=null;
        currentPassengerRef.current.value=null;
        passengerLimitRef.current.value=null;
    };

    // connection to the data base
    const handleSubmit = async (event) => {
        event.preventDefault(); // prevents page refresh on submit
        let curPassengerLimitRef = passengerLimitRef.current.value; 
        let curCurrentPassengerRef = currentPassengerRef.current.value;
        const passengerDiff = curCurrentPassengerRef - curPassengerLimitRef;
        
        //check if the current passenger is within the capacity
        if(passengerDiff > 0){
            
            alert(`Plane capacity is ${curPassengerLimitRef}. Current passenger is ${curCurrentPassengerRef}. Capacity exceeded! Please re-enter the form`)
            clearForm(); 
        }
        else
        {
            try
            {
                await axios.post('http://localhost:8080/flightinfos', 
                            {flightNumber: flightNumberRef.current.value, departureDate: departureDateRef.current.value,
                                arrivalDate: arrivalDateRef.current.value, departureTime: departureTimeRef.current.value,
                                arrivalTime: arrivalTimeRef.current.value, departureAirport: departureAirportRef.current.value,
                                arrivalAirport: arrivalAirportRef.current.value, currentPassengers: currentPassengerRef.current.value,
                                passengerLimit: passengerLimitRef.current.value});
                                navigate('/', {replace: true});
                        
            }
            catch(err)
            {
                if (err.response.status === 500)
                {
                    alert('Flight number alrady existed!');
                    console.log(err.message);
                }
                else{
                    console.log(err.message);
                }
            }
            finally
            {
                    clearForm();
            }
        }
            
    }
    

    //form display
    return (
        <Background>
        <Center>
            <form onSubmit={handleSubmit}>
                <div className="CreateForm">
                    <div className="container" >
                        <div>
                        <h1>Add New Flight Information</h1>
                            <label htmlFor="flightNumber" ><strong>Flight Number: </strong></label>
                            <div><input id="flightNumber" type="number"placeholder="Flight Number" ref={flightNumberRef}/></div>
                            
                        </div>
                    </div>
                    <div className="container">
                        <div>
                            
                            <label htmlFor="departureDate" ><strong>Departure Date: </strong></label>
                            <div><input id="departureDate" type="date"placeholder="Departure Date" ref={departureDateRef}/></div>
                            
                            <label htmlFor="arrivalDate" ><strong>Arrival Date: </strong></label>
                            <div><input id="arrivalDate" type="date"placeholder="Arrival Date" ref={arrivalDateRef}/></div>
                            
                            <label htmlFor="departureTime" ><strong>Departure Time: </strong></label>
                            <div><input id="departureTime" type="time"placeholder="Departure Time" ref={departureTimeRef}/></div>
                        </div>
                        <div>
                            <label htmlFor="arrivalTime" ><strong>Arrival Time: </strong></label>
                            <div><input id="arrivalTime" type="time"placeholder="Arrival Time" ref={arrivalTimeRef}/></div>
                            
                            <label htmlFor="departureAirport" ><strong>Departure Airport: </strong></label>
                            <div><input id="departureAirport" type="text"placeholder="Departure Airport" ref={departureAirportRef}/></div>
                            
                            <label htmlFor="arrivalAirport" ><strong>Arrival Airport: </strong></label>
                            <div><input id="arrivalAirport" type="text"placeholder="Arrival Airport" ref={arrivalAirportRef}/></div>
                        </div>
                    </div>
                    <div className="container">
                        <label htmlFor="currentPassenger" ><strong>Current Passenger : </strong></label>
                        <div><input id="currentPassenger" type="number"placeholder="Current Passenger Number" ref={currentPassengerRef}/></div>
                    </div>
                    <div className="container">
                        <label htmlFor="passengerLimit" ><strong>Passengers Limit: </strong></label>
                        <div><input id="passengerLimit" type="number"placeholder="Passengers Limit" ref={passengerLimitRef}/></div>
                    </div>
                        <div className="container">
                        <input type="submit" value="Create Flight" />
                        {/* A bad pratice for better display, the background does not full fill the page due to the length of the form, only possible solution that I can think of */}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div> 
            </form>    
        </Center>
        </Background>
    );

}