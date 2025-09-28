CREATE TABLE "profiles_libraries" (
	"profile_id" uuid,
	"lib_code" text,
	"dtl_region" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_libraries_profile_id_lib_code_pk" PRIMARY KEY("profile_id","lib_code")
);
--> statement-breakpoint
ALTER TABLE "profiles_libraries" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "profiles_libraries" ADD CONSTRAINT "profiles_libraries_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles_libraries" ADD CONSTRAINT "profiles_libraries_lib_code_libraries_lib_code_fk" FOREIGN KEY ("lib_code") REFERENCES "public"."libraries"("lib_code") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "Can read own rows" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "profiles"."profile_id");--> statement-breakpoint
CREATE POLICY "Can write own rows" ON "profiles_libraries" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "profiles_libraries"."profile_id");--> statement-breakpoint
CREATE POLICY "Can read own rows" ON "profiles_libraries" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "profiles_libraries"."profile_id");--> statement-breakpoint
CREATE POLICY "Can delete own rows" ON "profiles_libraries" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = "profiles_libraries"."profile_id");