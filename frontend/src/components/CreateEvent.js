import React, { useState } from 'react';
import './createEvent.css';

function CreateEvent()
{
    function buildPath(route)
    {     
        return 'http://localhost:3000/' + route;
    }

    var user_data = JSON.parse(localStorage.getItem('user_data'));
    var userid = user_data.userid;
    var eventName;
    var category;
    var description;
    var time;
    var date;
    var address;
    var phone;
    var email;
    var rsoid;
    var newID;

    const [message,setMessage] = useState('');

    const doCreateEvent = async event => 
    {
        event.preventDefault();
        try
        {    
            const response = await fetch(buildPath('api/generateEventID'),
                {method:'GET',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error !== "")
            {
                setMessage(res.error);
                console.log(res.error);
            }
            else
            {
                newID=res.newID;
            }
        }
        catch(e)
        {
            alert(e.toString());
            console.log("error caught");
            return;
        }   

        var obj = {eventid:newID,foreign_userid:userid, foreign_rsoid:rsoid.value, name:eventName.value, category:category.value,
                    description: description.value, time:time.value, date:date.value, address:address.value,
                    phone:phone.value, email:email.value, eventtype:type};
        console.log(obj);
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/createEvent'),
                {method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

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

    const [type, setType] = useState("Public")

    const onRadioChange = e => {
        setType(e.target.value)
    }

    return(
        <div>
            <form onSubmit={doCreateEvent} className="createEventBox">
                <span className="joinTitle">Create Event</span>
                <input type="text" placeholder="Event Name" className="input"
                    ref={(c) => eventName = c} />
                
                <input type="text" placeholder="Event category" className="input"
                    ref={(c) => category = c} />
                
                <input type="text" placeholder="Description" className="input"
                    ref={(c) => description = c} />
                
                <input type="text" placeholder="Time" className="input"
                    ref={(c) => time = c} />
                
                <input type="text" placeholder="Date" className="input"
                    ref={(c) => date = c} />

                <input type="text" placeholder="Address" className="input"
                    ref={(c) => address = c} />

                <input type="text" placeholder="Contact phone" className="input"
                    ref={(c) => phone = c} />

                <input type="text" placeholder="Contact email" className="input"
                    ref={(c) => email = c} />

                <div className="radioContainer">
                    <input type="radio" id="public" value="Public" name="eventType" checked onChange={onRadioChange}/>
                    <label for="public">Public</label>

                    <input type="radio" id="private" value="Private" name="eventType" onChange={onRadioChange}/>
                    <label for="public">Private</label>
                    
                    <input type="radio" id="rso" value="RSO" name="eventType" onChange={onRadioChange}/>
                    <label for="public">RSO</label>
                </div>
                
                <input type="text" placeholder="RSO ID (Optional)" className="input"
                    ref={(c) => rsoid = c} />

                <div className="buffer"><span className = "error">{message}</span></div> 

                <input type="submit" className="mainbutton" value ="Create"
                    onClick={doCreateEvent} />
            </form>       
     </div>
    );
};

export default CreateEvent;