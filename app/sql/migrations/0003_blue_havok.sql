CREATE TABLE "dtl_regions" (
	"code" text PRIMARY KEY NOT NULL,
	"region" text NOT NULL,
	"detail" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dtl_regions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "libraries" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "Enable read access for authenticated users" ON "libraries" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "Enable read access for authenticated users" ON "dtl_regions" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);