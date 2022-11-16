\c nc_news_test;

SELECT * FROM comments;

INSERT INTO comments (body, author, article_id) VALUES ('THis is a comment', 'butter_bridge', 2) RETURNING *;