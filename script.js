
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

function getuser() {
    reponames=[]
    username=document.getElementById("ghname").value;
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        var jsondata=JSON.parse(JSON.stringify(data));
        var noofrepos=jsondata.length
        for (let i=0; i<noofrepos;i+=1){
            reponames.push(jsondata[i].name);

        }
        document.getElementById("texttemporary").innerHTML=reponames;
    })
}

function getcommits(){
    noofcommits=[]
    nightcommits=[]
    for (let i=0; i<reponames.length;i+=1){

        fetch(`https://api.github.com/repos/${username}/${reponames[i]}/commits`)
        .then(response => response.json())
        .then(data => {
        jsondata=JSON.parse(JSON.stringify(data));
        var localnoofcommits=jsondata.length
        var localnightcommits=0
        noofcommits.push(localnoofcommits);
        
        for (let i=0; i<localnoofcommits;i+=1){
            if (+jsondata[i].commit.author.date.match(/T(.*)Z/)[1].slice(0,2)<6){
                localnightcommits+=1;
            }
            
        }
        nightcommits.push(localnightcommits);
        document.getElementById("texttemporary").innerHTML=`${arraysummer(noofcommits)} total, ${arraysummer(nightcommits)} as a nightowl xD`;
        console.log(reponames, noofcommits, nightcommits)

             
    })
    }
    
    

    
}

