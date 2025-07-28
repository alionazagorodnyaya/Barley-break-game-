function drawField(field) {
	const barleyBreak = document.querySelector(".barley-break");
	barleyBreak.innerHTML = "";
	for (const row of field) {
		const rowDiv = document.createElement("div");
		rowDiv.className = "row";
		for (const col of row) {
			const colDiv = document.createElement("div");
			colDiv.textContent = col;
			rowDiv.append(colDiv);
		}
		barleyBreak.append(rowDiv);
	}
}

function shuffleField(field) {
	for (let i = 0; i < 10; i++) {
		for (let idxRow = 0; idxRow < field.length; idxRow++) {
			for (let idxCol = 0; idxCol < field[idxRow].length; idxCol++) {
				if (field[idxRow][idxCol] == "") {
					const minNum = 1;
					const maxNum = 4;
					const randomNum =
						Math.floor(Math.random() * maxNum) + minNum;
					if (randomNum == 1) {
						if (idxRow > 0) {
							const value = field[idxRow][idxCol];
							field[idxRow][idxCol] = field[idxRow - 1][idxCol];
							field[idxRow - 1][idxCol] = value;
						}
					}
					if (randomNum == 2) {
						if (idxRow < 3) {
							const value = field[idxRow][idxCol];
							field[idxRow][idxCol] = field[idxRow + 1][idxCol];
							field[idxRow + 1][idxCol] = value;
						}
					}
					if (randomNum == 3) {
						if (idxCol > 0) {
							const value = field[idxRow][idxCol];
							field[idxRow][idxCol] = field[idxRow][idxCol - 1];
							field[idxRow][idxCol - 1] = value;
						}
					}
					if (randomNum == 4) {
						if (idxCol < 3) {
							const value = field[idxRow][idxCol];
							field[idxRow][idxCol] = field[idxRow][idxCol + 1];
							field[idxRow][idxCol + 1] = value;
						}
					}
				}
			}
		}
	}
}
function checkWinGame(fieldDivs) {
	const winner = [
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12],
		[13, 14, 15, ""],
	];

	const arrFieldAct = [];

	for (let idxRow = 0; idxRow < fieldDivs.length; idxRow++) {
		const row = fieldDivs[idxRow].children;
		const r = [];
		for (let idxCol = 0; idxCol < row.length; idxCol++) {
			const value = row[idxCol].textContent;
			r.push(value);
		}
		arrFieldAct.push(r);
	}

	return String(arrFieldAct) == String(winner);
}

function saveStat(isWin, startTime) {
	//const statBarley = JSON.parse(localStorage.getItem("barleyStats")) || [];
	let statBarley = localStorage.getItem("barleyStats");
	if (statBarley == null) {
		statBarley = [];
	} else {
		statBarley = JSON.parse(statBarley);
	}
	const endTime = new Date();
	const actualDate = getDate(startTime);
	const endDate = getDate(endTime);
	statBarley.push({
		start: actualDate,
		end: endDate,
		win: isWin,
	});

	localStorage.setItem("barleyStats", JSON.stringify(statBarley));
}

function getDate(dateNow) {
	let day = dateNow.getDate();
	{
		if (day < 10) {
			day = "0" + day;
		} else {
			day = String(day);
		}
	}

	let month = dateNow.getMonth();
	{
		if (month < 10) {
			month = "0" + month;
		} else {
			month = String(month);
		}
	}
	const year = dateNow.getFullYear();
	let hours = dateNow.getHours();
	{
		if (hours < 10) {
			hours = "0" + hours;
		} else {
			hours = String(hours);
		}
	}
	let minutes = dateNow.getMinutes();
	{
		if (minutes < 10) {
			minutes = "0" + minutes;
		} else {
			minutes = String(minutes);
		}
	}

	return `${day}.${month}.${year} | ${hours}:${minutes}`;
}

