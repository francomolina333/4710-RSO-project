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

        if(numEvents == 0){	//if no recipes, display this message
				document.getElementById("defaultMsg").style.display = "block";
				document.getElementById("defaultMsg").style.visibility = "visible";
			}

			else{		//else, load list of recipes to choose from
				let listSize = 0;
				let pageCount = 0;
				let mainDiv = document.createElement("table");
                mainDiv.className = "listTable";
				this.document.getElementById("eventsDiv").appendChild(mainDiv);
				for(let i = 0; i < numEvents /*&& i < 10*/; i++){		//append a listItem per recipe listing
																	//max of 10 recipes per page, if more load to next page
                eventid = events[i]["id"];
					let listItem = document.createElement("tr");
						listItem.className = "recipeBox";
						//listItem.onclick = goView(eventid);			//goes to specified recipe on click, probably needs a function
					let recipeTitle = document.createElement("div");
						recipeTitle.className = "recipeTitle";
					let recipeDescription = document.createElement("div");
						recipeDescription.className = "recipeDescription";
					/*let recipeTags = document.createElement("div");
						recipeTags.className = "recipeTags";*/
					/*let editBTN = this.document.createElement("button");
						editBTN.type = "button";
						editBTN.className = "editButton";
						editBTN.innerHTML = "Edit";*/
						//editBTN.onclick = goEdit(eventid);
					let title = events[i]["recipe"];				//place title here
					let dscrp = events[i]["text_recipe"];		//place description here
					//let tags = "Recipe Tags";				//place tags here. If tags are an array, maybe add the array 
															         //here and loop to list all elements in a comma separated-list
					recipeTitle.innerHTML = title;			//I will add overflow prevention to all of these later on.
					recipeTitle.onclick = goView(eventid);
                    recipeDescription.innerHTML = dscrp;
					//recipeTags.innerHTML = "Tags: " + tags;
					//append all created items into list
					mainDiv.appendChild(listItem);
					listItem.appendChild(recipeTitle);
                    //listItem.appendChild(editBTN);
					listItem.appendChild(recipeDescription);
					//listItem.appendChild(recipeTags);
					listSize++;
					/*if(listSize == 10){
						listSize = 0;
						this.document.getElementById("next").style.display = "block";
						this.document.getElementById("next").style.visibility = "visible";
					}
					/*make the "previous" button visible when scrolling to next page(s)
					if(pageCount > 1){
						this.document.getElementById("previous").style.display = "block";
						this.document.getElementById("previous").style.visibility = "visible";
					}*/
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
				<p id="defaultMsg" className="defaultMsg">There are no upcoming events.</p>
			</div>
			<div>
				<button type="button" id="previous" className="previousButton"  onClick={previousPage()}>Previous Page</button>
				<button type="button" id="next" className="nextButton" onClick={nextPage()}>Next Page</button>
			</div>
		</body>
   );
};

export default Events;