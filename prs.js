
        // Counter Form Submission
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
                        <label for="priority_${i}">Priority:</label>
                        <input type="number" id="priority_${i}" class="priority">
                    </div>`;
                document.getElementById('processInputs').insertAdjacentHTML('beforeend', processInput);
            }

            document.getElementById('processForm').style.display = 'block';
        });

        // Priority Queue Algorithm
        function calculatePriorityQueue() {
            var processes = getProcesses();
            processes.sort((a, b) => a.priority - b.priority);

            var currentTime = 0;
            var totalWaitingTime = 0;
            var totalTurnAroundTime = 0;

            processes.forEach(process => {
                if (process.arrival > currentTime) {
                    currentTime = process.arrival;
                }
                process.waitingTime = currentTime - process.arrival;
                process.turnAroundTime = process.waitingTime + process.burst;
                totalWaitingTime += process.waitingTime;
                totalTurnAroundTime += process.turnAroundTime;
                currentTime += process.burst;
            });

            var avgWaitingTime = totalWaitingTime / processes.length;
            var avgTurnAroundTime = totalTurnAroundTime / processes.length;

            displayResults(processes, avgWaitingTime, avgTurnAroundTime);
        }

        // Utility function to extract processes from input fields
        function getProcesses() {
            var count = document.querySelector('#count').value;
            var processes = [];
            for (var i = 0; i < count; i++) {
                var processName = document.querySelector(`#process_name_${i}`).value;
                var arrivalTime = parseInt(document.querySelector(`#arrival_time_${i}`).value);
                var burstTime = parseInt(document.querySelector(`#burst_time_${i}`).value);
                var priority = parseInt(document.querySelector(`#priority_${i}`).value);
                processes.push({ name: processName, arrival: arrivalTime, burst: burstTime, priority: priority });
            }
            return processes;
        }

        // Display results
        function displayResults(processes, avgWaitingTime, avgTurnAroundTime) {
            var resultTable = `
                <h2>Priority Queue Results</h2>
                <table>
                    <tr>
                        <th>Process Name</th>
                        <th>Arrival Time</th>
                        <th>Burst Time</th>
                        <th>Priority</th>
                        <th>Waiting Time</th>
                        <th>Turn Around Time</th>
                    </tr>`;

            processes.forEach(process => {
                resultTable += `
                    <tr>
                        <td>${process.name}</td>
                        <td>${process.arrival}</td>
                        <td>${process.burst}</td>
                        <td>${process.priority}</td>
                        <td>${process.waitingTime}</td>
                        <td>${process.turnAroundTime}</td>
                    </tr>`;
            });

            resultTable += `</table>`;
            document.querySelector('.result_table').innerHTML = resultTable;

            var avgResults = `Average Waiting Time: ${avgWaitingTime.toFixed(2)}<br>Average Turn Around Time: ${avgTurnAroundTime.toFixed(2)}`;
            document.querySelector('.result_avg').innerHTML = avgResults;
        }
