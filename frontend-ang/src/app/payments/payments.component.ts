import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {HttpClient} from "@angular/common/http";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatRow,
  MatTable,
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatDivider,
    MatCardTitle,
    MatFormField,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatTableModule,
    MatPaginatorModule,
    MatSort,
    MatSortHeader
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{
  public payments: any;
  public dataSource: any;

  public displayedColumns: string[] = ['id', 'date', 'amount', 'type', 'status', 'firstName'];

  @ViewChild(MatPaginator) paginator!: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort | undefined;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('http://localhost:8021/payments')
      .subscribe({
        next: (data) => {
          this.payments = data;
          this.dataSource = new MatTableDataSource(this.payments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        }
    });
  }

}