function swapField(fieldDivs, startTime) {
	for (let idxRow = 0; idxRow < fieldDivs.length; idxRow++) {
		const rows = fieldDivs[idxRow].children;
		for (let idxCol = 0; idxCol < rows.length; idxCol++) {
			const clickedDiv = fieldDivs[idxRow].children[idxCol];
			clickedDiv.onclick = () => {
				if (fieldDivs[idxRow - 1]) {
					if (
						fieldDivs[idxRow - 1].children[idxCol].textContent == ""
					) {
						fieldDivs[idxRow - 1].children[idxCol].textContent =
							clickedDiv.textContent;

						clickedDiv.textContent = "";
						if (checkWinGame(fieldDivs)) {
							alert("win");
							saveStat(true, startTime);
						}
					}
				}
				if (fieldDivs[idxRow + 1]) {
					if (
						fieldDivs[idxRow + 1].children[idxCol].textContent == ""
					) {
						fieldDivs[idxRow + 1].children[idxCol].textContent =
							clickedDiv.textContent;

						clickedDiv.textContent = "";
						if (checkWinGame(fieldDivs)) {
							alert("win");
							saveStat(true, startTime);
						}
					}
				}
				if (fieldDivs[idxRow].children[idxCol - 1]) {
					if (
						fieldDivs[idxRow].children[idxCol - 1].textContent == ""
					) {
						fieldDivs[idxRow].children[idxCol - 1].textContent =
							clickedDiv.textContent;

						clickedDiv.textContent = "";
						if (checkWinGame(fieldDivs)) {
							alert("win");
							saveStat(true, startTime);
						}
					}
				}
				if (fieldDivs[idxRow].children[idxCol + 1]) {
					if (
						fieldDivs[idxRow].children[idxCol + 1].textContent == ""
					) {
						fieldDivs[idxRow].children[idxCol + 1].textContent =
							clickedDiv.textContent;

						clickedDiv.textContent = "";
						if (checkWinGame(fieldDivs)) {
							alert("win");
							saveStat(true, startTime);
						}
					}
				}
			};
		}
	}
}

const rulesBtn = document.querySelector("#btn-rools");
const rulesText = document.querySelector(".rules-text");
const rulesClose = document.querySelector(".close-rules");

let startTime = new Date();

rulesBtn.onclick = () => {
	rulesText.style.display = "flex";
};
rulesClose.onclick = () => {
	rulesText.style.display = "none";
};

const statsBtn = document.querySelector("#btn-statistic");
const statText = document.querySelector(".statistic-text");
const statsClose = document.querySelector(".close-statistics");
const clearBtn = document.querySelector("#btn-statistic-clear");
const statContent = document.querySelector(".statistic-content");
statsBtn.onclick = () => {
	const statBarley = JSON.parse(localStorage.getItem("barleyStats")) || [];
	statText.style.display = "flex";
	statsClose.style.display = "flex";
	statContent.innerHTML = "";
	statBarley.forEach((info, index) => {
		statContent.textContent += ` ${index + 1})  Start: ${
			info.start
		}  End: ${info.end}  Win: ${info.win} `;
		statsClose.onclick = () => {
			statText.style.display = "none";
		};
	});
	statsClose.onclick = () => {
		statsClose.style.display = "none";
		statText.style.display = "none";
	};
};
clearBtn.onclick = () => {
	localStorage.removeItem("barleyStats");
	statContent.innerHTML = "Statistic Clearned";
};

const restartBtn = document.querySelector("#btn-restart");
const barleyBreak = document.querySelector(".barley-break");
const btnControllers = document.querySelector(".btn-controllers");

const fieldDivs = barleyBreak.children;

const field = [
	[1, 2, 3, 4],
	[5, 6, 7, 8],
	[9, 10, 11, 12],
	[13, 14, 15, ""],
];

shuffleField(field);
drawField(field);
swapField(fieldDivs, startTime);
restartBtn.onclick = () => {
	shuffleField(field);
	drawField(field);
	let startTime = new Date();
	swapField(fieldDivs, startTime);
	saveStat(false, startTime);
};
