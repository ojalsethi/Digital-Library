import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  userdata: any

  genUsers = []

  displayedColumns = ['name', 'username', 'action']
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.refreshAPIData();
  }

  ngAfterViewInit() {    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshAPIData(){
    //Dynamic Data handling
    this.userService.getAllUsers().subscribe(userdata=>{
      console.log('userdata: ',userdata);
      
      userdata.user.forEach(element => {
        if (element.role === 'User') {
          this.genUsers.push(element)
        }        
      })
      console.log('genUsers',this.genUsers);
      this.dataSource.data = this.genUsers
      
    })
  }

}
