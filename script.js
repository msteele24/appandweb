// Get all day divs
const dayDivs = document.querySelectorAll('.days div');

let data = {
  month01: {
    name: "January",
    messages: {},
    days: {},
  }
};
let currentMonth = "month01";

function nextmonthonclick(){
  increaseMonthId();
  if (!data.hasOwnProperty(currentMonth)) {
    createMonth();
  }
  console.log(data);
  changeMonthHeading();
} 
function previousmonthonclick() {
  if (currentMonth === "month01") {
    return;
  }
  console.log('returns');
  decreaseMonthId();
  console.log(currentMonth);
  changeMonthHeading();
}

function update() {
  console.log("here")
  changeMonthHeading();
  clearTaskList();
  loadTasks();
   //clear tasks
   //add tasks for first date
}
function loadTasks() {
  const tasks = data[currentMonth].days[currentDay];
  for (const taskId in tasks) {
    if (tasks.hasOwnProperty(taskId)) {
      const taskText = tasks[taskId];
      generateTask(taskId, taskText);
    }
  }
}

function clearTaskList() {
  const container = document.getElementById('taskList');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function changeMonthHeading(){
  const monthtext = document.getElementById("monthText");
  let newMonthContent = getMonthName(currentMonth);
  monthtext.textContent = newMonthContent; 
  console.log("dfsgi");
}

function createMonth(){
  let currentMonthName = getMonthName(currentMonth);
  data[currentMonth] = {
    name: currentMonthName,
    messages:[],
  };
  console.log(data);

}

function decreaseMonthId(){
  let currentMonthId = parseInt(currentMonth.substring(5)); // Extract the numeric part of currentMonth
  currentMonthId--; // Decrement currentMonthId by 1
  currentMonth = "month" + currentMonthId.toString().padStart(2, '0'); // Convert currentMonthId to a string and pad it with leading zeros if necessary
  console.log(currentMonthId);
  console.log(currentMonth);
}

function increaseMonthId(){
  let currentMonthId = parseInt(currentMonth.substring(5)); // Extract the numeric part of currentMonth
  currentMonthId++; // Increment currentMonthId by 1
  currentMonth = "month" + currentMonthId.toString().padStart(2, '0'); // Convert currentMonthId to a string and pad it with leading zeros if necessary
  console.log(currentMonthId);
  console.log(currentMonth);
}

function getMonthName(monthID) {
  let monthNum = parseInt(monthID.slice(-2), 10); // Extract the last two characters as monthNum
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthName = months[(monthNum - 1) % 12];
  console.log(monthName); 
  return monthName;
}

//left and right arrows
const chevronLeft= document.getElementById('chevronLeft');
chevronLeft.addEventListener('click', function() {
  previousmonthonclick();
  console.log(data);
  let dateToDeactivate = document.getElementById(currentDay);
  dateToDeactivate.classList.remove('active');
});
const chevronRight= document.getElementById('chevronRight');
chevronRight.addEventListener('click', function() {
  nextmonthonclick();
  let dateToDeactivate = document.getElementById(currentDay);
  dateToDeactivate.classList.remove('active');
});

let messages = {
  d1: "message for d1",
  d2: 'message for d2',
  d3: "He difficult contented we determine ourselves me am earnestly. Hour no find it park. Eat welcomed any husbands moderate. Led was misery played waited almost cousin living. Of intention contained is by middleton am. Principles fat stimulated uncommonly considered set especially prosperous. Sons at park mr meet as fact like.",
  d4: 'message for d3',
  d5: 'message for d4',
  d6: 'message for d5',
  d7: 'message for d6',
  d8: 'message for d7',
  d9: 'message for d8',
  d10: 'message for d9',
  d11: 'message for d10',
  d12: 'message for d11',
  d13: 'message for d12',
  d14: 'message for d13',
  d15: 'message for d14',
  d16: 'message for d15',
  d17: 'message for d16',
  d18: 'message for d17',
  d19: 'message for d18',
  d20: 'message for d19',
  d21: 'message for d20',
  d22: 'message for d21',
  d23: 'message for d22',
  d24: 'message for d24',
  d25: 'message for d25',
  d26: 'message for d26',
  d27: 'message for d27',
  d28: 'message for d28',
  d29: 'message for d29',
  d30: 'message for d30',
  d31: 'message for d31',
  d32: 'message for d32',
  d33: 'message for d33',
  d34: 'message for d34',
  d35: 'message for d35',
}
sessionStorage.setItem('messages', JSON.stringify(messages));

// Add click event listener to each day div
let currentDay = d1;
dayDivs.forEach(dayDiv => {
  dayDiv.addEventListener('click', showMessage)
  dayDiv.addEventListener('click', activeColor)
});

function removeTaskContainer(ham){
  delete data[currentMonth].days[currentDay][ham]; 
  const taskContainerToRemove = document.getElementById('c' + ham);
  taskContainerToRemove.remove();
}

function showMessage() {
  currentDay = this.id;
  const message = data[currentMonth].messages[currentDay];
  const messageInput = document.getElementById('messageInput');
  if (message) {
    messageInput.value = message;
  } else {
    messageInput.value = "enter notes";
  }
  update();
  console.log(data);
}

/*function showMessage() {

  currentDay = this.id;
  const message = messages[currentDay];
  //const message = data.currentmonth.curentday.message;
  messageInput.value = message;
}
*/

function activeColor() {
  dayDivs.forEach(div => {
    div.classList.remove('active');
  });
  this.classList.add("active");
}

const createTask = document.getElementById('createTask');
const messageInput = document.getElementById('messageInput');
const removeTaskButtons= document.querySelectorAll('.removeTask');

messageInput.addEventListener('input', e => {
  let currentInput = document.getElementById('messageInput');
    data[currentMonth].messages[currentDay] = currentInput.value;
  console.log(data);
});
  /*
    let currentInput = document.getElementById('messageInput');
    messages[currentDay] = currentInput.value;
    sessionStorage.setItem('messages', JSON.stringify(messages));
    */


function generateTask(id,text) {
    const taskList = document.getElementById('taskList');
    const container = document.createElement('div');
    const statusButton = document.createElement("div");
    const taskInfo = document.createElement('div');
    const removeTask = document.createElement('div');
    //move to 
    taskList.appendChild(container);
    container.appendChild(statusButton);
    container.appendChild(taskInfo);
    container.appendChild(removeTask);
    //add id
    removeTask.setAttribute('id',id);
    statusButton.setAttribute('id',id);
    taskInfo.setAttribute('id',id);
    container.setAttribute('id', 'c'+id);
    //add class
    removeTask.classList.add('removeTask');
    statusButton.classList.add('statusButton');
    taskInfo.classList.add('taskInformation');
    container.classList.add('taskContainer')
    //addContent
    removeTask.textContent = 'remove';
    statusButton.textContent = 'X';
    taskInfo.textContent = text;

    console.log(id);
    //update add function
    removeTask.addEventListener('click', () =>{
      console.log('remove task on click');
      let removeTaskId = removeTask.id;
      
      removeTaskContainer(removeTaskId);
      console.log(removeTask.id);
    });
    statusButton.addEventListener('click', () => {
      console.log("1313");
      taskInfo.classList.toggle('completed');
      statusButton.classList.toggle('completed');
      removeTask.classList.toggle('completed')
    });



}
createTask.addEventListener('click', function() {
  newGenerateTask();
});

function newGenerateTask() {
  let userInput = prompt("Please enter some text:");
  let newId = generateTaskId();
  
  if (!data[currentMonth].days.hasOwnProperty(currentDay)) {
    data[currentMonth].days[currentDay] = {};
  }
  
  data[currentMonth].days[currentDay][newId] = userInput;
  generateTask(newId, userInput);
}

let taskIdGenerate = 0;
function generateTaskId(){
  taskIdGenerate++;
  return 't'+ taskIdGenerate;
  
}
// stopwatch
let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;

document.getElementById('startTimer').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
});

document.getElementById('pauseTimer').addEventListener('click', ()=>{
    clearInterval(int);
});

document.getElementById('resetTimer').addEventListener('click', ()=>{
    clearInterval(int);
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    timerRef.innerHTML = '00 : 00 : 00 : 000 ';
});

function displayTimer(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}



/*
let data = {
  month01: {
    name:
    d1: {
      notes: '',
      day: "",
      date: ,
      tasks: {
        t1: "",
        t2; "",
        t3: "",
      }
    }
  }
  month02:{

  }
} 







//function?? generate container with container class -> generate buttons + information all with id + class -> current id ++

/*

  2. make it readable / format
  3. save  array
     unique id for container and unique id for 
     .parentElement .id/ id of container for storage






4.create NEW button function  on click 
    prompt information

    create container
    add id
    create delete button in continer
      add id
    create complete button 
      add id
    save information + id to array

  function to generate 

5. Data Format 
month1[
  d1[
    :date
    :note
    :task 
      tl1
        t
      ]
  ]
]
task list
tc1
tc2:input





*/

