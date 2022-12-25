const emailEle = document.querySelector("#email");
const phoneEle = document.querySelector("#phone");
const nameEle = document.querySelector("#name");
const ageEle = document.querySelector("#age");


async function rndefault(){
    const dataRes = await fetch("/api/profile");
    if(dataRes.status == 200){
        const {email,name,phone,age} = await dataRes.json();
        console.log(email,phone,name,age);
        emailEle.innerText = email;
        phoneEle.innerText = phone;
        nameEle.innerText = name;
        ageEle.innerText =  age;
       
    }
    else{
        location.replace("/login");
    }
}
rndefault()