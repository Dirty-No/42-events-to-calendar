
function formatEventDate(date) {
	// format example: 20220523T100000Z+07:00

	// get date
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	// format date
	const dateFormatted = year + (month < 10 ? "0" + month : month) + (day < 10 ? "0" + day : day) + "T" + (hours < 10 ? "0" + hours : hours) + (minutes < 10 ? "0" + minutes : minutes) + "00Z+07:00";
	return dateFormatted;
}


function getEventDate()
{
	const dateSpan = document.querySelector("#smartModal > div > div > div.modal-header > aside > span:nth-child(1) > span:nth-child(2)");
	// get data-long-date
	const eventDateStart = new Date(dateSpan.getAttribute('data-long-date'));
	//const eventTitle
	console.log(eventDateStart);
	// <span>about 3 hours</span>
	const eventLengthElem = document.querySelector("#smartModal > div > div > div.modal-header > aside > span:nth-child(2) > span:nth-child(3)"); 
	// Keep last two words of text
	const eventLength = eventLengthElem.innerText.split(' ').slice(-2);
	// 3 hours | 27 days | 1 month
	const eventLengthNum = Number(eventLength[0]);
	console.log(eventLengthNum);
	const eventLengthUnit = eventLength[1];
	console.log("unit", eventLengthUnit);
	const eventLengthInMilliseconds = eventLengthNum * (eventLengthUnit === 'hours' ? 3600000 : (eventLengthUnit === 'days' ? 86400000 : 2592000000));
	
	console.log(eventLengthInMilliseconds);
	const eventDateEnd = new Date(eventDateStart.getTime() + eventLengthInMilliseconds);

	console.log("len", eventLength);
	console.log("start", eventDateStart);
	console.log("end", eventDateEnd);
	const eventDateFormatted = formatEventDate(eventDateStart) + "/" + formatEventDate(eventDateEnd);
	console.log("eventDateFormatted", eventDateFormatted);
	return eventDateFormatted;
}

const encodeURL = (url) => {
	return encodeURIComponent(url);
}

const events = document.querySelectorAll('.event-item');
	
	events.forEach(event => {
		// Add onclick listener
		event.addEventListener('click', () => {
			console.log('clicked');
			setTimeout(() => {
				const eventDate = encodeURIComponent(getEventDate());
				const eventTitle = encodeURIComponent(document.querySelector("#smartModal > div > div > div.modal-header > div > h4").innerText);
				const eventLocation = encodeURIComponent(document.querySelector("#smartModal > div > div > div.modal-header > aside > span.event-location.event-meta-item > span:nth-child(2)").innerText);
				const eventDescription = encodeURIComponent(document.querySelector("#smartModal > div > div > div.modal-body > p").innerText);
				const calendarURL = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${eventTitle}&dates=${eventDate}&location=${eventLocation}&details=${eventDescription}`;

				console.log(calendarURL);
				// Prevent button from redirecting before our listener is executed
				// <a class="btn btn-primary" data-disable-with="Submiting..." rel="nofollow" data-method="post" href="/exams/7537/exams_users">Subscribe</a>
				const subscribeButton = document.querySelector("#smartModal > div > div > div.modal-footer > a");

				if (subscribeButton.innerHTML == "Subscribe") {
					// Add onlick listener to subscribe button
					subscribeButton.addEventListener('click', () => {
						window.open(calendarURL);
					});
				}
		}, 350);
	});
});
