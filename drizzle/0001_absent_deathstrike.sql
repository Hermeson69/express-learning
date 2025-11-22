ALTER TABLE `users_table` ADD `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `createdAt` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `updatedAt` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` DROP COLUMN `age`;