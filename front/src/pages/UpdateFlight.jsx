//update the flight with an existing flight number
import {Background, Center} from "../components/style";
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const UpdateFlight = () => {
    const [setFlightInfos] = useState(); //realize I didn't use the flight var, but don't want to break anything, just leave it.

    //get the data from the database
    useEffect(() => {
        axios.get('http://localhost:8080/flightinfos')
        .then(res => setFlightInfos(res.data));
    });
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

    //clear the form after error or completion of the form
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

    //creating temp var to difference the current input and the element in the database
    const updateFlight = async (params) => {
        let curPassengerLimitRef = passengerLimitRef.current.value; 
        let curCurrentPassengerRef = currentPassengerRef.current.value;
        const passengerDiff = curCurrentPassengerRef - curPassengerLimitRef;
        let curFightNumberRef = flightNumberRef.current.value;
        let curArrivalAirportRef = arrivalAirportRef.current.value;
        let curDepartureAirportRef = departureAirportRef.current.value;

        //check if the current passenger exceed the limit
        if(passengerDiff > 0){
            
            alert(`Plane capacity is ${curPassengerLimitRef}. \n Current passenger is ${curCurrentPassengerRef}. Capacity exceeded! 
                    \nPlease re-enter the form`)
            clearForm(); 
            setFlightInfos();
        }
        else
        //match with the database info
        {if(curFightNumberRef !== "" && curArrivalAirportRef !== "" && curDepartureAirportRef !== ""){
            try{
                const res = await axios.put('http://localhost:8080/flightinfos', 
                            {
                                flightNumber: flightNumberRef.current.value, departureDate: departureDateRef.current.value,
                                arrivalDate: arrivalDateRef.current.value, departureTime: departureTimeRef.current.value,
                                arrivalTime: arrivalTimeRef.current.value, departureAirport: departureAirportRef.current.value,
                                arrivalAirport: arrivalAirportRef.current.value, currentPassengers: currentPassengerRef.current.value,
                                passengerLimit: passengerLimitRef.current.value
                            });
                console.log(res.data);
                setFlightInfos(res.data);
                if (window.confirm("Flight information updated!"))
                {
                    navigate('/', {replace : true}); 
                }
                else
                {
                    setFlightInfos();
                    navigate('./', {replace : true}); 
                };
            }
            
            //if error means flight not exist
            catch(err) 
            {
                if(err.response.status === 404){
                    
                    if (window.confirm("Flight not exist!")) { 
                        
                        navigate('/', {replace : true}); 
                    } else { 
                        console.log(err.response.data.message);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                        navigate('./', {replace : true}); 
                    }
                    
                }else{ 
                    console.log(err.response.data.message);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    
                }

            }
            
            finally{
                clearForm(); 
            }
        }
        else
        {
            alert("Please fill out all the fields.")
            clearForm();
        }
    }
    }

    //form display
    return(
        <Background>  
        <Center>

           <div >
                <form onSubmit= {(event) => { 
                    event.preventDefault(); 
                    updateFlight 
                    ({
                        flightNumber: flightNumberRef.current.value, departureDate: departureDateRef.current.value,
                        arrivalDate: arrivalDateRef.current.value, departureTime: departureTimeRef.current.value,
                        arrivalTime: arrivalTimeRef.current.value, departureAirport: departureAirportRef.current.value,
                        arrivalAirport: arrivalAirportRef.current.value, currentPassengers: currentPassengerRef.current.value,
                        passengerLimit: passengerLimitRef.current.value
                    })}}>
                        <div className="CreateForm">
                    <div className="container" >
                        <div>
                            <h1>Update Flight Information</h1>
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
                        <input type="submit" value="Update Flight" />
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
           </div>
        </Center>
        </Background>  
    );
}