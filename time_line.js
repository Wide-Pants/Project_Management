const scheduler = document.getElementById(`schedule`)

const today_btn = document.getElementById(`today`)
const dates_btn = document.getElementById(`dates`)
const months_btn = document.getElementById(`months`)
const seasons_btn = document.getElementById(`seasons`)

mag_status = `dates`

dates_btn.addEventListener(`click`,()=>{
    if(mag_status!=`dates`){
        const dates = document.getElementsByClassName(`dates`);
        Array.from(dates).forEach(element => {
        element.style.fontSize = `14px`;
        });
        if(mag_status!=`months`){
            const months = document.getElementsByClassName(`months`);
            Array.from(months).forEach(element => {
            element.style.fontSize = `14px`;
        });
        }
    }
    mag_status=`dates`;
});

months_btn.addEventListener(`click`,()=>{
    if(mag_status!=`months`){
        const dates = document.getElementsByClassName(`dates`);
        Array.from(dates).forEach(element => {
        element.style.fontSize = `0px`;
        });
    }if(mag_status==`seasons`){
        const months = document.getElementsByClassName(`months`);
        Array.from(months).forEach(element => {
            element.style.fontSize = `14px`;
        });
    }
    mag_status=`months`;
});

seasons_btn.addEventListener(`click`,()=>{
    if(mag_status!=`seasons`){
        if(mag_status==`dates`){
            const dates = document.getElementsByClassName(`dates`);
            Array.from(dates).forEach(element => {
                element.style.fontSize = `0px`;
            });
        }
        const months = document.getElementsByClassName(`months`);
        Array.from(months).forEach(element => {
            element.style.fontSize = `0px`;
        });
    }
    mag_status=`seasons`;
});