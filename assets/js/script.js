const notesContainer = document.getElementById('notes-container')
const addNoteBtn = document.getElementById('add-note')
const noteTitle = document.getElementById('note-title')
const noteContent = document.getElementById('note-content')

function createNoteElement(title, content) {
	const note = document.createElement('div')
	note.classList.add('note')

	const titleEl = document.createElement('h3')
	titleEl.textContent = title
	note.appendChild(titleEl)

	const contentEl = document.createElement('p')
	contentEl.textContent = content
	note.appendChild(contentEl)

	const deleteBtn = document.createElement('button')
	deleteBtn.textContent = 'Удалить'
	deleteBtn.onclick = () => {
		note.remove()
		saveNotes()
	}
	note.appendChild(deleteBtn)

	return note
}

function saveNotes() {
	const notes = []
	document.querySelectorAll('.note').forEach(note => {
		notes.push({
			title: note.querySelector('h3').textContent,
			content: note.querySelector('p').textContent,
		})
	})
	localStorage.setItem('notes', JSON.stringify(notes))
}

function loadNotes() {
	const notes = JSON.parse(localStorage.getItem('notes')) || []
	notes.forEach(({ title, content }) => {
		const noteEl = createNoteElement(title, content)
		notesContainer.appendChild(noteEl)
	})
}

addNoteBtn.addEventListener('click', () => {
	const title = noteTitle.value.trim()
	const content = noteContent.value.trim()
	if (title && content) {
		const note = createNoteElement(title, content)
		notesContainer.appendChild(note)
		saveNotes()
		noteTitle.value = ''
		noteContent.value = ''
	}
})

window.addEventListener('load', loadNotes)
