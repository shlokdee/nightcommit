
var noofcommits=[];
var nightcommits=[]
var reponames=[]


function arraysummer(array){
    var sum=0;
    for (let i=0;i<array.length; i+=1){
        sum+=array[i];
    }
    return sum;
}

async function getuser() {
    reponames=[]
    username=document.getElementById("ghname").value;
    var response= await fetch(`https://github-proxy.shlokdee.workers.dev/users/${username}/repos`)
    var data= await response.json()
    
        var jsondata=JSON.parse(JSON.stringify(data));
        var noofrepos=jsondata.length
        for (let i=0; i<noofrepos;i+=1){
            reponames.push(jsondata[i].name);

        }
    
}

async function getcommits(){
    noofcommits=[]
    nightcommits=[]

     await Promise.all(reponames.map(async (repoName) => {
        const response = await fetch(`https://github-proxy.shlokdee.workers.dev/repos/${username}/${repoName}/commits`);

        if (!response.ok){
            noofcommits.push(0);
            nightcommits.push(0)
            return;
        }
        const data = await response.json();
        jsondata = JSON.parse(JSON.stringify(data));
        var localnoofcommits=jsondata.length
        var localnightcommits=0
        
        
        for (let i=0; i<localnoofcommits;i+=1){
            if (+jsondata[i].commit.author.date.match(/T(.*)Z/)[1].slice(0,2)<6){
                localnightcommits+=1;
            }
            
        
        

             
        }
        noofcommits.push(localnoofcommits);
        nightcommits.push(localnightcommits);
    }))}






async function mastervader(){
    document.getElementById("mainprogress").classList.remove("hidden");
    infocards.innerHTML=""
    document.getElementById("texttemporary").innerHTML="loading pls wait";
    await getuser();
    await getcommits();
    document.getElementById("mainprogress").value=arraysummer(nightcommits);
        document.getElementById("mainprogress").max=arraysummer(noofcommits);

    document.getElementById("texttemporary").innerHTML=`${arraysummer(noofcommits)} total, ${arraysummer(nightcommits)} as a nightowl xD`;
    console.log(reponames, noofcommits, nightcommits)

    infocards=document.getElementById("infocards")
    for (let i=0; i<reponames.length; i+=1){
        var msg=""
        var clr="#00FF29";
        if (nightcommits[i]==0){
            msg="dissapointing"
            clr="red"
        }else if (nightcommits[i]<noofcommits[i]/4){
            msg="at least we are somewhere" 
            clr="yellow"
        }else if (nightcommits[i]<noofcommits[i]/2){
            msg="now we talkin"
        }else{
            msg="ur great"
        } 
        infocards.innerHTML+=`<div class="infocard"><progress class="infocardprogress" value=${nightcommits[i]} max=${noofcommits[i]}>32%</progress><h2>${reponames[i]}</h2><p>${noofcommits[i]} total, ${nightcommits[i]} commits as a nightowl</p><br><p style="color:${clr}">${msg}</p></div>`
    }

}

