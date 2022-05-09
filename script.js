let goal = 25;
let entries = [];//global - pode ser acessada em toda parte, por todas as funções
const entriesWrapper = document.querySelector("#entries");
document.getElementById("target").innerText = goal.toFixed(1)

function addNewEntry(newEntry) {
    // console.log(newEntry);
    entriesWrapper.removeChild(entriesWrapper.firstElementChild);
    const listItem = document.createElement("li");
    const listValue = document.createTextNode(newEntry.toFixed(1));
    listItem.appendChild(listValue);

    entriesWrapper.appendChild(listItem);
}

function reducer(total, currentValue) {
    return total + currentValue
}

function calcTotal() {
    const totalValue = entries.reduce(reducer).toFixed(1);
    //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    document.getElementById("total").innerText = totalValue;
    document.getElementById("progressTotal").innerText = totalValue;
}

function calcAverage() {
    const average = entries.reduce(reducer) / entries.length;
    document.getElementById("average").innerText = average.toFixed(1);
}

function weeklyHigh() {
    const high = Math.max(...entries);//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    document.getElementById("high").innerText = high.toFixed(1);
}

function calcGoal() {
    const totalValue = entries.reduce(reducer).toFixed(1);
    const completedPercent = totalValue / (goal / 100);
    // console.log(completedPercent)
    const progressCircle = document.querySelector("#progressCircle");
    if (completedPercent > 100) completedPercent === 100;
    progressCircle.style.background = `conic-gradient(#70db70 ${completedPercent}%, #2d3740 ${completedPercent}% 50%)`;
}

function handleSubmit(event) {
    event.preventDefault() /* Evita que o formulário seja apagado, perdendo os dados, quando pressionar enter ou o botão de adicionar */
    const entry = Number(document.querySelector("#entry").value);
    if (!entry) return; //Evitar entrada do valor 0 em caso de usuário clicar em adicionar ou dar Enter sem ter incluído valor
    // console.log(entry);
    document.querySelector("form").reset();
    entries.push(entry);
    if (entries.length == 8) entries.shift();
    // console.log(entries);
    addNewEntry(entry);
    calcTotal();
    calcAverage();
    weeklyHigh();
    calcGoal();
}

function handleSubmit2(event) {
    event.preventDefault();
    newGoal = Number(document.querySelector("#setGoal").value);
    if (!newGoal) return;
    document.getElementById("target").innerText = newGoal.toFixed(1)
    document.querySelector("div#progressCenter form").reset();
    goal = newGoal;
    calcGoal();
}

const form = document.querySelector("form").addEventListener("submit", handleSubmit);

const form2 = document.querySelector("div#progressCenter form").addEventListener("submit", handleSubmit2);