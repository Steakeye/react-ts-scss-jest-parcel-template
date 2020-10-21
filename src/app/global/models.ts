/*
App specific Data structures
*/
export enum BaseReducerActionType {
  Create = 'create',
  Delete = 'delete',
  Read = 'read',
  Update = 'update',
}

export enum AsyncReducerActionType {
  Request = 'request',
  Waiting = 'waiting',
  Receive = 'receive',
}

export enum EditableReducerActionType {
  Undo = 'undo',
  Redo = 'redo',
  Remove = 'remove',
  Reset = 'reset',
}
