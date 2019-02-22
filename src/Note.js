class Note {
    constructor() {
        this.title = "untitled note";
        this.body = "";
    }

    get Title() {
        return this.title;
    }

    set Title(title) {
        this.title = title;
    }

    get Body() {
        return this.body;
    }

    set Body(body) {
        this.body = body;
    }
}

export default Note;