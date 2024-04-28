import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-base',
  templateUrl: './menu-base.component.html',
  styleUrls: ['./menu-base.component.css'],
})
export class MenuBaseComponent {
  selectedButton: string = 'prodhub';

  selectButton(button: string) {
    this.selectedButton = button;
  }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
