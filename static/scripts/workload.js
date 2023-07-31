workloads = document.getElementsByClassName("workload");
for (let i = 0; i < workloads.length; i++){
    if (parseInt(workloads[i].innerHTML) >= 95){
        workloads[i].style.backgroundColor = "rgb(255,0,0)";
    }
    else{
        workloads[i].style.backgroundColor = "rgb(66, 245, 72)";
    }
    workloads[i].innerHTML = workloads[i].innerHTML + "%";
}
//Make this turn yellow if the workload is below 80!