
var noofcommits=0;
var nightcommits=0

function getuser() {
    username=document.getElementById("ghname").value;
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        var jsondata=JSON.parse(JSON.stringify(data));
        var noofrepos=jsondata.length
        var reponames=[] 
        for (let i=0; i<noofrepos;i+=1){
            reponames.push(jsondata[i].name);

        }
        document.getElementById("texttemporary").innerHTML=reponames;
    })
}

function getcommits(){
    repo=document.getElementById("ghrepo").value;
    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
    .then(response => response.json())
    .then(data => {
        jsondata=JSON.parse(JSON.stringify(data));
        noofcommits+=jsondata.length

        for (let i=0; i<noofcommits;i+=1){
            if (+jsondata[i].commit.author.date.match(/T(.*)Z/)[1].slice(0,2)<6){
                nightcommits+=1;
            }
        }
        document.getElementById("texttemporary").innerHTML=`${noofcommits} total, ${nightcommits} as a nightowl xD`;
             
    })
}
