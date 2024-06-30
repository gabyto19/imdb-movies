import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMovie from '../reducers/movie.reducer';

export const selectMovieState = createFeatureSelector<fromMovie.State>(
  fromMovie.movieFeatureKey
);

export const selectMovies = createSelector(
  selectMovieState,
  (state: fromMovie.State) => state.movies
);
