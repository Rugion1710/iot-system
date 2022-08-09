
function increaseValue(id) {
  var value = parseInt(document.getElementById(id.id).value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById(id.id).value = value;
}



function decreaseValue(id) {
  var value = parseInt(document.getElementById(id.id).value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById(id.id).value = value;
}

var medicine = ["Paracetamol", "Efferagan", "Tylenol", "Amiodaron", "Metronidazol", "Streptokinase", "Loratadin",
  "Telmisartan", "Loratadin", "Carboplatin", "Acenocoumarol", "Cefadroxil", "Levetiracetam", "Mifepristone", "Atropin_sulfat"]
let search = document.getElementById("medicine")
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}


autocomplete(search, medicine)
let searchBtn = document.getElementById("searchBtn")
searchBtn.addEventListener("click", addNewMedicine)

function GetElementInsideContainer(containerID, childID) {
  var elm = {};
  var elms = document.getElsementById(containerID).getElementsByTagName("*");
  for (var i = 0; i < elms.length; i++) {
    if (elms[i].id === childID) {
      elm = elms[i];
      break;
    }
  }
  return elm;
}


function deleteMedicine(name) {
    document.getElementById(`name-${name.id}`).remove()

    index = newMedicineList.indexOf(name.id)
    newMedicineList.splice(index, 1)
}

function deleteAllMedicine() {
  if (newMedicineList.length >0) {
    for (i=0; i<newMedicineList.length; i++) {
      nameMedicine = newMedicineList[i]
      document.getElementById(`name-${nameMedicine}`).remove()
    }
    newMedicineList = []
    return newMedicineList
  } else {
    alert("Medicine list is empty")
  }
 
}
let deleteAllButton = document.getElementById("deleteAll")
deleteAllButton.addEventListener("click", deleteAllMedicine)



let searching = document.getElementById("medicine")
searching.addEventListener("keypress", function (event) {
  if (event.which === 13) {
    addNewMedicine()
  }
})

timeSetBtn = document.getElementById("timeSet")
appt = document.getElementById("appt")
timeSetBtn.addEventListener("click", function () {
  if ($('#timeSet').is(":checked")) {
    appt.style.display = "block"
    console.log("time-on")
  }
  else {
    appt.style.display = "none"
    console.log("time-off")
  }
})




function postPrescription() {
  if (newMedicineList.length >  0 ){ 
    createMedicineTable()


  } else {
    alert("Please enter at least one medicine")
  }


}

const deliveryBtn = document.getElementById("delivery")
deliveryBtn.addEventListener("click", sendPre)
function sendPre() {
  const doctor_name = document.getElementById("doctor_name")
  const room = document.getElementById("room")
  const patient = document.getElementById("patient")
  const delivery_time = document.getElementById("appt")
  let postMedicineList = newMedicineList
  let amount_list = []
  for (i=0; i<newMedicineList.length; i++) {
    let tempMed = document.getElementById(newMedicineList[i])
    amount_list.push(tempMed.value)
  }
  let postDict = { 
    "doctor_name": doctor_name.value,
    "room": room.value, 
    "patient_number": patient.value, 
    "delivery_time": delivery_time.value,
    "medicine_list": postMedicineList,
    "amount_list": amount_list
  }
  let dictstring = JSON.stringify(postDict);
  console.log(dictstring)
  $.ajax({
    url:"post_prescription",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(dictstring)
  })
  alert("Create prescription success!!!")
  window.location.reload()
}

let renderBtn = document.getElementById("render")
renderBtn.addEventListener("click", postPrescription)


const table = document.getElementById("medicineTable")
const result = document.getElementById("result")
const sectionResult = document.getElementById("result-div")

function createMedicineTable(){
  sectionResult.style.display = "block"
  result.innerHTML = ''
  table.innerHTML = ''
  tableHeading = document.createElement("tr")
  tableHeading.innerHTML = `
  <tr>
    <th>No.</th>
    <th>Medicine name</th>
    <th>Amount</th>
  </tr>
  `
  table.appendChild(tableHeading)
  let amount_list = []
  for (i=0; i<newMedicineList.length; i++) {
    let tempMed = document.getElementById(newMedicineList[i])
    amount_list.push(tempMed.value)
  }
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;

  const doctor_name = document.getElementById("doctor_name")
  const room = document.getElementById("room")
  const patient = document.getElementById("patient")
  const delivery_time = document.getElementById("appt")

  const infor = document.createElement("div")
  infor.innerHTML = `
    <p>Date created: ${dateTime}</p>
    <p>Delivery time: ${delivery_time.value}</p>
    <p>Author: ${doctor_name.value}</p>
    <p>Patient number: ${room.value}</p>
    <p>Room number: ${patient.value}</p>
  `
  result.appendChild(infor)
  newMedicineList.forEach(renderMed)
  function renderMed(value, index, array){
    let newRow = document.createElement("tr")
    newRow.innerHTML = `
      <td>${index+1}</td>
      <td>${value}</td>
      <td>${amount_list[index]}</td>
    `
    table.appendChild(newRow)
  }
 
}


newMedicineList = []

const selected_medicine = document.getElementById("selected")
function addNewMedicine() {
  let search = document.getElementById("medicine")
  let searchValue = search.value
  const newMedicine = document.createElement("li")
  newMedicine.classList.add("selected-item")
  newMedicine.setAttribute('id', `name-${searchValue}`)
  if (medicine.indexOf(searchValue) !== -1  && newMedicineList.includes(searchValue) == false) {
    newMedicineList.push(searchValue)
    newMedicine.innerHTML = `
          <p class="selected-item-name">${searchValue}</p>
          <form class="amount">
              <div class="value-button" id="decrease" onClick="decreaseValue(${(searchValue)})"  value="Decrease Value">-</div>
              <input type="number" class="number" id="${(searchValue)}" value="0" />
              <div class="value-button" id="increase" onClick="increaseValue(${(searchValue)})" value="Increase Value">+</div>
          </form>
          <button style="margin-left: 50px;" type="button" class="close" onClick="deleteMedicine(${searchValue})">
            <span aria-hidden="true">&times;</span>
          </button>
      `
    selected_medicine.appendChild(newMedicine)
    search.value = "";
  } else if (newMedicineList.includes(searchValue)) {
    alert("Medicine chose!")
    search.value = "";

  } else if (search.value == "") {
    alert("Please choose a medicine!")
  }
  else {
    alert("Please choose a valid medicine name!")
    search.value = "";
  }

}

