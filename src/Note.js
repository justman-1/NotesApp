import React, {useEffect, useRef, useState} from 'react'
import $ from 'jquery'
import store from './store'
import {now} from './now'
import themes from './themes'

export default function Note(props){
	const note = useRef()
	const [mouseIndex1, setMouseIndex1] = useState(false)
	const [date, setDate] = useState('') 
	const thisCheck = useRef()
	useEffect(()=>{
		$(note.current).css({
			'height': $(note.current).width() + +80 + 'px'
		})
		if(props.date.fullDate != now().fullDate){
			setDate(props.date.fullDate)
		}
		else{
			setDate(props.date.time)
		}
	})
	function openNote(){
		if(store.getState().deleteState == false){
			let noteIndex = -1
		for(let i=0;i<document.querySelector('.allNotes').children.length;i++){
			if(document.querySelector('.allNotes').children[i] == note.current){
				noteIndex = i
			}
		}
		store.dispatch({type: 'noteIndex', value: noteIndex})
		$('.noteChange').css({
          'left': '0px'
        })
        $(".allNotes").css({
          'margin-left': '-200px'
        })
		}
		else{
			if($(thisCheck.current).is(':checked') == true){
				$(thisCheck.current).prop('checked', false)
			}
			else{
				$(thisCheck.current).prop('checked', true)
			}
		}
	}
	function mouseDown(){
		setMouseIndex1(true)
		store.dispatch({type: 'mouseIndex2', value: false})
    $(note.current).css({
       transform: 'scale(0.9)'
    })
	}
	function mouseUp(){
		setMouseIndex1(false)
		store.dispatch({type: 'mouseIndex2', value: true})
		$(note.current).css({
       transform: 'scale(1)'
    })
	}
	function changeCheckbox2(){
		if($(thisCheck.current).is(':checked') == true){
			$(thisCheck.current).prop('checked', false)
		}
		else{
			$(thisCheck.current).prop('checked', true)
		}
	}
	useEffect(()=>{
		setTimeout(()=>{
			if(store.getState().mouseIndex2 == false && mouseIndex1 == true){
				$(thisCheck.current).prop('checked', true)
				store.dispatch({type: 'deleteState', value: true})
			}
		}, 500)
	}, [mouseIndex1])
	return(
		<div className='note' style={{'color': props.color, 'background': props.back}} ref={note} onClick={openNote} onTouchStart={mouseDown} onTouchEnd={mouseUp}>
		  <div className='noteAllText'> 
		      <div className='noteName' style={{'color': props.color}}>{props.name}</div>
		      <div className='noteText' style={{'color': props.color}}>{props.text}</div>
		  </div>
		  <div className='noteTime' style={{'color': props.color}}>{date}</div>
		  <input type='checkbox' className='noteCheck' ref={thisCheck} onClick={changeCheckbox2}/>
		</div>
		)
}