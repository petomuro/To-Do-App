export function localizeDate(date: string | Date): string {
  if (date !== "") {
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString("sk-SK");
    } else {
      return date.toLocaleDateString("sk-SK");
    }
  } else {
    return "";
  }
}
