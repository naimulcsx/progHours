-- Rename column
ALTER TABLE "Group" RENAME COLUMN "hashtag" TO "slug";

-- RenameIndex
ALTER INDEX "Group_hashtag_key" RENAME TO "Group_slug_key";