import type { Tables, TablesInsert, TablesUpdate } from '@/types/database.types'

export type Member = Omit<Tables<'member'>, 'password'>
export type MemberInsertForm = TablesInsert<'member'>
export type MemberUpdateForm = TablesUpdate<'member'>
