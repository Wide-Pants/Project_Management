const scheduler = document.getElementById(`schedule`)

const today_btn = document.getElementById(`today`)
const week_view_btn = document.getElementById(`week_view_btn`)
const month_view_btn = document.getElementById(`month_view_btn`)
const season_view_btn = document.getElementById(`season_view_btn`)

const weeks = document.getElementById(`weeks`);
const months = document.getElementById(`months`);
const seasons = document.getElementById(`seasons`);

const add_plan_line = document.getElementById(`add_plan_line`)
const add_new_plan_btn = document.getElementById(`add_plan_btn`)
const input_new_plan = document.getElementById(`plan_type`)

var mag_status = `week`
const selected_color = `#e6ffea`;

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
    console.log(e.code)
    if(e.code ==`NumpadEnter` || e.code ==`Enter`){
        const plan_ID_value = input_new_plan.value;
        console.log(plan_ID_value);
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
    const new_plan_bar = document.createElement(`div`)
    new_plan_bar.setAttribute(`id`,'_'+plan_name)
    new_plan_bar.classList.add(`plan_bar`);
    new_plan.classList.add(`plan_name`);
    new_plan.innerHTML = `🅰️<span class="project_abbreviation">${project_abbreviation}-${cnt}</span>${plan_name}`
    if(add_new_plan_btn.classList.contains(`odd_status`)){
        new_plan_bar.classList.add(`odd_status`);
        new_plan.classList.add(`odd_status`);
    }
    add_new_plan_btn.before(new_plan);
    add_plan_line.before(new_plan_bar);
}