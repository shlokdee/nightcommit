function getuser() {
    username=document.getElementById("ghname").value;
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        var jsondata=JSON.parse(JSON.stringify(data));
        var noofrepos=jsondata.length
        var reponames=[]
        var 
        for (let i=0; i<noofrepos;i+=1){
            reponames.push(jsondata[i].name)

        }
        document.getElementById("texttemporary").innerText=reponames;
    })
}
