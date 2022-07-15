import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FlightService } from '../flight.service';
import { Flight } from '../flight';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styles: [
    // todo: figure out how to make width dynamic
    'form { display: flex; flex-direction: column; min-width: 500px; }',
    'form > * { width: 100% }'
  ]
})
export class FlightEditComponent implements OnInit {
  id!: string;
  flight!: Flight;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p['id']),
        switchMap(id => {
          if (id === 'new') { return of(new Flight()); }
          return this.flightService.get(id);
        })
      )
      .subscribe({
        next: (res) => {
          this.flight = res
        },
        error: (e) => this._snackBar.open(e, "Error")
      })

  }



  save2(){
    if(this.flight.uuid){
      this.flightService.update(this.flight.uuid, this.flight).subscribe({
        next: (res) => {
          console.log(res)
          this._snackBar.open("Update was successful", "Success", {duration: 3000});
          setTimeout(() => {
            
            this.router.navigate(['/flights']);
          }, 1000);
        },
        error: (e) => this._snackBar.open(e, "Error")
      })

    }else{
      this.flightService.create(this.flight).subscribe({
        next: (res) => {
          console.log(res)
          this._snackBar.open("Save was successful", "Success", {duration: 3000});
          setTimeout(() => {
            this.router.navigate(['/flights']);
          }, 1000);
        },
        error: (e) => console.error(e)
      })
    }

  }

  cancel() {
    this.router.navigate(['/flights']);
  }
}
