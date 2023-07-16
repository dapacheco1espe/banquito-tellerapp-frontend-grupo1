import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipList } from '@angular/material/chips';

@Component({
  selector: 'app-transferences',
  templateUrl: './transferences.component.html',
  styleUrls: ['./transferences.component.scss']
})
export class TransferencesComponent implements OnInit, AfterViewInit {
  @ViewChild('chipList') chipList:MatChipList;
  public formClient:FormGroup;
  private _REGEXNUMBERS:RegExp = /^\d+$/;
  public chipSelectedValue : string = '';
  constructor(private _formBuilder:FormBuilder, private _changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.formClient = this._formBuilder.group({
      accountNumber: ['',[Validators.required, Validators.pattern(this._REGEXNUMBERS)]],
    });
  }
  ngAfterViewInit(): void {
    this.chipList.chips.get(0).selected = true;
    this.chipSelectedValue =  this.chipList.selected['value'];
  }
  public selectThisChip(index:number){
    this.chipList.chips.get(index).selected = !this.chipList.chips.get(index).selected;
    this.chipSelectedValue =  this.chipList.selected['value'];
    this._changeDetectorRef.markForCheck();
  }

}
