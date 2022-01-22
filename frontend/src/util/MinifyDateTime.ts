const MinifyToDate = (datetime: string): string => {
  // 2022-1-18 13:52:29
  const d = datetime.substring(0, 9).split("-");
  const date = `${d[2]}/${d[1]}/${d[0]}`;
  return date;
};

export default MinifyToDate;
