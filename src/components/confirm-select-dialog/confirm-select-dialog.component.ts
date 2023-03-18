import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'confirm-select-dialog',
  templateUrl: './confirm-select-dialog.component.html',
  styleUrls: ['./confirm-select-dialog.component.scss']
})
export class ConfirmSelectDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmSelectDialogComponent, boolean>) {
  }

  public onSubmit(): void {
      this.dialogRef.close(true)
  }

  public close(): void {
    this.dialogRef.close(false)
  }
}
