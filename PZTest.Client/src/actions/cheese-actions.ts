import { createAsyncAction } from 'typesafe-actions'
import { Cheese } from '../interfaces'

export const cheeseReadAllActions = createAsyncAction(
  'CHEESE:MULTI:send',
  'CHEESE:MULTI:receive',
  'CHEESE:MULTI:error',
)<undefined, Cheese[], Error>()
export const cheeseReadActions = createAsyncAction(
  'CHEESE:SINGLE:send',
  'CHEESE:SINGLE:receive',
  'CHEESE:SINGLE:error',
)<string, Cheese, Error>()
export const cheeseDeleteActions = createAsyncAction(
  'CHEESE:DELETE:send',
  'CHEESE:DELETE:receive',
  'CHEESE:DELETE:error',
)<Cheese, Cheese, Error>()
export const cheeseCreateActions = createAsyncAction(
  'CHEESE:CREATE:send',
  'CHEESE:CREATE:receive',
  'CHEESE:CREATE:error',
)<Cheese, Cheese, Error>()
export const cheeseUpdateActions = createAsyncAction(
  'CHEESE:UPDATE:send',
  'CHEESE:UPDATE:receive',
  'CHEESE:UPDATE:error',
)<Cheese, Cheese, Error>()
