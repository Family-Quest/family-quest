export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      character: {
        Row: {
          avatar: Database["public"]["Enums"]["AvatarName"]
          createdAt: string
          experience: number | null
          family: string
          gold: number | null
          id: string
          member: string
        }
        Insert: {
          avatar: Database["public"]["Enums"]["AvatarName"]
          createdAt?: string
          experience?: number | null
          family: string
          gold?: number | null
          id?: string
          member: string
        }
        Update: {
          avatar?: Database["public"]["Enums"]["AvatarName"]
          createdAt?: string
          experience?: number | null
          family?: string
          gold?: number | null
          id?: string
          member?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_member_fkey"
            columns: ["member"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["id"]
          },
        ]
      }
      family: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      history: {
        Row: {
          character: string | null
          createdAt: string
          family: string
          gold: number
          id: string
          member: string | null
          quest: string | null
          reward: string | null
        }
        Insert: {
          character?: string | null
          createdAt?: string
          family: string
          gold: number
          id?: string
          member?: string | null
          quest?: string | null
          reward?: string | null
        }
        Update: {
          character?: string | null
          createdAt?: string
          family?: string
          gold?: number
          id?: string
          member?: string | null
          quest?: string | null
          reward?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "history_character_fkey"
            columns: ["character"]
            isOneToOne: false
            referencedRelation: "character"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "history_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "history_member_fkey"
            columns: ["member"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "history_quest_fkey"
            columns: ["quest"]
            isOneToOne: false
            referencedRelation: "quest"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "history_reward_fkey"
            columns: ["reward"]
            isOneToOne: false
            referencedRelation: "reward"
            referencedColumns: ["id"]
          },
        ]
      }
      member: {
        Row: {
          createdAt: string
          family: string
          id: string
          password: string
          pseudo: string
          role: Database["public"]["Enums"]["MemberRole"]
          supabase_user: string | null
        }
        Insert: {
          createdAt?: string
          family: string
          id?: string
          password: string
          pseudo: string
          role: Database["public"]["Enums"]["MemberRole"]
          supabase_user?: string | null
        }
        Update: {
          createdAt?: string
          family?: string
          id?: string
          password?: string
          pseudo?: string
          role?: Database["public"]["Enums"]["MemberRole"]
          supabase_user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_member_supabase_user_fkey"
            columns: ["supabase_user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quest: {
        Row: {
          character: string | null
          createdAt: string
          description: string
          family: string
          gold: number
          id: string
          isRequired: boolean
          name: string
          rank: number
          status: Database["public"]["Enums"]["QuestStatus"]
        }
        Insert: {
          character?: string | null
          createdAt?: string
          description: string
          family: string
          gold: number
          id?: string
          isRequired?: boolean
          name: string
          rank: number
          status?: Database["public"]["Enums"]["QuestStatus"]
        }
        Update: {
          character?: string | null
          createdAt?: string
          description?: string
          family?: string
          gold?: number
          id?: string
          isRequired?: boolean
          name?: string
          rank?: number
          status?: Database["public"]["Enums"]["QuestStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "quest_character_fkey"
            columns: ["character"]
            isOneToOne: false
            referencedRelation: "character"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quest_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
        ]
      }
      reward: {
        Row: {
          createdAt: string
          description: string
          family: string
          gold: number
          id: string
          name: string
          rank: number
          status: Database["public"]["Enums"]["RewardStatus"]
        }
        Insert: {
          createdAt?: string
          description: string
          family: string
          gold: number
          id?: string
          name: string
          rank: number
          status?: Database["public"]["Enums"]["RewardStatus"]
        }
        Update: {
          createdAt?: string
          description?: string
          family?: string
          gold?: number
          id?: string
          name?: string
          rank?: number
          status?: Database["public"]["Enums"]["RewardStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "reward_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_auth_family: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      AvatarName: "elara" | "drakus" | "erevan" | "fenrir"
      MemberRole: "player" | "tutor"
      QuestStatus: "toDo" | "inProgress" | "done" | "validated"
      RewardStatus: "active" | "inactive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
