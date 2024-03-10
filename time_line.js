const scheduler = document.getElementById(`schedule`)

const today_btn = document.getElementById(`today`)
const week_view_btn = document.getElementById(`week_view_btn`)
const month_view_btn = document.getElementById(`month_view_btn`)
const season_view_btn = document.getElementById(`season_view_btn`)

const weeks = document.getElementById(`weeks`);
const months = document.getElementById(`months`);
const seasons = document.getElementById(`seasons`);

const plan_names = document.getElementById(`plan_names`)
const plan_line = document.getElementById(`plan_line`);
const add_plan_line = document.getElementById(`add_plan_line`)
const add_new_plan_btn = document.getElementById(`add_plan_btn`)
const input_new_plan = document.getElementById(`plan_type`)

const division_line_container = document.getElementById(`division`)

var mag_status = `week`
const selected_color = `#d2ffd9`;

const project_abbreviation = `PM` // project_manage
var cnt = 0;


week_view_btn.addEventListener(`click`,()=>{
    if(mag_status!=`week`){
        weeks.style.display = `flex`;
        months.style.display = `none`;
        seasons.style.display = `none`;
        week_view_btn.style.backgroundColor=`selected_color`;
        month_view_btn.style.backgroundColor=`none`;
        season_view_btn.style.backgroundColor=`none`;
        mag_status=`week`;
    }
});

month_view_btn.addEventListener(`click`,()=>{
    if(mag_status!=`months`){
        weeks.style.display = `none`;
        months.style.display = `flex`;
        seasons.style.display = `none`;
        month_view_btn.style.backgroundColor=`selected_color`;
        week_view_btn.style.backgroundColor=`none`;
        season_view_btn.style.backgroundColor=`none`;
        mag_status=`months`;
    }
});

season_view_btn.addEventListener(`click`,()=>{
    if(mag_status!=`seasons`){
        weeks.style.display = `none`;
        months.style.display = `none`;
        seasons.style.display = `flex`;
        season_view_btn.style.backgroundColor=`selected_color`;
        month_view_btn.style.backgroundColor=`none`;
        week_view_btn.style.backgroundColor=`none`;
        mag_status=`seasons`;
    }
});

add_new_plan_btn.addEventListener(`click`,()=>{
    input_new_plan.style.display=`block`
    add_new_plan_btn.style.fontSize = `0`
    input_new_plan.focus();
})

input_new_plan.addEventListener(`keydown`,(e)=>{
    if(e.code ==`NumpadEnter` || e.code ==`Enter`){
        const plan_ID_value = input_new_plan.value;
        input_new_plan.blur();
        input_new_plan.value = ``;
        add_plan(plan_ID_value);
        add_new_plan_btn.classList.toggle(`odd_status`)
        add_plan_line.classList.toggle(`odd_status`)
    }
})

input_new_plan.addEventListener(`focusout`,()=>{
    input_new_plan.style.display=`none`
    add_new_plan_btn.style.fontSize = `16px`
})


function add_plan(plan_name){
    const new_plan = document.createElement(`div`);
    const new_plan_bar = document.createElement(`div`);
    new_plan.setAttribute(`id`,'_'+plan_name+`_`);
    new_plan_bar.setAttribute(`id`,'_'+plan_name);
    new_plan.classList.add(`plan_name`);
    new_plan_bar.classList.add(`plan_bar`);
    new_plan.innerHTML = `🅰️<span class="project_abbreviation">${project_abbreviation}-${cnt}</span>${plan_name}`
    if(add_new_plan_btn.classList.contains(`odd_status`)){
        new_plan_bar.classList.add(`odd_status`);
        new_plan.classList.add(`odd_status`);
    }
    plan_names.appendChild(new_plan);
    plan_line.appendChild(new_plan_bar);
    new_plan.addEventListener(`mouseover`, ()=>{
        new_plan.classList.add(`hover_status`)
        new_plan_bar.classList.add(`hover_status`)
    })
    new_plan_bar.addEventListener(`mouseover`, ()=>{
        new_plan.classList.add(`hover_status`)
        new_plan_bar.classList.add(`hover_status`)
    })
    
    new_plan.addEventListener(`mouseout`, ()=>{
        new_plan.classList.remove(`hover_status`)
        new_plan_bar.classList.remove(`hover_status`)
    })
    new_plan_bar.addEventListener(`mouseout`, ()=>{
        new_plan.classList.remove(`hover_status`)
        new_plan_bar.classList.remove(`hover_status`)
    })
}


function load_date_info(){
    const today = new Date();
    
    const start_date = new Date();
    start_date.setFullYear(today.getFullYear()-1)
    start_date.setMonth(0);
    start_date.setDate(0);
    start_date.setDate(start_date.getDate()-start_date.getDay()+1)

    const end_date = new Date();
    end_date.setFullYear(today.getFullYear()+2)
    end_date.setMonth(0);
    end_date.setDate(0);
    end_date.setDate(end_date.getDate()+end_date.getDay())

    console.log(start_date, end_date)

    const s_start = new Date(`${today.getFullYear()-1}-01-01`)
    
    for(var i=0; i<12; i++){
        const new_element = document.createElement(`div`);

        new_element.classList.add(`season`);
        new_element.innerText = s_start.getFullYear().toString().substring(2)+`' ` + (i%4+1) + `분기 \n ${(s_start.getMonth()+1)+`~`+(s_start.getMonth()+3)}`
        s_start.setMonth(s_start.getMonth()+3);

        seasons.appendChild(new_element);
    }

    const m_start = new Date(`${today.getFullYear()-1}-${today.getMonth()+1}-01`);

    for(var i=0; i<36; i++){
        const new_element = document.createElement(`div`);

        new_element.classList.add(`month`);
        new_element.innerText = m_start.getFullYear().toString().substring(2) == today.getFullYear().toString().substring(2)? (m_start.getMonth()+1) + `월`: m_start.getFullYear().toString().substring(2)+`' ` + (m_start.getMonth()+1) + `월`
        m_start.setMonth(m_start.getMonth()+1);

        months.appendChild(new_element);
    }

    while(start_date < end_date){
        const new_element = document.createElement(`div`);
        new_element.classList.add(`week`);

        const month_container = document.createElement(`div`);
        const dates_container = document.createElement(`div`);

        for(var i = 0; i < 7; i++){
            const date = document.createElement(`div`);
            date.innerText = start_date.getDate();
            date.classList.add(`date`);
            start_date.setDate(start_date.getDate()+1);
            if(i>4)
                date.classList.add(`weekend`);
            dates_container.appendChild(date);
        }

        month_container.innerText = innerText = start_date.getFullYear().toString().substring(2) == today.getFullYear().toString().substring(2)? (start_date.getMonth()+1) + `월`: start_date.getFullYear().toString().substring(2)+`' ` + (start_date.getMonth()+1) + `월`
        console.log(start_date.getMonth()+1);
        new_element.appendChild(month_container);
        new_element.appendChild(dates_container);
        weeks.append(new_element);
        console.log(division_line_container.classList.contains(`done`))
        if(!division_line_container.classList.contains(`done`))
            add_div_line()
    }division_line_container.classList.add(`done`)
}


function add_div_line(){
    console.log(`do_draw_line`)
    const new_div_line = document.createElement(`div`);
    new_div_line.classList.add(`line`)
    division_line_container.appendChild(new_div_line)
}
load_date_info()