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
		candyName.value = candyDescription.value = candyPrice.value = candyQuantity.value = "";
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
	if (document.querySelector("ul")) {
		document.querySelector("ul").remove();
	}
	let newList = document.createElement("ul");

	let res = await fromDatabase();

	for (let i = 0; i < res.length; i++) {
		let listItem = document.createElement("li");
		listItem.setAttribute("id", res[i].id);
		listItem.setAttribute("quant", res[i].quantity);
		listItem.setAttribute("name", res[i].name);

		let text = document.createTextNode(`${res[i].name}  ${res[i].description}  ${res[i].price}  ${res[i].quantity}`);

		listItem.appendChild(text);
		newList.appendChild(listItem);
		let buy1 = document.createElement("button");
		let buy2 = document.createElement("button");
		let buy3 = document.createElement("button");
		buy1.appendChild(document.createTextNode("buy 1"));
		buy2.appendChild(document.createTextNode("buy 2"));
		buy3.appendChild(document.createTextNode("buy 3"));
		listItem.appendChild(buy1);
		listItem.appendChild(buy2);
		listItem.appendChild(buy3);
		buy1.addEventListener("click", deductByOne);
		buy2.addEventListener("click", deductByTwo);
		buy3.addEventListener("click", deductByThree);
	}
	list.appendChild(newList);
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
	let id = e.target.parentNode.getAttribute("id");
	let quant = e.target.parentNode.getAttribute("quant");
	let candyName = e.target.parentNode.getAttribute("name");
	quant = quant - 1;
	if (quant < 0) {
		alert(`you cannot buy more ${candyName}`);
		e.target.parentNode.remove();
		deleteCandy(id);
	} else {
		updateCandy(id, quant);
	}
}

function deductByTwo(e) {
	let id = e.target.parentNode.getAttribute("id");
	let quant = e.target.parentNode.getAttribute("quant");
	let candyName = e.target.parentNode.getAttribute("name");

	quant = quant - 2;

	if (quant < 0) {
		alert(`you cannot buy more ${candyName}`);
		e.target.parentNode.remove();
		deleteCandy(id);
	} else {
		updateCandy(id, quant);
	}
}

function deductByThree(e) {
	let id = e.target.parentNode.getAttribute("id");
	let quant = e.target.parentNode.getAttribute("quant");
	let candyName = e.target.parentNode.getAttribute("name");

	quant = quant - 3;

	if (quant < 0) {
		alert(`you cannot buy more ${candyName}`);
		e.target.parentNode.remove();
		deleteCandy(id);
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