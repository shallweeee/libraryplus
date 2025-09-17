CREATE TABLE "config" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "config_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"config" jsonb NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "config_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "config" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "Users cannot access to config" ON "config" AS PERMISSIVE FOR ALL TO public USING (false);