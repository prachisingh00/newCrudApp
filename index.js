let regForm=document.querySelector("#register-form");

let allInput=regForm.querySelectorAll("INPUT");
// console.log(allInput);
let regList=document.querySelector(".reg-list");
let allRegData=[];
let allBtn=regForm.querySelectorAll("BUTTON");
let addBtn=document.querySelector(".add-btn");
let closeBtn=document.querySelector(".btn-close");
let url="";
let searchEl=document.querySelector(".search");
let delAll=document.querySelector(".del-all-btn");

if(localStorage.getItem("allRegData")!=null){
    allRegData=JSON.parse(localStorage.getItem("allRegData"));
}

// console.log(allRegData);


// add data 

regForm.onsubmit=(e)=>{
    e.preventDefault();

    let checkEmail=allRegData.find((data)=>data.email==allInput[1].value);
    if(checkEmail==undefined){
        allRegData.push({
            name:allInput[0].value,
            email:allInput[1].value,
            mobile:allInput[2].value,
            dob:allInput[3].value,
            password:allInput[4].value,
            profile:url==""?"image/logo.webp":url
        });
    
        localStorage.setItem("allRegData",JSON.stringify(allRegData));
        alert("successfully data inserted !!!");
        closeBtn.click();
        regForm.reset('');
        //  reload the page automatically
        getRegData();

    }else{
        alert("email already exists !!");
    }   
}


const getRegData=()=>{
    regList.innerHTML="";
    allRegData.forEach((data,index)=>{

        let dataStr=JSON.stringify(data);
        let finalData=dataStr.replace(/"/g,"'");

        // console.log(data,index);
        regList.innerHTML += `
            <tr>
                <td>${index+1}</td>
                <td>
                    
                    <img src="${data.profile}" height="50" style="border-radius:50%; width:50px; border:2px solid lightblue;" alt="">
                </td>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.mobile}</td>
                <td>${data.dob}</td>
                <td>
                    <button data="${finalData}" index="${index}"  class=" edit-btn btn btn-warning">edit</button>
                    <button index="${index}" class=" del-btn btn btn-danger">delete</button>
                </td>
            </tr>
        `
        
    });

    action();
}


//  actions 
const action=()=>{
    // delete action 
   let allDelBtn=regList.querySelectorAll(".del-btn");
   for(let btn of allDelBtn){
    btn.onclick=()=>{
        let index=btn.getAttribute("index");
        // alert(index);
        // confirm("are you want to delete data !!");
        allRegData.splice(index,1);
        localStorage.setItem("allRegData",JSON.stringify(allRegData));
        getRegData();
    }
   }
    //update action

    let allEditBtn=regList.querySelectorAll(".edit-btn");
    for(let btn of allEditBtn){
     btn.onclick=()=>{
         let index=btn.getAttribute("index");
        //  alert(index);
         let dataStr=btn.getAttribute("data");
         let finalData=dataStr.replace(/'/g,'"');
        let data=JSON.parse(finalData);
        console.log(data);
         addBtn.click();
 
         allInput[0].value=data.name;
         allInput[1].value=data.email;
         allInput[2].value=data.mobile;
         allInput[3].value=data.dob;
         allInput[4].value=data.password;
         url=data.profile;
 
         allBtn[0].disabled=false;
         allBtn[1].disabled=true;
 
         allBtn[0].onclick=()=>{
             allRegData[index]={
                 name:allInput[0].value,
                 email:allInput[1].value,
                 mobile:allInput[2].value,
                 dob:allInput[3].value,
                 password:allInput[4].value,
                 profile:url==""?"image/logo.webp":url
             }
             localStorage.setItem("allRegData",JSON.stringify(allRegData));
             closeBtn.click();
             regForm.reset('');
             getRegData();
             alert("data updated !!!");
 
 
             allBtn[1].disabled=false;
             allBtn[0].disabled=true;
         }
     }
    }

  
}

getRegData();



// search data

searchEl.oninput=()=>{
    search();
}

function search(){
    let value=searchEl.value.toLowerCase();
    // alert(value);
    let tr=regList.querySelectorAll("TR");
    let i;
    for(i=0;i<tr.length;i++){
        let allTd=tr[i].querySelectorAll("TD");
        let name=allTd[2].innerHTML;
        // alert(name);
        if(name.toLowerCase().indexOf(value)!=-1){
            tr[i].style.display="";
        }else{
            tr[i].style.display="none";
        }
    }
}

// delete all data 
delAll.onclick=()=>{
    // alert()
    allRegData=[];
    localStorage.removeItem("allRegData");
    getRegData();
    alert("all data deleted !!!");
}

// reading profile url 
allInput[5].onchange=()=>{
    let fReader=new FileReader();
    fReader.readAsDataURL(allInput[5].files[0]);
    fReader.onload=(e)=>{
        url=e.target.result;
    }
}


