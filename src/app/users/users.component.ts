import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'actions'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: User[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
          ).pipe(catchError(() => {
            console.log('error') 
            return observableOf(null)
          }));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          console.log('data', data)
          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total;
          return data.items;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  detailClick(id: number) {
    this.router.navigateByUrl(`/users/${id}`)
  }

  editClick(id: number) {
    this.router.navigateByUrl(`/users/edit/${id}`)
  }

  deleteClick(id: number) {
    this.userService.deleteUser(id).subscribe(data => console.log('data', data));
  }

}

export interface BackendApi {
  items: User[];
  total: number;
}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<BackendApi> {
    const href = 'http://localhost:3000/users';
    const requestUrl = `${href}?offset=0&limit=10&sort=${sort}&order=${order}&page=${
      page + 1
    }`;
    console.log('passou aqui', requestUrl)
    return this._httpClient.get<BackendApi>(requestUrl);
  }
}

/** An example database that the data source uses to retrieve data for the table. */

// export class UsersComponent {
//   user: User = {
//     id: 1,
//     name: 'Teste',
//     lastName: 'Testando',
//     email: 'testando@teste.com'
//   }
// }
