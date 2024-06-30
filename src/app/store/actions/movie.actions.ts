import { createAction, props } from '@ngrx/store';

export const loadMovies = createAction('[Movie] Load Movies', props<{ title: string }>());
export const loadMoviesSuccess = createAction('[Movie] Load Movies Success', props<{ movies: any[] }>());
export const loadMoviesFailure = createAction('[Movie] Load Movies Failure', props<{ error: any }>());
