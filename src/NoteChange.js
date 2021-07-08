import React, {useRef, useEffect, useState} from 'react'
import store from './store'
import $ from 'jquery'
import arrowImg from './imgs/arrow.png'
import themesImg from './imgs/themes.png'
import ThemesChange from './ThemesChange.js'
import {useSelector} from 'react-redux'
import {now} from './now'

export default function NoteChange(props){
	const textarea1 = useRef()
	const textarea2 = useRef()
	const dateFullDate = useRef()
	const dateTime = useRef()
	const noteChangeBl = useRef()
	const noteType = useSelector(state => state.noteType)
	const themeChangeIndex = useSelector(state => state.themeChangeIndex)
	const [index, setIndex] = useState('')
	const [themeIndex, setThemeIndex] = useState(0)
	useEffect(()=>{
		textarea1.current.value = props.name
		textarea2.current.value = props.text
	}, [props.name])
	useEffect(()=>{

		if(noteType == 'new'){
			setIndex(0)
			dateFullDate.current.innerHTML = now().fullDate
			dateTime.current.innerHTML = now().time
			noteChangeBl.current.style.background = 'rgb(63, 64, 85)'
			store.dispatch({type: 'chnageThemeIndex'}) 
			$('.noteChangeThemes').css({
		  		filter: 'invert(1)'
		  })
		}

		else if(noteType == 'static'){
			let index2 = store.getState().noteIndex
			setIndex(index2)
			let notes = store.getState().notes
			textarea1.current.value = notes[index2].name
			textarea2.current.value = notes[index2].text
			dateFullDate.current.innerHTML = notes[index2].date.fullDate
			dateTime.current.innerHTML = notes[index2].date.time
			noteChangeBl.current.style.background = store.getState().notes[store.getState().noteIndex].back
		  textarea1.current.style.color = store.getState().notes[store.getState().noteIndex].color
		  textarea2.current.style.color = store.getState().notes[store.getState().noteIndex].color
		  dateTime.current.style.color = store.getState().notes[store.getState().noteIndex].color
		  dateFullDate.current.style.color = store.getState().notes[store.getState().noteIndex].color
		  if(store.getState().notes[store.getState().noteIndex].back == 'white' ||
		  	store.getState().notes[store.getState().noteIndex].back == 'rgb(201, 204, 233)' ||
		  	store.getState().notes[store.getState().noteIndex].back == 'rgb(241, 201, 197)' ||
		  	store.getState().notes[store.getState().noteIndex].back == 'rgb(192, 220, 192)'){
		  	$('.noteChangeThemes').css({
		  		filter: 'invert(0)'
		  	})
		  }
		  else{
		  	console.log(store.getState().notes[store.getState().noteIndex].back)
		  	$('.noteChangeThemes').css({
		  		filter: 'invert(1)'
		  	})
		  }
		}

	}, [noteType])
	useEffect(()=>{
		if(store.getState().noteIndex != false){
			noteChangeBl.current.style.background = store.getState().notes[store.getState().noteIndex].back
		  textarea1.current.style.color = store.getState().notes[store.getState().noteIndex].color
		  textarea2.current.style.color = store.getState().notes[store.getState().noteIndex].color
		  dateTime.current.style.color = store.getState().notes[store.getState().noteIndex].color
		  dateFullDate.current.style.color = store.getState().notes[store.getState().noteIndex].color
		  if(store.getState().notes[store.getState().noteIndex].back == 'white' ||
		  	store.getState().notes[store.getState().noteIndex].back == 'rgb(201, 204, 233)' ||
		  	store.getState().notes[store.getState().noteIndex].back == 'rgb(241, 201, 197)' ||
		  	store.getState().notes[store.getState().noteIndex].back == 'rgb(192, 220, 192)'){
		  	$('.noteChangeThemes').css({
		  		filter: 'invert(0)'
		  	})
		  }
		  else{
		   console.log(store.getState().notes[store.getState().noteIndex].back)
		   $('.noteChangeThemes').css({
		    filter: 'invert(1)'
		   })
		  }
		}
	}, [themeChangeIndex])
	function backToNotes(){
	    $('.noteChange').css({
        'left': '101%'
      })
      $(".allNotes").css({
        'margin-left': '0px'
      })
      $(".noteChangeAditional").css({
			  bottom: '0px'
		  })
		  $(".themes").css({
			  bottom: '-350px'
		  })
		  setThemeIndex(0)
      store.dispatch({type: 'noteType', value: ''})
	}
	function textarea1Change(){
		let str = textarea1.current.value
        store.dispatch({type: 'noteNameChange', value: {index: index, text: str}})
	}
	function textarea2Change(){
		let str = textarea2.current.value
        store.dispatch({type: 'noteTextChange', value: {index: index, text: str}})
	}
	function openThemes(){
		if(themeIndex == 0){
			$(".noteChangeAditional").css({
			  bottom: '340px'
		  })
		  $(".themes").css({
			  bottom: '0px'
		  })
		  setThemeIndex(1)
		}
		else{
			$(".noteChangeAditional").css({
			  bottom: '0px'
		  })
		  $(".themes").css({
			  bottom: '-350px'
		  })
		  setThemeIndex(0)
		}
	}
	return(
		<div className='noteChange' ref={noteChangeBl}>
		    <div className='noteDateInfo'>
		        <div className='d-flex noteBack' onClick={backToNotes}>
		            <img className='notesBackImg' src={arrowImg}/>
		            <div className='notesBackSp'>Notes</div>
		        </div>
		        <div className='noteChangeFullDate'>
		            <div className='noteChangeTime' ref={dateTime}></div>
		            <div className='noteChangeDate' ref={dateFullDate}></div>
		        </div>
		    </div>
		    <textarea className='noteChangeName' onChange={textarea1Change} ref={textarea1} placeholder='Title'></textarea>
		    <textarea placeholder='Your note' className='noteChangeText' ref={textarea2} onChange={textarea2Change}></textarea>
		    <div className='noteChangeAditional'>
		        <img className='noteChangeThemes' src={themesImg} onClick={openThemes}/>
		    </div>
		    <ThemesChange/>
		</div> 
		)
}
