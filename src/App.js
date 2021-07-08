import plusImg from './imgs/plus.png'
import './App.css';
import Header from './Header'
import Note from './Note'
import NoteChange from './NoteChange'
import CancelDelete from './CancelDelete'
import Delete from './Delete'
import React, {useRef, useState, useEffect} from 'react'
import store from './store'
import {useSelector} from 'react-redux'
import $ from 'jquery'
import {now} from './now'

class NoteCl{
  constructor(name, text){
    this.name = name;
    this.text = [text]
    this.color = 'white';
    this.back = '#3F4055';
    this.date = now()
  }
}

function App() {
  const changeIndex = useSelector(state => state.changeIndex)
  const [notes, setNotes] = useState([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [color, setColor] = useState('')
  const [back, setBack] = useState('')
  let numberI = 0
  function addNote(){
    $('.noteChange').css({
      'left': '0px'
    })
    $(".allNotes").css({
      'margin-left': '-200px'
    })
    store.dispatch({type: 'noteType', value: 'new'})
    setName('Note ' + (+store.getState().notes.length + +1))
    setText('')
    setTimeout(()=>{
      store.dispatch({type: 'add', value: new NoteCl('Note ' + (+store.getState().notes.length + +1), '')})
    }, 500)
  }
  useEffect(()=>{
    setNotes(store.getState().notes)
  }, [changeIndex])
  return (
    <div>
      <Header/>
      <img src={plusImg} className='addNote' onClick={addNote}/>
      <NoteChange name={name} text={text} color={color} back={back}/>
      <CancelDelete/>
      <Delete/>
      <div className='allNotes'>
          {notes.map((e, i)=>{
              return <Note name={e.name} text={e.text} color={e.color} back={e.back} key={i} date={e.date}/>
        })}
      </div>
    </div>
  );
}

export default App;
