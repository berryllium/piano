const keyboard = document.querySelector('.keyboard')
const buttons = [
  {key: 'a', note: 'mi'},
  {key: 's', note: 'fa'},
  {key: 'e', note: 'fa#'},
  {key: 'd', note: 'sol'},
  {key: 'r', note: 'sol#'},
  {key: 'f', note: 'la'},
  {key: 't', note: 'la#'},
  {key: 'g', note: 'si'},
  {key: 'h', note: 'do'},
  {key: 'u', note: 'do#'},
  {key: 'j', note: 're'},
  {key: 'i', note: 're#'},
  {key: 'k', note: 'mi'},
  {key: 'l', note: 'fa'},
  {key: 'p', note: 'fa#'},
  {key: ';', note: 'sol'},
  {key: '[', note: 'sol#'},
  {key: '\'',note: 'la'},
  {key: ']', note: 'la#'},
  {key: '\\',note: 'si'},
];


for (let i in buttons) {
  let sound = parseInt(i) + 1
  if (sound < 10) sound = '0' + sound
  buttons[i].sound = '/notes/key' + sound +'.mp3'

  const wrap = document.createElement('div')
  wrap.classList.add('wrap')
  const el = document.createElement('div')
  const color = /#/.test(buttons[i]['note']) ? 'black' : 'white'

  el.className = `button button-${color}`
  el.dataset.note = buttons[i]['note']
  el.dataset.i = i
  el.dataset.key = buttons[i].key
  el.textContent = buttons[i].key

  wrap.appendChild(el)
  keyboard.appendChild(wrap)
}

const elements = document.getElementsByClassName('button')
Array.from(elements).forEach(function(el) {
  el.addEventListener('click', function(){
    play(buttons[this.dataset.i].sound)
  })
})

document.addEventListener('keydown', function(event){
  const key = event.key
  for(i in buttons) {
    if(buttons[i].key == key) {
      play(buttons[i].sound)
      document.querySelector(`[data-i="${i}"]`).classList.add('active')
    }
  }
})

document.addEventListener('keyup', function(event){
  const key = event.key
  for(i in buttons) {
    if(buttons[i].key == key) {
      document.querySelector(`[data-i="${i}"]`).classList.remove('active')
    }
  }
})

function play(sound) {
  document.querySelectorAll('audio').forEach(el => el.pause());
    const audio = new Audio(sound)
    audio.play()
}