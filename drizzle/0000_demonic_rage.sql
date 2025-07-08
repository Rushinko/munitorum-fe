CREATE SCHEMA "user";
--> statement-breakpoint
CREATE TABLE "user"."users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user"."users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"password" varchar(255) NOT NULL,
	"name" varchar(255),
	"age" integer,
	"email" varchar(255) NOT NULL,
	"picture" varchar(255),
	"googleId" varchar(255),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_googleId_unique" UNIQUE("googleId")
);
