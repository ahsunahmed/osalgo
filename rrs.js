var timeSlice = 0;

        // Time Slice Form Submission
        function submitTimeSlice() {
            timeSlice = parseInt(document.getElementById('timeSlice').value);
            document.getElementById('timeSliceForm').style.display = 'none';
            document.getElementById('counterform').style.display = 'block';
        }

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
                    </div>`;
                document.getElementById('processInputs').insertAdjacentHTML('beforeend', processInput);
            }

            document.getElementById('processForm').style.display = 'block';
        });

        // Round Robin Algorithm
        function calculateRoundRobin() {
            var processes = getProcesses();
            var completedProcesses = [];
            var currentTime = 0;

            while (processes.length > 0) {
                var process = processes.shift();
                if (process.burst <= timeSlice) {
                    currentTime += process.burst;
                    process.turnAroundTime = currentTime;
                    completedProcesses.push(process);
                } else {
                    currentTime += timeSlice;
                    process.burst -= timeSlice;
                    processes.push(process);
                }
            }

            var totalWaitingTime = 0;
            var totalTurnAround = 0;
            completedProcesses.forEach(process => {
                process.waitingTime = process.turnAroundTime - process.burst;
                totalWaitingTime += process.waitingTime;
                totalTurnAround += process.turnAroundTime;
            });

            var avgWaitingTime = totalWaitingTime / completedProcesses.length;
            var avgTotalTurnAround = totalTurnAround / completedProcesses.length;
            displayResults(completedProcesses, avgWaitingTime,avgTotalTurnAround);
        }

        // Utility function to extract processes from input fields
        function getProcesses() {
            var count = document.querySelector('#count').value;
            var processes = [];
            for (var i = 0; i < count; i++) {
                var processName = document.querySelector(`#process_name_${i}`).value;
                var arrivalTime = parseInt(document.querySelector(`#arrival_time_${i}`).value);
                var burstTime = parseInt(document.querySelector(`#burst_time_${i}`).value);
                processes.push({ name: processName, arrival: arrivalTime, burst: burstTime });
            }
            return processes;
        }

        // Display results
        function displayResults(processes, avgWaitingTime, avgTurnAround) {
            var resultTable = `
                <h2>Round Robin Results</h2>
                <table>
                    <tr>
                        <th>Process Name</th>
                        <th>Arrival Time</th>
                        <th>Waiting Time</th>
                        <th>Turn Around Time</th>
                    </tr>`;

            processes.forEach(process => {
                resultTable += `
                    <tr>
                        <td>${process.name}</td>
                        <td>${process.arrival}</td>
                        <td>${process.waitingTime}</td>
                        <td>${process.turnAroundTime}</td>
                    </tr>`;
            });

            resultTable += `</table>`;
            document.querySelector('.result_table').innerHTML = resultTable;

            var avgResults = `Average Waiting Time: ${avgWaitingTime.toFixed(2)}<br>Average Turn Around Time: ${avgTurnAround.toFixed(2)}`;
            document.querySelector('.result_avg').innerHTML = avgResults;
        }