workloads = document.getElementsByClassName("workload");
for (let i = 0; i < workloads.length; i++){
    if (parseInt(workloads[i].innerHTML) > 100){
        workloads[i].style.backgroundColor = "rgb(255,0,0)";
    }
    else{
        workloads[i].style.backgroundColor = "rgb(66, 245, 72)";
    }
    workloads[i].innerHTML = workloads[i].innerHTML + "%";
}