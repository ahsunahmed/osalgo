// // FCFS Algorithm Script
				document.getElementById('result-title').style.display = 'none';


        var FCFSprocesses = [];

        document.querySelector('#counterform').addEventListener('submit', function(e) {
            e.preventDefault();
            var count = document.querySelector('#count').value;
            document.getElementById('processInputs').innerHTML = '';

            for (var i = 0; i < count; i++) {
                var processInput = `
                    <div>
                        <label for="process_name_${i}">Process Name:</label>
                        <input type="text" id="process_name_${i}" class="process_name">
                        <label for="arrival_time_${i}">Arrival Time:</label>
                        <input type="number" id="arrival_time_${i}" class="arrival_time">
                        <label for="burst_time_${i}">Burst Time:</label>
                        <input type="number" id="burst_time_${i}" class="burst_time">
                    </div>`;
                document.getElementById('processInputs').insertAdjacentHTML('beforeend', processInput);
            }

            document.getElementById('processForm').style.display = 'block';
            document.getElementById('message').innerHTML = "Enter the values of " + count + " Processes";
        });

        function calculateFCFS() {
            FCFSprocesses = [];
            var count = document.querySelector('#count').value;
            for (var i = 0; i < count; i++) {
                var processName = document.querySelector(`#process_name_${i}`).value;
                var arrivalTime = parseInt(document.querySelector(`#arrival_time_${i}`).value);
                var burstTime = parseInt(document.querySelector(`#burst_time_${i}`).value);

                FCFSprocesses.push({
                    name: processName,
                    arrival: arrivalTime,
                    burst: burstTime
                });
            }

            FCFSprocesses.sort((a, b) => a.arrival - b.arrival);
            var currentTime = 0;
            var avgWaiting = 0;
            var avgTurnAround = 0;

            for (var i = 0; i < FCFSprocesses.length; i++) {
                var process = FCFSprocesses[i];
                if (currentTime == 0) {
                    process.waitingTime = 0;
                } else{
                    process.waitingTime = currentTime - process.arrival;
                }
                process.turnAroundTime = process.waitingTime + process.burst;
                avgWaiting += process.waitingTime;
                avgTurnAround += process.turnAroundTime;
                currentTime += process.burst;
            }

            avgWaiting /= FCFSprocesses.length;
            avgTurnAround /= FCFSprocesses.length;

            var resultTable = `
                <table>
                    <tr>
                        <td>Process Name</td>
                        <td>Arrival time</td>
                        <td>Burst time</td>
                        <td>Waiting Time</td>
                        <td>Turn Around Time</td>
                    </tr>`;

            for (var i = 0; i < FCFSprocesses.length; i++) {
                var process = FCFSprocesses[i];
                resultTable += `<tr><td>${process.name}</td><td>${process.arrival}</td><td>${process.burst}</td><td>${process.waitingTime}</td><td>${process.turnAroundTime}</td></tr>`;
            }

            resultTable += `</table>`;
			document.getElementById('result-title').style.display = 'block';
            document.querySelector('.result_table').innerHTML = resultTable;
            document.querySelector('.result_avg').innerHTML = "Average Waiting Time: " + avgWaiting.toFixed(2) + "<br>" + "Average Turn Around Time: " + avgTurnAround.toFixed(2) + "<br>";
        }
    

