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
        }
        if(dayIndex === day && nav === 0){
            dayelement.classList.add("currentday");
        }

        calendar.appendChild(dayelement);
    }

}

haederBackBtn.addEventListener('click',() => {
    nav--;
    load();
});
haederNextBtn.addEventListener('click',() => {
    nav++;
    load();
});


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
