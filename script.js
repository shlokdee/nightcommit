
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
    var response= await fetch(`https://api.github.com/users/${username}/repos`)
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
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits`);
        const data = await response.json();
        jsondata = JSON.parse(JSON.stringify(data));
        var localnoofcommits=jsondata.length
        var localnightcommits=0
        noofcommits.push(localnoofcommits);
        
        for (let i=0; i<localnoofcommits;i+=1){
            if (+jsondata[i].commit.author.date.match(/T(.*)Z/)[1].slice(0,2)<6){
                localnightcommits+=1;
            }
            
        nightcommits.push(localnightcommits);
        

             
        }}))}


async function mastervader(){
    document.getElementById("texttemporary").innerHTML="loading pls wait";
    await getuser();
    await getcommits();
    document.getElementById("texttemporary").innerHTML=`${arraysummer(noofcommits)} total, ${arraysummer(nightcommits)} as a nightowl xD`;
    console.log(reponames, noofcommits, nightcommits)

}

