const scheduler = document.getElementById(`schedules`)

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

const today_line = document.getElementById(`today_line`);
const division_line_container = document.getElementById(`division`)

var thisweek_position;
var today_position;
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
        today_line.style.left = today_position +`px`;
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
        today_line.style.left = thisweek_position/4 + `px`

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
        today_line.style.left = thisweek_position/12 + `px`
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

    new_plan_bar.addEventListener(`mouseover`, (e)=>{
        new_plan.classList.add(`hover_status`)
        new_plan_bar.classList.add(`hover_status`)
        const this_bar = e.target.closest(`.plan_bar`)
        if(new_plan_bar.childNodes.length <= 0){
            const plan_box = document.createElement(`div`)
            plan_box.classList.add(`plan_box`, `plan_unfixed`)
            plan_box.style.width = `200px`
            plan_box.style.left = (parseInt(e.offsetX/210)*210 + 30*parseInt(((e.offsetX%210)/30))+5) +'px';
            new_plan_bar.appendChild(plan_box)
        }
        if(new_plan_bar.childNodes.length > 0){
            const plan_box = this_bar.firstChild;
            console.log(plan_box.classList)
            
            this_bar.addEventListener(`mousemove`,(move_e)=>{
                if(plan_box.classList.contains(`plan_unfixed`)){
                    const x_offset = move_e.offsetX;
                    const left_offset = parseInt(x_offset/210)*210 + 30*parseInt(((x_offset%210)/30))+5
                    if(plan_box.offsetLeft != left_offset)
                        plan_box.style.left = left_offset +'px';
                }
            })
            this_bar.addEventListener(`click`,(click_e)=>{
                if(plan_box.classList.contains(`plan_unfixed`)){
                    plan_box.classList.remove(`plan_unfixed`)
                    console.log(`click!`, plan_box.classList)
                    this_bar.addEventListener(`mousemove`,(move_e)=>{
                    })
                }
            })
        }
    })
    
    new_plan.addEventListener(`mouseout`, ()=>{
        new_plan.classList.remove(`hover_status`)
        new_plan_bar.classList.remove(`hover_status`)
    })
    new_plan_bar.addEventListener(`mouseout`, (e)=>{
        new_plan.classList.remove(`hover_status`)
        new_plan_bar.classList.remove(`hover_status`)
        const this_bar = e.target.closest(`.plan_bar`)
        if(this_bar.childNodes.length > 0){
            const plan_box = this_bar.firstChild;
            console.log(plan_box.classList)
            if(plan_box.classList.contains('plan_box') && plan_box.classList.contains('plan_unfixed'))
                this_bar.removeChild(plan_box);            
        }
        const plan_box = this_bar.firstChild;    
        this_bar.addEventListener(`mousemove`,(move_e)=>{
        })
        this_bar.addEventListener(`click`,(click_e)=>{
        })
    })

    plan_names.parentElement.style.height = plan_names.parentElement.scrollHeight + `px`;
    scheduler.style.height = plan_names.parentElement.scrollHeight + `px`;
    scheduler.parentElement.scrollTop = plan_names.parentElement.scrollHeight;
    
    add_new_plan_btn.classList.toggle(`odd_status`)
    add_plan_line.classList.toggle(`odd_status`)
}

scheduler.addEventListener(`scroll`, ()=>{
    console.log(scheduler.scrollLeft)
})
function load_date_info(){
    const today = new Date();
    
    const start_date = new Date((today.getFullYear()-1)+`-01-01`);
    start_date.setDate(start_date.getDate()-start_date.getDay()+1)

    const end_date = new Date((today.getFullYear()+2)+`-01-01`);
    end_date.setDate(end_date.getDate()+end_date.getDay())

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
            if(today.getFullYear()==start_date.getFullYear() &&today.getMonth()==start_date.getMonth()&&today.getDate()==start_date.getDate()-1){
                thisweek_position = weeks.lastChild.offsetLeft + date.offsetLeft + 210;
                const today_bar = document.getElementById(`today_line`)
                today_bar.firstChild.offsetLeft = thisweek_position;
                today_btn.addEventListener(`click`, ()=>{
                    scheduler.scrollLeft = thisweek_position;
                })
                today_position = thisweek_position + (today.getDay() != 0 ? (today.getDay()-1)*30 : 180)+15;
                today_line.style.left = today_position + `px`;
                date.setAttribute(`id`, `today_date`)
            }
        }

        month_container.innerText = innerText = start_date.getFullYear().toString().substring(2) == today.getFullYear().toString().substring(2)? (start_date.getMonth()+1) + `월`: start_date.getFullYear().toString().substring(2)+`' ` + (start_date.getMonth()+1) + `월`
        new_element.appendChild(month_container);
        new_element.appendChild(dates_container);
        weeks.append(new_element);
        if(!division_line_container.classList.contains(`done`))
            add_div_line()
    }division_line_container.classList.add(`done`)
    scheduler.scrollLeft = thisweek_position;
}

for (let i = 0; i < 32; i++) {
    add_plan('test')

}

function add_div_line(){
    const new_div_line = document.createElement(`div`);
    new_div_line.classList.add(`line`)
    division_line_container.appendChild(new_div_line)
}
load_date_info()