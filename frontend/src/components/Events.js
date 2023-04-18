import React, { useState } from 'react';
import './events.css'

let numEvents = 0;
let loadFlag = 0;

function nextPage(pageCount){
	pageCount++;
}

function previousPage(pageCount){
	pageCount--;
}

function Events()
{
   function buildPath(route)
   { 
        return 'http://localhost:3000/' + route;
   }

   var eventid;

   function goView(eventid)
   {
      return async function()
      {
         var obj = {eventid: eventid};
         var js = JSON.stringify(obj);

         try
         {    
            const response = await fetch(buildPath('api/fetchEvent'),
                  {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            var eventName = res.name;
            var category = res.category;
            var description = res.description;
            var time = res.time;
            var date = res.date;
            var address = res.address;
            var phone = res.phone;
            var email = res.email;
            // get comments
            var event = {name:eventName,category:category,description:description,time:time,date:date,address:address,
                        phone:phone,email:email};
            localStorage.setItem('event_data', JSON.stringify(event));

            if(res.error != '')
            {
               window.location.href = '/event-view';
            }
         }
         catch(e)
         {
            alert(e.toString());
            return;
         }
      }
   };

   async function getEvents()
   {
      let user_data = JSON.parse(localStorage.getItem("user_data"));
      let userid = user_data.userid;
      var obj = {userid:userid};
      var js = JSON.stringify(obj);
      try
      {    
         const response = await fetch(buildPath('api/events'),
               {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
         
         var res = JSON.parse(await response.text());
         if(res.error != null){
            return res.filter;
         }
      }
      catch(e)
      {
         alert(e.toString());
         return;
      }    
   };

   window.addEventListener('load', async function loadEvents(){
		if(loadFlag == 0){		//for some reason the event kept firing 3 times and I couldn't figure out how to stop it, 
			loadFlag++;			   //loadFlag is a dirty solution to prevent that
         
        var events = await getEvents();
		numEvents = events.length;
        console.log(events);

        if(numEvents == 0){	//if no events, display this message
				document.getElementById("defaultMsg").style.display = "block";
				document.getElementById("defaultMsg").style.visibility = "visible";
			}

			else{		//else, load list of events to choose from
				let listSize = 0;
				let pageCount = 0;
				let mainDiv = document.createElement("table");
                mainDiv.className = "listTable";
				this.document.getElementById("eventsDiv").appendChild(mainDiv);
				for(let i = 0; i < numEvents; i++){		
                eventid = events[i]["id"];
					let listItem = document.createElement("tr");
						listItem.className = "eventBox";
					let eventTitle = document.createElement("div");
						eventTitle.className = "eventTitle";
					let eventDescription = document.createElement("div");
						eventDescription.className = "eventDescription";
	
					let title = events[i]["event"];				
					let dscrp = events[i]["text_event"];		
					eventTitle.innerHTML = title;			
					eventTitle.onclick = goView(eventid);
                    eventDescription.innerHTML = dscrp;
		
					mainDiv.appendChild(listItem);
					listItem.appendChild(eventTitle);
					listItem.appendChild(eventDescription);
					listSize++;
				}
			}
		}
	});

   var _ud = localStorage.getItem('user_data');
   var ud = JSON.parse(_ud);
    return(
		<body className="eventscontainer">
         <p id="title"  className="eventstitle">Events</p>
			<div id="eventsDiv" className="displayregion">
            <table>
               <tr>
                  <li>Yoga</li>
                  <li>Join us for a yoga class</li>
                  <li>5:30 pm</li>
                  <li>April 19, 2023</li>
               </tr>
               <tr>
                  <li>Market Day</li>
                  <li>Showcase services and products</li>
                  <li>11:00 am</li>
                  <li>April 20, 2023</li>
               </tr>
               <tr>
                  <li>Summer Research Academy</li>
                  <li>For students beginning research in Summer</li>
                  <li>12:00 pm</li>
                  <li>June 1, 2023</li>
               </tr>
               <tr>
                  <li>Pilates</li>
                  <li>Join us for a pilates class</li>
                  <li>5:30 pm</li>
                  <li>June 2, 2023</li>
               </tr>
               <tr>
                  <li>Vendor Day</li>
                  <li>Showcase your business</li>
                  <li>10:00 am</li>
                  <li>June 4, 2023</li>
               </tr>
               <tr>
                  <li>Advanced Research Academy</li>
                  <li>For students beginning advanced research</li>
                  <li>12:00 pm</li>
                  <li>June 5, 2023</li>
               </tr>
            </table>
				<p id="defaultMsg" className="defaultMsg">There are no more upcoming events.</p>
			</div>
			<div>
				<button type="button" id="previous" className="previousButton"  onClick={previousPage()}>Previous Page</button>
				<button type="button" id="next" className="nextButton" onClick={nextPage()}>Next Page</button>
			</div>
		</body>
   );
};

export default Events;