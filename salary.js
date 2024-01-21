const firstname = document.getElementById("firstname");
const surname = document.getElementById("surname");
const salary = document.getElementById("salary");
const addBtn = document.getElementById("add-btn");
const loadBtn = document.getElementById("load-btn");
const listMenu = document.querySelector(".list-menu");
const table = document.querySelector("table");

const validationMessage = [
  {
    id: 1,
    message: "Name is required",
  },
  {
    id: 2,
    message: "Name must be minimum 3 character",
  },
  {
    id: 3,
    message: "Surname  is required",
  },
  {
    id: 4,
    message: "Surname  must be minimum 3 character",
  },
  {
    id: 5,
    message: "salary  is required",
  },
  {
    id: 6,
    message: "salary must be numbers",
  },
];
const checkThreeCharacter = (text) => text.length >= 3;

const checkHasNumber = function (text) {
  let symbolOfText;
  for (let i = 0; i < text.length; i++) {
    symbolOfText = text.charAt(i);
    if (isNaN(symbolOfText)) {
      return true;
    }
  }
  return false;
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerHTML = message;
  inputControl.classList.add("error");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerHTML = "";
  inputControl.classList.remove("error");
};

const validationFn = function () {
  const nameValue = firstname.value.trim();
  const surNameValue = surname.value.trim();
  const salaryValue = salary.value.trim();
  if (nameValue == "") {
    setError(firstname, validationMessage[0].message);
  } else if (!checkThreeCharacter(nameValue)) {
    setError(firstname, validationMessage[1].message);
  } else {
    setSuccess(firstname);
  }

  if (surNameValue == "") {
    setError(surname, validationMessage[2].message);
  } else if (!checkThreeCharacter(surNameValue)) {
    setError(surname, validationMessage[3].message);
  } else {
    setSuccess(surname);
  }

  if (salaryValue == "") {
    setError(salary, validationMessage[4].message);
  } else if (checkHasNumber(salaryValue)) {
    setError(salary, validationMessage[5].message);
  } else {
    setSuccess(salary);
  }
};

let personArr = [];
const addingMenu = function (event) {
  let firstNameValue = firstname.value;
  let surNameValue = surname.value;
  let salaryValue = salary.value;
  event.preventDefault();

  if (
    firstNameValue === "" ||
    surNameValue === "" ||
    salaryValue === "" ||
    isNaN(salaryValue)
  ) {
    validationFn();
  } else {
    setSuccess(firstname);
    setSuccess(surname);
    setSuccess(salary);
    personArr.push({
      firstName: firstNameValue,
      lastName: surNameValue,
      salary: salaryValue,
    });
    updateList();
    clearInputFields();
  }
  personArr = [];
};

const clearInputFields = function () {
  firstname.value = "";
  surname.value = "";
  salary.value = "";
};

const updateList = function () {
  personArr.forEach((person) => {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.appendChild(checkbox);
    li.innerHTML += `${person.firstName} ${person.lastName} ${person.salary}`;
    li.classList.add("list-item");
    listMenu.appendChild(li);
  });
};

const loadToTable = function (event) {
  event.preventDefault();

  let checkedItems = document.querySelectorAll(".list-item input:checked");
  checkedItems.forEach((item) => {
    let li = item.parentElement;
    let data = li.textContent.trim().split(" ");

    let isAlreadyAdded = Array.from(table.rows).some((row) => {
      let rowData = Array.from(row.cells).map((cell) => cell.textContent);
      return rowData.join(" ") === data.join(" ");
    });

    if (!isAlreadyAdded) {
      let row = document.createElement("tr");
      row.classList.add("t-row");
      row.innerHTML = `<td>${data[0]}</td><td>${data[1]}</td><td>${data[2]}</td>`;
      table.appendChild(row);
    }
  });
};

addBtn.addEventListener("click", addingMenu);
loadBtn.addEventListener("click", loadToTable);
