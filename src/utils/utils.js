/**
 * @param {import('mongoose').Error.ValidationError} errors
 * @param {string[]} schemaFields
 */
export const formatErrors = (errors, schemaFields) => {
  let formattedErrors = [];
  if (errors) {
    for (const field of schemaFields) {
      if (!errors.errors[field]) continue;
      formattedErrors.push(errors.errors[field].message);
    }
  }
  return formattedErrors;
};
