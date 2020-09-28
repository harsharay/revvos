import React, { useState, useEffect } from "react"

import "./Main.styles.css"

import VehicleData from "../VehicleData/VehicleData"

// import Geocode from "react-geocode"

import finalData from "../../Obj1"


const Main = () => {

    let [objectData, setObjectData] = useState({})
    let [display, setDisplay] = useState(false)
    let [individualData, setIndividualData] = useState([])

    useEffect(() => {
        finalData.trip.map(item => {
            objectData[item.tripId] = item
        })
    },[])

    const handleClickVehicle = () => {
        setDisplay(true)
    }

    const handleClose = () => {
        setDisplay(false)
    }

    return (
        <div>
            <h1>Select a trip</h1>
            <div className="vehicleGroup" onClick={handleClickVehicle}>
                { finalData.trip.map((item, index) => {
                    return(
                        <div className="vehicleRow" key={index} onClick={() => setIndividualData(objectData[item.tripId])}>
                            <a href='#'>{item.tripId}</a>
                            <br/>
                        </div>
                    )
                }) }
            </div>
            { display && <VehicleData display={display} onClose={handleClose} objectData={objectData} individualData={individualData || ""}/> }
        </div>
    )
    
}

export default Main;