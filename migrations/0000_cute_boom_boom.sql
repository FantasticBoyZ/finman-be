CREATE TABLE IF NOT EXISTS "categories" (
	"category_id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"transaction_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"purpose" varchar(255) NOT NULL,
	"category_id" integer NOT NULL,
	"user_id" uuid NOT NULL,
	"sum" numeric(20, 2) NOT NULL,
	"date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"account" varchar(255) NOT NULL,
	"birthday" date NOT NULL,
	"email" varchar(255) NOT NULL,
	"balance" numeric(20, 2) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
