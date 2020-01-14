import React from 'react'

const HomePage = () => (
	<div className="outBox">
		<div className="jumbotron HomePage">
			<h1>Список дел</h1>
			<hr />
			<a className="btn btn-primary btn-lg"
				href="/CardList"
				role="button">
				Заняться делами!
            </a>
		</div>
	</div>
);

export default HomePage;