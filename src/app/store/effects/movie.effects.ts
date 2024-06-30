import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as MovieActions from '../actions/movie.actions';
import { MovieService } from '../../services/movie.service';

@Injectable()
export class MovieEffects {
  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(MovieActions.loadMovies),
    mergeMap(action =>
      this.movieService.searchMovies(action.title).pipe(
        map(movies => MovieActions.loadMoviesSuccess({ movies })),
        catchError(error => of(MovieActions.loadMoviesFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private movieService: MovieService
  ) {}
}
