'use client'

import React, { useState, useEffect } from 'react'
import { Modal, Box, TextField, Button } from '@mui/material'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Database } from '@/types/supabase';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 450,
	maxWidth: '90vw',
	bgcolor: '#141414',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	borderRadius: 10,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	'&:focus': {
		outline: 'none',
	},
};

type AuthOverlayProps = {
	toggleAuthOverlay: any,
	isAuthModalVisible: boolean,
	showErrorToast: (message : string) => void,
	showSuccessToast: (message : string) => void
}

export default function AuthOverlay({ isAuthModalVisible, toggleAuthOverlay, showErrorToast, showSuccessToast }: AuthOverlayProps) {
	const supabase = createClient()
	const [loading, setLoading] = useState(true)
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isNewUser, setNewUser] = useState<boolean>(false);
	const [showPasswordField, setPasswordField] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		if(isAuthModalVisible) {
			setEmail('');
			setPassword('');
			setNewUser(false);
			setPasswordField(false);
		}
	}, [isAuthModalVisible])

	async function handleSubmitEmail() {
		try {
			setLoading(true);

			const { data, error, status } = await supabase
				.from('profiles')
				.select(`email`)
				.eq('email', email)
				.single()

			if (error && status !== 406) throw error

			if (data) setNewUser(false);
			else setNewUser(true);

			setPasswordField(true);

		} catch (error) {
			console.log(error);
			setNewUser(true);
		} finally {
			setLoading(false);
		}
	}

	async function handleSubmitPassword() {
		try {
			if (isNewUser) await signUp();
			else await signIn();
		} catch (error) {
			console.log(error);
			showErrorToast("Error occured. Try later")
		}
	}

	async function signIn() {
		const response =  await supabase.auth.signInWithPassword({
			email: email,
			password: password
		})

		if(response.error) {
			showErrorToast(response.error.message);
			throw response.error.message;
		}

		toggleAuthOverlay();
		router.refresh();
		return response;
	}

	async function signUp() {
		const response = await supabase.auth.signUp({
			email: email,
			password: password,
		})

		console.log(response);

		if (response.data.user == null) {
			throw "User not created"
		}

		showSuccessToast("User Created Successfully!");
		toggleAuthOverlay();
		router.refresh();
		return;
	}

	async function signInWithGoogle() {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${window.location.origin}/auth/callback`,
				},
			})

			if (error) {
				showErrorToast(error.message)
				throw error
			}
		} catch (error) {
			console.log(error)
			showErrorToast("Error signing in with Google")
		}
	}

	return (
		<Modal
			open={isAuthModalVisible}
			onClose={toggleAuthOverlay}
		>
			<Box sx={style}>
				<div className='flex flex-col gap-4 justify-center items-center w-full'>
					<h2 className='text-xl font-semibold'>Sign In</h2>
					
					{/* Google Sign In Button */}
					<Button 
						onClick={signInWithGoogle} 
						className='w-full bg-white text-gray-700 hover:bg-gray-100'
						variant='contained'
						sx={{
							bgcolor: 'white',
							color: '#374151',
							'&:hover': {
								bgcolor: '#f3f4f6',
							},
							textTransform: 'none',
							fontWeight: 500,
						}}
					>
						<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
							<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
						Continue with Google
					</Button>

					{/* Divider */}
					<div className='flex items-center w-full gap-2'>
						<div className='flex-1 h-px bg-gray-600'></div>
						<span className='text-gray-400 text-sm'>OR</span>
						<div className='flex-1 h-px bg-gray-600'></div>
					</div>

					{/* Email/Password Sign In */}
					<div className='flex flex-col gap-4 w-full'>
						<TextField
							id="email"
							label="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							variant="standard"
							fullWidth
						/>
						{
							showPasswordField ?
								<div className='flex flex-col gap-4'>
									<TextField
										id="password"
										label="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										type='password'
										variant="standard"
										fullWidth
									/>
									<Button onClick={handleSubmitPassword} className='bg-blue-400 text-white' variant='contained' fullWidth>
										{isNewUser ? "Sign Up" : "Sign In"}
									</Button>
								</div>
								:
								<Button onClick={handleSubmitEmail} className='bg-blue-400 text-white' variant='contained' fullWidth>
									Continue with Email
								</Button>
						}
					</div>
				</div>
			</Box>
		</Modal>
	)
}