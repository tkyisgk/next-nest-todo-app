function zeroPadding(target: number, length: number) {
  return (Array(length).join("0") + target).slice(-length);
}

function dateFormat(date: Date) {
  const dateInstance = new Date(date);

  return `${dateInstance.getFullYear()}/${zeroPadding(dateInstance.getMonth(), 2)}/${zeroPadding(
    dateInstance.getDay(),
    2,
  )}`;
}

export { dateFormat };
