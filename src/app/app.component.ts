import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { movieQuestions } from "./movieQuestions";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  isSubmitted: boolean = false;
  radio0NotSelected: boolean = false;
  questionsList = movieQuestions;
  surveyForm: FormGroup;

  constructor(public fb: FormBuilder) {
    /*########### Form ###########*/
    this.surveyForm = this.fb.group({
      radioAnswers: this.fb.group({
        radio0: ["", [Validators.required]],
        radio1: ["", [Validators.required]],
        radio2: ["", [Validators.required]]
      })
    });
  }

  // Getter methods to access formControl fields, easily
  get f() {
    return this.surveyForm.controls;
  }

  // Highlight radio buttons upon errors
  radioButtonNotSelected(){
    if(this.f.radioAnswers.get("radio0").errors?.required ||  this.f.radioAnswers.get("radio1").errors?.required || this.f.radioAnswers.get("radio2").errors?.required){
        this.radio0NotSelected = true;
        console.log("You are inside the IF statement");
        console.log(this.f.radioAnswers.get("radio0").errors?.required);
      }
    else {
      this.radio0NotSelected = false;
    }
  }

  // Submit Registration Form
  onSubmit() {
    // MEANT TO VALIDATE FORM FIELDS UPON CLICKED-SUBMIT-BUTTON
    this.isSubmitted = true; 
    if (!this.surveyForm.valid) {
      alert("You must select an answer per question");
      this.radioButtonNotSelected();
      return false;
    } else {
      var radAns1 = this.f.radioAnswers.get("radio0").value;
      var radAns2 = this.f.radioAnswers.get("radio1").value;
      var radAns3 = this.f.radioAnswers.get("radio2").value;
      alert("You selected: " + radAns1 + "," + radAns2 + "," + radAns3);
    }
  }
} // End of AppComponent
