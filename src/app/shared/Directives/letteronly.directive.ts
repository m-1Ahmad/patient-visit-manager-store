import { Directive,HostListener } from '@angular/core';

@Directive({
  selector: '[appLettersOnly]',
  standalone: true
})
export class LettersOnlyDirective {
  private keys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Home', 'End', 'Escape'];
  private isLetter = /^[a-zA-Z ]$/;
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent){
    if (this.keys.includes(event.key)){
      return;
    }
    if(!this.isLetter.test(event.key)){
      event.preventDefault();
    }
    
  }
}
