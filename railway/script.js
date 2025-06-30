
    const trains = [
      { name: "Rajdhani Express", number: "12301", time: "10:00 AM", class: "AC First Class" },
      { name: "Shatabdi Express", number: "12001", time: "2:00 PM", class: "Chair Car" },
      { name: "Duronto Express", number: "12201", time: "6:00 PM", class: "Sleeper Class" }
    ];

    function searchTrains() {
      const from = document.getElementById('from').value;
      const to = document.getElementById('to').value;
      const date = document.getElementById('date').value;
      const trainList = document.getElementById('trainList');
      trainList.innerHTML = '';

      if (from && to && date) {
        trains.forEach(train => {
          const trainDiv = document.createElement('div');
          trainDiv.className = 'train-item';
          trainDiv.innerHTML = `
            <h3>${train.name} (${train.number})</h3>
            <p><strong>Departure:</strong> ${train.time}</p>
            <p><strong>Class:</strong> ${train.class}</p>
            <button onclick="bookTrain('${train.name}', '${train.number}', '${from}', '${to}', '${date}')">Book Now</button>
          `;
          trainList.appendChild(trainDiv);
        });
      } else {
        alert("Please fill all fields.");
      }
    }

    function bookTrain(name, number, from, to, date) {
      const bookingData = {
        train: name,
        number: number,
        from: from,
        to: to,
        date: date,
        bookedAt: new Date().toLocaleString()
      };

      const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
      history.unshift(bookingData);
      localStorage.setItem("bookingHistory", JSON.stringify(history));

      alert(`Booking Confirmed!\nTrain: ${name} (${number})\nFrom: ${from}\nTo: ${to}\nDate: ${date}`);

      location.reload();
    }

    function displayHistory() {
      const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
      const historyList = document.getElementById("historyList");

      history.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `Train: ${entry.train} (${entry.number}) | From: ${entry.from} To: ${entry.to} | Date: ${entry.date} | Booked At: ${entry.bookedAt}`;
        historyList.appendChild(li);
      });
    }

    function toggleTheme() {
      document.body.classList.toggle('dark');
    }

    // Initialize booking history and restrict past dates
    displayHistory();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
  