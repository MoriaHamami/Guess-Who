'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.victorious button').click(onRestartGame)

function init() {
  // localStorage.clear()
  $('.victorious').hide()
  createQuestsTree()
}

function onStartGuessing() {
  // DONE: hide the game-start section
  $('.game-start').hide()
  // DONE: show the quest section
  $('.quest').show()
  renderQuest()
}

function renderQuest() {
  // DONE: select the <h2> inside quest and update
  // its text by the currQuest text
  const txt = getCurrQuest().txt
  $('.quest h2').text(txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // DONE: improve UX
      $('.quest').hide()
      $('.victorious').show()
    } else {
      // DONE: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // DONE: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess( newQuest, newGuess, gLastRes )

  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null
  init()
}
