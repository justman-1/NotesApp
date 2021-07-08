import React, {useEffect} from 'react'
import themes from './themes.js'
import {useSelector} from 'react-redux'
import store from './store.js'
import $ from 'jquery'

export default function ThemesChange(){
	const noteIndex = useSelector(state => state.noteIndex)
	const themeChangeIndex = useSelector(state => state.themeChangeIndex)
	useEffect(()=>{
		if(store.getState().noteIndex != false){
			let notes = store.getState().notes
			console.log(store.getState())
			$(".themes").css({
				background: notes[noteIndex].back
			})
		}
	}, [noteIndex])
	useEffect(()=>{
		if(store.getState().noteIndex != false){
			$(".themes").css({
			    background: store.getState().notes[store.getState().noteIndex].back
		    })
		}
	}, [themeChangeIndex])
	function changeTheme(e){
		let noteIndex = store.getState().noteIndex
		store.dispatch({type: 'changeTheme', value: {color: e.target.style.color, back: e.target.style.background}})
	}
	return(
		<div className='themes'>
		    {themes.map((e, i)=>{
		    	return (<div className='theme' key={i} style={{background: e.back, border: `3px solid ${e.color}`, color: e.color}} onClick={changeTheme}>
		            A
		        </div>)
		    })}
		</div>
		)
}