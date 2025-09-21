CREATE TABLE "libraries" (
	"lib_code" text PRIMARY KEY NOT NULL,
	"lib_name" text NOT NULL,
	"address" text NOT NULL,
	"tel" text NOT NULL,
	"fax" text NOT NULL,
	"latitude" text NOT NULL,
	"longitude" text NOT NULL,
	"homepage" text NOT NULL,
	"closed" text NOT NULL,
	"operating_time" text NOT NULL,
	"book_count" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
