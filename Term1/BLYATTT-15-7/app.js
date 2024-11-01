document.getElementById("FormZZ").addEventListener("submit", function(event){
    event.preventDefault();
   
    let formdata = new FormData(this);
    let result = ("Name : ") +
    formdata.get("name")+"<br>"+"Email : " +
    formdata.get("email")+"<br>"+"Age : " +
    formdata.get("age")+"<br>"+"Gender : " +
    formdata.get("gender")+"<br>"+"Comments: " +
    formdata.get("comments");
    document.getElementById("result").innerHTML = "<h1> my data <h1> "+ result;

})