import { Component, OnInit, ViewChild } from '@angular/core';
import { FlightFilter } from '../flight-filter';
import { FlightService } from '../flight.service';
import { Flight } from '../flight';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-flight',
  templateUrl: 'flight-list.component.html',
  styles: [
    `table { min-width: 600px };
    .full-width {
      width: 100%;
    };`,
  ]
})
export class FlightListComponent implements OnInit {
  //displayedColumns = ['id', 'from', 'to', 'date', 'actions'];
  displayedColumns = [ 'title', 'description', 'createdAt', 'actions'];
  filter = new FlightFilter();
  selectedFlight!: Flight;
  feedback: any = {};
  flightList: Flight[] = [];
  


  // get flightList(): Flight[] {
  //   return this.flightService.flightList;
  // }

  constructor(private flightService: FlightService, private _snackBar: MatSnackBar) {
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Flight>;



  ngOnInit() {
    this.load();
  }

  search(){
    console.log(this.filter.query)
    this.flightService.findByTitle(this.filter.query).subscribe({
      next: (data) => {
        this.flightList = data;
        this.dataSource = new MatTableDataSource<Flight>(data);
        console.log(data)
      },
      error: (e) => console.error(e)
    })
  }

  load(): void {
    console.log(this.filter)
    this.flightService.getAll().subscribe({
      next: (data) => {
        this.flightList = data;
        this.dataSource = new MatTableDataSource<Flight>(data);
        this.dataSource.paginator = this.paginator;
        console.log(this.paginator)
      },
      error: (e) => console.error(e)
    });
  }

  select(selected: Flight): void {
    this.selectedFlight = selected;
  }


  delete(flight: Flight): void {
    console.log(flight)
    if(confirm('Are you sure')){
      this.flightService.delete(flight.uuid).subscribe({
        next: (res) => {
          console.log(res)
          this._snackBar.open("Delete was successful", "Success", {duration: 3000});
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        error: (e) => this._snackBar.open(e, "Error")
      })
    }
  }
}
