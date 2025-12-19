const noteInput = document.getElementById('noteInput');
const saveNoteButton = document.getElementById('saveNote');
const notesContainer = document.getElementById('notesContainer');

document.addEventListener('DOMContentLoaded', displayNotes);

saveNoteButton.addEventListener('click', function() {  
    let noteText = noteInput.value.trim();
    if (noteText === "") return;
    
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));

    noteInput.value = '';
    displayNotes();
});

function displayNotes() {
    notesContainer.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach((note, index) => {
        let noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
            <p>${note}</p>
            <button class="deleteBtn" onclick="deleteNote(${index})">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}