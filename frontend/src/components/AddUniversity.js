import React, { useState } from 'react';
import './addUniversity.css';
// import {
//     GoogleMap,
//     useLoadScript,
//     Marker,
//     InfoWindow,
// } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";
// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

{/* <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyBUb9BPPLQ_5r4e02SlBEybzp8fs6jF4wI"></script> */}
 
const libraries = ["places"];

function AddUniversity()
{
    // const {isLoaded, loadError} = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //     libraries: ["places"],
    // })

    //if (loadError) return "Error loading maps";
    //if (!isLoaded) return "Loading maps";
 
    function buildPath(route)
    {     
        return 'http://localhost:3000/' + route;
    }

    var user_data = localStorage.getItem('user_data');
    var name;
    var description;
    var address;

    const [message,setMessage] = useState('');
    // const mapContainerStyle = {
    //     width: '500px',
    //     height: '500px',
    // }
    // const center = {
    //     lat: 40,
    //     lng: -100,
    // }
    // const options = {
        
    // }

    const doAddUniversity = async event => 
    {
        event.preventDefault();

        var obj = {userid:user_data.userid.value, name:name.value, description:description.value, address:address.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/addUniversity'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error !== "")
            {
                setMessage(res.error);
            }
            else
            {
                setMessage('Success');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
        <div>
            <form onSubmit={doAddUniversity} className="addBox">
                <span className="joinTitle">Add University</span>
                <input type="text" placeholder="University Name" className="input"
                    ref={(c) => name = c} />
                
                <input type="text" placeholder="Description" className="input"
                    ref={(c) => description = c} />

                <input type="text" placeholder="Address" className="input"
                    ref={(c) => address = c} />

                {/* <Search />

                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={4} 
                    center={center}
                    options={options}
                ></GoogleMap> */}

                <div className="buffer"><span className = "error">{message}</span></div> 

                <input type="submit" className="mainbutton" value ="Create"
                    onClick={doAddUniversity} />
            </form>       
     </div>
    );
};

// function Search() {
//     const {
//         ready, 
//         value, 
//         suggestions: {status, data}, 
//         setValue, 
//         clearSuggestion,
//     } = usePlacesAutocomplete({
//         requestOptions: {
//             location: { lat: () => 40, lng: () => -100 },
//             radius: 200 * 1000,
//         }
//     });
//     return (
//     <div className="search">
//         <Combobox 
//             onSelect={(address) => {
//                 console.log(address);}}>

//             <ComboboxInput 
//                 value={value} 
//                 onChange={(e) => {
//                 setValue(e.target.value);}} 

//             disabled={!ready}
//             placeholder="Enter an address"
//             />

//             <ComboboxPopover>
//                 {status === "OK" && 
//                 data.map(({id, description}) => (
//                     <ComboboxOption key={id} value ={description} />
//                 ))}
//             </ComboboxPopover>
          
//         </Combobox>
//     </div>)
// }

export default AddUniversity;