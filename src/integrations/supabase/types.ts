export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      constitution_amendments: {
        Row: {
          amendment_number: number | null
          constitution_id: string
          contributors: string | null
          created_at: string
          date_enacted: string | null
          description: string | null
          id: string
          title: string
        }
        Insert: {
          amendment_number?: number | null
          constitution_id: string
          contributors?: string | null
          created_at?: string
          date_enacted?: string | null
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          amendment_number?: number | null
          constitution_id?: string
          contributors?: string | null
          created_at?: string
          date_enacted?: string | null
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "constitution_amendments_constitution_id_fkey"
            columns: ["constitution_id"]
            isOneToOne: false
            referencedRelation: "constitutions"
            referencedColumns: ["id"]
          },
        ]
      }
      constitution_chapters: {
        Row: {
          chapter_number: number
          constitution_id: string
          content: string
          created_at: string
          id: string
          part: string | null
          section_range: string | null
          title: string
        }
        Insert: {
          chapter_number: number
          constitution_id: string
          content: string
          created_at?: string
          id?: string
          part?: string | null
          section_range?: string | null
          title: string
        }
        Update: {
          chapter_number?: number
          constitution_id?: string
          content?: string
          created_at?: string
          id?: string
          part?: string | null
          section_range?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "constitution_chapters_constitution_id_fkey"
            columns: ["constitution_id"]
            isOneToOne: false
            referencedRelation: "constitutions"
            referencedColumns: ["id"]
          },
        ]
      }
      constitution_views: {
        Row: {
          chapter_id: string | null
          constitution_id: string
          id: string
          ip_hash: string | null
          user_agent: string | null
          viewed_at: string
        }
        Insert: {
          chapter_id?: string | null
          constitution_id: string
          id?: string
          ip_hash?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Update: {
          chapter_id?: string | null
          constitution_id?: string
          id?: string
          ip_hash?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "constitution_views_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "constitution_chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "constitution_views_constitution_id_fkey"
            columns: ["constitution_id"]
            isOneToOne: false
            referencedRelation: "constitutions"
            referencedColumns: ["id"]
          },
        ]
      }
      constitutions: {
        Row: {
          created_at: string
          description: string | null
          effective_date: string | null
          id: string
          status: string
          title: string
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          effective_date?: string | null
          id?: string
          status?: string
          title: string
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string | null
          effective_date?: string | null
          id?: string
          status?: string
          title?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      contributions: {
        Row: {
          chapter_id: string | null
          constitution_id: string
          contributor_lga: string
          contributor_location: string | null
          contributor_name: string
          contributor_nin: string
          contributor_state: string
          created_at: string
          file_name: string | null
          file_url: string | null
          id: string
          review_text: string
          status: string
        }
        Insert: {
          chapter_id?: string | null
          constitution_id: string
          contributor_lga: string
          contributor_location?: string | null
          contributor_name: string
          contributor_nin: string
          contributor_state: string
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          review_text: string
          status?: string
        }
        Update: {
          chapter_id?: string | null
          constitution_id?: string
          contributor_lga?: string
          contributor_location?: string | null
          contributor_name?: string
          contributor_nin?: string
          contributor_state?: string
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          review_text?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "contributions_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "constitution_chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_constitution_id_fkey"
            columns: ["constitution_id"]
            isOneToOne: false
            referencedRelation: "constitutions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator"],
    },
  },
} as const
