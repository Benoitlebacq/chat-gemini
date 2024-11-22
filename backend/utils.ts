export function formatText(input: string): string {
    // Remplacer les mots entre ** par une chaîne vide
    const withoutBoldWords = input.replace(/\*\*(.*?)\*\*/g, "");
    // Remplacer les * par un "."
    const finalResult = withoutBoldWords.replace(/\*/g, "");
    return finalResult;
}