import type { ColumnDef } from "@tanstack/react-table"

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  defaultFilter: string
}

export type UnwrapArray<T> = T extends Array<infer R> ? R : never
