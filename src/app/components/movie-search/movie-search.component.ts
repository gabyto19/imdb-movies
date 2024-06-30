import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadMovies } from '../../store/actions/movie.actions';
import { selectMovies } from '../../store/selectors/movie.selectors';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent {
  title: string = '';
  movies$: Observable<any[]>;
  errorMessage: string = '';

  constructor(private store: Store) {
    this.movies$ = this.store.select(selectMovies);
  }

  search() {
    if (this.title) {
      this.store.dispatch(loadMovies({ title: this.title }));
    }
  }
}
