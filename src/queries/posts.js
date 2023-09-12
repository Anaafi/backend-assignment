const addBook = `
INSERT INTO books(
    title,
    text,
) VALUES ($1,$2,$3) RETURNING id, title, user_id, text
`;
