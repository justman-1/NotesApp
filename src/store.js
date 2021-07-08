import { createStore } from 'redux';

if(localStorage.getItem('Notes') == undefined){
	localStorage.setItem('Notes', JSON.stringify([]))
}

let initState = {
	notes: JSON.parse(localStorage.getItem('Notes')),
	noteType: '',
	changeIndex: 0,
	noteIndex: false,
	mouseIndex2: true,
	deleteState: false,
   themeChangeIndex: 0,
   login: false,
   accNotes: []
}

const store = createStore(reducer);
export default store

function reducer(state = initState, action) {
    switch(action.type) {

        case 'add': 
           state.notes = [action.value].concat(state.notes)
           localStorage.setItem('Notes', JSON.stringify(state.notes))
           return state;

        case 'noteType':
           state.noteType = action.value
           state.changeIndex = state.changeIndex + 0.1
           return state;

        case 'noteNameChange':
           state.notes[action.value.index].name = action.value.text
           state.changeIndex = state.changeIndex + 0.1
           localStorage.setItem('Notes', JSON.stringify(state.notes))
           return state

        case 'noteTextChange':
           state.notes[action.value.index].text = action.value.text
           state.changeIndex = state.changeIndex + 0.1
           localStorage.setItem('Notes', JSON.stringify(state.notes))
           return state

        case 'noteIndex': 
           state.noteIndex = action.value
           state.noteType = 'static'
           return state

        case 'mouseIndex2':
           state.mouseIndex2 = action.value
           return state

        case 'deleteState':
           state.deleteState = action.value
           return state

        case 'deleteNotes':
           let allNotes2 = []
           for(let i=0;i<state.notes.length;i++){
           	  let elem = action.value.find((e)=>{
           	  	return (e == i)
           	  })
           	  if(elem == undefined){
           	  	allNotes2.push(state.notes[i])
           	  }
           }
           state.notes = allNotes2
           state.changeIndex = state.changeIndex + 0.1
           console.log(allNotes2)
           localStorage.setItem('Notes', JSON.stringify(state.notes))
           return state

         case 'changeTheme': 
           state.notes[state.noteIndex].back = action.value.back
           state.notes[state.noteIndex].color = action.value.color
           state.changeIndex = state.changeIndex + 0.1
           state.themeChangeIndex = state.themeChangeIndex + 0.1
           console.log(state.notes[state.noteIndex])
           localStorage.setItem('Notes', JSON.stringify(state.notes))
           return state

         case 'changeThemeIndex':
           state.themeChangeIndex = state.themeChangeIndex + 0.1
           return state

         case 'logIn':
           state.login = action.value
           return state

         case 'accNotes': 
           state.accNotes = action.value;
           return state

         case 'downloadNotes':
           state.notes = action.value
           state.accNotes = action.value
           state.changeIndex = state.changeIndex + 0.1
           return state

        default: return state;
    }
}


if(localStorage.getItem('user') != undefined){
   store.dispatch({type: 'logIn', value: true})
}