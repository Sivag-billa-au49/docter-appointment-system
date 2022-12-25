const formEle = document.querySelector("form");
formEle.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const formData = new FormData(formEle);
    const res = await fetch("/book",{method:"post",body: new URLSearchParams(formData)});
    location.replace("/dashboard");
})