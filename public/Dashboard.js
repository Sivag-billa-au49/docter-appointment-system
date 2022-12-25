const appointmentTable = document.querySelector("#appointment-table");
async function rundefault(){
    const datares = await fetch("/api/dashboard");
    if(datares.status == 400){
        location.replace("/login");
        return;
    }
    const data = await datares.json();
    if(data.appointments){
    for(let i=0;i<data.appointments.length;i++){
        appointmentTable.append(createRow(i+1,data.appointments[i].date,data.appointments[i].specialization,data.appointments[i].time));
    }
    console.log(data);
}
}

function createRow(sno,date,name,time){
    const tr = document.createElement("tr");
    tr.append(createTD(sno));
    tr.append(createTD(date));
    tr.append(createTD(name));
    tr.append(createTD(time));
    return tr;
}

function createTD(value){
    const td = document.createElement("td");
    td.innerText = value;
    return td;
}

rundefault();