import React, {useState, useRef, useEffect} from 'react'
import {useSelector} from 'react-redux'
import $ from 'jquery'
import store from './store.js'
import signupImg from './imgs/signup.png'
import SignupBl from './Signup.js'
import logOutImg from './imgs/logout.png'
import downloadImg from './imgs/download.png'
import uploadImg from './imgs/upload.png'

export default function Header(){
	const [sign, setSing] = useState()//up or in
	const [signIndex, setSignIndex] = useState(1)
	const signBut = useRef()
	const downloadRef = useRef()
	const uploadRef = useRef()
	const uploadYesRef = useRef()
	const uploadYesLoading = useRef()
	const downloadYesRef = useRef()
	const downloadYesLoading = useRef()
	const logIn = useSelector(store => store.login)
	useEffect(()=>{
		if(logIn == false){
			$('.signButs').css({
				display: 'block'
			})
			$('.accElems').css({
				display: 'none'
			})
		}
		else{
			$('.signButs').css({
				display: 'none'
			})
			$('.accElems').css({
				display: 'block'
			})
			$.ajax({
				url: 'https://reactnotesappserver.herokuapp.com/getUserNotes',
				type: 'GET',
				data: JSON.parse(localStorage.getItem('user')),
				success: function(data){
					$(uploadRef.current).css({
						opacity: '1'
					})
					if(data.length != 0){
						store.dispatch({type: 'accNotes', value: data})
						$(downloadRef.current).css({
							opacity: '1'
						})
					}
				},
				error: function(req, z, q){
					if(req.status == 499){
						localStorage.removeItem('user')
						$('.signButs').css({
				            display: 'block'
			            })
			            $('.accElems').css({
				            display: 'none'
			            })
					}
				}
			})
		}
	}, [logIn])

	function signinOpen(){
		$(".allNotes").css({
			transform: 'scale(0.8)'
		})
		$(".signUpIn").css({
			display: 'block'
		})
		setTimeout(()=>{
			$(".signUpIn").css({
			    opacity: '1'
		    })
		}, 1)
		setSing('in')
		setSignIndex(+signIndex + +1)
	}

	function signupOpen(){
		$(".allNotes").css({
			transform: 'scale(0.8)'
		})
		$(".signUpIn").css({
			display: 'block'
		})
		setTimeout(()=>{
			$(".signUpIn").css({
			    opacity: '1'
		    })
		}, 1)
		setSing('up')
		setSignIndex(+signIndex + +1)
	}

	function logOutFunc(){
		$(".logOutBlock1").css({
			top: '45%'
		})
	}

	function logOutNo(){
		$(".logOutBlock1").css({
			top: '-40%'
		})
	}

	function logOutYes(){
		store.dispatch({type: 'logIn', value: false})
		$(".logOutBlock1").css({
			top: '-40%'
		})
		localStorage.removeItem('user')
	}

	function uploadFunc(){
		$(".uploadBlock").css({
			top: '45%'
		})
	}

	function uploadNo(){
		$(".uploadBlock").css({
			top: '-40%'
		})
	}

	function uploadYes(){
		$(uploadYesRef.current).css({
			display: 'none'
		})
		$(uploadYesLoading.current).css({
			display: 'block'
		})
		$.ajax({
			url: 'https://reactnotesappserver.herokuapp.com/uploadNotes',
			type: 'GET',
			data: {user: JSON.parse(localStorage.getItem('user')), notes: JSON.parse(localStorage.getItem('Notes'))},
			success: function(data){
				$(uploadYesRef.current).css({
			        display: 'block'
		        })
		        $(uploadYesLoading.current).css({
			        display: 'none'
		        })
		        $(".uploadBlock").css({
			        top: '-40%'
		        })
		        store.dispatch({type: 'accNotes', value: JSON.parse(localStorage.getItem('Notes'))})
			},
			error: function(data){
				$(".uploadBlock").css({
			        top: '-40%'
		        })
		        if(data.status != 499){
		        	alert('error ' + data.status)
		        }
		        else{
		        	alert(data.responseText)
					localStorage.removeItem('user')
					$('.signButs').css({
				        display: 'block'
			        })
			        $('.accElems').css({
				        display: 'none'
			        })
		        }
			}
		})
	}

	function downloadFunc(){
		$(".downloadBlock").css({
			top: '45%'
		})
	}

	function downloadNo(){
		$(".downloadBlock").css({
			top: '-40%'
		})
	}

	function downloadYes(){
		$(downloadYesRef.current).css({
			display: 'none'
		})
		$(downloadYesLoading.current).css({
			display: 'block'
		})
		$.ajax({
			url: 'https://reactnotesappserver.herokuapp.com/getUserNotes',
			type: 'GET',
			data: JSON.parse(localStorage.getItem('user')),
			success: function(data){
				$(downloadYesRef.current).css({
			        display: 'block'
		        })
		        $(downloadYesLoading.current).css({
			        display: 'none'
		        })
		        $(".downloadBlock").css({
			        top: '-40%'
		        })
				store.dispatch({type: 'downloadNotes', value: data})
				localStorage.setItem('Notes', JSON.stringify(data))
			},
			error: function(data, z, q){
				if(data.status != 499){
		        	alert('error ' + data.status)
		        }
				else{
					alert(data.responseText)
					localStorage.removeItem('user')
					$('.signButs').css({
				        display: 'block'
			        })
			        $('.accElems').css({
				        display: 'none'
			        })
				}
			}
		})
	}
	return(
		<header>
		    <SignupBl value={sign} index={signIndex}/>
		    <div className='signinBut signButs' onClick={signupOpen}>
		        <img src={signupImg} className='signinButImg'/>
		        <div className='signinButSp'>Sign up</div>
		    </div>
		    <div className='signupBut signButs' onClick={signinOpen}>
		        <img src={signupImg} className='signupButImg'/>
		        <div className='signupButSp'>Sign in</div>
		    </div>
		    <div className='accElems'>
		        <img src={logOutImg} className='logOutImg' onClick={logOutFunc}/>
		        <img src={downloadImg} className='downloadImg' ref={downloadRef} onClick={downloadFunc}/>
		        <img src={uploadImg} className='uploadImg' ref={uploadRef} onClick={uploadFunc}/>
		    </div>
		    <div className='logOutBlock logOutBlock1'>
		        <div className='logOutBlockText'>Do you really want to log out of your account?</div>
		        <div className='logOutBlockButs'>
		            <div className='logOutBlockButNo' onClick={logOutNo}>No</div>
		            <div className='logOutBlockButYes' onClick={logOutYes}>Yes</div>
		        </div>
		    </div>
		    <div className='logOutBlock uploadBlock'>
		        <div className='logOutBlockText'>do you want to delete the last save on your account and upload notes from your device?</div>
		        <div className='logOutBlockButs'>
		            <div className='logOutBlockButNo' onClick={uploadNo}>No</div>
		            <div className='logOutBlockButYes' onClick={uploadYes}>
		                <span ref={uploadYesRef}>Yes</span>
		                <div className="d-flex justify-content-center" style={{transform: 'scale(1.2)'}}>
                          <div className="spinner-border" role="status" style={{display: 'none', position: 'relative', top: '12px'}} ref={uploadYesLoading}></div>
                        </div>
		            </div>
		        </div>
		    </div>
		    <div className='logOutBlock downloadBlock'>
		        <div className='logOutBlockText'>do you want to delete notes from your device and download the last save on your account?</div>
		        <div className='logOutBlockButs'>
		            <div className='logOutBlockButNo' onClick={downloadNo}>No</div>
		            <div className='logOutBlockButYes' onClick={downloadYes}>
		                <span ref={downloadYesRef}>Yes</span>
		                <div className="d-flex justify-content-center" style={{transform: 'scale(1.2)'}}>
                          <div className="spinner-border" role="status" style={{display: 'none', position: 'relative', top: '12px'}} ref={downloadYesLoading}></div>
                        </div>
		            </div>
		        </div>
		    </div>
		</header>
		)
}