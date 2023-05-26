import * as NotesApi from "./network/notes_api";
import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import { Button, Col, Container, Row } from "react-bootstrap";
import Note from "./components/Note";
import styles from "./styles/NotePage.module.css";
import styleUtils from "./styles/utils.module.css";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showNoteDialog, setShowNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Button
        className={`${styleUtils.blockCenter} mb-4`}
        onClick={() => setShowNoteDialog(true)}
      >
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowNoteDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
