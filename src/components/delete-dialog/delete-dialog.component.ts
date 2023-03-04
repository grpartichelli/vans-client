import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent, boolean>) {
  }

  public onSubmit(): void {
      this.dialogRef.close(true)
  }

  public close(): void {
    this.dialogRef.close(false)
  }
}
