const parseChatGPTResponse = (response: string) => {
    const start = response.indexOf("{");
    const end = response.lastIndexOf("}");
    const jsonContent = response.substring(start, end + 1);

    return JSON.parse(jsonContent);
}