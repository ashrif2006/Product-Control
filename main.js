


let title = document.getElementById("title")
let price= document.getElementById("price")
let ads= document.getElementById("ads")
let taxes= document.getElementById("taxes")
let discount= document.getElementById("discount")
let total= document.getElementById("total")
let submit= document.getElementById("submit")
let category= document.getElementById("category")
let count= document.getElementById("count")
let deleteAll=document.getElementById("deleteAll")

let mode="create";

//متغير مساعد عشان اقدر استخدمو مع مود والتغيير
let tmp;


//get Total
function getTotal(){
    if(price.value!=''){
        let result=(+price.value + +taxes.value  + +ads.value)- +discount.value ;
        total.style.background="rgb(18, 170, 18)"
        total.innerHTML=result
    }
    else{
        total.innerHTML=""
        total.style.background="#a00d02"
    }
}

//save in local storage
let dataPro;
if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product)
}
else{
    dataPro=[] ;
}

//create product
submit.onclick=()=>{
    if(title.value!='' && price.value!=''){
        let newPro={
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase(),

        }

        if(mode==="create"){
            if(newPro.count>1){
                for(let i=0;i<newPro.count;i++){
                    dataPro.push(newPro)
                }
            }
            else{
                dataPro.push(newPro)
            }
        }else{
            dataPro[tmp]=newPro;
            mode="create";
            submit.innerHTML="create";
            count.style.display="block"
        }

        
        
        

        //save in local storage
        localStorage.setItem('product',  JSON.stringify(dataPro)  );

        clearData();
        showData();        
    }
    else{
        alert("من فضلك املأ خانة العنوان والسعر أولاً!");    
    }

    getTotal()
}

//clear input
function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML=""
    category.value="";
    category.value="";
    count.value="";

}
//read
function showData(){
   let table= ''; 
    for(var w=0;w<dataPro.length;w++){
        table+=`
        <tr>
            <td>${w + 1}</td>
            <td>${dataPro[w].title}</td>
            <td>${dataPro[w].price}</td>
            <td>${dataPro[w].taxes}</td>
            <td>${dataPro[w].ads}</td>
            <td>${dataPro[w].discount}</td>
            <td>${dataPro[w].total}</td>
            <td>${dataPro[w].category}</td>
            <td><button onclick="updateItem(${w})" id="update">update</button></td>
            <td><button onclick="deleteItem(${w})" id="delete">delete</button></td>
        </tr>   
        `            
        }

    if(dataPro.length==0){
        deleteAll.style.display="none"
    }  
    else{
        deleteAll.style.display="block"
        deleteAll.textContent=` ( ${dataPro.length} )`;
    }  

    document.getElementById("tBody").innerHTML = table;




}
//count





//delete Item

function deleteItem(i){
    dataPro.splice(i,1);
    localStorage.product =JSON.stringify(dataPro);
    showData();
}


//Dlelte all
function deletItems(){
    localStorage.clear();
    dataPro.splice(0);400
    showData()
}
//update

function updateItem(i){
    title.value= dataPro[i].title;
    price.value= dataPro[i].price;
    taxes.value= dataPro[i].taxes;
    ads.value= dataPro[i].ads;
    discount.value= dataPro[i].discount;
    total.innerHTML= dataPro[i].total;
    category.value= dataPro[i].category;
    getTotal();
    count.style.display="none";
    submit.innerHTML="Update";

    mode="update";
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth",
    })
    
}
//search

let searchMode="title";

function getSearchMode(id){
    let search=document.getElementById("search");
    search.style.display="block"
    if(id=="searchTitle"){
        searchMode="title";
        search.placeholder="Search By Title";
    }
    else{
        searchMode="category";
        search.placeholder="Search By Category"
    }
    search.focus();
    search.value='';
    showData();

}

function searchData(value){
    let table='';
    if(searchMode=="title"){
        for(let i=0;i<dataPro.length;i++){

            if(dataPro[i].title.includes(value.toLowerCase())){
                table+=`
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateItem(${i})" id="update">update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                    </tr>   
                    ` 
            }
        }

    }else{
        for(let i=0;i<dataPro.length;i++){

            if(dataPro[i].category.includes(value.toLowerCase())){
                table+=`
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateItem(${i})" id="update">update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                    </tr>   
                    ` 
            }
        }
    }
    document.getElementById("tBody").innerHTML = table;    
}
//clean data

    showData();