import { createReducer, on } from '@ngrx/store';
import * as MovieActions from '../actions/movie.actions';

export const movieFeatureKey = 'movies';

export interface State {
  movies: any[];
  error: any;
}

export const initialState: State = {
  movies: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(MovieActions.loadMoviesSuccess, (state, action) => ({
    ...state,
    movies: action.movies,
  })),
  on(MovieActions.loadMoviesFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
);
