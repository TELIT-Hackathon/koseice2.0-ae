import {useEffect} from "react";
import {available_severities, name_types} from "../../data/alert_data";
import Link from "next/link";

export default function Report() {
    function GetImage(type){
        return <img src={`../alerts/${type}.svg`} onClick={HandleSelect}/>
    }

    function HandleSelect(e) {
        e.preventDefault();

        console.log(e.target)
    }

    let position;
    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("Location Available");
            navigator.geolocation.getCurrentPosition((data) => {
                position = {lat: data.coords.latitude, lng: data.coords.longitude};
            });

        } else {
            console.log("Location Not Available");
        }
    }, []);

    const types = []
    for (const [key, value] of Object.entries(available_severities)){
        const type_part = name_types[key];
        value.forEach( severity => {
            console.log(severity)
            types.push(type_part+severity);
        })
    }
    console.log(types)

    return (
        <div>
            <ul>
                {types.map(type => {
                    return GetImage(type);
                })}
            </ul>
        </div>
    )
}