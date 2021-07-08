import React from 'react'
import $ from 'jquery'
import store from './store'
import deleteImg from './imgs/trashcan.png'

export default function Delete(){
	function deleteAll(){
		//document.querySelector('.allNotes')
		let indexes = []
		for(let i=0;i<store.getState().notes.length;i++){
			if($(document.querySelector('.allNotes').children[i].children[2]).is(':checked')){
				indexes.push(i)
			}
		}
		console.log(indexes)
			store.dispatch({type: 'deleteNotes', value: indexes})
		    store.dispatch({type: 'deleteState', value: false})
	}
	return(
		<div className='deleteBl' onClick={deleteAll}>
		    <img className='deleteImg' src={deleteImg}/>
		</div>
		)
}