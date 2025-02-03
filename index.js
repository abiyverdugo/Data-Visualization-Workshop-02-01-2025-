// console.log('Hello, world!');

const dateElement = document.getElementById('date');
console.log(dateElement);

let currentDate = new Date();
console.log(currentDate);

dateElement.innerHTML = currentDate;

let dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

dateElement.innerHTML = currentDate.toLocaleDateString('en-US', dateOptions);

const url = 'https://twitter-trends5.p.rapidapi.com/twitter/request.php';
const options = {
	method: 'POST',
	headers: {
        //secret key for each user
		'x-rapidapi-key': '8902b7bed7msh406deadf8e386f6p1368b9jsne389cae0eaeb',
		'x-rapidapi-host': 'twitter-trends5.p.rapidapi.com',
        //the request body is in the form of URLSearchParams
        //variable = "value" 
        //NOT {variable: "value"}
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	body: new URLSearchParams({woeid: '23424934'}) //request body
    //woeid = "23424934"
};

let graphData = [];

//fetch code send the request to specific url 
fetch(url, options) //request
    .then(res => res.json()) //response
    .then(data => {
        console.log(data); // data - response of server after our request

        for(let i=0; i<25; i++) {
            graphData.push(
                {
                "name": data.trends[i].name,
                "volume": data.trends[i].volume,
            }
        )

    }

    //collect all the name of the topics and store it to varialbe "topics"
    let topics = graphData.map(post => {
        return post.name
    })

    //collect all the volumes of the topics and store it to varialbe "volume"
    let volumes = graphData.map(post => {
        return post.volume
    })

    console.log(graphData);
    console.log(graphData.length);
    
    const myChart = document.getElementById("myChart"); // <canvas id="myChart"></canvas>

    let barChart = new Chart(myChart, {
        type: 'bar',
        data: {
            labels: topics,
            datasets: [{
                label: '# of tweets / xeets',
                data: volumes,
                borderWidth: 3,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],

                borderColor: [
                    'rgba(255, 99, 132)',
                    'rgba(255, 159, 64)',
                    'rgba(255, 205, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(54, 162, 235)',
                    'rgba(153, 102, 255)',
                    'rgba(201, 203, 207)'
                ],

                hoverBackgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(255, 159, 64)',
                    'rgba(255, 205, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(54, 162, 235)',
                    'rgba(153, 102, 255)',
                    'rgba(201, 203, 207)'
                ]
            }]
        },

        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

// object - key and value pair
// let myPost = {
// 	name: "Lee Sung Kyung",
// 	queryUrl: "search?q=%22Lee+Sung+Kyung%22",
// 	volume: 31799,
// 	followers: 3895734
// }    

// console.log(myPost.name);
//               object.propertyName
// 	console.log(myPost.queryUrl);
// 	console.log(myPost.volume);
// 	console.log(myPost.followers);

// let graphData = [
// 		{name: "#PorDeeReunion", queryUrl: "search?q=%23PorDeeReunion", volume: 67000},
// 		{name: "#BGYO3rdAnniversary", queryUrl: "search?q=%23BGYO3rdAnniversary", volume: 27400}
// ];

// console.log(graphData);

// graphData.push(myPost);
// console.log(graphData);

// console.log(graphData[1]);