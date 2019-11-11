import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.less']
})
export class DialogConfirmComponent {
  @Input() dialogTitle: string;
  @Input() dialogText: string;
  @Input() isVisible = false;
  @Output() isConfirmed = new EventEmitter<any>();

  handleOk(): void {
    this.isConfirmed.emit();
    this.isVisible = false;
  }
}
