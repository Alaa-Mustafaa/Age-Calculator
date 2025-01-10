/* Global Variables  */
const date=document.getElementById('date');
const gender=document.getElementById('gender');
let year;
let month;
let day;
let correctedMonth;
let yearr;
/* End of Global Variables  */


/* Function to calculate the age for the user */
function getDate(){
    console.log(date.value)

    // Birthdate
    var Birthdate = new Date(date.value);

    // current date
    const CurrentDate=new Date()

    // your age = current date - your birthdate
     year=CurrentDate.getFullYear() - Birthdate.getFullYear()  // Get the year 
     month=12 - Math.abs(CurrentDate.getMonth() - Birthdate.getMonth());  // Get the month
     day=Math.abs(CurrentDate.getDate() - Birthdate.getDate() ) // Get the day
     correctedMonth =CurrentDate.getMonth() + 1;    // 0  => jan , so we must add 1 to the month to get the correct month


// If your birth month has not come yet, then you are not yet a year older, so we subtract a year so that the age is correct in months.
if (month > correctedMonth) {
     if (year === 1 || year === 0) {
        yearr = 0;
        print()
    }else if(year < 0){
        document.getElementById('current-age-section').style.display="none"
        document.getElementById('invalid').innerHTML="Enter valid date"
    }
    else{
        yearr = year - 1;
        print()
    }
   
}  else {
    yearr = year;
    print()
}



}

function print(){

    document.getElementById('current-age-section').style.display="block"
    document.getElementById('year').innerHTML=yearr + " " +"Years"
    document.getElementById('month').innerHTML=month + " " + "Months"
    document.getElementById('day').innerHTML= day + " " + "Days"

    getAdvices(yearr)
}
/* End of the Function */



/* Function to get health advices for each age  */
async function getAdvices(year){
    // Fetch API
    let advices= await fetch(`https://odphp.health.gov/myhealthfinder/api/v3/myhealthfinder.json?age=${year}&sex=${gender.value}`);
    let data=await advices.json();
    const adviceData=data.Result.Resources.all.Resource;
    let box="";
    // Loop to display all data in the array that contain tips for health
    adviceData.forEach(element => {
        box +=`
    
        <div class="col-md-3 col-sm-6">
                                <div class="card">
                                    <img class="card-img-top" src="${element.ImageUrl}" alt="${element.ImageAlt}">
                                    <div class="card-body" style="height:300px">
                                      <h4 class="card-text">${element.Title}</h4>
                                      <p class="text-muted">${element.MyHFDescription}</p>
                                    </div>
                                  </div>
                            </div>
        `
        
    });
    // Show the section of health tips
    document.getElementById('third-section').style.display="block"
    // Display the data in the section
    document.getElementById('advices').innerHTML=box   
}
/* End of Function ( to get health advices for each age )  */

