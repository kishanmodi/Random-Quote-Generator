import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
export const App = () => {
	const [quote, setQuote] = useState({
		text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
		author: 'Thomas A. Edison'
	});
	const [click, setClick] = useState(1);
	const [time, setTime] = useState(
		`${new Date().getHours()}:${new Date().getMinutes}`
	);
	useEffect(() => {
		const numbers = [1, 2, 3];
		let rand = numbers[Math.floor(Math.random() * numbers.length)];
		const getQuote = async () => {
			if (rand === 1) {
				const quoteData = await axios.get(
					`https://programming-quotes-api.herokuapp.com/quotes/random`
				);
				const { author, en } = quoteData.data;
				setQuote({ text: en, author: author });
			} else if (rand === 2) {
				const quoteData = await axios.get(`https://api.kanye.rest/`);
				const { quote } = quoteData.data;
				setQuote({ text: quote, author: 'Kanye West' });
			} else {
				const quoteData = await axios.get(`https://favqs.com/api/qotd`);
				const { author, body } = quoteData.data.quote;
				setQuote({ text: body, author: author });
			}
		};
		getQuote();
	}, [click]);

	useEffect(() => {
		let date = new Date();
		const timer = setInterval(() => {
			let curTime = `${date.getHours()}:${date.getMinutes()}`;
			setTime(curTime);
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);
	return (
		<div
			className="image-box"
			style={{
				backgroundImage:
					"url('https://source.unsplash.com/random/1920x1080?city,night,flower,nature,books,japan,sea,forest')"
			}}>
			<div className="main-container">
				<h2 id="clock">{time}</h2>
				<div className="inner-container">
					<div className="quote-container">
						<h1 id="quote">"{quote.text}"</h1>
						<h3 id="who-said-this">- {quote.author}</h3>
						<button
							id="refresh"
							title="Refresh"
							onClick={() => {
								setClick((prev) => prev + 1);
							}}>
							<i className="fa-solid fa-arrows-rotate"></i>
						</button>
					</div>
				</div>
				<h4 id="author">
					<a href="https://images.unsplash.com/">Photo</a>,
					<a href="https://images.unsplash.com/"> Author</a>,
					<a href="https://images.unsplash.com/"> Unsplash</a>
				</h4>
			</div>
		</div>
	);
};
