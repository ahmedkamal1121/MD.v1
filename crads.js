
let pricess = document.getElementById("pricess")
let title = document.getElementById("title")
let taxes =  document.getElementById("taxes")
let ads = document.getElementById("ads")
let  dis= document.getElementById("dis")
let total = document.getElementById("total")
let tbody =document.getElementById("tbody")
let catagory= document.getElementById("catagory")
let cont =document.getElementById("cont")
let btnc =document.getElementById("btnc")
let serch=document.getElementById("serch")
let titleser = document.getElementById("titleser")

let mood ="create"
let tmp;
//get total
function gettotal(){

  if(pricess.value !== ""){
    let tot = Number(pricess.value )- (Number(taxes.value) +  +ads.value + +dis.value)
    total.innerHTML = tot
    total.style.background ="green"
  }else{
    total.innerHTML = ""
    total.style.background ="red"
  }
}


//create prodect

let mydata = JSON.parse( localStorage.getItem("CRADS")) ? JSON.parse( localStorage.getItem("CRADS")) : []

function createProdect(){

    let obj ={
        title:title.value.toLowerCase(),
        price:pricess.value,
        taxes:taxes.value,
        ads:ads.value,
        dis:dis.value,
        total:total.innerHTML,
        catagory:catagory.value.toLowerCase(),
        cont:cont.value
    }


if(title.value != "" && pricess.value != ""&& catagory.value !="" && cont.value < 101){
  
      if(mood === "create"){
          if(cont.value > 1){
              for(let x=0;x<cont.value;x++){
                  mydata.push(obj)
           }
          }else{
      
              mydata.push(obj)
          }
  
          }else{
              mydata[ tmp ].title = title.value
              mydata[ tmp ].catagory= catagory.value
              mydata[ tmp ].price=pricess.value
              mydata[ tmp ].taxes=taxes.value
              mydata[ tmp ].dis=dis.value
              mydata[ tmp ].total=total.innerHTML 
              mood ="create"
              cont.style.display ="block"
              btnc.innerHTML = " create"
  
          }

          clear()
}else{
  alert("fill data!! or cont is over 100")
}


    localStorage.setItem("CRADS",JSON.stringify(mydata))
    show()
}



//clear 
function clear(){
    title.value=""
    pricess.value="" 
    taxes.value="" 
    ads.value="" 
    dis.value="" 
    total.innerHTML="" 
    catagory.value=""
    cont.value=""
}

// get serch mood
let sermood ="titleser";

function getsermood(mood){

  if(mood === "titleser"){
    serch.focus()
    serch.placeholder ="Serch by title"
    sermood="titleser"
  }else{
    serch.focus()
    serch.placeholder ="Serch by category"
    sermood="catagoryser"
  }

  serch.value=""
  show()
}

//serch
function serchf(val){

  let table = ""
  if(sermood === "titleser"){


    for(var i=0;i<mydata.length;i++){
      
      if(mydata[i].title.includes(val.toLowerCase())){

        table += `   <tr>
                                  <td>${i}</td>
                                  <td>${mydata[i].title}|</td>
                                  <td>${mydata[i].price}</td>
                                  <td>${mydata[i].taxes}</td> 
                                  <td>${mydata[i].ads}</td>
                                  <td>${mydata[i].dis}</td>
                                  <td>${mydata[i].total}</td>
                                  <td>${mydata[i].catagory}</td>
                                  <td><button onclick="update(${i})" id="update">update</button></td>
                                  <td><button onclick="delete1(${i})" id="delete">delete</button></td>
                              </tr>
                          `
      }
    }
  }else{
 
    for(var i=0;i<mydata.length;i++){

    if(mydata[i].catagory.includes(val.toLowerCase())){

      table += `   <tr>
                                <td>${i}</td>
                                <td>${mydata[i].title}|</td>
                                <td>${mydata[i].price}</td>
                                <td>${mydata[i].taxes}</td> 
                                <td>${mydata[i].ads}</td>
                                <td>${mydata[i].dis}</td>
                                <td>${mydata[i].total}</td>
                                <td>${mydata[i].catagory}</td>
                                <td><button onclick="update(${i})" id="update">update</button></td>
                                <td><button onclick="delete1(${i})" id="delete">delete</button></td>
                            </tr>
                        `
    }

  }
  
  
}
tbody.innerHTML = table

}

//show data

function show(){
    gettotal()
    tbody.innerHTML =""

  for(var i=0;i<mydata.length;i++)
      tbody.innerHTML += `   <tr>
                              <td>${i}</td>
                              <td>${mydata[i].title}|</td>
                              <td>${mydata[i].price}</td>
                              <td>${mydata[i].taxes}</td> 
                              <td>${mydata[i].ads}</td>
                              <td>${mydata[i].dis}</td>
                              <td>${mydata[i].total}</td>
                              <td>${mydata[i].catagory}</td>
                              <td><button onclick="update(${i})" id="update">update</button></td>
                              <td><button onclick="delete1(${i})" id="delete">delete</button></td>
                          </tr>
                      `

               let delateall=document.getElementById("delateall")    
               if(mydata.length > 0){
                delateall.innerHTML =`
                <button onclick="deleteall()" id="delete">delete ALL (${mydata.length})</button>`
               }  else{
                delateall.innerHTML =""
               } 
  }
  show()


//update
  function update(id){
      title.value= mydata[id].title
      pricess.value= mydata[id].price
      taxes.value= mydata[id].taxes
      ads.value= mydata[id].ads
      dis.value= mydata[id].dis
      gettotal()
      catagory.value=mydata[id].catagory
      total.innerHTML= mydata[id].total

      cont.style.display ="none"
      btnc.innerHTML = "  Update"
      mood ="Update"
      tmp =id
      scroll({
        top:0,
        behavior:"smooth"
      })
      
  }


//delte
  function delete1(id){

    mydata.splice(id,1)
    localStorage.setItem("CRADS",JSON.stringify(mydata))
    show()
  }


  function deleteall(){
   
  if( confirm("Are u sure u want dealet all data??")){
    localStorage.clear()
    mydata=[]
    show()

  }
}
