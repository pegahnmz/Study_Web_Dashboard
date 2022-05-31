const progressbar =document.querySelectorAll(".progressbar");
const progressValue = document.querySelectorAll(".progress_value");
const progressbarActive = document.querySelector(".homework__item--active .progressbar")
const navItem = document.querySelectorAll(".nav__item");
const homeworkItem = document.querySelectorAll(".homework__item");


const calendar = document.querySelector(".calendar__container");
const calendarHeader = document.querySelector(".calendar__header__left")
const haederBackBtn = document.querySelector("#haederBackBtn");
const haederNextBtn = document.querySelector("#haederNextBtn");
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let nav =0;

const monthdays = document.querySelectorAll(".monthdays");
const eventItem = document.querySelector(".event__item");
const eventMain = document.querySelector(".event__main");

const eventHeaderRight = document.querySelector(".event__header__right");
const eventHeaderLeft = document.querySelector(".event__header__left");

const events=[
    {
        eventTime: "5/25/2022",
        events:['remins me','hi','koo','ll','560','laaa']
    }
]

let c;
const eventSide = document.querySelector(".event__side")

function load(){
    let newdate = new Date();

    if(nav !== 0){
        newdate.setDate(1)
        newdate.setMonth(new Date().getMonth() + nav);
    }
    
    const day = newdate.getDate();
    const month = newdate.getMonth();
    const year = newdate.getFullYear();
    
    const firstDayOfMonth = new Date(year,month,1);
    const daysInMonth = new Date(year , month+1 ,0).getDate();
    
    const dateString = firstDayOfMonth.toLocaleDateString('en-us',
    {
        weekday: 'long',
        year:'numeric',
        month:'numeric',
        day:'numeric'
    });
    console.log(dateString)
    calendarHeader.innerText =
    `${newdate.toLocaleDateString('en-us', { month: 'long' })} ${year}`;
    calendar.innerHTML=``;
    
    const firstDayIndex = weekdays.indexOf(dateString.split(', ')[0]);
    for(let i=0 ; i<35 ; i++){
        const dayelement = document.createElement('div');
        dayelement.classList.add('calendar__element');
        const dayIndex = i-firstDayIndex+1;
        const exactDay = new Date(year,month,dayIndex).getDate();
        dayelement.innerText = exactDay;
        if(dayIndex <=0 || dayIndex > daysInMonth){
            dayelement.classList.add('paddingday');
        }else{
            dayelement.classList.add("monthdays");
            dayelement.value =new Date(year,month,exactDay).toLocaleDateString('en-us',
            {
                year:'numeric',
               month:'numeric',
                day:'numeric'
              }); 
        }
        if(dayIndex === day && nav === 0){
            dayelement.classList.add("currentday");
        }

        if(hasevent(dayelement.value)){
            dayelement.classList.add("calendar__element--hasevent")
        }else{
            dayelement.classList.remove("calendar__element--hasevent")
        }

        calendar.appendChild(dayelement);
    }

     c = document.querySelectorAll(".calendar__element")
     c.forEach((item) => {
        item.addEventListener("click", () =>{
            eventSide.classList.add("event__side--show");
            let ddd = item.value.split('/');

            let hj =new Date(ddd[2],ddd[0]-1,ddd[1]).toLocaleDateString('en-us',
            {
                weekday:"long",
                year:'numeric',
               month:'long',
                day:'numeric'
              }); 
        
            eventHeaderRight.textContent = hj;
            eventHeaderRight.value=item.value;

            const itemVal = item.value;
            let ind =-1;
             events.forEach((it,index)=>{
                
                if(it.eventTime===itemVal){
                    
                    ind= index
                }
            })
            renderEvents(item.value);
            
        })
    })
}
let evinput;
function hasevent(str){
    for(let i=0 ; i<events.length;i++){
        if(events[i].eventTime===str && events[i].events!=''){
            return true
        }

    }
    return false
}
function renderEvents(dateStr){
    
    let ind =-1;

    for(let i=0 ; i<events.length;i++){
        if(events[i].eventTime===dateStr){
            ind= i;
            break
        }
    }
   

    if(ind !== -1){
        eventMain.value=ind;
        eventMain.innerHTML=`
        <input id="evinput" type="text" placeholder="Tap to add a event">`
        events[ind].events.forEach((item,index)=>{
            eventMain.innerHTML+=`
            <div class="event__item">
            <div type="text" value=${item} class="event__name">${item}</div>
            <button onclick="deleterow('${item}')">Delete</button>
        </div>`
        })
        
    }else{
        eventMain.value=ind;
        eventMain.innerHTML=`
        <input id="evinput" type="text" placeholder="Tap to add a event">`
        
    }
    evinput = document.querySelector("#evinput");
        evinput.addEventListener('keyup',(e)=>{
            if(event.code==='Enter'){
               
                if(event.target.value !== ""){
                    if(eventMain.value!= -1){
                        events[eventMain.value].events.push(event.target.value);
                        renderEvents(events[eventMain.value].eventTime);
                    }
                    else{
                        eventMain.value = events.length;
                        console.log('--'+events.length)
                        events.push({
                            eventTime:eventHeaderRight.value,
                            events:[event.target.value]
                        })
                         
                         
                        renderEvents(events[eventMain.value].eventTime);
                    }

                }
                event.target.value="";
            }
        })
    
}

