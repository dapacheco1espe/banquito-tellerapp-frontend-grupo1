import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent implements OnInit {

  public formClient:FormGroup;
  constructor(private _formBuilder:FormBuilder, private _changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this._changeDetectorRef.markForCheck();
    this.formClient = this._formBuilder.group({
      accountNumber: [null],
      clientId: [null,Validators.min(1111111110)]
    });
    
  }

}
