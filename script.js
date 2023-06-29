window.addEventListener("DOMContentLoaded", form);
let addButton = document.querySelector("#addButton");
let candyName = document.querySelector("#candyName");
let candyDescription = document.querySelector("#candyDescription");
let candyPrice = document.querySelector("#candyPrice");
let candyQuantity = document.querySelector("#candyQuantity");
let list = document.querySelector("#list");

addButton.addEventListener("click", form_submit);

async function form_submit(e) {
  try {
    e.preventDefault();
    let obj = {
      name: candyName.value,
      description: candyDescription.value,
      price: candyPrice.value,
      quantity: candyQuantity.value,
    };
    candyName.value =
      candyDescription.value =
      candyPrice.value =
      candyQuantity.value =
        "";
    await toDatabase(obj);
    form();
  } catch (error) {
    console.log(error);
  }
}

async function toDatabase(obj) {
  try {
    await axios.post("http://localhost:3000/userr/candy", obj);
  } catch (error) {
    console.log(error);
  }
}

async function form() {
	let table = document.querySelector("#styled-table");
  
	let tbody = document.getElementById("boxx");
	let thead = document.querySelector("#thead");

	thead.innerHTML = "";
	tbody.innerHTML = "";

  let res = await fromDatabase();


  for (let i = 0; i < res.length; i++) {
    if ((i == 0)) {
      let tR = document.createElement("tr");
      let th1 = document.createElement("th");
      let th2 = document.createElement("th");
      let th3 = document.createElement("th");
      let th4 = document.createElement("th");
      let th5 = document.createElement("th");
      let th6 = document.createElement("th");
      let th7 = document.createElement("th");

      th1.innerHTML = "Candy Name";
      th2.innerHTML = "Description";
      th3.innerHTML = "Price";
      th4.innerHTML = "Quantity";
      th5.innerHTML = "Delete1";
      th6.innerHTML = "Delete2";
      th7.innerHTML = "Delete3";

      thead.appendChild(tR);
      tR.appendChild(th1);
      tR.appendChild(th2);
      tR.appendChild(th3);
      tR.appendChild(th4);
      tR.appendChild(th5);
      tR.appendChild(th6);
      tR.appendChild(th7);

      table.appendChild(thead);
    }
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");

    let td0 = document.createElement("td");

    td0.innerHTML = res[i].id;
    td1.innerHTML = res[i].name;
    td2.innerHTML = res[i].description;
    td3.innerHTML = res[i].price;
    td4.innerHTML = res[i].quantity;
    td0.style.display = 'none';
    let button1 = document.createElement("button");
    let button2 = document.createElement("button");
    let button3 = document.createElement("button");
 
	button1.innerHTML = 'Buy 1';
	button2.innerHTML = 'Buy 2';
	button3.innerHTML = 'Buy 3';

	button1.className = 'delete-btn';
	button2.className = 'delete-btn';
	button3.className = 'delete-btn';
 

    td5.appendChild(button1);
    td6.appendChild(button2);
    td7.appendChild(button3);
    

    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    if (i % 2 !== 0) {
      tr.className = "active-row";
    }
    tbody.appendChild(tr);
    
	button1.addEventListener("click", deductByOne);
    button2.addEventListener("click", deductByTwo);
    button3.addEventListener("click", deductByThree);
  }
}

async function fromDatabase() {
  try {
    let res = await axios.get("http://localhost:3000/userr/candy");

    return res.data;
  } catch (error) {
    console.log("axios error");
  }
}

function deductByOne(e) {

let parent = e.target.parentElement;
let parent2 = parent.parentElement;
let id = parent2.children[0].innerHTML;

let quant = parent2.children[4].innerHTML;
quant = quant - 1;
  if (quant <= 0) {
    alert(`you cannot buy more ${parent2.children[1].innerHTML}`);
    deleteCandy(id);
	form();
  } else {
    updateCandy(id, quant);
  }
}

function deductByTwo(e) {
	let parent = e.target.parentElement;
	let parent2 = parent.parentElement;
	let id = parent2.children[0].innerHTML;
	
	let quant = parent2.children[4].innerHTML;
	quant = quant - 2;
	  if (quant <= 0) {
		alert(`you cannot buy more ${parent2.children[1].innerHTML}`);
		deleteCandy(id);
		form();
	  } else {
		updateCandy(id, quant);
	  }
}

function deductByThree(e) {
	let parent = e.target.parentElement;
	let parent2 = parent.parentElement;
	let id = parent2.children[0].innerHTML;
	
	let quant = parent2.children[4].innerHTML;
	quant = quant - 3;
	  if (quant <= 0) {
		alert(`you cannot buy more ${parent2.children[1].innerHTML}`);
		deleteCandy(id);
		form();
	  } else {
		updateCandy(id, quant);
	  }
}

async function updateCandy(id, quant) {
  try {
    let obj = {
      quantity: quant,
    };
    await axios.patch(`http://localhost:3000/userr/candy/${id}`, obj);
    console.log("candy updated");
    form();
  } catch (error) {
    console.log(error);
  }
}

async function deleteCandy(id) {
  try {
    await axios.delete(`http://localhost:3000/userr/candy/${id}`);
    console.log("deleted");
  } catch (error) {
    console.log(error);
  }
}
