'use strict';
let {ipcMain} = require('electron');

const Note = require('../models/note');
const NotesList = require('../models/notesList');
const SeenStateObserver = require('../models/SeenStateObserver');

/**
 * Time helper
 */
const Time = require('../utils/time.js');

/**
 * Notes controller.
 * Works with events:
 *  - note - save
 *  - notes list - load (in specified Folder)
 *  - note - get
 */
class NotesController {

  /**
   * Setup event handlers
   */
  constructor() {
    this.seenStateObserver = new SeenStateObserver();

    ipcMain.on('note - save', (event, {note}) => {
      this.saveNote(note, event);
    });

    ipcMain.on('notes list - load', (event, folderId) => {
      this.loadNotesList(folderId, event);
    });

    ipcMain.on('note - get', (event, {id}) => {
      this.getNote(id, event);
    });

    ipcMain.on('note - delete', (event, {id}) => {
      this.deleteNote(id, event);
    });

    ipcMain.on('notes - seen', async (event, {noteIds}) => {
      this.markAsSeen(event, noteIds);
    })
  }

  /**
   * Save Note and return result to the event emitter.
   *
   * @typedef {object} SavingNoteData
   * @property {object|null} folderId      - in which Folder Note was created. Null for the Root Folder.
   * @property {string} title              - Note's title
   * @property {object} data               - Note data got from the CodeX Editor
   * @property {string|null} data.id       - On editing, stores Note's id
   * @property {string} data.items         - Note's content
   * @property {number} data.time          - Note's saving time
   * @property {string} data.version       - used CodeX Editor version
   *
   * @param {SavingNoteData} noteData - Note's data from the Client
   * @param {GlobalEvent} event       - {@link https://electronjs.org/docs/api/ipc-main#event-object}
   *
   * Send 'note saved' action to the event emitter with the saved Note data.
   * @returns {Promise.<void>}
   */
  async saveNote(noteData, event) {
    try {
      let note = new Note({
        _id: noteData.data.id || null,
        title: noteData.title,
        content: JSON.stringify(noteData.data.items),
        editorVersion: noteData.data.version,
        authorId: global.user && global.user.token ? global.user.id : null,
        folderId: noteData.folderId,
      });

      note.dtModify = Time.now;

      let newNote = await note.save();

      global.app.cloudSyncObserver.sync();

      event.sender.send('note saved', {
        note: newNote,
        isRootFolder: !noteData.folderId
      });

      // make "seen" edited note
      this.seenStateObserver.touch(noteData.data.id );

    } catch (err) {
      console.log('Note saving failed because of ', err);
    }
  }

  /**
   * Load Notes from Folder with the specified id.
   * Send 'notes list - update' action to the event emitter with Notes list.
   *
   * @param {string} folderId - Folder's id
   * @param {GlobalEvent} event
   * @returns {Promise.<Object|boolean>}
   */
  async loadNotesList(folderId, event) {
    try {
      let list = new NotesList(folderId);
      let notesInFolder = await list.get();

      let returnValue = {
        notes: notesInFolder,
        isRootFolder: !folderId
      };

      event.returnValue = returnValue;

      event.sender.send('notes list - update', returnValue);
    } catch (err) {
      console.log('Notes list loading failed because of ', err);
      event.returnValue = false;
    }
  }

  /**
   * Get Note with the ID specified
   * @param {string} noteId  - Note's id
   * @param {GlobalEvent} event
   * @returns {Promise.<boolean>}
   */
  async getNote(noteId, event) {
    try {
      let note = await Note.get(noteId);

      // set note as visited
      this.seenStateObserver.touch(noteId);

      event.returnValue = note;
    } catch (err) {
      console.log('Note\'s data loading failed because of', err);
      event.returnValue = false;
    }
  }

  /**
   * Delete Note with specified ID
   *
   * @param {string} noteId
   * @param {GlobalEvent} event
   *
   * @returns {Promise.<boolean>}
   */
  async deleteNote(noteId, event) {
    try {
      let note = await Note.get(noteId);

      let noteRemovingResult = await note.delete();

      global.app.cloudSyncObserver.sync();

      event.returnValue = !!noteRemovingResult.isRemoved;
    } catch (err) {
      console.log('Note failed because of', err);
      event.returnValue = false;
    }
  }

  /**
   * Get's information about note visits and emits the event
   * @param {ipcRenderer.Event} event - "notes - seen" event from client side
   * @param {Array} noteIds - list of note ids
   * @return {Promise.<void>}
   */
  async markAsSeen(event, noteIds) {
    let seenNotes = await this.seenStateObserver.getSeenNotes(noteIds);
    event.sender.send('notes - seen', {
        data: seenNotes
    });
  }
}

module.exports = NotesController;
