// quotes.ts
export interface Quote {
  text: string;
  author: string;
}
const apiUrl = "https://frasedeldia.azurewebsites.net/api/phrase";

export async function getQuotes(): Promise<Quote[]> {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return [
    {
      text: data.phrase,
      author: data.author || "Anónimo",
    },
  ];
}
