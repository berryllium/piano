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

let flag = false
let index = 0
let interval
const melody = [
  {'key': 'a', 'pause': 500},
  {'key': 'd', 'pause': 300},
  {'key': 'a', 'pause': 300},
  {'key': 'd', 'pause': 300},
  {'key': 'f', 'pause': 500},
  {'key': 'g', 'pause': 1500},
  {'key': 'a', 'pause': 500},
  {'key': 'd', 'pause': 300},
  {'key': 'a', 'pause': 300},
  {'key': 'd', 'pause': 300},
  {'key': 'f', 'pause': 500},
  {'key': 'g', 'pause': 1500},
  {'key': 'j', 'pause': 300},
  {'key': 'j', 'pause': 500},
  {'key': 'g', 'pause': 300},
  {'key': 'h', 'pause': 1500},
  {'key': 'h', 'pause': 300},
  {'key': 'h', 'pause': 500},
  {'key': 'j', 'pause': 300},
  {'key': 'g', 'pause': 1000},
  {'key': 'f', 'pause': 300},
  {'key': 'd', 'pause': 1000},
]


for (let i in buttons) {
  let sound = parseInt(i) + 1
  if (sound < 10) sound = '0' + sound
  buttons[i].sound = 'notes/key' + sound +'.mp3' // notes/key/01.mp3

  const wrap = document.createElement('div')
  wrap.classList.add('wrap')
  const el = document.createElement('div')
  const color = /#/.test(buttons[i]['note']) ? 'black' : 'white' // i == 0

  el.className = `button button-${color}` // button button-white
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
      if(document.querySelector('#learn_mode').checked) {
        document.querySelector(`[data-i="${i}"]`).classList.add('active')
      }
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


function playSong() {
  index = 0
  interval = setInterval(function(){
    if(flag) return
    if(index >= melody.length) {
      clearInterval(interval)
      return
    }

    let key = melody[index].key
    let pause = melody[index].pause

    document.dispatchEvent(new KeyboardEvent('keydown',  {'key':key}));

    setTimeout(function(){
      document.dispatchEvent(new KeyboardEvent('keyup',  {'key':key}));
      flag = false;
      index++
    }, pause)

    flag = true
  }, 200)
}