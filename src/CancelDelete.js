import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import $ from 'jquery'
import store from './store'
import crossImg from './imgs/plus.png'

export default function CancelDelete(){
	const deleteState = useSelector(state => state.deleteState)
	useEffect(()=>{
		if(deleteState == true){
			$(".addNote").css({
				'right': '-200px'
			})
			$(".cancelDelete").css({
				'top': '30px'
			})
			$(".noteCheck").css({
				'display': 'block'
			})
			$(".deleteBl").css({
				'bottom': '0px'
			})
			setTimeout(()=>{
				$(".noteCheck").css({
					'opacity': '1'
				})
			}, 1)
		}
		else{
			$(".addNote").css({
				'right': '30px'
			})
			$(".cancelDelete").css({
				'top': '-110px'
			})
			$(".noteCheck").css({
				'opacity': '0'
			})
			$(".deleteBl").css({
				'bottom': '-180px'
			})
			setTimeout(()=>{
				$(".noteCheck").css({
				    'display': 'block'
			    }).prop('checked', false)
			}, 300)
		}
	}, [deleteState])
	function cancel(){
		store.dispatch({type: 'deleteState', value: false})
	}
	return(
		<img className='cancelDelete' onClick={cancel} src={crossImg}/>
		)
}