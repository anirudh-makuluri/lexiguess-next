export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      daily_streak: {
        Row: {
          current_streak: number | null
          id: number
          longest_streak: number | null
          recent_date: string | null
          start_date: string | null
          user_id: string | null
        }
        Insert: {
          current_streak?: number | null
          id?: number
          longest_streak?: number | null
          recent_date?: string | null
          start_date?: string | null
          user_id?: string | null
        }
        Update: {
          current_streak?: number | null
          id?: number
          longest_streak?: number | null
          recent_date?: string | null
          start_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_streak_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          completed_words: string[] | null
          email: string | null
          id: string
        }
        Insert: {
          completed_words?: string[] | null
          email?: string | null
          id: string
        }
        Update: {
          completed_words?: string[] | null
          email?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
