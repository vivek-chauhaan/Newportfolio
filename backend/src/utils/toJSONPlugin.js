// Applied to every schema. The frontend (React) reads `row.id` /
// `project.id` etc. everywhere instead of Mongo's `_id`, so we expose a
// plain string `id` on every serialized document and strip `_id`/`__v`.
function toJSONPlugin(schema) {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = ret._id?.toString();
      delete ret._id;
      return ret;
    },
  });
  schema.set('toObject', { virtuals: true });
}

module.exports = toJSONPlugin;
