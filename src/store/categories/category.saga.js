import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories"); //"categories will be passed as argument"
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  ); //takeLatest will fire fethCategoriesAsync when action passed to it is called
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
