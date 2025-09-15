ALTER TABLE "libraries" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "library_requests" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "parsing_rules" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users_libraries" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users_libraries" ADD COLUMN "id" bigint PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY (sequence name "users_libraries_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1);--> statement-breakpoint
CREATE POLICY "Users can view parsing_rules" ON "libraries" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "Users can create own requests" ON "library_requests" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "library_requests"."user_id");--> statement-breakpoint
CREATE POLICY "Users can view all requests" ON "library_requests" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "Users can update own requests" ON "library_requests" AS PERMISSIVE FOR UPDATE TO "authenticated" WITH CHECK ((select auth.uid()) = "library_requests"."user_id");--> statement-breakpoint
CREATE POLICY "Users can view parsing_rules" ON "parsing_rules" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "Users can view own users_libraries" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "profiles"."id");--> statement-breakpoint
CREATE POLICY "Users can update own users_libraries" ON "profiles" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.uid()) = "profiles"."id") WITH CHECK ((select auth.uid()) = "profiles"."id");--> statement-breakpoint
CREATE POLICY "Users can insert own users_libraries" ON "users_libraries" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "users_libraries"."user_id");--> statement-breakpoint
CREATE POLICY "Users can view own users_libraries" ON "users_libraries" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "users_libraries"."user_id");--> statement-breakpoint
CREATE POLICY "Users can update own users_libraries" ON "users_libraries" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.uid()) = "users_libraries"."user_id") WITH CHECK ((select auth.uid()) = "users_libraries"."user_id");--> statement-breakpoint
CREATE POLICY "Users can delete own users_libraries" ON "users_libraries" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = "users_libraries"."user_id");
