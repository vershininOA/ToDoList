import React, { Component } from 'react'

const NotFound = () => (
	<div className="outBox">
		<div className="jumbotron ErrorPage"> 
			<h1>Ошибка в адресе</h1>
			<hr />
			<a
				className = "btn btn-warning btn-lg"
				href="/"
				role="button"
			>
				Войти в приложение
			</a>
		</div>
	</div> 
)

export default NotFound;