SELECT comments.*, users.name
FROM comments
INNER JOIN users ON comments.author_id = users.id
WHERE comments.topic_id = $1
ORDER BY id DESC;
