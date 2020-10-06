export default (dateBase) => {
  const magicNumberEsLintRule = 2;
  const date = new Date(dateBase);
  return `${date.getDate().toString().padStart(magicNumberEsLintRule, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(magicNumberEsLintRule, '0')}`;
};