function deleterow(item){
    events[eventMain.value].events=events[eventMain.value].events.filter((it)=>{
        
        return it != item;
    });
    renderEvents(events[eventMain.value].eventTime);
   
}

haederBackBtn.addEventListener('click',() => {
    nav--;
    load();
});
haederNextBtn.addEventListener('click',() => {
    nav++;
    load();
});

eventHeaderLeft.addEventListener("click",() => {
    eventSide.classList.remove("event__side--show");
    document.querySelector("#evinput").value='';
    load();
})

load();




navItem.forEach((item) => {
    item.addEventListener("click", () =>{
        document.querySelector(".nav__item--active")
        .classList.remove("nav__item--active");
        item.classList.add("nav__item--active");
    })
})

homeworkItem.forEach((item) => {
    item.addEventListener("click", () =>{
        document.querySelector(".homework__item--active")
        .classList.remove("homework__item--active");
        item.classList.add("homework__item--active");
        loadActive();
    })
})

function loadActive(){
    let progressbarActive = document.querySelector(".homework__item--active")
    let progressbar = progressbarActive.querySelector(".progressbar")
    let progressValue = progressbar.querySelector(".progress_value")
    console.log(progressValue.textContent)
    let progressVal = 0;
    let progressEndVal=progressValue.textContent; 
    let speed = 10;
    let progress = setInterval( () => {
        progressVal++;
        progressValue.textContent = `${progressVal}%`;
        
        progressbar.style.background = `conic-gradient(
            var(--full-color) ${progressVal * 3.6}deg,
            var(--last-color) ${progressVal * 3.6}deg
        )`
        if(progressVal+"%" == progressEndVal){
            clearInterval(progress)
        }
   },speed)
}
function loadHw(){
    for(let i =0 ;i<progressbar.length ; i++){
        let progressVal = 0;
        let progressEndVal=progressValue[i].textContent;
        let speed = 10;
        let progress = setInterval( () => {
            progressVal++;
            progressValue[i].textContent = `${progressVal}%`;
            
            progressbar[i].style.background = `conic-gradient(
                var(--full-color) ${progressVal * 3.6}deg,
                var(--last-color) ${progressVal * 3.6}deg
            )`
            progressbarActive.style.background = `conic-gradient(
                var(--full-color) ${progressVal * 3.6}deg,
                var(--last-color) ${progressVal * 3.6}deg
            )`
            if(progressVal == progressEndVal){
                clearInterval(progress)
            }
       },speed)
    }
}
setTimeout(loadHw,4050);

