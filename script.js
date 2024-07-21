const BASE_URL = "https://v6.exchangerate-api.com/v6/75b6b7202be6be57e48a258f/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".exchange");
const exchangeBtn = document.querySelector(".exbtn");
const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

for (let select of dropdowns){
  for (currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
      newOption.selected="selected";
    }
    if(select.name === "to" && currCode === "INR"){
      newOption.selected="selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });

}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode= countryList[currCode];
  let newSrs = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrs;
}

exchangeBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  updateFlag(toCurr);
  updateFlag(fromCurr);
});

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < '1') {
      amtVal = 1;
      amount.value = "1";
  }

  const URL = `${BASE_URL}${fromCurr.value}`;
  let response = await fetch(URL);
  if (!response.ok) {
      msg.innerText = "Failed to fetch exchange rate.";
      return;
  }
  let data = await response.json();
  let rate = data.conversion_rates[toCurr.value];
  let final = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${final} ${toCurr.value}`;
});

