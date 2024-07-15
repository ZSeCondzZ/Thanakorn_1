document.getElementById("FormZZ").addEventListener("submit", function(event){
    event .preventDefault();
   
    let formdata = new formdata(this);
    let result = ("Name") +
    formdata.get("Name")+"<br>"+"Email :" +
    formdata.get("Email")+"<br>"+"age :" +
    formdata.get("age")+"<br>"+"gender :" +
    formdata.get("gender")+"<br>"+" comants:" +
    formdata.get("comants");
    document.getElementById("result").rnneHTML = "<h1> my data <h1> + reuslt"; 

})