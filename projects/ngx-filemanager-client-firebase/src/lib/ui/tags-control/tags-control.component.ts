import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent
} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';

import { v4 as uuidv1 } from 'uuid';

export interface Tag {
  id: string;
  name: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-control-tag-multiple',
  template: `
    <mat-form-field class="full-width" [class.formInvalid]="hasRed()">
      <mat-chip-list #chipList [disabled]="!removableTags" [multiple]="true">
        <mat-chip
          *ngFor="let tag of selectInitial"
          [selectable]="selectable"
          [removable]="removableTags"
          (removed)="removeTag(tag)"
        >
          {{ getLowerCase(tag) }}
          <mat-icon matChipRemove *ngIf="removableTags">cancel</mat-icon>
        </mat-chip>
        <input
          #tagInput
          [placeholder]="placeholder"
          [formControl]="controlAutocomplete"
          [matAutocomplete]="auto"
          [matChipInputFor]="chipList"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          [matChipInputAddOnBlur]="addOnBlur"
          (matChipInputTokenEnd)="add($event)"
          [name]="autoCompleteObscureName"
        />
      </mat-chip-list>
      <mat-icon
        matTooltip="Add many tags here, you can manage all your tags using the tag list editor in the settings menu"
        class="tag-icon"
        matSuffix
        matBadge="∞"
        >local_offer</mat-icon
      >
      <mat-autocomplete
        #auto="matAutocomplete"
        (optionSelected)="selectedTag($event)"
      >
        <mat-option *ngFor="let tag of filteredTags | async" [value]="tag">
          {{ tag.name }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }
      .tag-icon {
        color: grey;
        right: 15px;
      }
      .formInvalid {
        background-color: #ff4f4f30 !important;
      }
      .mat-badge-active {
        font-size: 18px;
      }
      mat-icon span {
        background-color: transparent;
        right: 1px !important;
        top: 1px !important;
        color: white;
      }
    `
  ]
})
export class AppControlTagMultipleComponent implements OnInit, OnDestroy {
  // Autocomplete FormGroup
  controlAutocomplete: FormControl;

  // Tag defaults
  visible = true;
  selectable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  filteredTags: Observable<Tag[]>;
  @ViewChild('tagInput', { static: false })
  tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false })
  matAutocomplete: MatAutocomplete;
  selectInitial: Tag[];

  // Variables Passed into this component
  @Input() placeholder: string;
  @Input() displayLowerCase: boolean;
  @Input() control: FormControl;
  @Input() removableTags = true;
  @Input() allowCustom = true;
  @Input() selectChoices$: Observable<Tag[]> = new Observable();

  autoCompleteObscureName: string; // to prevent autocomplete from realising the field name

  checkExists(val, name) {
    if (val == null) {
      throw new Error(name + ' has not been defined');
    }
  }

  hasRed() {
    const isDirty = this.control.dirty;
    const notValid = this.control.invalid;
    return isDirty && notValid;
  }

  ngOnInit() {
    this.checkExists(this.control, 'this.group');
    this.checkExists(this.selectChoices$, 'this.selectChoices');
    this.selectInitial = this.control.value;

    this.autoCompleteObscureName = uuidv1();

    this.selectChoices$ = this.selectChoices$.pipe(take(1));
    this.controlAutocomplete = new FormControl([], Validators.minLength(1));
    // When selectChoices resolves (once)
    this.selectChoices$.subscribe(selectChoicesArr => {
      // set the tags filtering pipe
      this.filteredTags = this.controlAutocomplete.valueChanges.pipe(
        startWith(null),
        map((keyboardInput: string) => {
          console.log({ keyboardInput }, { selectChoicesArr });
          // Filter based on the input value
          if (!keyboardInput) {
            return selectChoicesArr;
          }
          return selectChoicesArr.filter(tag => {
            if (!tag) {
              return false;
            }
            const val = tag.name + '';
            if (!val.includes(keyboardInput)) {
              return false;
            }
            return true;
          });
        })
      );
    });

    // Add the initial values if they're passed in
    this.controlAutocomplete.setValue(this.selectInitial);
    this.control.markAsUntouched();
  }

  ngOnDestroy() {}

  // Allow custom tags, if the selection box is not open
  add(event: MatChipInputEvent): void {
    if (!this.allowCustom) {
      return;
    }
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our Tag
      if ((value || '').trim()) {
        const newTagId = uuidv1();
        const val = value.trim();
        const newTag: Tag = {
          id: newTagId,
          name: val
        };
        this.control.value.push(newTag);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.updateFormValue();
    }
  }

  removeTag(removeTag: Tag): void {
    const index = this.control.value.findIndex(t => t.id === removeTag.id);

    if (index >= 0) {
      this.control.value.splice(index, 1);
    }
    this.updateFormValue();
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    const newVal = event.option.value;
    this.control.value.push(newVal);
    this.tagInput.nativeElement.value = '';
    this.tagInput.nativeElement.blur();
    this.updateFormValue();
  }

  updateFormValue() {
    this.controlAutocomplete.reset();
    this.control.setValue(this.control.value); // Required to trigger value changes
    this.control.markAsDirty();
  }

  getLowerCase(tag) {
    if (!tag || !tag.name) {
      return null;
    }
    const val = tag.name + '';
    return val.toLowerCase();
  }
}
