import { Component, OnInit, ViewChild } from "@angular/core";
// import Quill from "quill";
import "quill-mention";
import * as quillMention from "quill-mention";
import { QuillEditorComponent } from "ngx-quill";
import { Key } from "src/app/shared/enums/key.enum";

declare var Quill: any;
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
  @ViewChild(QuillEditorComponent, { static: true }) editor: QuillEditorComponent;

  tagList = [{ id: 1, value: "learning" }];

  isTagging = false;
  lastTypedCharacter = null;
  numberSpaces = 0;
  mentionCharPos = null;
  caretRange = null;
  caretPosition = 0;
  quillEditor;
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
        this.isTagging = false;
        break;
    }
  }

  onTagPressed = (range: any, context: any) => {
    // const delta = this.quillEditor.insertEmbed(
    //   0,
    //   "mention",
    //   "miau",
    //   this.SOURCE_USER
    // );
    console.log("Tag Pressed");
    this.quillEditor.insertText(
      this.caretPosition,
      "#",
      {
        color: "#0000ee",
        bold: true
      },
      this.SOURCE_USER
    );
    this.isTagging = true;
    this.quillEditor.setSelection(this.caretPosition + 1, 0, this.SOURCE_USER);
  };

  onSpacePressed = (range: any, context: any) => {
    this.isTagging = false;
  };

  onBackspacePressed = (range: any, context: any) => {
    this.isTagging = false;
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
    if (event.index) {
      this.caretPosition = event.index;
    }
  }

  ngOnInit() {}
}
