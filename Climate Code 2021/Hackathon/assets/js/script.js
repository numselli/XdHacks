// event listeners
document.addEventListener("DOMContentLoaded", pageLoad)
window.addEventListener("hashchange", pageLoad, false);
pageLoad()
function pageLoad(){
  // dynamic page swaping
  const main = document.getElementById("main")
  const panels = main.getElementsByClassName('panel')
  const panel = document.querySelector(`[id="${window.location.hash.replace("#","")}"]`) ?? panels[0];
  for(const currentPannel of panels) {
    if (panel.id === currentPannel.id){
      currentPannel.classList.add("active")
      currentPannel.classList.remove("inactive")
      currentPannel.style=""
    }else{
      currentPannel.classList.add("inactive")
      currentPannel.classList.remove("active")
    } 
  }
  
  // scrole restore
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0; 

  // hide all questions and reset scores
  if (window.location.hash.replace("#","") == "games"){
    $('#levels').children().map(level=>document.getElementById(`L${level+1}`).classList.add("inactive"))
  }
}

// game logic
function startGame(instrction){
  $('#introText').hide()
  $('#L1').show()
}
function checkAnswer (level){
  const input = level.parentNode.getElementsByTagName("input")[0];
  const answers = input.getAttribute("answer").split(", ")
  const Lnum = Number(level.parentNode.id.replace("L", ""))

  // correct
  if (answers.some(answer=> input.value.toLowerCase() === answer.toLowerCase())){
    // update score
    const currentScore = Number(getCokie("score") ?? 0) 
    setCookie("score", currentScore+randnum(11));
    
    // upadte num of correct
    const correctAmount = Number(getCokie("correct") ?? 0) 
    setCookie("correct", correctAmount+1)

    // move to next level
    // show next
    document.getElementById(`L${Lnum+1}`).classList.remove("inactive")
    document.getElementById(`L${Lnum+1}`).classList.add("active")

    // hide current
    document.getElementById(`L${Lnum}`).style=""
    document.getElementById(`L${Lnum}`).classList.add("inactive")
    document.getElementById(`L${Lnum}`).classList.remove("active")


    // tell user its correct
    alert(`That is correct. Your score is ${currentScore+1}`)

    if (Lnum+1 === 7){
      // document.getElementById("correctDisplay").innerText=getCokie("correct")??0
      // get scores
      const correct = Number(getCokie("correct")??0)
      const wrong = Number(getCokie("inCorrect")??0)

      // calulate %
      const percent = ((correct/(correct+wrong))*100).toFixed(2)

      // display to user
      document.getElementById("correctDisplay").innerText=correct
      document.getElementById("wrongDisplay").innerText=wrong
      document.getElementById("percentDisplay").innerText= `${percent}%`
      document.getElementById("passDisplay").innerText= percent>=80.00 ? "Congratulations, you were successful in saving Canada!":"No one made moves to save the environment, so you all met your destined end."
    }
  }
  // incorect
  else{
    // update wrong amount
    const correctAmount = Number(getCokie("inCorrect") ?? 0) 
    setCookie("inCorrect", correctAmount+1)

    // ask user to use a hint if they have not alreay
    if (hasClass(document.getElementById(`l${Lnum}hint`), "inactive")){
      const useHint = confirm("that is incorrect would you like a hint?")
      if (useHint){
        $(`#l${Lnum}hint`).removeClass("inactive")
      }
    }    
  }
}

// cookie funtions
function getCokie(name){
  let ca = decodeURIComponent(document.cookie).split('; '), json = {};
  for (let i = 0; i < ca.length; i++) {
    json[ca[i].split("=")[0]]=ca[i].split("=")[1]
  }
  return json[name];
}
function setCookie(cName, cValue) {
  let date = new Date();
  date.setTime(date.getTime() + (6900000000000000 * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

// utils
const randnum = num => Math.floor(Math.random() * num);
function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}