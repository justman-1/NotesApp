import React, {useEffect, useState, useRef} from 'react'
import $ from 'jquery'
import store from './store.js'
import arrowImg from './imgs/arrow2.png'


export default function Signup(props){
	const [signupD, setSignupD] = useState(0)
	const [signinD, setSigninD] = useState(0)
	const [signupError, setSignupError] = useState()
	const [signinError, setSigninError] = useState()
	const signupLogin = useRef()
	const signupPass = useRef()
	const signupPass2 = useRef()
	const signupLoading = useRef()
	const signinLogin = useRef()
	const signinPass = useRef()
	const signinLoading = useRef()
	useEffect(()=>{
		if(props.value === 'up'){
			setSignupD('block')
			setSigninD('none')
		}
		else if(props.value === 'in'){
			setSigninD('block')
			setSignupD('none')
		}
	}, [props])
	function goBack(){
		$(".allNotes").css({
			transform: 'scale(1)'
		})
		$(".signUpIn").css({
			opacity: '0'
		})
		setTimeout(()=>{
		    $(".signUpIn").css({
			    display: 'none'
		    })
		}, 500)
	}
	function signupNameCheck(){
		if(signupLogin.current.value.length < 4 || signupLogin.current.value.length > 20){
			setSignupError('The login must contain from 4 to 20 letters')
		}
		else{
			setSignupError()
		}
	}
	function signupPassCheck(){
		if(signupPass.current.value.length < 4 || signupPass.current.value.length > 20){
			setSignupError('The password must contain from 4 to 20 letters')
		}
		else{
			setSignupError()
		}
	}
	function signupPass2Check(){
		if(signupPass2.current.value != signupPass.current.value){
			setSignupError("Passwords don't match")
		}
		else{
			setSignupError()
		}
	}
	function signupSendCheck(){
		if(signupLogin.current.value.length < 4 || signupLogin.current.value.length > 20){
			setSignupError('The login must contain from 4 to 20 letters')
		}
		else{
			if(signupPass.current.value.length < 4 || signupPass.current.value.length > 20){
			    setSignupError('The password must contain from 4 to 20 letters')
		    }
		    else{
			    if(signupPass2.current.value != signupPass.current.value){
			        setSignupError("Passwords don't match")
		        }
		        else{
			        signupSend()
		        }
		    }
		}
	}
	function signupSend(){
		$(signupLoading.current).css({
			opacity: '1'
		})
		let data = {login: signupLogin.current.value, password1: signupPass.current.value, password2: signupPass.current.value}
		$.ajax({
			type: "GET",
			url: '/signup',
			data: data,
			async: true,
			contentType: 'application/json',
			success: function(data2){
				$(signupLoading.current).css({
			        opacity: '0'
		        })
				console.log(data2)
				localStorage.setItem('user', JSON.stringify(data2))
				setSigninError()
				store.dispatch({type: 'logIn', value: true})
				$(".allNotes").css({
			    transform: 'scale(1)'
		    })
		    $(".signUpIn").css({
			    opacity: '0'
		    })
		    setTimeout(()=>{
		        $(".signUpIn").css({
			        display: 'none'
		        })
		    }, 500)
			},
			error: function(data2){
				$(signupLoading.current).css({
			        opacity: '0'
		        })
				let res = data2.responseText
				setSignupError(res)
			}
		})
	}
	function changeOnSignin(){
		setSigninD('block')
		setSignupD('none')
	}
	function changeOnSignup(){
		setSigninD('none')
		setSignupD('block')
	}
	function signinSendCheck(){
		if(signinLogin.current.value.length < 4 || signinLogin.current.value.length > 20){
			setSigninError('The login must contain from 4 to 20 letters')
		}
		else{
			if(signinPass.current.value.length < 4 || signinPass.current.value.length > 20){
			    setSigninError('The password must contain from 4 to 20 letters')
		    }
		    else{
			    signinSend()
		    }
		}
	}
	function signinSend(){
		$(signinLoading.current).css({
			opacity: '1'
		})
		let data = {login: signinLogin.current.value, password: signinPass.current.value}
		console.log({login: signupLogin.current.value, password1: signupPass.current.value, password2: signupPass.current.value})
		$.ajax({
			type: "GET",
			url: '/signin',
			data: data,
			async: true,
			contentType: 'application/json',
			success: function(data2){
				$(signinLoading.current).css({
			        opacity: '0'
		        })
				console.log(data2)
				localStorage.setItem('user', JSON.stringify(data2))
				setSigninError()
				store.dispatch({type: 'logIn', value: true})
				$(".allNotes").css({
			    transform: 'scale(1)'
		    })
		    $(".signUpIn").css({
			    opacity: '0'
		    })
		    setTimeout(()=>{
		        $(".signUpIn").css({
			        display: 'none'
		        })
		    }, 500)

			},
			error: function(data2){
				if(data2.status == 499){
					$(signinLoading.current).css({
			      opacity: '0'
		      })
		      console.log(data2)
				  let res = data2.responseText
				  setSigninError(res)
				}
				else{
					alert('error ' + data2.status)
				}
			}
		})
	}
	return(
		<div className='signUpIn'>

		    <img src={arrowImg} className='signUpInArrow' onClick={goBack}/>

		    <div className='signupBl' style={{display: signupD}}>
		        <div className='signUpSp'>Sign up</div>
		        <input className='signUpName' type='text' placeholder='Login' ref={signupLogin} onChange={signupNameCheck}/>
		        <input className='signUpPass' type='password' placeholder='Password' ref={signupPass} onChange={signupPassCheck}/>
		        <input className='signUpPass' type='password' placeholder='Enter the password again' ref={signupPass2} onChange={signupPass2Check}/>
		        <div className='signUpSend' onClick={signupSendCheck}>Sign up</div>
		        <div className='signUpSignin' onClick={changeOnSignin}>Sign in</div>
		         <div className="d-flex justify-content-center" ref={signupLoading} style={{opacity: '0', transform: 'scale(2)', marginTop: '30px'}}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
		        <div className='signUpError'>{signupError}</div>
		    </div>

		    <div className='signupBl' style={{display: signinD}}>
		        <div className='signUpSp'>Sign in</div>
		        <input className='signUpName' type='text' placeholder='Login' ref={signinLogin}/>
		        <input className='signUpPass' type='password' placeholder='Password' ref={signinPass}/>
		        <div className='signUpSend' onClick={signinSendCheck}>Sign in</div>
		        <div className='signUpSignin' onClick={changeOnSignup}>Sign up</div>
		        <div className="d-flex justify-content-center" ref={signinLoading} style={{opacity: '0', transform: 'scale(2)', marginTop: '30px'}}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
		        <div className='signUpError'>{signinError}</div>
		    </div>
		</div>
		)
}