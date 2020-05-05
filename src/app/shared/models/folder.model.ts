export interface Folder {
    path: string,
    name: string,
    type: string,
    children: Folder[],
    hierarchyNumber: number,
    folderOpen: boolean,
    isEditing: boolean,
    code?: string
  }