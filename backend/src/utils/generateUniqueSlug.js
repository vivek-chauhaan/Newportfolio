const slugify = require('slugify');

/**
 * Generates a URL-safe slug from `text` and ensures it is unique within
 * `Model`, appending -2, -3, ... on collision. Pass `excludeId` when
 * updating an existing document so it doesn't collide with itself.
 */
async function generateUniqueSlug(Model, text, excludeId = null) {
  const base = slugify(text, { lower: true, strict: true, trim: true }) || 'item';
  let slug = base;
  let counter = 2;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const query = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    // eslint-disable-next-line no-await-in-loop
    const existing = await Model.findOne(query).select('_id').lean();
    if (!existing) return slug;
    slug = `${base}-${counter}`;
    counter += 1;
  }
}

module.exports = generateUniqueSlug;
