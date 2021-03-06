// Get the element with id="defaultOpen" and click on it
let courseUl = document.querySelector('#course-list');
let schoolList = document.querySelector('#school-list');

for (let school in courseList) {
	let schoolDiv = document.createElement('div');
	schoolDiv.setAttribute('id', school);
	schoolDiv.setAttribute('class', 'tabcontent cell');

	let schoolHeader = document.createElement('h3');
	schoolHeader.textContent = fullName[school];
	schoolHeader.setAttribute('class','subheader')

	let schoolUl =  document.createElement('ul');
	schoolUl.setAttribute('class','no-bullet')
	schoolUl.setAttribute('it',school)
	schoolList.appendChild(schoolDiv);
	schoolDiv.appendChild(schoolHeader);
	schoolDiv.appendChild(schoolUl);

	for (let course in courseList[school]) {
		let slot = courseList[school][course].slot;

		let courseLabel = document.createElement('label');
		courseLabel.setAttribute('for', course);
		courseLabel.textContent = course;
		if (courseList[school][course].hasOwnProperty('name')) {
			courseLabel.textContent += ": " + courseList[school][course].name;
		}

		let courseLi = document.createElement('li');

		let courseCheckBox = document.createElement('input');
		courseCheckBox.setAttribute('type', 'checkbox');
		courseCheckBox.setAttribute('value', course);
		courseCheckBox.setAttribute('id', course);
		courseCheckBox.setAttribute('class', slot);

		schoolUl.appendChild(courseLi);
		courseLi.appendChild(courseCheckBox);
		courseLi.appendChild(courseLabel);
	}
}

function clean() {
	let slotsInTimetable = document.querySelectorAll('td:not(.lunch)');

	slotsInTimetable.forEach(function(slot) {
		slot.textContent = '';
	})
}

function generate() {
	let courseCheckBoxes = document.querySelectorAll('input');
	let occupiedSlots = []
	courseCheckBoxes.forEach(function(course) {
		if (course.checked) {
			let courseCode = course.getAttribute('id');
			let courseSlot = course.getAttribute('class').slice(0,1);
			for (let i = 0; i < occupiedSlots.length; ++i) {
				if (occupiedSlots[i] === courseSlot) {
					alert("Conflict detected. Try selecting your courses again.");
					location = location;
				}
			}

			occupiedSlots.push(courseSlot);

			let courseSlotInTimetable = document.querySelectorAll('td.' + courseSlot);
			courseSlotInTimetable.forEach(function(slotInTimetable) {
				slotInTimetable.textContent = courseCode;
			})
		}
	})
	occupiedSlots = [];

	// show elements which were initially hidden
	var i
	let toShowElements = document.getElementsByClassName("show-when-gen");
	for (i = 0; i<toShowElements.length; i++){
		toShowElements[i].style.display="inline";
	}

	// hide unwanted elements
	let toHideElements = document.getElementsByClassName("hide-when-gen");
	for (i = 0; i<toHideElements.length; i++){
		toHideElements[i].style.display="none";
	}

}

function generatePdf() {
	let doc = new jsPDF({
		orientation: 'landscape',
		unit: 'pt'
	})

	let timetable = document.querySelector('table');
	let jsonTable = doc.autoTableHtmlToJson(timetable);
	doc.text('Timetable for Fall Semester 2019', 36, 25);
	doc.autoTable(jsonTable.columns, jsonTable.data, {
		styles: {cellPadding: 10,
			fontSize: 13,
			lineColor: 10,
			lineWidth: .5,
			overflow: 'linebreak',
			halign: 'center',
			valign: 'middle'},
		theme: 'plain'});
	doc.save("tt_fall_2019.pdf");
}

let generateButton = document.querySelector('button#gen');
generateButton.addEventListener('click', generate);

// I don't see the point of this
// let cleanButton = document.querySelector('button#clean');
// cleanButton.addEventListener('click', clean);

let pdfButton = document.querySelector('button#pdf');
pdfButton.onclick = generatePdf;

let resetButton = document.querySelector('button#reset');
resetButton.onclick = function() {
	location = location;
}

function openPage(pageName) {
	// Hide all elements with class="tabcontent" by default */
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Remove the background color of all tablinks/buttons
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].style.backgroundColor = "";
	}

	// Show the specific tab content
	document.getElementById(pageName).style.display = "block";
}
document.getElementById("defaultOpen").click();
