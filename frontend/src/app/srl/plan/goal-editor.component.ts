import { Component, OnInit, ViewChild } from "@angular/core";
// import Quill from "quill";
import "quill-mention";
import * as quillMention from "quill-mention";
import { QuillEditorComponent } from "ngx-quill";
import { Key } from "src/app/shared/enums/key.enum";
// import { Quill } from "quill";

// declare var Quill: any;
// const Embed = Quill.import("blots/embed");

// export class TagBlot extends Embed {
//   static create(data) {
//     const node = super.create();
//     const denotationChar = document.createElement("span");
//     denotationChar.className = "ql-mention-denotation-char";
//     denotationChar.innerHTML = data.denotationChar;
//     node.appendChild(denotationChar);
//     node.innerHTML += data.value;
//     return TagBlot.setDataValues(node, data);
//   }

//   static setDataValues(element, data) {
//     const domNode = element;
//     Object.keys(data).forEach(key => {
//       domNode.dataset[key] = data[key];
//     });
//     return domNode;
//   }

//   static value(domNode) {
//     return domNode.dataset;
//   }
// }

// TagBlot.blotName = "tag";
// TagBlot.tagName = "span";
// TagBlot.className = "tag";

// Quill.register(TagBlot);
// console.log("Registered Tag Blot");

@Component({
  selector: "app-goal-editor",
  templateUrl: "./goal-editor.component.html",
  styleUrls: ["./goal-editor.component.scss"]
})
export class GoalEditorComponent implements OnInit {
  modules = {};
  @ViewChild(QuillEditorComponent, { static: true })
  editor: QuillEditorComponent;

  tagList = [];

  isTagging = false;
  lastTypedCharacter = null;
  numberSpaces = 0;
  mentionCharPos = null;
  caretRange = null;
  caretPosition = 0;
  currentTagStartPosition = 0;
  quillEditor: any;
  SOURCE_USER = "user";

  constructor() {
    const self = this;
    this.modules = {
      toolbar: [
        // ["bold", "italic", "underline"],
        [{ header: 1 }, { header: 2 }]
      ]
    };
  }

  createTaggingModule() {
    // Quill.register("modules/tagging", function(quill, options) {
    // })
  }

  onEditorCreated(quill: any) {
    this.quillEditor = quill;

    quill.keyboard.addBinding(
      {
        key: 191
      },
      this.onTagPressed
    );
    quill.keyboard.addBinding(
      {
        key: Key.Backspace
      },
      this.onBackspacePressed
    );
  }

  onKeydown(event: KeyboardEvent) {
    console.log("Key Down Event: ", event);
    switch (event.keyCode) {
      case Key.Space:
        this.onSpacePressed(null, null);
        break;
    }
  }

  onTagPressed = (range: any, context: any) => {
    console.log("Tag Pressed");
    // If we are already tagging, store the current tag as well
    if (this.isTagging) {
      this.saveCurrentTag();
    }
    this.tagTextMode();
    // this.quillEditor.insertText(this.caretPosition, "#", "user");
    this.currentTagStartPosition = this.caretPosition + 1;
    this.isTagging = true;
    return true;
    // this.quillEditor.setSelection(this.currentTagStartPosition, 0, "user");
  };

  onSpacePressed = (range: any, context: any) => {
    if (this.isTagging) {
      this.saveCurrentTag();
    }

    this.isTagging = false;
    this.normalTextMode();
  };

  saveCurrentTag = () => {
    const tagText = this.quillEditor.getText(
      this.currentTagStartPosition,
      this.caretPosition - this.currentTagStartPosition
    );
    if (tagText !== "") {
      this.tagList.push({
        id: this.tagList.length,
        value: tagText
      });
    }
  };

  onBackspacePressed = (range: any, context: any) => {
    this.isTagging = false;
    const currentContents = this.quillEditor.getContents();
    return true;
  };

  tagTextMode = () => {
    this.quillEditor.format("color", "#1111ee");
    this.quillEditor.format("bold", true);
  };

  normalTextMode = () => {
    this.quillEditor.format("color", "#111111");
    this.quillEditor.format("bold", false);
  };

  onContentChanged(event: any) {
    console.log("Content Changed");
    if (event.delta) {
      if (event.delta.ops[0]["insert"]) {
        this.lastTypedCharacter = event.delta.ops[0]["insert"];
      }
      if (event.delta.ops[0]["delete"]) {
        console.log("Content changed deteled: ", event.delta);
      }
    }
    this.onSomethingChanged(event);
  }

  onSelectionChanged(event: any) {
    this.onSomethingChanged(event);
  }

  onSomethingChanged(event: any) {
    this.caretRange = this.quillEditor.getSelection();
    this.caretPosition = this.caretRange.index;
  }

  ngOnInit() {}
}
