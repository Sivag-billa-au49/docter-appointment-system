const formEle = document.querySelector("form");

formEle.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const formData = new FormData(formEle);
    const responce = await fetch("/signup",{
        method:"post",
        body:new URLSearchParams(formData)
    })
    if(responce.status == 200){
        location.replace("/dashboard");
    }
    else{
        const resData = await responce.json();
        console.log(resData.msg);
    }
})