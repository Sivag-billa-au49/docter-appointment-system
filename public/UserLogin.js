const formele = document.querySelector("form")
const errotext = document.querySelector("#error-text");
formele.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const formData = new FormData(formele);
    const loginresponce = await fetch("/login",{method:"post",body:new URLSearchParams(formData)});
    if(loginresponce.status == 200){
        console.log("login sucesfull")
        location.replace("/dashboard");
    }
    else{
        const logindata = await loginresponce.json();
        errotext.innerHTML = logindata.msg;
    }
})
