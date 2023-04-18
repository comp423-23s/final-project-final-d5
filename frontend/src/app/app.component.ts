import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-navigation></app-navigation>',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public items = [...Array(180).keys()].map(x => `item ${++x}`)
  public itemsToDisplay: string[] = []
  public perPage = 10
  public total = Math.ceil(this.items.length / this.perPage)
  title = 'frontend';
    public current: number = 1;
    public total: number = 18;
    public onGoTo(page: number): void {
      this.current = page
    }
    public onNext(page: number): void {
      this.current = page + 1
    }
    public onPrevious(page: number): void {
      this.current = page - 1
    }
  }
