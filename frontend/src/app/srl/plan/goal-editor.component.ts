import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-goal-editor",
  templateUrl: "./goal-editor.component.html",
  styleUrls: ["./goal-editor.component.scss"]
})
export class GoalEditorComponent implements OnInit {
  modules = {};

  constructor() {
    this.modules = {
      toolbar: [
        ["bold", "italic", "underline"],
        [{ header: 1 }, { header: 2 }],
        ["image"]
      ],
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        source: function(searchTerm) {
          console.log("Mention Plugin");
        }
      }
    };
  }

  onContentChanged($event: any) {
    console.log("Content Changed Event: ", $event);

    if ($event.html.includes("#")) {
      const idx = $event.html.indexOf("#");
    }
  }

  ngOnInit() {}
}
