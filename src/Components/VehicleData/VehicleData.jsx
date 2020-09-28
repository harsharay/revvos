import React,{ useState, useEffect } from "react"
import Geocode from "react-geocode"

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import "./VehicleData.styles.css"

const VehicleData = ({ onClose, individualData }) => {

    Geocode.setApiKey("AIzaSyAhDc0tbe9Kbv3iH6n8mUs9hAD4fpzQNp4")
    Geocode.enableDebug()

    let [location, setLocation] = useState("")
    let [popup, setPopup] = useState(false)
    


    useEffect(() => {
        console.log(31, individualData)
        Geocode.fromLatLng("12.9043418","77.6007478").then(resp => console.log(resp.results[0].formatted_address))
    },[])

    const handleClickLocation = async (lat, lng) => {
        let response = await Geocode.fromLatLng(lat,lng)
        console.log(response.results[0].formatted_address)
        setLocation(response.results[0].formatted_address)
        setPopup(true)
    }

    return (
        <div className='vehicleData-mainDiv'>
            <p className="close" onClick={onClose}>Close</p>
            <h1>Trip Data</h1>
            <h3>Trip Id: {individualData.tripId}</h3>
            {/* {JSON.stringify(individualData)} */}
            { individualData ? 
            <>
                <pre>Distance travelled: <b>{individualData.distance}</b></pre>
                {individualData.startTime ? <pre>Trip Start Date: <b>{individualData.startTime.slice(0,10)}</b></pre> : <pre>Trip Start Date: Not found</pre>}
                {individualData.startTime ? <pre>Trip Start Time: <b>{individualData.startTime.slice(11,19)}</b></pre> : <pre>Trip Start Time: Not Found</pre>}
                {individualData.endTime ? <pre>Trip End Date: <b>{individualData.endTime.slice(0,10)}</b></pre> : <pre>Trip End Date: Not found</pre>}
                {individualData.endTime ? <pre>Trip End Time: <b>{individualData.endTime.slice(11,19)}</b></pre> : <pre>Trip End Time: Not Found</pre>}
                <pre>Total trips: <b>{individualData.location.length}</b></pre>
                <pre>Is batteryVoltageAdc data available: {individualData.batteryVoltageAdc.length > 0 ? <b>Yes</b> : <b>No</b>}</pre>
                <small>(Hover over the trip to see the actual location)</small>
                
                <div className="TripGroup">
                
                    {individualData.location.map((item, index) => {
                        return (
                            <div key={index} className="singleTrip" onMouseEnter={() => handleClickLocation(item.lat,item.lng)} onMouseLeave={() => setPopup(false)}>
                                <pre>Trip Number: {index+1}</pre>
                                <pre>Latittude: {item.lat}</pre>
                                <pre>Longitude: {item.lng}</pre>
                                <pre>Voltage: {individualData.batteryVoltageAdc[index] ? individualData.batteryVoltageAdc[index] : "Not available"}</pre>
                                { ((index+1)<individualData.location.length) && <ArrowDownwardIcon /> }
                            </div>
                        )
                    })}
                    { popup && 
                    <div className="locationDiv">
                        <pre>Address:</pre>
                        <pre>{location.slice(0,80)}</pre>
                    </div>
                    }
            </div>
            </>
            :
            <p>Please click on the trip</p>
             }
        </div>
    )
}

export default VehicleData